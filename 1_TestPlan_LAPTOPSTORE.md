# KẾ HOẠCH KIỂM THỬ (TEST PLAN) - LAPTOP STORE

## 1. Giới thiệu
Tài liệu này mô tả chi tiết chiến lược, phạm vi và phương pháp kiểm thử cho hệ thống **Laptop Store** - một website thương mại điện tử chuyên cung cấp các sản phẩm máy tính xách tay.
Mục tiêu là đảm bảo chất lượng, tính ổn định và trải nghiệm người dùng (UX) cho các luồng chức năng quan trọng trước khi đưa vào sử dụng thực tế.

## 2. Phạm vi kiểm thử (Scope)
### 2.1. In-Scope (Trong phạm vi)
- Chức năng Đăng ký / Đăng nhập.
- Hiển thị danh sách sản phẩm và phân trang.
- Chức năng thêm sản phẩm vào giỏ hàng (Check tồn kho).
- Chức năng Đặt hàng (Checkout).
- Kiểm tra tính nhất quán dữ liệu giữa Frontend và Backend (Database SQLite).
- Kiểm thử giao diện (UI) cơ bản trên độ phân giải màn hình Desktop.

### 2.2. Out-of-Scope (Ngoài phạm vi)
- Kiểm thử tải / hiệu năng (Load/Performance Testing).
- Kiểm thử bảo mật chuyên sâu (Security Penetration Testing).
- Tích hợp cổng thanh toán bên thứ ba (VNPay, Momo) - chỉ test giả lập (Mock).
- Responsive trên thiết bị di động (Mobile).

## 3. Chiến lược kiểm thử (Test Strategy)
- **Phương pháp tiếp cận:** Kiểm thử hộp đen (Black-box Testing). Dựa hoàn toàn vào luồng người dùng (User Flow) và tài liệu API.
- **Loại kiểm thử:**
  - Functional Testing (Kiểm thử chức năng).
  - UI/UX Testing (Kiểm thử giao diện).
  - Regression Testing (Kiểm thử hồi quy - sau khi fix bug).

## 4. Môi trường kiểm thử (Test Environment)
- **OS:** Windows 10/11
- **Trình duyệt (Browsers):** Google Chrome (phiên bản mới nhất), Microsoft Edge.
- **Mạng (Network):** Môi trường Localhost (Database SQLite cục bộ).
- **Công cụ hỗ trợ:** 
  - Trình duyệt Developer Tools (F12) để kiểm tra Network & Console.
  - Công cụ quản lý Test Case: Markdown/Excel.

## 5. Tiêu chí chấp nhận & Dừng kiểm thử
- **Tiêu chí bắt đầu (Entry Criteria):** Đã có Source Code backend/frontend đầy đủ, Database mẫu đã được seed data.
- **Tiêu chí hoàn thành (Exit Criteria):** 
  - 100% Test Case chức năng cốt lõi đã được thực thi.
  - Không còn Bug mức độ Nghiêm trọng (Critical) hoặc Cao (High) nào chưa được xử lý.
