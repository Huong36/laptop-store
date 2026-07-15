# KỊCH BẢN KIỂM THỬ (TEST CASES) - LAPTOP STORE

Tài liệu này chứa tập hợp các kịch bản kiểm thử (Test Cases) chi tiết cho ứng dụng e-commerce Laptop Store.
**Ghi chú:** Mã Test Case được đánh số thứ tự đơn giản từ `TC01` trở đi để dễ theo dõi.

## 1. Đăng ký & Đăng nhập (Authentication)

| Mã TC | Tiêu đề (Title) | Tiền điều kiện | Dữ liệu đầu vào (Input Data) | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | Đăng ký tài khoản thành công | Chưa đăng nhập | Username: `testuser1`<br>Email: `test1@gmail.com`<br>Pass: `123456` | 1. Mở popup Đăng ký.<br>2. Nhập thông tin hợp lệ.<br>3. Bấm Đăng ký. | Hệ thống thông báo thành công. Lưu token và tự động đăng nhập. |
| **TC02** | Đăng ký trùng tên đăng nhập/email | Đã có user `admin` | Username: `admin`<br>Email: `admin@gmail.com` | 1. Mở popup Đăng ký.<br>2. Nhập thông tin đã tồn tại.<br>3. Bấm Đăng ký. | Form báo lỗi: "Tên đăng nhập hoặc email đã tồn tại". Không tạo user mới. |
| **TC03** | Đăng nhập thành công | User hợp lệ tồn tại | Username: `admin`<br>Pass: `admin123` | 1. Mở popup Đăng nhập.<br>2. Nhập đúng tài khoản/mật khẩu.<br>3. Bấm Đăng nhập. | Đăng nhập thành công. Giao diện Header hiển thị tên user thay vì nút Đăng nhập. |
| **TC04** | Đăng nhập sai mật khẩu | User hợp lệ tồn tại | Username: `admin`<br>Pass: `sai_mat_khau` | 1. Mở popup Đăng nhập.<br>2. Nhập sai mật khẩu.<br>3. Bấm Đăng nhập. | Form báo lỗi đỏ: "Tên đăng nhập hoặc mật khẩu không đúng". |

## 2. Sản phẩm & Hiển thị (Products)

| Mã TC | Tiêu đề (Title) | Tiền điều kiện | Dữ liệu đầu vào (Input Data) | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC05** | Load trang chủ - Giao diện mặc định | Database đã seed data | Bỏ trống URL Parameter | 1. Truy cập trang chủ `/`. | Hiển thị đủ 3 mục: Sản phẩm nổi bật, Bán chạy nhất, và Tất cả sản phẩm. |
| **TC06** | Hiển thị "Best Seller" chính xác | Database có sản phẩm đã bán > 0 | N/A | 1. Cuộn đến mục "Bán chạy nhất".<br>2. So sánh danh sách với DB. | Danh sách được sort theo cột `sold` giảm dần, tối đa 8 sản phẩm. |
| **TC07** | Nhãn "Hết hàng" (Out of Stock) | Cố tình set `stock=0` cho SP ID=1 | N/A | 1. Tìm Sản phẩm ID=1 trên màn hình. | Hình ảnh mờ. Nút bấm biến thành "Hết hàng" và không click được. Có nhãn đỏ "Hết hàng". |
| **TC08** | Tìm kiếm sản phẩm theo tên | Sản phẩm có tên "Laptop ASUS" | Nhập từ khóa: `ASUS` | 1. Nhập từ khóa vào ô tìm kiếm.<br>2. Nhấn nút kính lúp. | Trả về danh sách chỉ chứa các sản phẩm có chữ "ASUS" trong tên. |

## 3. Đánh giá sản phẩm (Review & Rating)

| Mã TC | Tiêu đề (Title) | Tiền điều kiện | Dữ liệu đầu vào (Input Data) | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC09** | Chặn đánh giá khi chưa Đăng nhập | User chưa login | Số sao: `5`, Comment: `Test` | 1. Vào chi tiết sản phẩm bất kỳ.<br>2. Xem phần Đánh giá. | Không hiển thị Form đánh giá. Hiện dòng chữ "Vui lòng đăng nhập để viết đánh giá" kèm link. |
| **TC10** | Viết đánh giá thành công | Đã Login | Số sao: `4`, Comment: `Tốt!` | 1. Vào trang chi tiết sản phẩm.<br>2. Nhập số sao và comment.<br>3. Bấm Gửi. | Gửi thành công, Toast thông báo, reload lại trang và hiển thị review vừa viết. |
| **TC11** | Tính toán điểm trung bình sao | Sản phẩm có 2 đánh giá (5 sao và 3 sao) | N/A | 1. Vào chi tiết sản phẩm. | Khối tổng quan hiển thị 4.0/5 sao và Dựa trên 2 đánh giá. |

## 4. Giỏ hàng & Thanh toán (Cart & Checkout)

| Mã TC | Tiêu đề (Title) | Tiền điều kiện | Dữ liệu đầu vào (Input Data) | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC12** | Thêm sản phẩm vào giỏ hàng | Đã Login | Sản phẩm còn hàng | 1. Bấm nút "Thêm" trên Card SP.<br>2. Kiểm tra Badge Header. | Badge giỏ hàng nhảy số. Toast báo thành công. |
| **TC13** | Ngăn chặn thêm vượt quá Tồn kho (Add to cart) | SP có `stock=5` | Cố gắng bấm "Thêm" 6 lần | 1. Bấm "Thêm" liên tục vào cùng 1 SP. | Lần thứ 6 sẽ hiện Toast báo lỗi: "Vượt quá số lượng tồn kho". Giỏ hàng chỉ giữ đúng 5 cái. |
| **TC14** | Ngăn chặn thêm vượt quá Tồn kho (Cart page) | SP có `stock=5` | Nhập Input `qty=6` | 1. Vào trang Giỏ hàng.<br>2. Đổi số lượng thành 6. | Hiện Toast báo lỗi không đủ hàng. Số lượng tự lùi về 5. |
| **TC15** | Tính tổng tiền giỏ hàng | Giỏ có SP 10tr và SP Sale 15tr | N/A | 1. Vào Giỏ hàng.<br>2. Tính nhẩm tổng tiền. | Hiển thị chính xác 25,000,000đ. Giá Sale được ưu tiên dùng. |
| **TC16** | Đặt hàng thành công (COD) | Giỏ hàng có SP | Họ tên, SĐT, Địa chỉ đầy đủ | 1. Vào trang Thanh toán.<br>2. Nhập Form, Chọn COD.<br>3. Đặt hàng. | Chuyển sang màn hình Đặt hàng thành công (#Order ID). Giỏ hàng tự động bị làm trống. |
| **TC17** | Trừ Tồn kho và Tăng Lượt bán | Đã đặt hàng thành công | N/A | 1. Kiểm tra lại SP vừa mua ngoài trang chủ. | Số lượng Tồn kho (`stock`) giảm, số Lượt bán (`sold`) tăng đúng bằng số lượng đã mua. |
