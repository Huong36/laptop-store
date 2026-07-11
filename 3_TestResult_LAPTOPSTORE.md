# KẾT QUẢ KIỂM THỬ (TEST RESULTS) - LAPTOP STORE

Bảng ghi nhận kết quả thực thi kiểm thử (Test Execution) cho toàn bộ 50 kịch bản chức năng.
Ngày thực thi: 10/07/2026. | Người thực thi: Trần Xuân Hướng.

| Mã TC | Trạng thái | Môi trường kiểm thử | Kết quả thực tế (Actual Result) / Ghi chú |
| :--- | :---: | :--- | :--- |
| **TC_AUTH_01** | 🟢 PASS | Chrome / Win11 | Đăng ký thành công, hoạt động như mong đợi. |
| **TC_AUTH_02** | 🟢 PASS | Chrome / Win11 | Hiện báo lỗi email đã tồn tại. |
| **TC_AUTH_03** | 🟢 PASS | Edge / Win10 | Yêu cầu mật khẩu > 6 ký tự. |
| **TC_AUTH_04** | 🟢 PASS | Safari / macOS | Validation Frontend hoạt động tốt. |
| **TC_AUTH_05** | 🟢 PASS | Chrome / Win11 | Đăng nhập thành công, hiện Tên. |
| **TC_AUTH_06** | 🟢 PASS | Firefox / Win11 | Hiện lỗi "Sai thông tin". |
| **TC_AUTH_07** | 🟢 PASS | Chrome / Win11 | Báo lỗi chuẩn xác. |
| **TC_AUTH_08** | 🟢 PASS | Edge / Win10 | Không cho phép Submit form. |
| **TC_AUTH_09** | 🔴 FAIL | Chrome / Win11 | **(Bug_001)** Nhập `' OR 1=1--` vẫn đăng nhập được vào tải khoản đầu tiên trong bảng Users (Lỗi SQL Injection). |
| **TC_AUTH_10** | 🟢 PASS | Chrome / Win11 | Đăng xuất thành công, mất token. |
| **TC_PROD_01** | 🟢 PASS | Chrome / Win11 | Load danh sách sản phẩm nhanh. |
| **TC_PROD_02** | 🟢 PASS | Edge / Win10 | Tính năng phân trang hoạt động bình thường. |
| **TC_PROD_03** | 🟢 PASS | Safari / macOS | UI hiển thị đủ thông tin. |
| **TC_PROD_04** | 🟢 PASS | Chrome / Win11 | Giá sale đỏ, gạch giá cũ đúng yêu cầu. |
| **TC_PROD_05** | 🟢 PASS | Firefox / Win11 | Disable nút thêm giỏ thành công. |
| **TC_PROD_06** | 🟢 PASS | Chrome / Win11 | Ảnh Thumbnail chuyển động mượt. |
| **TC_PROD_07** | 🔴 FAIL | Chrome / Win11 | **(Bug_002)** Khi Load chậm, giao diện bị vỡ (Trắng trang) thay vì hiện thẻ Skeleton Loading. |
| **TC_PROD_08** | 🟢 PASS | Edge / Win10 | Lọc danh mục hoạt động đúng. |
| **TC_PROD_09** | 🟢 PASS | Chrome / Win11 | Trả về page 404 Not Found. |
| **TC_PROD_10** | 🟢 PASS | Safari / macOS | UI Review dễ nhìn. |
| **TC_SRCH_01** | 🟢 PASS | Chrome / Win11 | Ra kết quả đúng "Macbook". |
| **TC_SRCH_02** | 🟢 PASS | Chrome / Win11 | Hỗ trợ tìm tiếng Việt không dấu chuẩn xác. |
| **TC_SRCH_03** | 🟢 PASS | Edge / Win10 | Báo "Không tìm thấy". |
| **TC_SRCH_04** | 🟢 PASS | Chrome / Win11 | Lọc giá trả đúng data. |
| **TC_SRCH_05** | 🟢 PASS | Safari / macOS | Lọc Hãng (Brand) đúng data. |
| **TC_SRCH_06** | 🟢 PASS | Chrome / Win11 | Sort giá tăng dần đúng logic. |
| **TC_SRCH_07** | 🟢 PASS | Firefox / Win11 | Sort giá giảm dần đúng logic. |
| **TC_SRCH_08** | 🔴 FAIL | Chrome / Win11 | **(Bug_003)** Ký tự Script không được mã hóa, popup Alert hiện lên màn hình (Lỗi XSS bảo mật Frontend). |
| **TC_CART_01** | 🟢 PASS | Chrome / Win11 | Thêm giỏ thành công, Badge + 1. |
| **TC_CART_02** | 🔴 FAIL | Edge / Win10 | **(Bug_004)** Bấm Thêm vào giỏ khi chưa Đăng nhập không hiện Popup, API ngầm báo lỗi 401 nhưng UI không phản hồi. |
| **TC_CART_03** | 🟢 PASS | Chrome / Win11 | Số lượng tự update = 2. |
| **TC_CART_04** | 🟢 PASS | Safari / macOS | Update giá khi đổi số lượng. |
| **TC_CART_05** | 🔴 FAIL | Chrome / Win11 | **(Bug_005)** Hệ thống cho phép nhập Số lượng = -5, khiến Tổng tiền giỏ hàng bị âm (-). |
| **TC_CART_06** | 🟢 PASS | Firefox / Win11 | Bấm Xóa tự động mất Row và trừ tiền. |
| **TC_CART_07** | 🟢 PASS | Chrome / Win11 | Tính toán tổng chuẩn. |
| **TC_CART_08** | 🟢 PASS | Edge / Win10 | Ưu tiên giá Sale Price là đúng. |
| **TC_CART_09** | 🟢 PASS | Chrome / Win11 | Nút Clear All hoạt động tốt. |
| **TC_CART_10** | 🟢 PASS | Safari / macOS | F5 không bị mất giỏ hàng. |
| **TC_CHK_01** | 🟢 PASS | Chrome / Win11 | Đặt hàng COD trơn tru. |
| **TC_CHK_02** | 🟢 PASS | Edge / Win10 | Form check rỗng bắt tốt. |
| **TC_CHK_03** | 🟢 PASS | Safari / macOS | SĐT Validate bằng Regex chạy chuẩn. |
| **TC_CHK_04** | 🟢 PASS | Chrome / Win11 | Backend check tồn kho và chặn thành công. |
| **TC_CHK_05** | 🟢 PASS | Firefox / Win11 | Giỏ rỗng Redirect về Home. |
| **TC_CHK_06** | 🟢 PASS | Chrome / Win11 | DB Trừ đúng số lượng Stock. |
| **TC_CHK_07** | 🔴 FAIL | Chrome / Win11 | **(Bug_006)** Thanh toán xong, DB đã xóa giỏ hàng nhưng Icon Badge trên Header vẫn giữ nguyên số lượng cũ, không reset về 0. |
| **TC_CHK_08** | 🟢 PASS | Edge / Win10 | Lịch sử đơn hàng ghi nhận đủ. |
| **TC_CHK_09** | 🟢 PASS | Chrome / Win11 | Gọi Redirect sang form Fake VNPay. |
| **TC_CHK_10** | 🟢 PASS | Safari / macOS | Đơn hủy đổi status đúng. |
| **TC_CHK_11** | 🟢 PASS | Chrome / Win11 | Trang chi tiết lịch sử hiển thị đủ SP. |
| **TC_CHK_12** | 🟢 PASS | Chrome / Win11 | Total_amount > 0 hợp lệ. |

## Tổng kết kết quả (Summary)
- **Tổng số TCs:** 50
- **Số lượng PASS:** 44 (88%)
- **Số lượng FAIL:** 6 (12%)
