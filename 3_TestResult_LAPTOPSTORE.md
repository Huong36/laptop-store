# KẾT QUẢ KIỂM THỬ (TEST EXECUTION RESULTS) - LAPTOP STORE

Tài liệu này ghi nhận kết quả thực thi của toàn bộ 50 Test Cases đã được lên kịch bản trong file `2_TestCases_LAPTOPSTORE.md`. 
Quá trình kiểm thử được thực hiện trên môi trường Localhost.

## 1. Tóm tắt kết quả (Summary)

- **Ngày thực hiện:** 15/07/2026
- **Người thực hiện:** Trần Xuân Hướng
- **Tổng số Test Cases:** 50
- **Số TC Passed:** 48
- **Số TC Failed:** 2
- **Tỷ lệ Pass (Pass Rate):** 96%

## 2. Kết quả chi tiết (Detailed Results)

| Mã TC | Phân hệ (Module) | Trạng thái | Ghi chú / Báo cáo Lỗi |
| :--- | :--- | :---: | :--- |
| **TC01 - TC06** | Đăng ký tài khoản | 🟢 PASS | Các tính năng đăng ký và Validate hoạt động chuẩn. |
| **TC07 - TC10** | Đăng nhập / Đăng xuất | 🟢 PASS | Session và token xử lý tốt. |
| **TC11 - TC20** | Sản phẩm & Danh mục | 🟢 PASS | Giao diện, Best Seller, và Out of Stock hiển thị đúng. |
| **TC21 - TC23** | Tìm kiếm | 🟢 PASS | Tìm có dấu và không dấu hoạt động ổn định. |
| **TC24** | Tìm kiếm chữ hoa/thường | 🔴 FAIL | Không tìm thấy nếu khác case. Xem **Bug_01**. |
| **TC25 - TC28** | Lọc và Sắp xếp | 🟢 PASS | Sort giá và Brand đúng đặc tả. |
| **TC29 - TC33** | Đánh giá (Review) | 🟢 PASS | Review cập nhật điểm trung bình real-time. |
| **TC34 - TC38** | Thêm Giỏ hàng & Tồn kho | 🟢 PASS | Chặn thêm quá kho hoạt động rất nhạy bén. |
| **TC39** | Nhập số lượng Âm/0 tại Giỏ | 🔴 FAIL | Input không chặn nhập số âm, gây lỗi tính tổng tiền âm. Xem **Bug_02**. |
| **TC40 - TC42** | Tính toán tổng tiền Giỏ hàng | 🟢 PASS | Xử lý tốt giá Sale và Giá gốc. |
| **TC43 - TC50** | Thanh toán (Checkout) | 🟢 PASS | Trừ Tồn kho, tăng Lượt bán (Sold) và lưu lịch sử chính xác. |

*(Chú ý: Các TC có trạng thái FAIL đã được log chi tiết sang file `4_BugReport_LAPTOPSTORE.md` để Developer theo dõi và xử lý).*
