const express = require('express');
const { getDb, saveDb } = require('../database/init');
const { optionalAuth, authenticate } = require('../middleware/auth');

const router = express.Router();

const CATEGORIES = {
  'laptop': 'Laptop',
  'sac': 'Dây Sạc',
  'tai-nghe': 'Tai Nghe',
  'chuot': 'Chuột',
  'ban-phim': 'Bàn Phím',
  'loa': 'Loa Ngoài',
  'usb': 'USB',
  'ram': 'RAM',
  've-sinh': 'Vệ Sinh Laptop'
};

// Danh sách danh mục
router.get('/categories', (req, res) => {
  res.json({ categories: CATEGORIES });
});

// Danh sách sản phẩm (có filter, search, pagination)
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const { category, search, min_price, max_price, brand, sort, page = 1, limit = 12 } = req.query;

    let where = ['1=1'];
    if (category) where.push(`category = '${category}'`);
    if (search) where.push(`(name LIKE '%${search}%' OR description LIKE '%${search}%')`);
    if (min_price) where.push(`price >= ${min_price}`);
    if (max_price) where.push(`price <= ${max_price}`);
    if (brand) where.push(`brand = '${brand}'`);

    let orderBy = 'created_at DESC';
    if (sort === 'price_asc') orderBy = 'price ASC';
    else if (sort === 'price_desc') orderBy = 'price DESC';
    else if (sort === 'name') orderBy = 'name ASC';
    else if (sort === 'featured') orderBy = 'featured DESC, created_at DESC';
    else if (sort === 'bestseller') orderBy = 'sold DESC, created_at DESC';

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const whereClause = where.join(' AND ');

    // Count
    const countResult = db.exec(`SELECT COUNT(*) FROM products WHERE ${whereClause}`);
    const total = countResult[0].values[0][0];

    // Products
    const result = db.exec(`SELECT * FROM products WHERE ${whereClause} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`);
    
    let products = [];
    if (result.length > 0) {
      const cols = result[0].columns;
      products = result[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
    }

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Products error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Chi tiết sản phẩm
router.get('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec(`SELECT * FROM products WHERE id = ${req.params.id}`);
    
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }

    const cols = result[0].columns;
    const row = result[0].values[0];
    const product = {};
    cols.forEach((col, i) => product[col] = row[i]);

    // Sản phẩm liên quan (cùng category)
    const related = db.exec(`SELECT * FROM products WHERE category = '${product.category}' AND id != ${product.id} LIMIT 4`);
    let relatedProducts = [];
    if (related.length > 0) {
      const rCols = related[0].columns;
      relatedProducts = related[0].values.map(r => {
        const obj = {};
        rCols.forEach((col, i) => obj[col] = r[i]);
        return obj;
      });
    }

    res.json({ product, relatedProducts });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Lấy đánh giá sản phẩm
router.get('/:id/reviews', async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec(`
      SELECT r.id, r.rating, r.comment, r.created_at, u.full_name, u.username
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ${req.params.id}
      ORDER BY r.created_at DESC
    `);
    
    let reviews = [];
    if (result.length > 0) {
      const cols = result[0].columns;
      reviews = result[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
    }

    // Tính điểm trung bình
    let avg_rating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      avg_rating = (sum / reviews.length).toFixed(1);
    }

    res.json({ reviews, avg_rating, total: reviews.length });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Thêm đánh giá
router.post('/:id/reviews', authenticate, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Số sao đánh giá không hợp lệ' });
    }
    const db = await getDb();
    
    db.run(`INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`, 
      [req.params.id, req.user.id, rating, comment || '']);
      
    saveDb();
    
    res.json({ message: 'Cảm ơn bạn đã đánh giá sản phẩm!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

module.exports = router;
