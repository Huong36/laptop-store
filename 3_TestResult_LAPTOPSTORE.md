# KẾT QUẢ KIỂM THỬ (TEST RESULTS) - LAPTOP STORE

Bảng dưới đây ghi nhận kết quả thực thi kiểm thử (Test Execution) cho các kịch bản đã đề ra.
Ngày thực thi: 10/07/2026.
Người thực thi: Trần Xuân Hướng.

| Mã TC | Trạng thái (Status) | Kết quả thực tế (Actual Result) | Ghi chú |
| :--- | :---: | :--- | :--- |
| **TC_AUTH_01** | 🟢 PASS | Hệ thống báo đăng nhập thành công, token lưu vào LocalStorage, hiển thị tên user đúng với kỳ vọng. | Không có lỗi. |
| **TC_AUTH_02** | 🟢 PASS | Hiển thị cảnh báo "Sai tài khoản hoặc mật khẩu". | Hoạt động đúng yêu cầu. |
| **TC_CART_01** | 🟢 PASS | Badge giỏ hàng được cập nhật +1. Database `cart_items` có ghi nhận bản ghi mới. | API trả về 200 OK. |
| **TC_CART_02** | 🔴 FAIL | Hệ thống không hiện popup yêu cầu đăng nhập, thay vào đó API trả về lỗi 401 ngầm trong Network và không có phản hồi UI. | Đã log bug: `BUG_001`. Cần xử lý hiển thị lỗi phía Frontend. |
| **TC_CHK_01** | 🔴 FAIL | Đặt hàng thành công nhưng Badge giỏ hàng (số lượng) trên header không được reset về 0. | Đã log bug: `BUG_002`. |
| **TC_CHK_02** | 🟢 PASS | Backend bắt lỗi tồn kho thành công, transaction bị rollback. | Tốt. |
| **TC_PROD_01** | 🟢 PASS | Frontend tính toán giỏ hàng dựa trên giá `sale_price` đúng như mô tả. | Không có lỗi. |

## Tổng kết sơ bộ:
- **Tổng số TC thực thi:** 7
- **Số lượng PASS:** 5
- **Số lượng FAIL:** 2
- **Tỉ lệ Pass Rate:** ~71.4%
