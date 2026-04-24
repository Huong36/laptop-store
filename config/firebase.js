const admin = require('firebase-admin');
const path = require('path');

// Đường dẫn tới file serviceAccountKey.json mà bạn sẽ tải về từ Firebase
// Bạn lưu file tải về vào thư mục config/ và đổi tên thành serviceAccountKey.json nhé
const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
