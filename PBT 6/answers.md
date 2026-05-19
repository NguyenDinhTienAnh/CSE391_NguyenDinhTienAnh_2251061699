# Track A - Bootstrap 5

## Phần A

### Câu A1

#### 1. Bảng phân tích Layout

| Kích thước | `< 768px` (Mobile) | `768px - 991px` (Tablet/MD) | `≥ 992px` (Desktop/LG) |
| :--- | :--- | :--- | :--- |
| **Số cột (trên 1 hàng)** | 1 cột | 2 cột | 4 cột |
| **Box layout** | Xếp dọc thành 4 hàng | Xếp thành 2 hàng ngang (mỗi hàng 2 box) | Xếp thành 1 hàng ngang duy nhất |

#### 2. Mô phỏng (Vẽ) Layout trực quan

* **Dưới 768px** (Chỉ áp dụng `col-12` - chiếm 12/12 phần):
```text
|----------------------------------------------------|
| Box 1                                              |
|----------------------------------------------------|
| Box 2                                              |
|----------------------------------------------------|
| Box 3                                              |
|----------------------------------------------------|
| Box 4                                              |
|----------------------------------------------------|
```
* **Từ 768px đến 991px** (Áp dụng `col-md-6` - chiếm 6/12 phần = 50%):
```text
|--------------------------|-------------------------|
| Box 1                    | Box 2                   |
|--------------------------|-------------------------|
| Box 3                    | Box 4                   |
|--------------------------|-------------------------|
```
* **Từ 992px trở lên** (Áp dụng `col-lg-3` - chiếm 3/12 phần = 25%):
```text
|------------|------------|------------|-------------|
| Box 1      | Box 2      | Box 3      | Box 4       |
|------------|------------|------------|-------------|
```
#### 3. Trả lời câu hỏi thêm

**1. `col-md-6` nghĩa là gì?**
Trong Grid System (12 cột), `col-md-6` có nghĩa là: Bắt đầu từ kích thước màn hình trung bình (medium - thường từ `768px` trở lên), phần tử này sẽ chiếm 6 phần trên tổng số 12 phần (tương đương 50% chiều rộng của phần tử chứa nó).

**2. Tại sao không cần viết `col-sm-12`?**
Grid System của Bootstrap hoạt động theo nguyên tắc **Mobile-First** (ưu tiên thiết bị di động trước). Nghĩa là các class không có tiền tố (như `col-12`) sẽ được áp dụng làm mặc định cho kích thước màn hình nhỏ nhất (từ `0px`) kéo dài lên cho đến khi gặp một breakpoint (điểm dừng) lớn hơn ghi đè nó (như `md` hay `lg`).

### Câu A2
#### 1. Class `d-none d-md-block`
Nhóm class này quản lý trạng thái hiển thị (display) của phần tử dựa trên nguyên tắc Mobile-First:

* **`d-none` (ẩn mặc định):** Áp dụng `display: none;` bắt đầu từ màn hình nhỏ nhất (từ 0px).
* **`d-md-block` (hiển thị từ mức MD):** Ghi đè thành `display: block;` khi màn hình đạt đến breakpoint `md` (≥ 768px).

**Kết luận:**
* **Ẩn khi:** Kích thước màn hình `< 768px` (Điện thoại di động).
* **Hiển thị khi:** Kích thước màn hình `≥ 768px` (Máy tính bảng, Laptop, Màn hình lớn).

#### 2. 5 Spacing Utilities (Margin / Padding)
Bootstrap sử dụng cú pháp `{thuộc tính}{vị trí}-{kích thước}` để điều chỉnh khoảng cách, với đơn vị mặc định dựa trên `$spacer` (thường `1rem = 16px`).

* **`mt-3`**: `margin-top` mức độ 3. Tạo một khoảng trống bên ngoài, phía trên phần tử (mặc định là `1rem = 16px`).
* **`px-4`**: `padding-x` mức độ 4. Tạo khoảng trống bên trong phần tử ở cả trục X (bên trái và bên phải, tương đương `padding-left` và `padding-right` với giá trị `1.5rem = 24px`).
* **`mb-auto`**: `margin-bottom: auto`. Tự động tính toán khoảng trống bên dưới phần tử. Thường dùng trong Flexbox để đẩy các phần tử bên dưới nó xuống tận cùng của container.
* **`mx-auto`**: `margin-left: auto` và `margin-right: auto`. Khi gán cho một phần tử khối (block element) có chiều rộng (width) cố định, nó sẽ giúp căn giữa phần tử đó theo chiều ngang.
* **`p-5`**: padding mức độ 5. Tạo khoảng trống bên trong phần tử ở tất cả 4 phía (trên, dưới, trái, phải) với mức lớn nhất (thường là `3rem = 48px`).

#### 3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`
Cả 3 class này đều dùng để bọc nội dung, nhưng cách chúng kiểm soát chiều rộng (max-width) khi màn hình thay đổi lại khác nhau:

| Class | Hành vi hiển thị | Mô tả chi tiết |
| :--- | :--- | :--- |
| **`.container`** | Có chiều rộng tối đa cố định theo từng điểm dừng. | Căn giữa trên màn hình. Màn hình càng lớn, chiều rộng tối đa của nó sẽ giật cấp (nhảy số) theo từng breakpoint (`sm`, `md`, `lg`, `xl`, `xxl`), để lại khoảng trống ở hai bên lề. |
| **`.container-fluid`** | Luôn rộng 100%. | Chiếm toàn bộ chiều rộng của màn hình (`width: 100%`) ở mọi kích thước thiết bị, từ điện thoại đến màn hình siêu rộng. |
| **`.container-md`** | 100% khi nhỏ, giật cấp khi lớn. | Sẽ trải rộng 100% như `.container-fluid` ở các màn hình nhỏ hơn `md` (`< 768px`). Bắt đầu từ mức `md` (`≥ 768px`) trở lên, nó sẽ hoạt động giống hệt `.container` (có max-width cố định và căn giữa). |

## Phần C
### Câu C1: Tùy biến Bootstrap (10đ)

#### 1. Quy trình đổi màu `$primary` sang `#E63946`
Để thay đổi màu gốc của Bootstrap bằng SASS, bạn không can thiệp trực tiếp vào mã nguồn của Bootstrap tải về mà thiết lập một luồng biên dịch riêng.

**Công cụ cần thiết:**
* Node.js và NPM (Node Package Manager).
* Trình biên dịch SASS (cài đặt qua npm: `npm install sass` hoặc dùng extension *Live Sass Compiler* trong VS Code).
* Mã nguồn Bootstrap (cài qua npm: `npm install bootstrap`).

**Quy trình và file cần modify:**
Bạn tạo một file SASS của riêng mình (ví dụ: `custom.scss`). Trong file này, bạn sẽ ghi đè biến màu trước khi import thư viện Bootstrap.

```scss
$primary: #E63946;
@import "../node_modules/bootstrap/scss/bootstrap";
```
#### 2. Tại sao KHÔNG nên override trực tiếp bằng CSS?
Nếu bạn dùng CSS thuần: `.btn-primary { background: #E63946 !important; }`, đây là một thực hành rất xấu (bad practice) vì những lý do sau:

* **Mất tính đồng bộ:** Màu `$primary` trong Bootstrap không chỉ dùng cho nút bấm mà còn dùng cho `.text-primary`, `.bg-primary`, `.border-primary`, `.alert-primary`, v.v. Nếu override bằng CSS, bạn sẽ phải tự viết code ghi đè cho tất cả các class này một cách thủ công.
* **Mất hiệu ứng Hover / Active:** Khi dùng SASS variable, Bootstrap có các hàm (color functions) tự động tính toán ra màu nhạt hơn (hover) hoặc đậm hơn (active/focus) dựa trên màu `$primary` gốc. Nếu bạn viết CSS cứng, nút của bạn sẽ bị mất hiệu ứng hover, và bạn lại phải tự viết thêm `.btn-primary:hover`.

---

### Câu C2: So sánh CSS Thuần và Bootstrap (10đ)
Dưới đây là bảng so sánh trải nghiệm phát triển một Navbar và Product Card sử dụng CSS thuần so với Bootstrap:

| Tiêu chí | CSS Thuần (Raw CSS) | Bootstrap 5 |
| :--- | :--- | :--- |
| **Số dòng CSS cần viết** | **Rất nhiều** (Từ 100 - 300 dòng để xử lý Flexbox, Media Queries, Hover states, Animations). | **Gần như 0 dòng**. Chỉ sử dụng các utilities và components có sẵn trong HTML. |
| **Thời gian phát triển** | **Lâu**. Phải xây dựng cấu trúc từ con số 0, liên tục test lại trên nhiều thiết bị (Mobile, Tablet, Desktop) để sửa lỗi giao diện. | **Rất nhanh**. Layout tự động responsive ngay khi gắn đúng class (như `navbar-expand-lg`, `col-md-6`). |
| **Khả năng tùy biến** | **100% tự do**. Dễ dàng tạo ra các thiết kế độc bản, không bị gò bó bởi bất kỳ khuôn mẫu nào. | **Bị giới hạn** bởi Design System của Bootstrap. Muốn làm khác đi cần phải học cách ghi đè SASS hoặc viết code đắp lên, khá cồng kềnh. |

#### Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?

**NÊN dùng Bootstrap khi:**
* Cần xây dựng ứng dụng với tốc độ cực nhanh (Rapid Prototyping, MVP).
* Làm các dự án nội bộ, Admin Dashboard, Back-office nơi tính năng quan trọng hơn một giao diện độc đáo.
* Làm việc trong đội ngũ có kỹ năng CSS không quá mạnh nhưng cần ra mắt sản phẩm chuẩn Responsive, không bị lỗi hiển thị.
* Ngân sách và thời gian dự án eo hẹp.

**KHÔNG NÊN dùng Bootstrap khi:**
* Sản phẩm yêu cầu một thiết kế UI/UX độc bản, mang đậm dấu ấn thương hiệu (như landing page của Apple, các website sáng tạo/nghệ thuật).
* Giao diện có thiết kế vượt ra khỏi hệ thống lưới 12 cột tiêu chuẩn hoặc yêu cầu các layout bất đối xứng phức tạp.
* Dự án đặt nặng vấn đề hiệu suất và dung lượng (Performance). Việc tải toàn bộ thư viện Bootstrap sẽ gây thừa thãi nếu bạn chỉ dùng 10-20% số class của nó (dù có thể tối ưu bằng `PurgeCSS` nhưng setup tốn thời gian).
* Team frontend đã sử dụng thành thạo các công cụ hiện đại hơn và linh hoạt hơn như `Tailwind CSS`.
