const express = require('express');
const multer = require('multer');
const path = require('path');
const { getDb, saveDb } = require('../database/init');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Tất cả route admin đều cần authenticate + requireAdmin
router.use(authenticate, requireAdmin);

// Dashboard thống kê
router.get('/dashboard', async (req, res) => {
  try {
    const db = await getDb();
    
    const totalProducts = db.exec('SELECT COUNT(*) FROM products')[0].values[0][0];
    const totalUsers = db.exec('SELECT COUNT(*) FROM users')[0].values[0][0];
    const totalOrders = db.exec('SELECT COUNT(*) FROM orders')[0].values[0][0];
    
    const revenueResult = db.exec("SELECT COALESCE(SUM(total), 0) FROM orders WHERE status != 'cancelled'");
    const totalRevenue = revenueResult[0].values[0][0];

    const pendingOrders = db.exec("SELECT COUNT(*) FROM orders WHERE status = 'pending'")[0].values[0][0];
    const processingOrders = db.exec("SELECT COUNT(*) FROM orders WHERE status = 'processing'")[0].values[0][0];

    // Recent orders
    const recentResult = db.exec(`
      SELECT o.*, u.username, u.full_name 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC LIMIT 5
    `);
    let recentOrders = [];
    if (recentResult.length > 0) {
      const cols = recentResult[0].columns;
      recentOrders = recentResult[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
    }

    // Low stock products
    const lowStockResult = db.exec('SELECT * FROM products WHERE stock <= 5 ORDER BY stock ASC LIMIT 5');
    let lowStockProducts = [];
    if (lowStockResult.length > 0) {
      const cols = lowStockResult[0].columns;
      lowStockProducts = lowStockResult[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
    }

    res.json({
      stats: { totalProducts, totalUsers, totalOrders, totalRevenue, pendingOrders, processingOrders },
      recentOrders,
      lowStockProducts
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Upload hình ảnh
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Không tìm thấy file' });
  }
  res.json({ url: '/uploads/' + req.file.filename });
});

// CRUD Sản phẩm
router.get('/products', async (req, res) => {
  try {
    const db = await getDb();
    const { category, search, page = 1, limit = 20 } = req.query;

    let where = ['1=1'];
    if (category) where.push(`category = '${category}'`);
    if (search) where.push(`(name LIKE '%${search}%' OR brand LIKE '%${search}%')`);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const whereClause = where.join(' AND ');

    const countResult = db.exec(`SELECT COUNT(*) FROM products WHERE ${whereClause}`);
    const total = countResult[0].values[0][0];

    const result = db.exec(`SELECT * FROM products WHERE ${whereClause} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
    let products = [];
    if (result.length > 0) {
      const cols = result[0].columns;
      products = result[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
    }

    res.json({ products, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, description, price, sale_price, category, brand, stock, image, specs, featured } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Vui lòng điền tên, giá và danh mục sản phẩm' });
    }

    const db = await getDb();
    db.run(`INSERT INTO products (name, description, price, sale_price, category, brand, stock, image, specs, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description || '', price, sale_price || 0, category, brand || '', stock || 0, image || '', specs || '', featured || 0]);
    saveDb();

    res.json({ message: 'Thêm sản phẩm thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, description, price, sale_price, category, brand, stock, image, specs, featured } = req.body;
    const db = await getDb();

    db.run(`UPDATE products SET name=?, description=?, price=?, sale_price=?, category=?, brand=?, stock=?, image=?, specs=?, featured=? WHERE id=?`,
      [name, description || '', price, sale_price || 0, category, brand || '', stock || 0, image || '', specs || '', featured || 0, req.params.id]);
    saveDb();

    res.json({ message: 'Cập nhật sản phẩm thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const db = await getDb();
    db.run(`DELETE FROM products WHERE id = ?`, [req.params.id]);
    saveDb();
    res.json({ message: 'Xóa sản phẩm thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Quản lý đơn hàng
router.get('/orders', async (req, res) => {
  try {
    const db = await getDb();
    const { status, page = 1, limit = 20 } = req.query;

    let where = ['1=1'];
    if (status) where.push(`o.status = '${status}'`);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const whereClause = where.join(' AND ');

    const result = db.exec(`
      SELECT o.*, u.username, u.full_name 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      WHERE ${whereClause}
      ORDER BY o.created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `);

    let orders = [];
    if (result.length > 0) {
      const cols = result[0].columns;
      orders = result[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });

      for (const order of orders) {
        const itemsResult = db.exec(`SELECT * FROM order_items WHERE order_id = ${order.id}`);
        if (itemsResult.length > 0) {
          const iCols = itemsResult[0].columns;
          order.items = itemsResult[0].values.map(r => {
            const obj = {};
            iCols.forEach((col, i) => obj[col] = r[i]);
            return obj;
          });
        } else {
          order.items = [];
        }
      }
    }

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

router.put('/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
    }

    const db = await getDb();
    
    // If cancelling, restore stock
    if (status === 'cancelled') {
      const itemsResult = db.exec(`SELECT product_id, quantity FROM order_items WHERE order_id = ${req.params.id}`);
      if (itemsResult.length > 0) {
        itemsResult[0].values.forEach(row => {
          db.run(`UPDATE products SET stock = stock + ? WHERE id = ?`, [row[1], row[0]]);
        });
      }
    }

    db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, req.params.id]);
    saveDb();

    res.json({ message: 'Cập nhật trạng thái đơn hàng thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Quản lý users
router.get('/users', async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec('SELECT id, username, email, full_name, phone, address, role, created_at FROM users ORDER BY created_at DESC');
    
    let users = [];
    if (result.length > 0) {
      const cols = result[0].columns;
      users = result[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
    }

    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Quyền không hợp lệ' });
    }

    const db = await getDb();
    db.run(`UPDATE users SET role = ? WHERE id = ?`, [role, req.params.id]);
    saveDb();

    res.json({ message: 'Cập nhật quyền thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const db = await getDb();
    // Don't allow deleting self
    if (parseInt(req.params.id) === req.user.id) {
      return res.status(400).json({ error: 'Không thể xóa tài khoản của chính mình' });
    }
    db.run(`DELETE FROM cart_items WHERE user_id = ?`, [req.params.id]);
    db.run(`DELETE FROM users WHERE id = ?`, [req.params.id]);
    saveDb();
    res.json({ message: 'Xóa tài khoản thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

module.exports = router;
