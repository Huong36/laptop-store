# KẾ HOẠCH KIỂM THỬ (TEST PLAN) - LAPTOP STORE

## 1. Giới thiệu (Introduction)
Tài liệu này mô tả chi tiết chiến lược, phạm vi, nguồn lực và phương pháp kiểm thử cho hệ thống **Laptop Store** - website thương mại điện tử chuyên phân phối laptop và phụ kiện chính hãng.
Mục tiêu của quá trình kiểm thử là đảm bảo hệ thống hoạt động ổn định, các chức năng cốt lõi (Mua hàng, Giỏ hàng, Đánh giá, Quản lý tài khoản) hoạt động chính xác theo đúng tài liệu đặc tả, đồng thời mang lại trải nghiệm người dùng (UX) tốt nhất trước khi Release.

## 2. Phạm vi kiểm thử (Scope)

### 2.1. In-Scope (Trong phạm vi)
Quá trình kiểm thử sẽ tập trung vào các chức năng chính yếu sau:
- **Xác thực người dùng:** Đăng ký, Đăng nhập, Đăng xuất, Cập nhật thông tin cá nhân.
- **Sản phẩm & Danh mục:** Hiển thị danh sách sản phẩm, Phân trang, Hiển thị chi tiết sản phẩm, Nhãn Best Seller, Nhãn Hết hàng.
- **Tìm kiếm & Lọc:** Tìm kiếm theo từ khóa, lọc theo danh mục, sắp xếp (Giá tăng/giảm, Bán chạy nhất).
- **Giỏ hàng & Đặt hàng:** 
  - Thêm, sửa, xóa sản phẩm trong giỏ hàng.
  - Xử lý logic tồn kho (Cố tình mua vượt quá tồn kho).
  - Thanh toán (Checkout) phương thức COD.
- **Đánh giá & Nhận xét (Rating & Review):** Viết đánh giá, chấm điểm sao cho sản phẩm.
- **Tính nhất quán dữ liệu:** Đảm bảo dữ liệu hiển thị trên Frontend khớp với Backend (Database SQLite).
- **Giao diện (UI):** Kiểm tra hiển thị trên màn hình Desktop.

### 2.2. Out-of-Scope (Ngoài phạm vi)
Các hạng mục sau sẽ **KHÔNG** được kiểm thử trong giai đoạn này:
- Kiểm thử tải, hiệu năng và chịu tải (Load/Performance/Stress Testing).
- Kiểm thử bảo mật chuyên sâu (Security Penetration Testing).
- Tích hợp cổng thanh toán bên thứ ba (VNPay, Momo) - chỉ kiểm thử giả lập giao diện.
- Trải nghiệm đa thiết bị (Responsive Mobile/Tablet Testing).

## 3. Chiến lược kiểm thử (Test Strategy)

### 3.1. Phương pháp tiếp cận (Approach)
- Áp dụng phương pháp **Kiểm thử hộp đen (Black-box Testing)**: Đóng vai trò là End-user để thực hiện các thao tác trên giao diện, không can thiệp vào Source Code.
- Kiểm thử tập trung vào **User Flow** (Luồng người dùng) từ khi vào trang chủ cho đến khi đặt hàng thành công.

### 3.2. Các mức độ & loại kiểm thử (Testing Types)
- **Functional Testing (Kiểm thử chức năng):** Xác minh tất cả các tính năng hoạt động theo đúng Business Logic.
- **UI/UX Testing (Kiểm thử giao diện):** Xác minh hiển thị bố cục, màu sắc, font chữ và tính tương tác của các thành phần (Button, Input, Badge).
- **Negative Testing:** Nhập dữ liệu sai, dữ liệu bất hợp lệ để kiểm tra hệ thống báo lỗi có đúng chuẩn hay không.
- **Regression Testing (Kiểm thử hồi quy):** Chạy lại toàn bộ kịch bản sau khi Developer fix bug để đảm bảo không sinh ra lỗi mới.

## 4. Môi trường kiểm thử (Test Environment)
- **Môi trường:** Localhost (Môi trường dev cục bộ).
- **Hệ điều hành:** Windows 10/11.
- **Trình duyệt (Browsers):** Google Chrome (phiên bản mới nhất), Microsoft Edge.
- **Database:** SQLite (Sử dụng dữ liệu seed sẵn có).
- **Công cụ hỗ trợ:** 
  - Chrome Developer Tools (F12): Bắt HTTP Request, kiểm tra giao diện, check Console log.
  - Công cụ ghi log và chụp màn hình: Snipping Tool, Lightshot.

## 5. Rủi ro & Chiến lược giảm thiểu (Risks & Mitigations)

| Rủi ro (Risk) | Mức độ | Biện pháp giảm thiểu (Mitigation) |
| :--- | :---: | :--- |
| Dữ liệu tồn kho bị sai lệch khi có 2 người cùng đặt hàng (Race Condition). | Cao | Kiểm thử kỹ API cập nhật giỏ hàng và thanh toán. Developer cần lock database khi thanh toán. |
| Môi trường Localhost không phản ánh đúng môi trường thực tế (Server thật). | Trung bình | Yêu cầu thiết lập môi trường Staging giống Production để test vòng cuối (UAT). |
| Thời gian kiểm thử bị rút ngắn do Developer bàn giao code trễ. | Cao | Đánh độ ưu tiên (Priority) cho Test Case. Tập trung test các luồng chính (Happy path) và chức năng Thanh toán trước. |

## 6. Tiêu chí chấp nhận & Dừng kiểm thử

### 6.1. Tiêu chí bắt đầu (Entry Criteria)
- Toàn bộ source code Frontend và Backend đã được deploy lên môi trường Test.
- Database đã được seed data hợp lệ (bao gồm sản phẩm có tồn kho ngẫu nhiên).
- Tài liệu Test Plan, Test Cases đã được review và phê duyệt.

### 6.2. Tiêu chí hoàn thành (Exit Criteria)
- Đã thực thi 100% Test Cases thuộc nhóm chức năng cốt lõi (Core Features).
- Toàn bộ Bug ở mức độ Nghiêm trọng (Critical) và Cao (High) đã được Developer fix và test lại thành công (Verified).
- Tỉ lệ Pass của Test Cases đạt tối thiểu 95%.
