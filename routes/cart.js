const express = require('express');
const { getDb, saveDb } = require('../database/init');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Lấy giỏ hàng
router.get('/', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.sale_price, p.image, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ${req.user.id}
    `);

    let items = [];
    if (result.length > 0) {
      const cols = result[0].columns;
      items = result[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        obj.subtotal = (obj.sale_price > 0 ? obj.sale_price : obj.price) * obj.quantity;
        return obj;
      });
    }

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    res.json({ items, total, count: items.length });
  } catch (err) {
    console.error('Cart error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Thêm vào giỏ
router.post('/', authenticate, async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) {
      return res.status(400).json({ error: 'Thiếu thông tin sản phẩm' });
    }

    const db = await getDb();

    // Check product exists and has stock
    const product = db.exec(`SELECT id, stock, name FROM products WHERE id = ${product_id}`);
    if (product.length === 0 || product[0].values.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }
    if (product[0].values[0][1] < quantity) {
      return res.status(400).json({ error: 'Sản phẩm không đủ số lượng trong kho' });
    }

    // Check if already in cart
    const existing = db.exec(`SELECT id, quantity FROM cart_items WHERE user_id = ${req.user.id} AND product_id = ${product_id}`);
    
    if (existing.length > 0 && existing[0].values.length > 0) {
      const newQty = existing[0].values[0][1] + quantity;
      db.run(`UPDATE cart_items SET quantity = ? WHERE id = ?`, [newQty, existing[0].values[0][0]]);
    } else {
      db.run(`INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`, [req.user.id, product_id, quantity]);
    }
    saveDb();

    res.json({ message: `Đã thêm "${product[0].values[0][2]}" vào giỏ hàng!` });
  } catch (err) {
    console.error('Add cart error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Cập nhật số lượng
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Số lượng không hợp lệ' });
    }

    const db = await getDb();
    db.run(`UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?`, [quantity, req.params.id, req.user.id]);
    saveDb();

    res.json({ message: 'Cập nhật giỏ hàng thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Xóa khỏi giỏ
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    db.run(`DELETE FROM cart_items WHERE id = ? AND user_id = ?`, [req.params.id, req.user.id]);
    saveDb();

    res.json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Xóa toàn bộ giỏ
router.delete('/', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    db.run(`DELETE FROM cart_items WHERE user_id = ?`, [req.user.id]);
    saveDb();

    res.json({ message: 'Đã xóa toàn bộ giỏ hàng!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

module.exports = router;
