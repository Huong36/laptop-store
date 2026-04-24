const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb, saveDb } = require('../database/init');
const { authenticate, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, full_name, phone } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
    }
    if (username.length < 3) {
      return res.status(400).json({ error: 'Tên đăng nhập phải có ít nhất 3 ký tự' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }

    const db = await getDb();
    
    // Check existing
    const existing = db.exec(`SELECT id FROM users WHERE username = '${username}' OR email = '${email}'`);
    if (existing.length > 0 && existing[0].values.length > 0) {
      return res.status(400).json({ error: 'Tên đăng nhập hoặc email đã tồn tại' });
    }

    const password_hash = bcrypt.hashSync(password, 10);
    db.run(`INSERT INTO users (username, email, password_hash, full_name, phone) VALUES (?, ?, ?, ?, ?)`,
      [username, email, password_hash, full_name || '', phone || '']);
    saveDb();

    const newUser = db.exec(`SELECT id, username, email, full_name, phone, role FROM users WHERE username = '${username}'`);
    const user = {
      id: newUser[0].values[0][0],
      username: newUser[0].values[0][1],
      email: newUser[0].values[0][2],
      full_name: newUser[0].values[0][3],
      phone: newUser[0].values[0][4],
      role: newUser[0].values[0][5]
    };

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Đăng ký thành công!', token, user });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống, vui lòng thử lại' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
    }

    const db = await getDb();
    const result = db.exec(`SELECT id, username, email, password_hash, full_name, phone, role FROM users WHERE username = '${username}' OR email = '${username}'`);
    
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const row = result[0].values[0];
    const user = {
      id: row[0], username: row[1], email: row[2],
      password_hash: row[3], full_name: row[4], phone: row[5], role: row[6]
    };

    if (!bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    delete user.password_hash;
    res.json({ message: 'Đăng nhập thành công!', token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống, vui lòng thử lại' });
  }
});

// Lấy thông tin profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec(`SELECT id, username, email, full_name, phone, address, role, created_at FROM users WHERE id = ${req.user.id}`);
    
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản' });
    }

    const row = result[0].values[0];
    const cols = result[0].columns;
    const user = {};
    cols.forEach((col, i) => user[col] = row[i]);

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Cập nhật profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { full_name, phone, address, email } = req.body;
    const db = await getDb();
    
    db.run(`UPDATE users SET full_name = ?, phone = ?, address = ?, email = ? WHERE id = ?`,
      [full_name || '', phone || '', address || '', email || '', req.user.id]);
    saveDb();

    res.json({ message: 'Cập nhật thông tin thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// Đổi mật khẩu
router.put('/change-password', authenticate, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
    }
    if (new_password.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    }

    const db = await getDb();
    const result = db.exec(`SELECT password_hash FROM users WHERE id = ${req.user.id}`);
    const hash = result[0].values[0][0];

    if (!bcrypt.compareSync(current_password, hash)) {
      return res.status(400).json({ error: 'Mật khẩu hiện tại không đúng' });
    }

    const newHash = bcrypt.hashSync(new_password, 10);
    db.run(`UPDATE users SET password_hash = ? WHERE id = ?`, [newHash, req.user.id]);
    saveDb();

    res.json({ message: 'Đổi mật khẩu thành công!' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

module.exports = router;
