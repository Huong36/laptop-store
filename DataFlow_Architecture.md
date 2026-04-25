# Tài Liệu Luồng Xử Lý Dữ Liệu - Laptop Store

Tài liệu này mô tả chi tiết luồng xử lý dữ liệu (Data Flow) giữa Frontend, Backend và Database, dành cho mục đích kiểm thử (Testing).

## 1. Tổng quan Kiến Trúc
Hệ thống sử dụng mô hình Client - Server:
- **Frontend (Client):** Giao diện web tĩnh (HTML/CSS/JS thuần). Xử lý routing qua hash URL (`#/cart`, `#/products`). Gọi API thông qua `fetch`.
- **Backend (Server):** Node.js với Express.js cung cấp các RESTful APIs.
- **Database:** SQLite lưu trữ file vật lý `store.db`.

---

## 2. Luồng Dữ Liệu Chi Tiết Các Chức Năng Chính

### A. Luồng Đăng Nhập / Xác Thực (Authentication Flow)
- **Frontend:** Người dùng nhập Username/Password tại modal đăng nhập. Gọi `POST /api/auth/login`.
- **Backend (`routes/auth.js`):** 
  1. Nhận request body `{ username, password }`.
  2. Truy vấn Database bảng `users` để tìm user.
  3. So sánh password hash (bằng thư viện `bcrypt`).
  4. Nếu đúng: Tạo JWT Token chứa `id` và `role`.
- **Response:** Trả về `{ token, user, message }`.
- **Frontend:** Lưu `token` và `user` vào `localStorage`. Cập nhật giao diện (ẩn nút đăng nhập, hiện tên user).

### B. Luồng Hiển Thị Sản Phẩm (Product Listing)
- **Frontend:** Khi vào trang chủ hoặc trang danh mục, gọi `GET /api/products?limit=50&sort=featured`.
- **Backend (`routes/products.js`):**
  1. Nhận query parameters (category, search, page, limit, sort).
  2. Tạo câu lệnh SQL động (`WHERE category = ...`).
  3. Query bảng `products`.
  4. Query tổng số lượng (để phân trang).
- **Response:** Trả về `{ products: [...], pagination: {...} }`.
- **Frontend:** Nhận mảng `products` và dùng Javascript DOM (`pages.js`) để render HTML các thẻ sản phẩm.

### C. Luồng Giỏ Hàng (Cart Flow)
*Lưu ý cho Tester: Giỏ hàng được lưu ở Database (bảng `cart_items`), KHÔNG lưu ở LocalStorage của trình duyệt.*
- **Frontend (Thêm sản phẩm):** Khi bấm "Thêm", gọi `POST /api/cart` kèm `product_id` và `quantity`. (Phải có Token ở Header).
- **Backend (`routes/cart.js`):**
  1. Lấy `user_id` từ Token.
  2. Kiểm tra xem `product_id` đã có trong giỏ của `user_id` này chưa.
  3. Nếu có: `UPDATE quantity = quantity + 1`. Nếu chưa: `INSERT INTO cart_items`.
- **Frontend (Lấy số lượng Badge):** Luôn gọi `GET /api/cart` để tính tổng số sản phẩm trong giỏ và hiển thị lên icon (số màu hồng).

### D. Luồng Đặt Hàng & Thanh Toán (Checkout Flow - Luồng Cần Test Kỹ)
- **Frontend:** Tại trang checkout (`#/checkout`), user điền thông tin (Tên, SĐT, Địa chỉ, Hình thức thanh toán: COD/QR) và bấm Đặt hàng. Gọi `POST /api/orders`.
- **Backend (`routes/orders.js`):** Xử lý Transaction gồm nhiều bước:
  1. **Query Giỏ Hàng:** `SELECT` toàn bộ item trong `cart_items` của user.
  2. **Check Tồn Kho (Validation):** Lặp qua từng item, so sánh số lượng mua (`quantity`) với tồn kho trong bảng `products` (`stock`). Nếu số lượng mua > tồn kho => Báo lỗi, hủy transaction.
  3. **Tính Tiền:** Tính tổng (`total`) dựa trên `sale_price` (ưu tiên) hoặc `price`.
  4. **Tạo Order:** `INSERT INTO orders` (thông tin user, địa chỉ, phương thức, total). Lấy `order_id` vừa tạo.
  5. **Tạo Order Items:** `INSERT INTO order_items` danh sách sản phẩm.
  6. **Trừ Tồn Kho:** `UPDATE products SET stock = stock - quantity`.
  7. **Xóa Giỏ Hàng:** `DELETE FROM cart_items WHERE user_id = ...`.
- **Response:** Trả về `{ message, order: {id, status} }`.
- **Frontend:** Hiển thị thông báo, gọi hàm `updateCartBadge()` để reset số giỏ hàng về 0, chuyển trang sang `#/order-success/{order_id}`.

---

## 3. Các Bảng Dữ Liệu Liên Quan (Database Schema)

- `users`: id, username, email, password_hash, role
- `products`: id, name, price, sale_price, category, stock, image
- `cart_items`: id, user_id, product_id, quantity
- `orders`: id, user_id, total, status, payment_method, shipping_address
- `order_items`: id, order_id, product_id, product_name, quantity, price

## 4. Điểm Chú Ý Khi Test (Test Cases Gợi Ý)
1. **Test Checkout với Tồn Kho:** Thêm vào giỏ hàng số lượng lớn hơn tồn kho thực tế (`stock`) -> Backend phải bắt lỗi và không cho thanh toán.
2. **Test Cart Badge:** Sau khi đặt hàng thành công, badge giỏ hàng phải về 0 (lỗi này vừa được fix).
3. **Test Giá Trị:** Sản phẩm có `sale_price` > 0 thì tổng tiền giỏ hàng/hóa đơn phải tính theo `sale_price`, không tính theo `price` gốc.
4. **Test Bảo Mật:** Gọi API `/api/cart` hoặc `/api/orders` mà không truyền Token -> Backend phải trả về `401 Unauthorized`.
