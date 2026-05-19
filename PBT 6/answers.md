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

# TRACK B — TAILWINDCSS
## Phần A
### Câu A1
#### 1. Thẻ bao ngoài cùng (Container Wrapper)
* **`flex`** → `display: flex;` 
* **`items-center`** → `align-items: center;` 
* **`justify-between`** → `justify-content: space-between;` 
* **`p-4`** → `padding: 1rem;` 
* **`bg-white`** → `background-color: #ffffff;` (Màu nền trắng)
* **`shadow-md`** → `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);` 
* **`rounded-lg`** → `border-radius: 0.5rem;` 
* **`hover:shadow-xl`** → `&:hover { box-shadow: ... }` 
* **`transition-shadow`** → `transition-property: box-shadow;` 
* **`duration-300`** → `transition-duration: 300ms;` 

#### 2. Thẻ hình ảnh (Avatar)
* **`w-16`** → `width: 4rem;` 
* **`h-16`** → `height: 4rem;` 
* **`rounded-full`** → `border-radius: 9999px;` 
* **`object-cover`** → `object-fit: cover;` 
#### 3. Thẻ chứa nội dung chữ (Text Container)
* **`ml-4`** → `margin-left: 1rem;`
* **`flex-1`** → `flex: 1 1 0%;` 
#### 4. Thẻ H3 (Tên người dùng)
* **`text-lg`** → `font-size: 1.125rem; line-height: 1.75rem;` 
* **`font-semibold`** → `font-weight: 600;` 
* **`text-gray-800`** → `color: #1f2937;` 
* **`truncate`** → `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` 

#### 5. Thẻ P (Nghề nghiệp)
* **`text-sm`** → `font-size: 0.875rem; line-height: 1.25rem;` 
* **`text-gray-500`** → `color: #6b7280;` 

#### 6. Thẻ Button (Nút bấm)
* **`px-4`** → `padding-left: 1rem; padding-right: 1rem;` 
* **`py-2`** → `padding-top: 0.5rem; padding-bottom: 0.5rem;` 
* **`bg-blue-500`** → `background-color: #3b82f6;` 
* **`text-white`** → `color: #ffffff;` 
* **`rounded-md`** → `border-radius: 0.375rem;` 
* **`hover:bg-blue-600`** → `&:hover { background-color: #2563eb; }` 
* **`focus:ring-2`** → `&:focus { box-shadow: ... }` 
* **`focus:ring-blue-300`** → `&:focus { ... }` 

### Câu A2
#### 1. Giải thích Prefix Responsive (`md:`, `lg:`, `xl:`)
Tailwind CSS sử dụng nguyên tắc **Mobile-First** (thiết kế cho thiết bị di động trước), giống như Bootstrap. Các class không có prefix sẽ được áp dụng mặc định cho màn hình nhỏ nhất. Khi thêm các prefix như `md:`, `lg:`, `xl:`, class đó sẽ chỉ bắt đầu có tác dụng khi kích thước màn hình đạt đến một điểm dừng (breakpoint) tương ứng và kéo dài trở lên.

* **`md:` (Medium):** Áp dụng cho Tablet trở lên (mặc định `≥ 768px`).
* **`lg:` (Large):** Áp dụng cho Desktop/Laptop trở lên (mặc định `≥ 1024px`).
* **`xl:` (Extra Large):** Áp dụng cho màn hình Desktop lớn (mặc định `≥ 1280px`).

**Ví dụ:** `md:grid-cols-2 lg:grid-cols-4` có nghĩa là:
* **Dưới 768px (Mobile):** Không bị ảnh hưởng bởi 2 class trên (thường sẽ tự rơi về mặc định là 1 cột nếu có class `grid-cols-1` hoặc hiển thị xếp chồng).
* **Từ 768px đến 1023px (Tablet - `md:`):** Giao diện chia thành lưới 2 cột.
* **Từ 1024px trở lên (Desktop - `lg:`):** Giao diện chia thành lưới 4 cột.
#### 2. Giải thích State Modifiers (`hover:`, `focus:`, `active:`, `group-hover:`)
Đây là các tiền tố (prefix) cho phép bạn áp dụng CSS class dựa trên các trạng thái (states) tương tác của phần tử.

* **`hover:`** Tương đương với pseudo-class `:hover` trong CSS. Class đi kèm sẽ được kích hoạt khi người dùng di chuột (hover) lên trên phần tử.
  * *VD:* `hover:bg-blue-500` (Nền đổi thành xanh dương khi di chuột vào).
* **`focus:`** Tương đương với `:focus`. Kích hoạt khi phần tử được chọn/tập trung, thường dùng cho các ô `<input>`, `<textarea>` hoặc `<button>` khi người dùng click vào hoặc dùng phím Tab di chuyển tới.
  * *VD:* `focus:outline-none focus:ring-2` (Bỏ viền mặc định và thêm vòng sáng khi click vào ô nhập liệu).
* **`active:`** Tương đương với `:active`. Kích hoạt tại đúng thời điểm phần tử đang bị nhấn giữ (nhấp chuột xuống nhưng chưa nhả ra).
  * *VD:* `active:scale-95` (Tạo hiệu ứng nút bấm bị lún xuống khi nhấn).
* **`group-hover:`** Đây là một tính năng rất mạnh của Tailwind. Nó cho phép một phần tử con thay đổi style khi thẻ cha của nó (được gắn class `group`) bị hover. Thay vì phải viết CSS phức tạp, bạn chỉ cần gắn thẻ cha là `group` và thẻ con có class `group-hover:text-red-500`.

#### 3. Viết class Tailwind tương đương `d-none d-md-flex` của Bootstrap
**Yêu cầu:** *"Ẩn trên mobile, hiện dạng flex trên tablet trở lên"*.

Dựa theo nguyên tắc Mobile-First, ta sẽ ẩn phần tử ở mức mặc định (mobile), sau đó ghi đè thành `display: flex` từ breakpoint `md:` trở đi. Mã class Tailwind chuẩn xác là:

```html
hidden md:flex
```
