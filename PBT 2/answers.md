## Phần A

### Câu A1

1. **`type="email"`** -> Ô nhập text, tự kiểm tra có `@` -> Dùng cho form đăng ký.
2. **`type="password"`** -> Ô nhập text, không có validation tự động -> Dùng để nhập mật khẩu khi đăng nhập hoặc tạo tài khoản.
3. **`type="number"`** -> Ô nhập text có nút mũi tên tăng/giảm, tự động chặn chữ cái và kiểm tra giới hạn `min`/`max`/`step` -> Dùng để điều chỉnh số lượng sản phẩm trong giỏ hàng.
4. **`type="tel"`** -> Ô nhập text, không tự kiểm tra định dạng chặt chẽ -> Dùng để nhập số điện thoại người nhận ở bước thanh toán.
5. **`type="search"`** -> Ô nhập text, không có validation tự động -> Dùng cho thanh tìm kiếm tên sản phẩm trên website.
6. **`type="radio"`** -> Nút hình tròn, báo lỗi yêu cầu chọn nếu có thuộc tính `required` -> Dùng để chọn phương thức thanh toán.
7. **`type="checkbox"`** -> Ô vuông nhỏ, báo lỗi yêu cầu tích chọn nếu có `required` -> Dùng cho bộ lọc sản phẩm.
8. **`type="date"`** -> Ô nhập có chứa icon popup lịch, bắt buộc chọn ngày hợp lệ và kiểm tra giới hạn `min`/`max` -> Dùng để khách hàng chọn ngày hẹn giao hàng mong muốn.
9. **`type="file"`** -> Nút bấm "Choose File" kèm tên tệp, tự động lọc loại file cho phép chọn thông qua thuộc tính `accept` -> Dùng để khách hàng tải ảnh chụp thực tế lên phần đánh giá sản phẩm.
10. **`type="range"`** -> Thanh trượt ngang (slider), tự động giới hạn giá trị luôn nằm trong khoảng `min`/`max` -> Dùng làm bộ lọc khoảng giá sản phẩm.

---

### Câu A2

1. **Trường hợp 1:** Form không thể submit vì thuộc tính `required` bắt buộc trường này phải có dữ liệu trước khi gửi form đi.
2. **Trường hợp 2:** Form không thể submit vì `type="email"` có sẵn tính năng tự động kiểm tra định dạng email cơ bản.
3. **Trường hợp 3:** Form không thể submit vì `type="number"` kết hợp `max="10"`, giá trị 15 vượt quá giới hạn trên nên validation fail.
4. **Trường hợp 4:** Form không thể submit vì thuộc tính `pattern` sử dụng Biểu thức chính quy (Regex) để ép định dạng. Chuỗi `[0-9]{10}` yêu cầu người dùng phải nhập chính xác 10 ký tự, và tất cả phải là chữ số từ 0 đến 9. 
5. **Trường hợp 5:** Form không thể submit vì thuộc tính `minlength="8"` yêu cầu chuỗi nhập vào phải có độ dài tối thiểu là 8 ký tự.

---

### Câu A3

#### 1. Tại sao `<label for="email">` quan trọng cho người dùng Screen Reader?
`<label>` tạo liên kết văn bản với input thông qua thuộc tính `for` (trùng với `id` của input).
* Khi người khiếm thị dùng screen reader focus vào input, máy sẽ đọc nội dung của `<label>` để họ biết ô nhập này dùng để làm gì.
* Ngoài ra, click vào `<label>` cũng sẽ tự động focus vào input tương ứng.

#### 2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.
Sử dụng cặp thẻ `<fieldset>` và `<legend>` khi cần gom nhóm các input có liên quan chặt chẽ với nhau về mặt ngữ nghĩa thành một khối thống nhất.
* **Ví dụ:**
```html
<fieldset>
    <legend>Chọn phương thức thanh toán:</legend>

    <input type="radio" id="cod" name="payment" value="cod">
    <label for="cod">Thanh toán khi nhận hàng (COD)</label><br>

    <input type="radio" id="credit" name="payment" value="credit">
    <label for="credit">Thẻ tín dụng/Ghi nợ</label>
</fieldset>

* **Trải nghiệm Screen Reader:** Khi người dùng chọn "COD", nó sẽ đọc: *"Chọn phương thức thanh toán: Thanh toán khi nhận hàng (COD), radio button"*. Nếu không có `<fieldset>`/`<legend>`, nó chỉ đọc: *"Thanh toán khi nhận hàng"*, khiến người dùng có thể quên mất ngữ cảnh của lựa chọn này.

#### 3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng khi đã có `<label>`?
* **`aria-label` dùng khi nào:** Khi cần mô tả một phần tử tương tác nhưng không có văn bản hiển thị trực quan trên màn hình.
  * *Ví dụ:* `<button aria-label="Đóng cửa sổ"> X </button>`
* **Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`:**
  * `<label>` là native HTML, được tất cả trình duyệt và screen reader hỗ trợ tốt nhất.
  * `aria-label` là ARIA attribute (bổ sung), có thể không được hỗ trợ đầy đủ trên một số screen reader cũ hoặc trình duyệt cũ.

---

### Câu A4

#### 1. Thuộc tính `loading="lazy"` trên `<img>`
* **Hoạt động:** Hình ảnh chỉ được tải khi người dùng cuộn (scroll) đến gần vị trí của nó trên màn hình hiển thị, thay vì tải ngay từ đầu.
* **Cải thiện:**
  * Giảm thời gian tải trang ban đầu.
  * Giảm dung lượng dữ liệu tiêu thụ.
  * Giảm tải cho server, tiết kiệm băng thông.
* **Khi nào KHÔNG nên dùng:**
  * Ảnh *above the fold* (nằm trong vùng nhìn thấy đầu tiên khi load trang, ví dụ: banner hero, logo). Dùng `loading="eager"` (mặc định) để tải ngay.
  * Ảnh quan trọng, cần hiển thị ngay lập tức (ví dụ: ảnh sản phẩm chính trong trang chi tiết).
  * Trình duyệt cũ không hỗ trợ (IE11, Safari < 15), cần có fallback.

#### 2. Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`?
Các trình duyệt khác nhau (Chrome, Safari, Firefox, Edge...) sử dụng các engine giải mã (codec) video khác nhau. Không có một định dạng video nào hỗ trợ hoàn hảo 100% trên tất cả các phiên bản trình duyệt cũ và mới.

**3 định dạng video Web phổ biến:**
* **MP4 (H.264/AAC):** Định dạng phổ biến nhất, độ tương thích cao nhất (gần như 100% trình duyệt và thiết bị di động đều hỗ trợ).
* **WebM (VP8/VP9):** Định dạng mã nguồn mở do Google phát triển, tối ưu cực tốt cho Web (dung lượng nhẹ hơn MP4 cùng chất lượng). Hỗ trợ tốt trên Chrome, Firefox, Edge, nhưng có thể gặp vấn đề ở một số bản Safari cũ.
* **AV1 (.mp4 / .webm) / Ogg:** AV1 là chuẩn nén video thế hệ mới siêu việt, tiết kiệm băng thông nhưng đòi hỏi phần cứng giải mã mạnh (đang dần phổ biến). Hoặc Ogg (Theora) là định dạng mã nguồn mở cũ hơn nhưng rất tốt cho Firefox/Opera.

#### 3. Thuộc tính `alt` trên `<img>` dùng để làm gì?
Viết `alt` tốt cho 3 trường hợp:

* **Ảnh sản phẩm iPhone 16:** `alt="iPhone 16 màu đen, 128GB, mặt trước hiển thị màn hình Dynamic Island"`
  * *Giải thích:* Mô tả chi tiết sản phẩm: tên, màu sắc, dung lượng, điểm nổi bật. Giúp người khiếm thị hình dung sản phẩm.
* **Ảnh trang trí (decorative):** `alt=""` (chuỗi rỗng)
  * *Giải thích:* Ảnh chỉ mang tính trang trí, không chứa thông tin. Screen reader sẽ bỏ qua, không làm phiền người dùng.
* **Ảnh biểu đồ doanh thu Q1/2026:** `alt="Biểu đồ cột doanh thu quý 1/2026: Tháng 1 đạt 500 triệu, Tháng 2 đạt 750 triệu, Tháng 3 đạt 1 tỷ đồng. Tăng trưởng 100% so với quý trước."`
  * *Giải thích:* Tóm tắt dữ liệu chính từ biểu đồ vì người khiếm thị không thể nhìn thấy hình ảnh. Cần truyền đạt insight quan trọng.

### Câu A5

1. **Cách 1** dùng khi hình ảnh không cần chú thích/caption bổ sung.
2. **Cách 2** dùng khi hình ảnh cần chú thích đi kèm (tên, mô tả, nguồn, giá...).

#### Ví dụ cụ thể
1. Thẻ sản phẩm (Product Card) trên trang E-Commerce.
2. Ảnh minh họa hoặc biểu đồ trong bài viết Blog/Tin tức.


