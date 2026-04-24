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
      image TEXT DEFAULT '',
      specs TEXT DEFAULT '',
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
  const products = [
    // Laptop
    { name: 'Laptop ASUS VivoBook 15', description: 'Laptop văn phòng mỏng nhẹ, màn hình 15.6 inch FHD, Intel Core i5-1235U, RAM 8GB, SSD 512GB. Phù hợp cho công việc văn phòng và học tập.', price: 13990000, sale_price: 12490000, category: 'laptop', brand: 'ASUS', stock: 15, image: '/images/laptop-asus.svg', specs: 'CPU: Intel Core i5-1235U | RAM: 8GB DDR4 | SSD: 512GB | Màn hình: 15.6" FHD | Pin: 42Wh', featured: 1 },
    { name: 'Laptop Dell Inspiron 14', description: 'Laptop Dell Inspiron 14 inch, thiết kế hiện đại, Intel Core i7-1355U, RAM 16GB, SSD 512GB. Hiệu năng mạnh mẽ cho mọi tác vụ.', price: 18990000, sale_price: 16990000, category: 'laptop', brand: 'Dell', stock: 10, image: '/images/laptop-dell.svg', specs: 'CPU: Intel Core i7-1355U | RAM: 16GB DDR5 | SSD: 512GB | Màn hình: 14" FHD+ | Pin: 54Wh', featured: 1 },
    { name: 'Laptop HP Pavilion 15', description: 'Laptop HP Pavilion với thiết kế sang trọng, AMD Ryzen 5 7530U, RAM 8GB, SSD 256GB. Giải trí và làm việc hiệu quả.', price: 11990000, sale_price: 0, category: 'laptop', brand: 'HP', stock: 20, image: '/images/laptop-hp.svg', specs: 'CPU: AMD Ryzen 5 7530U | RAM: 8GB DDR4 | SSD: 256GB | Màn hình: 15.6" FHD | Pin: 41Wh', featured: 1 },
    { name: 'Laptop Lenovo IdeaPad Slim 3', description: 'Laptop Lenovo mỏng nhẹ, Intel Core i3-1215U, RAM 8GB, SSD 256GB. Lựa chọn tốt nhất cho sinh viên.', price: 9490000, sale_price: 8490000, category: 'laptop', brand: 'Lenovo', stock: 25, image: '/images/laptop-lenovo.svg', specs: 'CPU: Intel Core i3-1215U | RAM: 8GB DDR4 | SSD: 256GB | Màn hình: 15.6" FHD | Pin: 38Wh', featured: 1 },
    { name: 'MacBook Air M2', description: 'MacBook Air chip M2, thiết kế siêu mỏng, màn hình Liquid Retina 13.6 inch, RAM 8GB, SSD 256GB. Hiệu năng vượt trội.', price: 27990000, sale_price: 25490000, category: 'laptop', brand: 'Apple', stock: 8, image: '/images/macbook-air.svg', specs: 'CPU: Apple M2 | RAM: 8GB | SSD: 256GB | Màn hình: 13.6" Liquid Retina | Pin: 18 giờ', featured: 1 },

    // Dây sạc
    { name: 'Sạc Laptop Đa Năng 65W USB-C', description: 'Sạc nhanh 65W USB-C PD, tương thích nhiều dòng laptop. Nhỏ gọn, an toàn với bảo vệ quá tải.', price: 350000, sale_price: 290000, category: 'sac', brand: 'Anker', stock: 50, image: '/images/charger-65w.svg', specs: 'Công suất: 65W | Cổng: USB-C PD | Dây dài: 1.8m | Bảo vệ: Quá tải, quá nhiệt', featured: 0 },
    { name: 'Sạc Laptop ASUS 90W Chính Hãng', description: 'Sạc laptop ASUS chính hãng 90W, đầu tròn. Phù hợp nhiều dòng ASUS VivoBook, ZenBook.', price: 450000, sale_price: 0, category: 'sac', brand: 'ASUS', stock: 30, image: '/images/charger-asus.svg', specs: 'Công suất: 90W | Đầu sạc: Tròn 5.5mm | Dây dài: 1.5m | Chính hãng ASUS', featured: 0 },

    // Tai nghe
    { name: 'Tai Nghe Bluetooth Sony WH-1000XM5', description: 'Tai nghe chống ồn cao cấp Sony, âm thanh Hi-Res, pin 30 giờ, chống ồn chủ động ANC.', price: 7990000, sale_price: 6990000, category: 'tai-nghe', brand: 'Sony', stock: 12, image: '/images/headphone-sony.svg', specs: 'Loại: Over-ear | Kết nối: Bluetooth 5.2 | Pin: 30 giờ | ANC: Có | Hi-Res: Có', featured: 1 },
    { name: 'Tai Nghe Gaming HyperX Cloud III', description: 'Tai nghe gaming HyperX, âm thanh vòm 7.1, micro khử ồn, đệm tai êm ái. Chuyên cho game thủ.', price: 2490000, sale_price: 1990000, category: 'tai-nghe', brand: 'HyperX', stock: 20, image: '/images/headphone-hyperx.svg', specs: 'Loại: Over-ear | Kết nối: USB/3.5mm | Driver: 53mm | Micro: Khử ồn | Âm thanh: 7.1', featured: 0 },

    // Chuột
    { name: 'Chuột Logitech MX Master 3S', description: 'Chuột không dây cao cấp Logitech, cảm biến 8000 DPI, sạc USB-C, kết nối đa thiết bị.', price: 2490000, sale_price: 2190000, category: 'chuot', brand: 'Logitech', stock: 18, image: '/images/mouse-logitech.svg', specs: 'Cảm biến: 8000 DPI | Kết nối: Bluetooth/USB | Pin: 70 ngày | Nút: 7 | Sạc: USB-C', featured: 0 },
    { name: 'Chuột Gaming Razer DeathAdder V3', description: 'Chuột gaming Razer siêu nhẹ, cảm biến 30K DPI, thiết kế ergonomic. Tối ưu cho FPS.', price: 1690000, sale_price: 0, category: 'chuot', brand: 'Razer', stock: 25, image: '/images/mouse-razer.svg', specs: 'Cảm biến: 30000 DPI | Trọng lượng: 59g | Switch: Quang học | Nút: 5 | Dây: Speedflex', featured: 0 },

    // Bàn phím
    { name: 'Bàn Phím Cơ Keychron K8 Pro', description: 'Bàn phím cơ không dây Keychron, hot-swap, RGB, tương thích Mac/Windows. Switch Gateron G Pro.', price: 2290000, sale_price: 1990000, category: 'ban-phim', brand: 'Keychron', stock: 15, image: '/images/keyboard-keychron.svg', specs: 'Layout: TKL 87 phím | Switch: Gateron G Pro | Kết nối: BT/USB | RGB: Có | Hot-swap: Có', featured: 0 },
    { name: 'Bàn Phím Gaming Corsair K70 RGB', description: 'Bàn phím cơ gaming Corsair, Cherry MX Red, full-size, RGB per-key. Bền bỉ cho game thủ.', price: 3290000, sale_price: 2890000, category: 'ban-phim', brand: 'Corsair', stock: 10, image: '/images/keyboard-corsair.svg', specs: 'Layout: Full-size 104 phím | Switch: Cherry MX Red | RGB: Per-key | Khung: Nhôm', featured: 0 },

    // Loa ngoài
    { name: 'Loa Bluetooth JBL Flip 6', description: 'Loa di động JBL, chống nước IP67, pin 12 giờ, âm bass mạnh mẽ. Phù hợp mang theo bên mình.', price: 2790000, sale_price: 2390000, category: 'loa', brand: 'JBL', stock: 20, image: '/images/speaker-jbl.svg', specs: 'Công suất: 30W | Pin: 12 giờ | Chống nước: IP67 | Bluetooth: 5.1 | Trọng lượng: 550g', featured: 0 },
    { name: 'Loa Vi Tính Edifier R1280T', description: 'Loa vi tính Edifier, công suất 42W, âm thanh studio. Thiết kế cổ điển cho bàn làm việc.', price: 1690000, sale_price: 0, category: 'loa', brand: 'Edifier', stock: 12, image: '/images/speaker-edifier.svg', specs: 'Công suất: 42W RMS | Driver: 4" | Tweeter: 13mm | Đầu vào: RCA/AUX', featured: 0 },

    // USB
    { name: 'USB Kingston DataTraveler 64GB', description: 'USB 3.2 Kingston, tốc độ đọc 200MB/s, thiết kế nhỏ gọn, vỏ kim loại bền bỉ.', price: 189000, sale_price: 149000, category: 'usb', brand: 'Kingston', stock: 100, image: '/images/usb-kingston.svg', specs: 'Dung lượng: 64GB | Chuẩn: USB 3.2 Gen1 | Tốc độ đọc: 200MB/s | Vỏ: Kim loại', featured: 0 },
    { name: 'USB SanDisk Ultra Dual 128GB', description: 'USB OTG SanDisk, cổng USB-A và USB-C, tốc độ 150MB/s. Tiện lợi cho cả laptop và điện thoại.', price: 299000, sale_price: 249000, category: 'usb', brand: 'SanDisk', stock: 80, image: '/images/usb-sandisk.svg', specs: 'Dung lượng: 128GB | Cổng: USB-A + USB-C | Tốc độ: 150MB/s | OTG: Có', featured: 0 },

    // RAM
    { name: 'RAM Kingston Fury 8GB DDR4 3200MHz', description: 'RAM laptop Kingston Fury, tốc độ 3200MHz, tản nhiệt hiệu quả. Nâng cấp hiệu năng laptop.', price: 590000, sale_price: 490000, category: 'ram', brand: 'Kingston', stock: 40, image: '/images/ram-kingston.svg', specs: 'Dung lượng: 8GB | Loại: DDR4 SODIMM | Tốc độ: 3200MHz | CL: 16 | Điện áp: 1.2V', featured: 0 },
    { name: 'RAM Corsair Vengeance 16GB DDR5 4800MHz', description: 'RAM laptop Corsair DDR5, tốc độ cao 4800MHz, công nghệ mới nhất cho laptop hiện đại.', price: 1290000, sale_price: 0, category: 'ram', brand: 'Corsair', stock: 25, image: '/images/ram-corsair.svg', specs: 'Dung lượng: 16GB | Loại: DDR5 SODIMM | Tốc độ: 4800MHz | CL: 40 | Điện áp: 1.1V', featured: 0 },

    // Vệ sinh laptop
    { name: 'Bộ Vệ Sinh Laptop 8 Món', description: 'Bộ vệ sinh laptop đầy đủ: dung dịch, khăn, cọ, bóng thổi bụi, tua vít, kẹp... Giữ laptop sạch sẽ.', price: 99000, sale_price: 79000, category: 've-sinh', brand: 'Generic', stock: 200, image: '/images/cleaning-kit.svg', specs: 'Bao gồm: Dung dịch 100ml, khăn microfiber, cọ mềm, bóng thổi bụi, tua vít, kẹp, chổi, vải', featured: 0 },
    { name: 'Bình Xịt Khí Nén Vệ Sinh 400ml', description: 'Bình xịt khí nén áp suất cao, làm sạch bụi bẩn trong bàn phím, khe tản nhiệt. An toàn cho linh kiện.', price: 159000, sale_price: 129000, category: 've-sinh', brand: 'Generic', stock: 60, image: '/images/air-duster.svg', specs: 'Dung tích: 400ml | Áp suất: Cao | An toàn cho linh kiện | Ống xịt dài', featured: 0 },
  ];

  const stmt = db.prepare(`INSERT INTO products (name, description, price, sale_price, category, brand, stock, image, specs, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  products.forEach(p => {
    stmt.run([p.name, p.description, p.price, p.sale_price, p.category, p.brand, p.stock, p.image, p.specs, p.featured]);
  });
  stmt.free();
}

module.exports = { getDb, saveDb };
