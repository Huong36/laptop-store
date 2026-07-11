# KỊCH BẢN KIỂM THỬ (TEST CASES) - LAPTOP STORE

Tài liệu này chứa tập hợp 50 kịch bản kiểm thử (Test Cases) chi tiết cho ứng dụng e-commerce Laptop Store, bao phủ toàn bộ các luồng chức năng quan trọng.

## 1. Module Đăng ký & Đăng nhập (Authentication)

| Mã TC | Mô tả Test Case | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Môi trường kiểm thử |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_AUTH_01** | Đăng ký thành công | Chưa có tài khoản | 1. Chọn Đăng ký.<br>2. Nhập thông tin hợp lệ.<br>3. Bấm Đăng ký. | Báo thành công, chuyển tới Đăng nhập. | Chrome / Win11 |
| **TC_AUTH_02** | Đăng ký trùng Email | Email đã tồn tại | 1. Nhập email đã có trong DB.<br>2. Bấm Đăng ký. | Báo lỗi "Email đã được sử dụng". | Chrome / Win11 |
| **TC_AUTH_03** | Đăng ký mật khẩu yếu | | 1. Nhập password < 6 ký tự.<br>2. Bấm Đăng ký. | Báo lỗi "Mật khẩu phải từ 6 ký tự". | Edge / Win10 |
| **TC_AUTH_04** | Đăng ký bỏ trống form | | 1. Để trống tất cả.<br>2. Bấm Đăng ký. | Báo lỗi yêu cầu điền đầy đủ. | Safari / macOS |
| **TC_AUTH_05** | Đăng nhập thành công | Tài khoản hợp lệ | 1. Nhập Username, Password.<br>2. Bấm Đăng nhập. | Lưu token, hiện tên User trên Header. | Chrome / Win11 |
| **TC_AUTH_06** | Đăng nhập sai Pass | Tài khoản hợp lệ | 1. Nhập sai Password.<br>2. Bấm Đăng nhập. | Báo "Sai tài khoản hoặc mật khẩu". | Firefox / Win11 |
| **TC_AUTH_07** | Đăng nhập sai User | User không tồn tại | 1. Nhập User ảo.<br>2. Bấm Đăng nhập. | Báo "Sai tài khoản hoặc mật khẩu". | Chrome / Win11 |
| **TC_AUTH_08** | Đăng nhập bỏ trống form| | 1. Không điền gì.<br>2. Bấm Đăng nhập. | Hiện cảnh báo Validation. | Edge / Win10 |
| **TC_AUTH_09** | Test SQL Injection cơ bản | | 1. Nhập User: `' OR 1=1--`.<br>2. Bấm Đăng nhập. | Bị chặn lại hoặc báo lỗi đăng nhập. | Chrome / Win11 |
| **TC_AUTH_10** | Đăng xuất | Đang đăng nhập | 1. Bấm nút Đăng xuất. | Xóa token, chuyển về trang chủ, hiện lại nút Đăng nhập. | Chrome / Win11 |

## 2. Module Sản phẩm & Danh mục (Product Display)

| Mã TC | Mô tả Test Case | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Môi trường kiểm thử |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_PROD_01** | Hiển thị sản phẩm Trang chủ | Có data sản phẩm | 1. Vào trang chủ. | Hiện danh sách sản phẩm nổi bật/mới nhất. | Chrome / Win11 |
| **TC_PROD_02** | Test Phân trang (Pagination) | DB có > 20 SP | 1. Kéo xuống cuối danh sách.<br>2. Bấm trang 2. | Load ra danh sách sản phẩm tiếp theo. | Edge / Win10 |
| **TC_PROD_03** | Hiển thị chi tiết Sản phẩm | | 1. Click vào 1 SP bất kỳ. | Hiện đủ tên, giá, thông số, ảnh, nút mua. | Safari / macOS |
| **TC_PROD_04** | Hiển thị Giá Sale | SP có `sale_price` | 1. Vào trang SP có khuyến mãi. | Giá gốc gạch ngang, giá Sale in đậm đỏ. | Chrome / Win11 |
| **TC_PROD_05** | SP hết hàng (Out of stock) | SP có `stock = 0` | 1. Vào xem SP hết hàng. | Hiện chữ "Hết hàng", mờ (disable) nút Thêm giỏ. | Firefox / Win11 |
| **TC_PROD_06** | Click ảnh Thumbnail | | 1. Ở trang chi tiết, click ảnh nhỏ. | Ảnh lớn thay đổi theo ảnh được click. | Chrome / Win11 |
| **TC_PROD_07** | Load chậm / Mất mạng | Ngắt kết nối mạng | 1. Refresh trang SP. | Hiện giao diện lỗi mạng hoặc loading Skeleton. | Chrome / Win11 |
| **TC_PROD_08** | Hiển thị SP theo Category | | 1. Click danh mục "Laptop Gaming". | Chỉ hiện các máy tính thuộc nhóm Gaming. | Edge / Win10 |
| **TC_PROD_09** | URL SP không hợp lệ | | 1. Sửa URL thành `/product/9999999`. | Hiện trang "404 Không tìm thấy". | Chrome / Win11 |
| **TC_PROD_10** | Hiển thị review/đánh giá | Có data review | 1. Cuộn tới phần Đánh giá. | Hiện đủ Comment, số sao. | Safari / macOS |

## 3. Module Tìm kiếm & Lọc (Search & Filter)

| Mã TC | Mô tả Test Case | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Môi trường kiểm thử |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_SRCH_01** | Tìm kiếm từ khóa đúng | SP tên "Macbook" | 1. Nhập "Macbook" vào ô tìm kiếm.<br>2. Enter. | Trả về danh sách các máy Macbook. | Chrome / Win11 |
| **TC_SRCH_02** | Tìm kiếm không dấu | SP tên "Đế tản nhiệt"| 1. Nhập "De tan nhiet".<br>2. Enter. | Vẫn trả về đúng SP. | Chrome / Win11 |
| **TC_SRCH_03** | Tìm không có kết quả | | 1. Nhập "qwertyuiop".<br>2. Enter. | Hiện thông báo "Không tìm thấy sản phẩm nào". | Edge / Win10 |
| **TC_SRCH_04** | Lọc theo mức giá | | 1. Chọn Lọc "Dưới 10 triệu". | Chỉ hiện SP có giá <= 10.000.000đ. | Chrome / Win11 |
| **TC_SRCH_05** | Lọc theo Hãng (Brand) | | 1. Chọn Hãng "Dell". | Chỉ hiện Laptop Dell. | Safari / macOS |
| **TC_SRCH_06** | Sắp xếp (Sort) giá tăng dần | | 1. Chọn Sort "Giá thấp -> cao". | SP rẻ nhất hiển thị đầu tiên. | Chrome / Win11 |
| **TC_SRCH_07** | Sắp xếp (Sort) giá giảm dần | | 1. Chọn Sort "Giá cao -> thấp". | SP đắt nhất hiển thị đầu tiên. | Firefox / Win11 |
| **TC_SRCH_08** | Tìm kiếm ký tự đặc biệt | | 1. Nhập "<script>alert(1)</script>". | Ký tự bị mã hóa, không dính lỗi XSS. | Chrome / Win11 |

## 4. Module Giỏ hàng (Cart)

| Mã TC | Mô tả Test Case | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Môi trường kiểm thử |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_CART_01** | Thêm mới 1 SP vào giỏ | Đã login | 1. Bấm "Thêm vào giỏ" 1 SP. | Badge giỏ hàng +1, báo thành công. | Chrome / Win11 |
| **TC_CART_02** | Thêm SP chưa đăng nhập | Chưa login | 1. Bấm "Thêm vào giỏ". | Yêu cầu Đăng nhập (Popup/Redirect). | Edge / Win10 |
| **TC_CART_03** | Cộng dồn số lượng | Giỏ đã có SP A | 1. Bấm "Thêm vào giỏ" SP A lần nữa. | Giỏ hàng không tạo dòng mới, Update Số lượng = 2. | Chrome / Win11 |
| **TC_CART_04** | Cập nhật SL trực tiếp ở Giỏ | | 1. Vào Giỏ, đổi SL SP A từ 1 sang 3. | Tổng tiền của SP A tự động update. | Safari / macOS |
| **TC_CART_05** | Nhập SL âm hoặc bằng 0 | | 1. Nhập SL = -5 hoặc 0. | Chặn nhập hoặc tự động đổi thành 1 (hoặc xóa SP nếu = 0). | Chrome / Win11 |
| **TC_CART_06** | Xóa 1 SP khỏi giỏ | Có >1 SP trong giỏ | 1. Bấm nút [Xóa] cạnh SP. | SP biến mất, Tổng tiền giỏ hàng giảm tương ứng. | Firefox / Win11 |
| **TC_CART_07** | Tính tổng tiền chính xác | Có nhiều SP | 1. Cộng tay giá * SL các món. | Tổng hiển thị bằng khớp với tính tay. | Chrome / Win11 |
| **TC_CART_08** | Tính giá SP Khuyến mãi | Giỏ có SP Sale | 1. Kiểm tra giá được cộng vào Tổng. | Phải cộng bằng giá `sale_price`, không cộng giá gốc. | Edge / Win10 |
| **TC_CART_09** | Xóa sạch giỏ hàng | | 1. Bấm "Xóa toàn bộ". | Giỏ trống, hiện thông báo "Giỏ hàng trống, hãy mua sắm". | Chrome / Win11 |
| **TC_CART_10** | Load lại trang giỏ hàng | | 1. Đang ở Giỏ, F5 trang. | Giỏ hàng vẫn giữ nguyên các món đã thêm (Dữ liệu từ DB). | Safari / macOS |

## 5. Module Đặt hàng & Thanh toán (Checkout)

| Mã TC | Mô tả Test Case | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Môi trường kiểm thử |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_CHK_01** | Đặt hàng hợp lệ (COD) | Giỏ có hàng, Stock đủ | 1. Vào Thanh toán.<br>2. Nhập form đủ.<br>3. Chọn COD.<br>4. Đặt. | Thành công, hiện trang Success. | Chrome / Win11 |
| **TC_CHK_02** | Bỏ trống Tên người nhận | | 1. Xóa Tên.<br>2. Đặt hàng. | Chặn đặt hàng, báo đỏ ô Tên. | Edge / Win10 |
| **TC_CHK_03** | Số điện thoại sai định dạng | | 1. Nhập SĐT "abc1234".<br>2. Đặt hàng. | Báo "Số điện thoại không hợp lệ". | Safari / macOS |
| **TC_CHK_04** | SL Mua > Tồn kho | SL mua = 20, Tồn kho = 5 | 1. Bấm Đặt hàng. | Báo lỗi Backend: "Sản phẩm A không đủ tồn kho". | Chrome / Win11 |
| **TC_CHK_05** | Đặt hàng giỏ trống | Giỏ hàng rỗng | 1. Ép chuyển hướng URL vào `/checkout`. | Redirect về trang chủ hoặc báo lỗi Giỏ trống. | Firefox / Win11 |
| **TC_CHK_06** | Trừ Stock sau khi mua | SP có stock=10 | 1. Đặt mua 1 món SP.<br>2. Check lại CSDL. | Stock của SP đó giảm xuống 9. | Chrome / Win11 |
| **TC_CHK_07** | Làm sạch giỏ sau khi mua | Đặt mua xong | 1. Quay lại trang Giỏ hàng. | Giỏ hàng trống, Badge = 0. | Chrome / Win11 |
| **TC_CHK_08** | Lưu lịch sử Order | Đặt mua xong | 1. Vào mục "Đơn hàng của tôi". | Thấy đơn vừa đặt trạng thái "Đang chờ xử lý". | Edge / Win10 |
| **TC_CHK_09** | Chọn PT thanh toán VNPay | (Giả lập) | 1. Chọn VNPay, bấm Đặt hàng. | Redirect sang cổng VNPay Dummy. | Chrome / Win11 |
| **TC_CHK_10** | Trạng thái Cancel thanh toán| Cổng VNPay | 1. Bấm "Hủy thanh toán". | Quay lại trang báo lỗi, đơn hàng có trạng thái "Đã hủy". | Safari / macOS |
| **TC_CHK_11** | Kiểm tra chi tiết đơn hàng | | 1. Click vào mã đơn hàng lịch sử. | Thấy đúng các sản phẩm, tổng tiền lúc đã mua. | Chrome / Win11 |
| **TC_CHK_12** | Tổng tiền hóa đơn > 0 | Đặt thành công | 1. Check lại DB bảng orders. | `total_amount` phải đúng, tuyệt đối không được âm. | Chrome / Win11 |
