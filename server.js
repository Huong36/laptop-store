const express = require('express');
const path = require('path');
const cors = require('cors');
const { getDb } = require('./database/init');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/dataset', express.static(path.join(__dirname, 'dataset')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Shop info API
app.get('/api/shop-info', (req, res) => {
  res.json({
    name: 'Laptop Store',
    hotline: '0392005016',
    address: '77 Bùi Xuân Phái, Tây Thạnh, TP.HCM',
    email: 'contact@laptopstore.vn',
    owner: 'TRAN XUAN HUONG'
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Lỗi hệ thống, vui lòng thử lại sau' });
});

// Start server
async function start() {
  try {
    await getDb();
    console.log('✅ Database đã sẵn sàng');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
      console.log(`📱 Hotline: 0392005016`);
      console.log(`📍 Địa chỉ: 77 Bùi Xuân Phái, Tây Thạnh, TP.HCM`);
    });
  } catch (err) {
    console.error('❌ Lỗi khởi động server:', err);
    process.exit(1);
  }
}

start();
