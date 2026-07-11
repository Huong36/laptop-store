# BÁO CÁO TỔNG KẾT KIỂM THỬ (TEST SUMMARY REPORT) - LAPTOP STORE

## 1. Mục đích
Tài liệu này tổng kết lại toàn bộ quá trình kiểm thử thực hành trên dự án cá nhân **Laptop Store**. Mục đích nhằm đánh giá chất lượng tổng thể của ứng dụng, đồng thời ghi nhận lại kết quả thực hành quy trình Manual Testing.

## 2. Thông tin chung
- **Dự án:** Laptop Store (Personal Practice Project).
- **Loại kiểm thử:** Manual Testing (Kiểm thử Hộp Đen).
- **Thời gian thực hiện:** 10/07/2026.
- **Người thực hiện:** Trần Xuân Hướng.
- **Môi trường kiểm thử (Test Environments):**
  - **Trình duyệt:** Google Chrome (v114), Microsoft Edge, Mozilla Firefox, Safari.
  - **Hệ điều hành:** Windows 11, Windows 10, macOS.
  - **Đường truyền (Network):** 4G, Wifi cáp quang, Giả lập Slow 3G (DevTools).

## 3. Tổng kết số liệu (Metrics)
| Hạng mục | Số lượng |
| :--- | :---: |
| Tổng số Kịch bản (Test Cases) đã thiết kế | 50 |
| Tổng số TC đã thực thi (Executed) | 50 |
| Tổng số TC Đạt (Passed) | 44 |
| Tổng số TC Lỗi (Failed) | 6 |
| **Tỷ lệ Pass (Pass Rate)** | **88.0%** |

## 4. Tóm tắt lỗi (Bug Summary)
Trong quá trình chạy 50 Test Cases, phát hiện tổng cộng **06 Bug**, phân bổ theo mức độ nghiêm trọng như sau:

- **Critical (Lỗi bảo mật/hệ thống nghiêm trọng):** 01 lỗi (`BUG_001` - SQL Injection).
- **High (Lỗi ảnh hưởng luồng nghiệp vụ chính/Bảo mật frontend):** 03 lỗi (`BUG_003` - XSS, `BUG_004` - Thiếu chặn Giỏ hàng, `BUG_005` - Cho phép nhập số lượng âm).
- **Medium (Lỗi giao diện, luồng cơ bản vẫn chạy nhưng gây khó chịu):** 01 lỗi (`BUG_002` - Mạng chậm bị trắng trang).
- **Low (Lỗi hiển thị nhỏ):** 01 lỗi (`BUG_006` - Lỗi text icon badge không reset).

## 5. Đánh giá chất lượng & Khuyến nghị
- **Đánh giá chung:** Tỷ lệ Pass đạt 88%, cho thấy hệ thống đã đáp ứng được các luồng mua bán cơ bản (Hiển thị sản phẩm, Thêm giỏ hàng chuẩn, Thanh toán COD trừ tồn kho). Tuy nhiên, hệ thống đang tồn đọng các lỗ hổng bảo mật sơ đẳng (SQL Injection, XSS) và thiếu validate dữ liệu từ Frontend (nhập số lượng âm).
- **Khuyến nghị:** 
  1. Yêu cầu lập trình viên (Developer) ưu tiên xử lý ngay các lỗi Security (BUG_001, BUG_003) và lỗi logic tính tiền (BUG_005).
  2. Bổ sung Parameterized Query ở Backend để chống SQLi.
  3. Sau khi Developer fix xong 6 lỗi này, tiến hành Kiểm thử hồi quy (Regression Testing) toàn bộ hệ thống trước khi nghiệm thu dự án.
