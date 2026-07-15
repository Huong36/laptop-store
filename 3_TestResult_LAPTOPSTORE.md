# KẾT QUẢ KIỂM THỬ (TEST EXECUTION RESULTS) - LAPTOP STORE

Tài liệu này ghi nhận kết quả thực thi của toàn bộ các Test Cases đã được lên kịch bản trong file `2_TestCases_LAPTOPSTORE.md`. 
Quá trình kiểm thử được thực hiện trên môi trường Localhost (Database có tích hợp ngẫu nhiên tồn kho và 15% hết hàng).

## 1. Tóm tắt kết quả (Summary)

- **Ngày thực hiện:** 15/07/2026
- **Người thực hiện:** Tester
- **Tổng số Test Cases:** 17
- **Số TC Passed:** 15
- **Số TC Failed:** 2
- **Tỷ lệ Pass (Pass Rate):** 88.2%

## 2. Kết quả chi tiết (Detailed Results)

| Mã TC | Tiêu đề Test Case | Phân hệ (Module) | Kết quả (Status) | Người Test (Tester) | Ghi chú / Lỗi (nếu có) |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **TC01** | Đăng ký tài khoản thành công | Authentication | 🟢 PASS | Tester | Hoạt động đúng đặc tả. |
| **TC02** | Đăng ký trùng tên đăng nhập/email | Authentication | 🟢 PASS | Tester | Báo lỗi chuẩn. |
| **TC03** | Đăng nhập thành công | Authentication | 🟢 PASS | Tester | Trạng thái Login được giữ nguyên sau khi F5. |
| **TC04** | Đăng nhập sai mật khẩu | Authentication | 🟢 PASS | Tester | |
| **TC05** | Load trang chủ - Giao diện mặc định | Products | 🟢 PASS | Tester | Màn hình tải nhanh, không bị treo. |
| **TC06** | Hiển thị "Best Seller" chính xác | Products | 🟢 PASS | Tester | Các sản phẩm bán chạy nhất được sắp xếp đúng theo số lượng `sold`. |
| **TC07** | Nhãn "Hết hàng" (Out of Stock) | Products | 🟢 PASS | Tester | Nút "Thêm" đã bị disable và có nhãn đỏ chính xác. |
| **TC08** | Tìm kiếm sản phẩm theo tên | Products | 🔴 FAIL | Tester | Gõ tên không dấu (VD: "asus") không tìm được "ASUS" nếu chữ hoa/chữ thường khác biệt. Xem **Bug 01**. |
| **TC09** | Chặn đánh giá khi chưa Đăng nhập | Review | 🟢 PASS | Tester | Chặn đúng yêu cầu. |
| **TC10** | Viết đánh giá thành công | Review | 🟢 PASS | Tester | |
| **TC11** | Tính toán điểm trung bình sao | Review | 🟢 PASS | Tester | Tính trung bình cộng chính xác. |
| **TC12** | Thêm sản phẩm vào giỏ hàng | Cart | 🟢 PASS | Tester | |
| **TC13** | Ngăn chặn thêm vượt quá Tồn kho (Add to cart) | Cart | 🟢 PASS | Tester | Đã fix triệt để. Toast hiển thị cảnh báo rất nhạy. |
| **TC14** | Ngăn chặn thêm vượt quá Tồn kho (Cart page) | Cart | 🔴 FAIL | Tester | Nhập trực tiếp số âm (-5) vào thẻ input ở Giỏ hàng khiến tổng tiền bị âm. Xem **Bug 02**. |
| **TC15** | Tính tổng tiền giỏ hàng | Cart | 🟢 PASS | Tester | Toán tử cộng giá đúng cho cả hàng giảm giá. |
| **TC16** | Đặt hàng thành công (COD) | Checkout | 🟢 PASS | Tester | Xóa sạch giỏ sau khi Checkout. |
| **TC17** | Trừ Tồn kho và Tăng Lượt bán | Checkout | 🟢 PASS | Tester | Kiểm tra database cho thấy `stock` trừ đi và `sold` cộng thêm chính xác. |

*(Chú ý: Các TC có trạng thái FAIL đã được log sang file `4_BugReport_LAPTOPSTORE.md` để Developer theo dõi và xử lý).*
