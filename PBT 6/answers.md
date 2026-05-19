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
