# KỊCH BẢN KIỂM THỬ (TEST CASES) - LAPTOP STORE

Tài liệu này chứa tập hợp 50 kịch bản kiểm thử (Test Cases) chi tiết cho ứng dụng e-commerce Laptop Store, bao phủ toàn bộ các luồng chức năng quan trọng.

## 1. Module Đăng ký & Đăng nhập (Authentication)

| Mã TC | Tiêu đề Test Case | Dữ liệu đầu vào (Input) | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | Đăng ký thành công | Username: user1, Pass: 123456, Email: a@a.com | Nhập đủ thông tin hợp lệ -> Bấm Đăng ký. | Báo thành công, tự động Đăng nhập. |
| **TC02** | Đăng ký trùng tên đăng nhập | Username: admin | Nhập username đã tồn tại -> Đăng ký. | Báo lỗi "Tên đăng nhập hoặc email đã tồn tại". |
| **TC03** | Đăng ký trùng email | Email: admin@gmail.com | Nhập email đã tồn tại -> Đăng ký. | Báo lỗi "Tên đăng nhập hoặc email đã tồn tại". |
| **TC04** | Đăng ký Username quá ngắn | Username: a | Nhập username < 3 ký tự -> Đăng ký. | Báo lỗi "Tên đăng nhập phải có ít nhất 3 ký tự". |
| **TC05** | Đăng ký Password quá ngắn | Pass: 123 | Nhập password < 6 ký tự -> Đăng ký. | Báo lỗi "Mật khẩu phải có ít nhất 6 ký tự". |
| **TC06** | Đăng ký bỏ trống form | (Để trống) | Bỏ trống tất cả các ô -> Đăng ký. | HTML5 Validation chặn lại, yêu cầu nhập dữ liệu. |
| **TC07** | Đăng nhập thành công | Username: admin, Pass: admin123 | Nhập đúng thông tin -> Đăng nhập. | Thành công, hiện tên người dùng trên Header. |
| **TC08** | Đăng nhập sai User | Username: sai_user | Nhập User không tồn tại -> Đăng nhập. | Báo lỗi "Tên đăng nhập hoặc mật khẩu không đúng". |
| **TC09** | Đăng nhập sai Password | Pass: sai_pass | Nhập Pass sai -> Đăng nhập. | Báo lỗi "Tên đăng nhập hoặc mật khẩu không đúng". |
| **TC10** | Đăng xuất (Logout) | Đang Login | Click vào Tên User trên header -> Đăng xuất. | Xóa session/token, quay về trạng thái chưa đăng nhập. |

## 2. Module Sản phẩm & Hiển thị (Products)

| Mã TC | Tiêu đề Test Case | Dữ liệu đầu vào (Input) | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- |
| **TC11** | Hiển thị Sản phẩm Trang chủ | Trang chủ | Truy cập trang chủ `/` | Hiện danh sách SP nổi bật, Best Seller, và Tất cả SP. |
| **TC12** | Hiển thị "Bán chạy nhất" (Best Seller) | Mục Bán chạy | So sánh thứ tự hiển thị | SP có `sold` cao nhất hiển thị đầu tiên, tối đa 8 SP. |
| **TC13** | Load danh sách SP theo phân trang | Kéo xuống cuối trang | Click xem thêm hoặc lướt xuống. | Load tiếp danh sách SP tiếp theo. |
| **TC14** | Hiển thị chi tiết SP | Click 1 SP bất kỳ | Chọn SP từ trang chủ. | Hiện đủ Thông tin, Cấu hình, Giá, Ảnh, Review. |
| **TC15** | Hiển thị Giá khuyến mãi | SP có Sale | Xem SP có giá sale_price > 0. | Giá gốc bị gạch ngang, Giá sale nổi bật. |
| **TC16** | Click thay đổi ảnh Thumbnail | SP có nhiều ảnh | Click vào các ảnh nhỏ ở trang chi tiết. | Ảnh lớn thay đổi tương ứng theo ảnh nhỏ. |
| **TC17** | Hiển thị SP "Hết hàng" (Out of Stock) | SP có stock = 0 | Xem SP hết hàng trên danh sách/chi tiết. | Nhãn đỏ "Hết hàng", nút "Thêm vào giỏ" bị vô hiệu hóa. |
| **TC18** | Xem danh mục "Laptop" | Header menu | Click danh mục "Laptop". | Chỉ hiển thị các SP thuộc danh mục Laptop. |
| **TC19** | Xem danh mục "Phụ kiện" | Header menu | Click danh mục Phụ kiện (Chuột, Phím...). | Chỉ hiển thị các SP đúng loại phụ kiện tương ứng. |
| **TC20** | Xử lý URL Sản phẩm sai | URL: `/product/999` | Gõ ID không tồn tại trên URL. | Hiển thị thông báo "Không tìm thấy sản phẩm" / 404. |

## 3. Module Tìm kiếm & Lọc (Search & Filter)

| Mã TC | Tiêu đề Test Case | Dữ liệu đầu vào (Input) | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- |
| **TC21** | Tìm kiếm chính xác có kết quả | Từ khóa: `Dell` | Nhập "Dell" -> Bấm tìm. | Danh sách trả về chỉ chứa laptop Dell. |
| **TC22** | Tìm kiếm không có kết quả | Từ khóa: `xyz123` | Nhập "xyz123" -> Bấm tìm. | Hiển thị "Không tìm thấy sản phẩm nào". |
| **TC23** | Tìm kiếm không dấu | Từ khóa: `De tan nhiet` | Nhập từ khóa không dấu. | Trả về đúng SP có tên "Đế tản nhiệt". |
| **TC24** | Tìm kiếm chữ hoa chữ thường | Từ khóa: `aSuS` | Nhập từ khóa sai case. | (Cần Fix) Hiện tại báo lỗi không tìm thấy (BUG_01). |
| **TC25** | Lọc theo mức giá "Dưới 10 triệu" | Filter Giá | Chọn khoảng giá < 10tr. | Trả về SP có giá <= 10.000.000đ. |
| **TC26** | Lọc theo Hãng (Brand) | Filter Hãng | Chọn Hãng "ASUS". | Trả về SP của ASUS. |
| **TC27** | Sắp xếp: Giá thấp đến cao | Sort | Chọn Giá tăng dần. | SP rẻ nhất đứng đầu danh sách. |
| **TC28** | Sắp xếp: Giá cao đến thấp | Sort | Chọn Giá giảm dần. | SP đắt nhất đứng đầu danh sách. |

## 4. Module Đánh giá Sản phẩm (Review & Rating)

| Mã TC | Tiêu đề Test Case | Dữ liệu đầu vào (Input) | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- |
| **TC29** | Đánh giá khi chưa Đăng nhập | (Chưa Login) | Xem phần Review ở chi tiết SP. | Không hiện form, yêu cầu đăng nhập. |
| **TC30** | Đánh giá thành công | Sao: 5, Comment: `Ngon` | Chọn 5 sao, nhập nội dung -> Gửi. | Reload trang, hiển thị review mới vừa tạo. |
| **TC31** | Gửi đánh giá thiếu số sao | Sao: 0 | Không chọn sao -> Gửi. | Hệ thống báo lỗi "Vui lòng chọn số sao". |
| **TC32** | Gửi đánh giá thiếu nội dung | Comment: Rỗng | Bỏ trống nội dung -> Gửi. | Hệ thống báo lỗi "Vui lòng nhập nội dung". |
| **TC33** | Cập nhật điểm trung bình sao | SP có review | Check trung bình sao sau khi gửi. | Số lượng Review tăng 1, điểm trung bình tính lại chuẩn. |

## 5. Module Giỏ hàng (Cart)

| Mã TC | Tiêu đề Test Case | Dữ liệu đầu vào (Input) | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- |
| **TC34** | Thêm SP chưa Login | (Chưa Login) | Bấm "Thêm vào giỏ" ở SP. | Yêu cầu Đăng nhập (hiện popup). |
| **TC35** | Thêm 1 SP mới vào giỏ | (Đã Login) | Bấm "Thêm vào giỏ" ở SP. | Toast báo thành công, Badge giỏ hàng +1. |
| **TC36** | Thêm trùng SP đã có trong giỏ | SP đã có ở giỏ | Bấm "Thêm vào giỏ" cùng SP đó. | Không sinh dòng mới, số lượng (Qty) ở giỏ +1. |
| **TC37** | Chặn thêm vượt số lượng Tồn kho | SP tồn: 5 | Cố bấm "Thêm vào giỏ" lần thứ 6. | Toast báo lỗi "Sản phẩm không đủ hàng trong kho". |
| **TC38** | Cập nhật số lượng tại màn Giỏ hàng | Qty: 2 -> 3 | Vào giỏ hàng, bấm nút [+] hoặc gõ số 3. | Tổng tiền tự động cập nhật ngay lập tức. |
| **TC39** | Nhập số lượng Âm/0 tại Giỏ hàng | Qty: -1 | Gõ tay `-1` vào ô input. | (Cần Fix) Đang bị lỗi tính tổng tiền âm (BUG_02). |
| **TC40** | Cập nhật vượt tồn kho tại Giỏ hàng | Tồn: 5, Nhập: 6 | Nhập tay Qty = 6. | Tự động lùi về 5, báo lỗi "Chỉ còn 5 sản phẩm". |
| **TC41** | Xóa SP khỏi giỏ hàng | Click nút Xóa | Bấm icon thùng rác bên cạnh SP. | SP bị xóa, tổng tiền và Badge giảm. |
| **TC42** | Tính tổng tiền giỏ hàng | Nhiều SP | Tính nhẩm tổng tiền. | Hiển thị chính xác tổng số tiền (cộng giá Khuyến mãi). |

## 6. Module Thanh toán & Đơn hàng (Checkout)

| Mã TC | Tiêu đề Test Case | Dữ liệu đầu vào (Input) | Các bước thực hiện | Kết quả mong đợi |
| :--- | :--- | :--- | :--- | :--- |
| **TC43** | Checkout Giỏ hàng rỗng | (Giỏ rỗng) | Cố tình gõ URL `/checkout`. | Redirect về trang chủ hoặc báo lỗi Giỏ trống. |
| **TC44** | Đặt hàng thành công (COD) | Form nhập đủ | Nhập Form Checkout -> Chọn COD -> Đặt hàng. | Chuyển sang trang Success, sinh mã đơn. |
| **TC45** | Bỏ trống Tên người nhận | Tên rỗng | Xóa Tên -> Đặt hàng. | HTML5 Validation chặn, báo đỏ ô Tên. |
| **TC46** | Bỏ trống SĐT người nhận | SĐT rỗng | Xóa SĐT -> Đặt hàng. | HTML5 Validation chặn, báo đỏ ô SĐT. |
| **TC47** | Xóa sạch Giỏ hàng sau Checkout | Checkout xong | Quay lại trang Giỏ hàng. | Giỏ hàng báo trống, Badge = 0. |
| **TC48** | Trừ Stock, tăng Sold sau mua | Checkout xong | Check database `products` | `stock` giảm đúng số lượng mua, `sold` tăng lên. |
| **TC49** | Xem Lịch sử đơn hàng | Mục Đơn hàng | Bấm "Đơn hàng của tôi". | Hiển thị đơn vừa đặt trạng thái "Chờ xử lý". |
| **TC50** | Load lại (F5) trang Giỏ hàng/Lịch sử | Nhấn F5 | F5 ở trang Giỏ hàng hoặc Lịch sử. | Dữ liệu vẫn được giữ nguyên (Fetch từ Database). |
