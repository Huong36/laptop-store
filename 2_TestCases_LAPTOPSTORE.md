# KỊCH BẢN KIỂM THỬ (TEST CASES) - LAPTOP STORE

Dưới đây là các kịch bản kiểm thử (Test Cases) dành cho các luồng chức năng cốt lõi của ứng dụng Laptop Store.

| Mã TC | Chức Năng | Tóm tắt Test Case (Mô tả) | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_AUTH_01** | Đăng nhập | Đăng nhập thành công với tài khoản hợp lệ | User đã có tài khoản (vd: admin/admin) | 1. Truy cập trang chủ.<br>2. Nhấn nút Đăng nhập.<br>3. Nhập Username hợp lệ.<br>4. Nhập Password hợp lệ.<br>5. Nhấn Đăng nhập. | Hệ thống báo thành công, token được lưu vào LocalStorage, ẩn modal đăng nhập, hiển thị tên user. |
| **TC_AUTH_02** | Đăng nhập | Đăng nhập thất bại với sai mật khẩu | User đã có tài khoản | 1. Nhấn nút Đăng nhập.<br>2. Nhập Username hợp lệ.<br>3. Nhập Password sai.<br>4. Nhấn Đăng nhập. | Hệ thống báo lỗi "Sai tài khoản hoặc mật khẩu", không cho phép đăng nhập. |
| **TC_CART_01** | Giỏ hàng | Thêm sản phẩm vào giỏ hàng thành công | Đã đăng nhập, chọn 1 sản phẩm có sẵn | 1. Vào trang chi tiết sản phẩm.<br>2. Nhấn nút "Thêm vào giỏ". | Badge (số lượng) trên icon giỏ hàng tăng thêm 1. Hệ thống lưu thành công vào Database (cart_items). |
| **TC_CART_02** | Giỏ hàng | Hệ thống yêu cầu đăng nhập khi thêm giỏ hàng (nếu chưa đăng nhập) | Chưa đăng nhập | 1. Nhấn "Thêm vào giỏ" ở bất kỳ sản phẩm nào. | Hệ thống chặn lại, hiển thị popup yêu cầu Đăng nhập. |
| **TC_CHK_01** | Thanh toán | Đặt hàng thành công với số lượng nhỏ hơn Tồn kho (Stock) | Đã đăng nhập, giỏ hàng có 1 sản phẩm (SL: 1), Tồn kho: 10 | 1. Vào trang Giỏ hàng.<br>2. Nhấn nút "Thanh toán".<br>3. Điền thông tin giao hàng.<br>4. Bấm "Đặt hàng". | Đặt hàng thành công, chuyển hướng đến trang `/order-success`. Tồn kho bị trừ 1, Giỏ hàng reset về 0. |
| **TC_CHK_02** | Thanh toán | Đặt hàng thất bại khi số lượng mua vượt quá Tồn kho (Stock) | Đã đăng nhập, giỏ có sản phẩm A (SL: 20), Tồn kho thực tế: 5 | 1. Vào trang Giỏ hàng.<br>2. Nhấn "Thanh toán".<br>3. Bấm "Đặt hàng". | Hệ thống báo lỗi "Số lượng sản phẩm vượt quá tồn kho", không tạo đơn hàng. |
| **TC_PROD_01** | Sản phẩm | Mức giá tính toán đúng khi sản phẩm có Sale Price | Đang ở trang danh sách sản phẩm | 1. Tìm sản phẩm có `sale_price` > 0.<br>2. Kiểm tra giá hiển thị. | Hiển thị giá Sale nổi bật, giá gốc bị gạch ngang. Nếu mua, hệ thống tính tiền theo giá Sale. |
