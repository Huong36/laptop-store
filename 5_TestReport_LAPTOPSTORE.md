# BÁO CÁO NGHIỆM THU KIỂM THỬ (TEST SUMMARY REPORT)

## 1. Thông tin chung (General Information)
- **Dự án:** Website E-commerce Laptop Store
- **Giai đoạn (Phase):** System Testing (Localhost)
- **Người báo cáo:** Tester
- **Ngày lập báo cáo:** 15/07/2026

## 2. Đánh giá chất lượng tổng quan (Quality Assessment)
Nhìn chung, hệ thống hoạt động ổn định và đáp ứng tốt các yêu cầu nghiệp vụ cốt lõi. Các tính năng mới được bổ sung bao gồm Đánh giá sản phẩm (Reviews), Sản phẩm bán chạy (Best Seller) và Giả lập tồn kho đều tích hợp tốt vào hệ thống cũ. Tuy nhiên, vẫn còn tồn đọng một lỗi mang tính rủi ro cao (Bug_02 - Liên quan đến tính toán giỏ hàng).

## 3. Số liệu thống kê (Test Metrics)

### 3.1. Tiến độ thực thi Test Cases (Execution Progress)
- **Tổng số TC đã lên kế hoạch:** 17
- **Số TC đã thực thi:** 17 (Tiến độ: 100%)
- **Số TC Passed:** 15
- **Số TC Failed:** 2
- **Tỷ lệ Pass (Pass Rate):** 88.2%

### 3.2. Thống kê lỗi (Defect Summary)
- **Tổng số Bugs phát hiện:** 2
- **Trạng thái Bug:** 2 Mở (Open) / 0 Đã đóng (Closed)
- **Phân loại Bug theo mức độ (Severity):**
  - **High:** 1 Bug (Bug_02 - Nhập số lượng âm)
  - **Minor:** 1 Bug (Bug_01 - Tìm kiếm phân biệt hoa thường)

## 4. Rủi ro còn tồn đọng (Outstanding Risks)
1. **Lỗi nhập số lượng âm (BUG_02):** Nếu người dùng cố tình lợi dụng Bug này, họ có thể đặt hàng thành công với số tiền âm, làm hỏng dữ liệu tài chính của cửa hàng. Bắt buộc phải Fix trước khi lên Live.
2. **Khó tìm kiếm sản phẩm (BUG_01):** Ảnh hưởng trực tiếp đến trải nghiệm người dùng, có thể làm giảm tỷ lệ chuyển đổi (Conversion Rate) do khách hàng nghĩ cửa hàng không có sản phẩm đó.

## 5. Kết luận và Khuyến nghị (Sign-off & Recommendation)

- **Trạng thái Release (Go/No-Go):** 🛑 **NO-GO (Chưa sẵn sàng)**
- **Khuyến nghị:** 
  - Đội Developer cần tập trung Fix gấp **BUG_02** trong phần Code Javascript ở trang `cart.js`.
  - Cần chỉnh sửa lại câu lệnh `SELECT ... WHERE name LIKE ...` ở phía API `/routes/products.js` để không bị phân biệt chữ hoa, chữ thường cho **BUG_01**.
  - Sau khi Developer xác nhận Fix xong 2 lỗi này, đội QA sẽ thực hiện Regression Test (Kiểm thử hồi quy). Nếu mọi thứ Passed, hệ thống sẽ chuyển sang trạng thái sẵn sàng Release (Go).
