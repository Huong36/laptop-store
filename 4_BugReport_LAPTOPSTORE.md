# BÁO CÁO LỖI (BUG REPORT) - LAPTOP STORE

Tài liệu này ghi nhận các lỗi (Bugs) được phát hiện trong quá trình thực thi Test Cases. Báo cáo tuân thủ chuẩn mô tả Bug thông dụng (như JIRA/Mantis) để Developer dễ dàng tái hiện và xử lý.

## Bảng Tổng hợp Bug

| Bug ID | Tên Lỗi (Summary) | Mức độ nghiêm trọng (Severity) | Độ ưu tiên (Priority) | Trạng thái (Status) |
| :--- | :--- | :---: | :---: | :---: |
| **BUG_01** | Tìm kiếm sản phẩm phân biệt chữ hoa, chữ thường | Minor | Low | Mở (Open) |
| **BUG_02** | Có thể nhập số lượng âm vào Giỏ hàng | High | High | Mở (Open) |

---

## Chi tiết Lỗi (Bug Details)

### BUG_01: Tìm kiếm sản phẩm phân biệt chữ hoa, chữ thường
- **Mã Test Case liên quan:** TC24
- **Môi trường:** Google Chrome (Version 114) / Windows 11
- **Người báo cáo:** Trần Xuân Hướng
- **Mô tả (Description):** Khi người dùng nhập từ khóa tìm kiếm (Ví dụ: "asus" viết thường), hệ thống trả về kết quả rỗng (0 sản phẩm). Tuy nhiên, trong Database vẫn có sản phẩm mang tên "Laptop ASUS". Nguyên nhân do câu lệnh truy vấn SQL đang phân biệt chữ hoa chữ thường một cách cứng ngắc.
- **Các bước tái hiện (Steps to Reproduce):**
  1. Truy cập vào trang chủ Laptop Store.
  2. Click vào ô tìm kiếm trên thanh Header.
  3. Nhập từ khóa: `asus` (chữ thường).
  4. Bấm nút Kính lúp (Search) hoặc nhấn Enter.
- **Kết quả thực tế (Actual Result):** Hiển thị màn hình trống với thông báo "Không tìm thấy sản phẩm nào".
- **Kết quả mong đợi (Expected Result):** Hệ thống cần trả về tất cả các sản phẩm có chứa cụm từ "ASUS" (không phân biệt hoa/thường).

---

### BUG_02: Có thể nhập số lượng âm vào Giỏ hàng
- **Mã Test Case liên quan:** TC39
- **Môi trường:** Microsoft Edge / Windows 11
- **Người báo cáo:** Trần Xuân Hướng
- **Mô tả (Description):** Tại màn hình Giỏ hàng, ô input nhập số lượng sản phẩm không chặn việc gõ dấu trừ (`-`) từ bàn phím. Nếu người dùng bôi đen và gõ trực tiếp số `-5`, hệ thống tự động cập nhật số lượng là `-5` và làm cho Tổng tiền của giỏ hàng bị Âm (Ví dụ: `-50,000,000đ`). 
- **Các bước tái hiện (Steps to Reproduce):**
  1. Đăng nhập và Thêm 1 sản phẩm "Laptop MSI Bravo 15" vào giỏ hàng.
  2. Click icon Giỏ hàng để chuyển sang trang Quản lý giỏ hàng (`/cart`).
  3. Bôi đen con số `1` trong ô Input số lượng.
  4. Gõ từ bàn phím số `-5` và click chuột ra ngoài (trigger onchange).
- **Kết quả thực tế (Actual Result):** Tổng tiền thành tiền bị tính âm. Thanh toán thành công với số tiền âm.
- **Kết quả mong đợi (Expected Result):** Ô Input không cho phép nhập ký tự `-` hoặc hệ thống tự động đưa số lượng về `1` nếu phát hiện User cố tình nhập giá trị ≤ 0.
