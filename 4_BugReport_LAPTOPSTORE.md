# BÁO CÁO LỖI (BUG REPORT) - LAPTOP STORE

Dưới đây là chi tiết các lỗi (Bugs) được phát hiện trong quá trình kiểm thử phần mềm.

## BUG_001: Không hiển thị thông báo lỗi UI khi thêm giỏ hàng lúc chưa đăng nhập

**Mô tả lỗi:** Khi người dùng chưa đăng nhập (chưa có token) và nhấn nút "Thêm vào giỏ" ở một sản phẩm bất kỳ, hệ thống không có bất kỳ phản hồi nào trên giao diện để hướng dẫn người dùng đăng nhập. 
**Mức độ (Severity):** High (Lỗi ảnh hưởng trực tiếp đến luồng mua sắm).
**Môi trường:** Chrome bản mới nhất, Windows 11.

**Các bước tái hiện (Steps to reproduce):**
1. Mở trình duyệt ẩn danh (Incognito) để đảm bảo chưa đăng nhập.
2. Truy cập vào trang chủ `/`.
3. Bấm vào nút "Thêm vào giỏ" của một sản phẩm.
4. Quan sát giao diện UI.

**Kết quả thực tế (Actual Result):** 
Giao diện không thay đổi. Khi mở Developer Tools (F12) tab Network, thấy API `POST /api/cart` báo lỗi `401 Unauthorized`.
**Kết quả mong đợi (Expected Result):** 
Hệ thống cần hiển thị một popup (Alert / Modal) thông báo "Bạn cần đăng nhập để thêm sản phẩm" và điều hướng người dùng tới form Đăng nhập.

---

## BUG_002: Lỗi không cập nhật lại số lượng (Badge) Giỏ hàng sau khi Đặt hàng thành công

**Mô tả lỗi:** Sau khi thực hiện luồng Checkout (Thanh toán) thành công, giỏ hàng trong Database đã được làm rỗng, nhưng con số hiển thị trên icon Giỏ hàng (Góc trên bên phải) vẫn giữ nguyên số lượng cũ, không reset về 0.
**Mức độ (Severity):** Medium.
**Môi trường:** Edge / Chrome.

**Các bước tái hiện (Steps to reproduce):**
1. Đăng nhập tài khoản.
2. Thêm 1 sản phẩm vào giỏ hàng (Quan sát thấy Badge = 1).
3. Vào trang thanh toán (`#/checkout`) và điền thông tin.
4. Bấm "Đặt hàng".
5. Quan sát Icon Giỏ hàng sau khi hệ thống thông báo đặt hàng thành công.

**Kết quả thực tế (Actual Result):**
Icon Giỏ hàng vẫn hiển thị số "1". Nếu reload trang (F5) thì số này mới cập nhật về "0".
**Kết quả mong đợi (Expected Result):**
Sau khi nhận được Response báo đặt hàng thành công từ API, Frontend phải gọi ngay hàm `updateCartBadge()` để reset giao diện UI về số 0.
