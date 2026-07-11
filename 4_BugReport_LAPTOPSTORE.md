# BÁO CÁO LỖI (BUG REPORT) - LAPTOP STORE

Danh sách chi tiết 6 lỗi (Bugs) được phát hiện trong đợt kiểm thử 50 TCs.

---

## BUG_001: Lỗ hổng SQL Injection ở form Đăng nhập (Mã TC: TC_AUTH_09)
- **Mức độ (Severity):** Critical (Nghiêm trọng - Lỗi bảo mật)
- **Môi trường:** Chrome / Win11
- **Mô tả lỗi:** Khi nhập ký tự đặc biệt `' OR 1=1--` vào trường Username, hệ thống cho phép vượt qua xác thực và tự động đăng nhập vào tài khoản đầu tiên trong Database (thường là Admin).
- **Các bước tái hiện:**
  1. Vào form Đăng nhập.
  2. Nhập Username: `' OR 1=1--`
  3. Bấm Đăng nhập.
- **Kết quả mong đợi:** Hệ thống phải báo lỗi đăng nhập, mã hóa chuỗi đầu vào (Sử dụng Parameterized Query).

## BUG_002: Lỗi vỡ giao diện (Trắng trang) khi mạng chậm (Mã TC: TC_PROD_07)
- **Mức độ (Severity):** Medium (Gây trải nghiệm xấu)
- **Môi trường:** Chrome / Win11 (Network: Slow 3G)
- **Mô tả lỗi:** Khi người dùng có mạng quá chậm hoặc chập chờn, trong lúc chờ API trả data về, trang web hiện một màn hình trắng tinh thay vì hiển thị Skeleton Loading hay Spinner.
- **Các bước tái hiện:**
  1. Mở DevTools (F12) -> tab Network -> Chọn Slow 3G.
  2. Tải lại trang chủ.
- **Kết quả mong đợi:** Phải có hiệu ứng Skeleton loading hoặc vòng quay Loading trong lúc gọi API.

## BUG_003: Lỗ hổng XSS trên thanh Tìm kiếm (Mã TC: TC_SRCH_08)
- **Mức độ (Severity):** High (Lỗi bảo mật)
- **Môi trường:** Chrome / Win11
- **Mô tả lỗi:** Frontend không escape/mã hóa chuỗi tìm kiếm của người dùng. Khi nhập thẻ `<script>`, script đó sẽ được chạy ngay trên trình duyệt.
- **Các bước tái hiện:**
  1. Nhập vào ô Tìm kiếm chuỗi: `<script>alert(1)</script>`
  2. Bấm Enter.
- **Kết quả mong đợi:** Ký tự phải được mã hóa thành HTML Entities (VD: `&lt;script&gt;`).

## BUG_004: Không hiển thị popup chặn thêm giỏ hàng (Mã TC: TC_CART_02)
- **Mức độ (Severity):** High (Lỗi luồng mua sắm)
- **Môi trường:** Edge / Win10
- **Mô tả lỗi:** Khách vãng lai chưa đăng nhập khi bấm "Thêm vào giỏ" sẽ không thấy hiện tượng gì xảy ra. Dưới Network API báo lỗi 401 nhưng UI không có Popup cảnh báo.
- **Các bước tái hiện:**
  1. Đảm bảo chưa đăng nhập.
  2. Bấm "Thêm vào giỏ" 1 sản phẩm bất kỳ.
- **Kết quả mong đợi:** Hiện Popup "Vui lòng đăng nhập để mua hàng".

## BUG_005: Giỏ hàng cho phép nhập số lượng âm (Mã TC: TC_CART_05)
- **Mức độ (Severity):** High (Lỗi logic tính tiền)
- **Môi trường:** Chrome / Win11
- **Mô tả lỗi:** Ô input số lượng trong trang giỏ hàng cho phép nhập số `-5`. Hệ thống tính tổng tiền thành số âm, có rủi ro hacker dùng cách này để trừ tiền các món hàng khác.
- **Các bước tái hiện:**
  1. Thêm sản phẩm vào giỏ.
  2. Vào giỏ hàng, gõ số `-5` vào ô số lượng.
- **Kết quả mong đợi:** Ô input phải chặn nhập số âm (`min="1"`). Nếu cố tình gửi API số âm, Backend phải báo lỗi 400 Bad Request.

## BUG_006: Lỗi không cập nhật lại Icon Giỏ hàng sau khi Đặt hàng (Mã TC: TC_CHK_07)
- **Mức độ (Severity):** Low (Lỗi hiển thị nhỏ)
- **Môi trường:** Chrome / Win11
- **Mô tả lỗi:** Đặt hàng xong, giỏ hàng trong Database đã trống nhưng con số hiển thị trên icon góc phải vẫn là số cũ (chưa về 0).
- **Các bước tái hiện:**
  1. Mua hàng thành công, hệ thống báo Success.
  2. Xem lại Badge màu đỏ trên icon giỏ hàng ở thanh Header.
- **Kết quả mong đợi:** Gọi hàm `updateCartBadge()` để set về 0 ngay lập tức mà không cần người dùng tự ấn F5.
