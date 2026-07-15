const initSQL = require('sql.js');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'store.db');

let db = null;

async function getDb() {
  if (db) return db;
  
  const SQL = await initSQL();
  
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
    createTables();
    seedData();
    saveDb();
  }
  
  return db;
}

function saveDb() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      address TEXT DEFAULT '',
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      price INTEGER NOT NULL,
      sale_price INTEGER DEFAULT 0,
      category TEXT NOT NULL,
      brand TEXT DEFAULT '',
      stock INTEGER DEFAULT 0,
      sold INTEGER DEFAULT 0,
      image TEXT DEFAULT '',
      specs TEXT DEFAULT '',
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      comment TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_method TEXT DEFAULT 'cod',
      shipping_name TEXT DEFAULT '',
      shipping_phone TEXT DEFAULT '',
      shipping_address TEXT DEFAULT '',
      note TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);
}

function seedData() {
  // Tạo tài khoản admin và user mẫu
  const adminHash = bcrypt.hashSync('admin123', 10);
  const userHash = bcrypt.hashSync('user123', 10);

  db.run(`INSERT INTO users (username, email, password_hash, full_name, phone, role) VALUES (?, ?, ?, ?, ?, ?)`,
    ['admin', 'admin@laptopstore.vn', adminHash, 'Quản Trị Viên', '0392005016', 'admin']);
  db.run(`INSERT INTO users (username, email, password_hash, full_name, phone, role) VALUES (?, ?, ?, ?, ?, ?)`,
    ['user', 'user@gmail.com', userHash, 'Nguyễn Văn A', '0901234567', 'user']);

  // Seed sản phẩm
  const allProducts = require('./seed_data');

  const stmt = db.prepare(`INSERT INTO products (name, description, price, sale_price, category, brand, stock, sold, image, specs, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  allProducts.forEach(p => {
    stmt.run([p.name, p.description, p.price, p.sale_price, p.category, p.brand, p.stock, p.sold || 0, p.image, p.specs, p.featured]);
  });
  stmt.free();

  // Seed reviews mẫu
  db.run(`INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`, [1, 2, 5, 'Máy tính cực kỳ mỏng nhẹ, đáng tiền!']);
  db.run(`INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`, [1, 1, 4, 'Sản phẩm giao nhanh, đóng gói cẩn thận.']);
  db.run(`INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`, [2, 2, 5, 'Rất mượt mà, chơi game không bị giật lag.']);
  db.run(`INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`, [3, 2, 3, 'Tạm được trong tầm giá này.']);
}

module.exports = { getDb, saveDb };
