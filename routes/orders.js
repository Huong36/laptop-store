const express = require('express');
const { getDb, saveDb } = require('../database/init');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Tạo đơn hàng
router.post('/', authenticate, async (req, res) => {
  try {
    const { payment_method, shipping_name, shipping_phone, shipping_address, note } = req.body;
    
    if (!shipping_name || !shipping_phone || !shipping_address) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin giao hàng' });
    }
    if (!payment_method || !['cod', 'qr'].includes(payment_method)) {
      return res.status(400).json({ error: 'Phương thức thanh toán không hợp lệ' });
    }

    const db = await getDb();

    // Lấy giỏ hàng
    const cartResult = db.exec(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.sale_price, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ${req.user.id}
    `);

    if (cartResult.length === 0 || cartResult[0].values.length === 0) {
      return res.status(400).json({ error: 'Giỏ hàng trống' });
    }

    const cols = cartResult[0].columns;
    const items = cartResult[0].values.map(row => {
      const obj = {};
      cols.forEach((col, i) => obj[col] = row[i]);
      return obj;
    });

    // Tính tổng
    let total = 0;
    for (const item of items) {
      if (item.stock < item.quantity) {
        return res.status(400).json({ error: `Sản phẩm "${item.name}" không đủ số lượng trong kho` });
      }
      const unitPrice = item.sale_price > 0 ? item.sale_price : item.price;
      total += unitPrice * item.quantity;
    }

    // Tạo đơn hàng
    db.run(`INSERT INTO orders (user_id, total, payment_method, shipping_name, shipping_phone, shipping_address, note, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, total, payment_method, shipping_name, shipping_phone, shipping_address, note || '', 'pending']);
    
    // Lấy order ID vừa tạo
    const orderResult = db.exec(`SELECT last_insert_rowid()`);
    const orderId = orderResult[0].values[0][0];

    // Thêm order items & giảm stock, tăng sold
    for (const item of items) {
      const unitPrice = item.sale_price > 0 ? item.sale_price : item.price;
      db.run(`INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.quantity, unitPrice]);
      db.run(`UPDATE products SET stock = stock - ?, sold = sold + ? WHERE id = ?`, [item.quantity, item.quantity, item.product_id]);
    }

    // Xóa giỏ hàng
    db.run(`DELETE FROM cart_items WHERE user_id = ?`, [req.user.id]);
    saveDb();

    res.json({ 
      message: 'Đặt hàng thành công!', 
      order: { id: orderId, total, payment_method, status: 'pending' }
    });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Lịch sử đơn hàng
router.get('/', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec(`SELECT * FROM orders WHERE user_id = ${req.user.id} ORDER BY created_at DESC`);

    let orders = [];
    if (result.length > 0) {
      const cols = result[0].columns;
      orders = result[0].values.map(row => {
        const obj = {};
        cols.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });

      // Lấy items cho mỗi order
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

// Chi tiết đơn hàng
router.get('/:id', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec(`SELECT * FROM orders WHERE id = ${req.params.id} AND user_id = ${req.user.id}`);

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    }

    const cols = result[0].columns;
    const row = result[0].values[0];
    const order = {};
    cols.forEach((col, i) => order[col] = row[i]);

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

    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

module.exports = router;
