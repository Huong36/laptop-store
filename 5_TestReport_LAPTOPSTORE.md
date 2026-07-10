# BÁO CÁO TỔNG KẾT KIỂM THỬ (TEST SUMMARY REPORT) - LAPTOP STORE

## 1. Mục đích
Tài liệu này tổng kết lại toàn bộ quá trình kiểm thử dự án phần mềm **Laptop Store**, cung cấp cái nhìn tổng quan về chất lượng sản phẩm cho các bên liên quan trước khi quyết định Release.

## 2. Thông tin chung
- **Dự án:** Hệ thống Website Thương mại điện tử Laptop Store.
- **Loại kiểm thử:** Manual Testing (Kiểm thử Hộp Đen).
- **Thời gian thực hiện:** 10/07/2026.
- **Người thực hiện:** Trần Xuân Hướng.

## 3. Tổng kết số liệu (Metrics)
| Hạng mục | Số lượng |
| :--- | :---: |
| Tổng số Kịch bản (Test Cases) đã thiết kế | 7 |
| Tổng số TC đã thực thi (Executed) | 7 |
| Tổng số TC Đạt (Passed) | 5 |
| Tổng số TC Lỗi (Failed) | 2 |
| **Tỷ lệ Pass (Pass Rate)** | **71.4%** |

## 4. Tóm tắt lỗi (Bug Summary)
Trong quá trình kiểm thử, phát hiện tổng cộng **02 Bug**, chi tiết bao gồm:

- **Mức độ Cao (High - Lỗi ảnh hưởng luồng nghiệp vụ):** 01 lỗi (Lỗi không hiện thông báo khi User chưa đăng nhập mà nhấn thêm vào giỏ - `BUG_001`).
- **Mức độ Trung bình (Medium - Lỗi giao diện, luồng cơ bản vẫn chạy):** 01 lỗi (Lỗi không tự động reset số lượng icon Giỏ hàng sau khi đặt hàng thành công - `BUG_002`).
- **Mức độ Thấp (Low/Cosmetic):** 0.

## 5. Đánh giá chất lượng & Khuyến nghị
- **Đánh giá chung:** Các chức năng cốt lõi (Đăng nhập, Hiển thị giá Sale, Giới hạn tồn kho khi thanh toán) đã hoạt động chính xác và ổn định ở phía Backend (API).
- **Vấn đề tồn đọng:** Frontend (UI) còn một số điểm chưa đồng bộ trạng thái kịp thời với Backend (như việc hiện thông báo lỗi và cập nhật DOM số lượng giỏ hàng).
- **Khuyến nghị:** Cần team Developer tiến hành fix 2 Bug trên (đặc biệt là `BUG_001` vì ảnh hưởng trải nghiệm User mới). Cần test hồi quy (Regression Test) lại toàn bộ tiến trình Mua hàng sau khi Developer fix xong trước khi triển khai chính thức.
