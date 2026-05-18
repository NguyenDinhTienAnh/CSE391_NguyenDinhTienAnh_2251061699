## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1

#### 1. Thẻ Meta Viewport chuẩn và giải thích
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Giải thích các thuộc tính:**
* **`name="viewport"`:** Khai báo cho trình duyệt biết đây là cấu hình về vùng hiển thị (viewport).
* **`content`:** Chứa các giá trị thiết lập cụ thể:
  * **`width=device-width`:** Đặt chiều rộng của trang web bằng với chiều rộng màn hình của thiết bị (ví dụ: iPhone 13 là 390px thay vì 980px giả lập).
  * **`initial-scale=1.0`:** Thiết lập mức độ thu phóng ban đầu là 100% khi trang vừa tải xong.

#### 2. Nếu thiếu thẻ này, iPhone sẽ hiển thị như thế nào?
Nếu "quên" thẻ Viewport, các trình duyệt di động (như Safari trên iPhone) sẽ mặc định coi trang web của bạn là một trang dành cho máy tính để bàn (Desktop).

* **Cơ chế:** iPhone sẽ giả lập một viewport rộng khoảng 980px.
* **Hiển thị:** Toàn bộ nội dung trang web sẽ bị "nén" lại để vừa khít với màn hình điện thoại.
* **Hệ quả:** Chữ sẽ trở nên cực kỳ nhỏ, hình ảnh li ti và người dùng phải thực hiện thao tác "zoom in" (phóng to) hoặc cuộn ngang liên tục mới có thể đọc được nội dung. Trải nghiệm này cực kỳ tệ và không đạt chuẩn Responsive.

#### 3. Phân biệt Mobile-First và Desktop-First
Sự khác biệt cốt lõi nằm ở việc bạn ưu tiên viết code cho thiết bị nào trước và sử dụng loại Media Query nào.

| Đặc điểm | Mobile-First | Desktop-First |
| :--- | :--- | :--- |
| **Ưu tiên** | Thiết kế cho màn hình nhỏ nhất trước. | Thiết kế cho màn hình lớn nhất trước. |
| **Media Query** | Sử dụng `min-width` (từ nhỏ đến lớn). | Sử dụng `max-width` (từ lớn xuống nhỏ). |
| **Triết lý** | Progressive Enhancement (Cải tiến dần). | Graceful Degradation (Giảm cấp dần). |

**Ví dụ CSS (Breakpoint 768px):**

* **Cách 1: Mobile-First**
```css
.container {
  width: 100%;
  padding: 10px;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}
```


* **Cách 2: Desktop-First**

```css
.container {
  width: 750px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}
```

#### 4. Tại sao Mobile-First được khuyên dùng?
Hiện nay, Mobile-First là tiêu chuẩn vàng trong ngành web vì những lý do thực tế sau:

* **Hiệu suất (Performance):** Thiết bị di động thường có cấu hình yếu hơn và mạng chậm hơn. Việc tải code nhẹ trước giúp trang web hiển thị nhanh hơn trên Mobile.
* **Tập trung vào nội dung:** Do không gian màn hình nhỏ, bạn buộc phải ưu tiên những nội dung quan trọng nhất, tránh việc tham lam đưa quá nhiều thứ thừa thãi vào trang web.
* **Xu hướng người dùng:** Lượng truy cập từ di động đã vượt qua máy tính. Thiết kế cho số đông trước luôn là bước đi thông minh.
* **SEO (Google Search):** Google sử dụng thuật toán Mobile-First Indexing, nghĩa là họ ưu tiên đánh giá phiên bản di động của trang web để xếp hạng trên kết quả tìm kiếm.

---

### Câu A2

| Breakpoint | Kích thước (Pixel) | Thiết bị đại diện | Hiển thị lưới sản phẩm (Gợi ý) |
| :--- | :--- | :--- | :--- |
| **X-Small (xs)** | `< 576px` | Điện thoại di động (chiều dọc - Portrait) | 1 cột (Để hình ảnh to, rõ ràng) |
| **Small (sm)** | `≥ 576px` | Điện thoại di động (chiều ngang - Landscape) | 2 cột |
| **Medium (md)** | `≥ 768px` | Máy tính bảng (Tablets - iPad) | 3 cột |
| **Large (lg)** | `≥ 992px` | Máy tính xách tay (Laptops), Màn hình nhỏ | 4 cột |
| **Extra Large (xl)** | `≥ 1200px` | Máy tính để bàn (Desktops) | 4 hoặc 6 cột |
| **Extra Extra Large (xxl)** | `≥ 1400px` | Màn hình máy tính lớn (Ultra-wide) | 6 cột |

#### Giải thích logic áp dụng Breakpoints
* **Sự chuyển đổi (Reflow):** Khi màn hình co giãn và chạm đến một ngưỡng (pixel) nhất định, bố cục web sẽ tự động thay đổi (nhảy dòng hoặc thay đổi kích thước) để phù hợp với không gian mới.
* **Lưới sản phẩm (Product Grid):**
  * Trên Mobile (xs), màn hình quá hẹp nên nếu chia 2 cột thì hình ảnh sản phẩm sẽ rất nhỏ, khó xem thông tin và khó bấm nút "Mua hàng". Do đó, 1 cột là lựa chọn tối ưu.
  * Trên Tablet (md), không gian đủ rộng để người dùng lướt nhanh, nên chia 3 cột giúp tăng mật độ thông tin.
  * Trên Desktop (lg/xl), không gian rất thoải mái, việc chia 4 hoặc 6 cột giúp tận dụng tối đa chiều ngang, giảm việc phải cuộn trang quá nhiều.

#### Ví dụ Code Bootstrap nhanh:
Nếu bạn sử dụng class của Bootstrap, code cho một sản phẩm sẽ trông như thế này:

```html
<div class="col-12 col-sm-6 col-md-4 col-lg-3"> ... </div>
```
* **`col-12`:** 1 cột trên Mobile (xs).
* **`col-sm-6`:** 2 cột từ màn hình Small trở lên.
* **`col-md-4`:** 3 cột từ màn hình Medium trở lên.
* **`col-lg-3`:** 4 cột từ màn hình Large trở lên.

### Câu A3

#### Kết quả tính toán `.container` width

| Chiều rộng màn hình | `.container` width | Giải thích |
| :--- | :--- | :--- |
| **375px** (iPhone SE) | `100%` | Nhỏ hơn 576px, nhận giá trị mặc định ban đầu. |
| **600px** | `540px` | Thỏa mãn `min-width: 576px` nhưng chưa đạt 768px. |
| **800px** | `720px` | Thỏa mãn `min-width: 768px` nhưng chưa đạt 992px. |
| **1000px** | `960px` | Thỏa mãn `min-width: 992px` nhưng chưa đạt 1200px. |
| **1400px** | `1140px` | Thỏa mãn mức cao nhất là `min-width: 1200px`. |

#### Ghi chú về cơ chế hoạt động:
* **Thứ tự ưu tiên:** Trong CSS Mobile-First, các quy tắc viết sau sẽ ghi đè (override) các quy tắc viết trước nếu điều kiện `min-width` được thỏa mãn.
* **Ví dụ:** Ở màn hình 800px, cả hai điều kiện `min-width: 576px` và `min-width: 768px` đều đúng, nhưng vì quy tắc 768px nằm ở dưới nên nó được ưu tiên áp dụng cuối cùng, ghi đè lên giá trị `540px` trước đó.

### Câu A4:
#### 1. Bốn tính năng chính của SCSS

**a. Variables (Biến)**
Cho phép bạn lưu trữ các giá trị (màu sắc, font chữ, kích thước) vào một cái tên dễ nhớ. Khi muốn thay đổi giao diện (ví dụ đổi tông màu chủ đạo), bạn chỉ cần sửa một nơi duy nhất.

*Ví dụ:*
```scss
$primary-color: #ff5722;
$font-size-base: 16px;

button {
  background-color: $primary-color;
  font-size: $font-size-base;
}
```

**b. Nesting (Quy tắc lồng nhau)**
SCSS cho phép bạn viết các selectors lồng vào nhau, mô phỏng đúng cấu trúc phân cấp của HTML. Điều này giúp code cực kỳ gọn gàng và dễ quản lý.

*Ví dụ:*
```scss
nav {
  background: #333;
  ul {
    list-style: none;
    li {
      display: inline-block;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
}
```

**c. Mixins (`@mixin` và `@include`)**
Mixins giống như các "hàm" trong lập trình. Bạn định nghĩa một nhóm các thuộc tính CSS thường xuyên dùng chung và tái sử dụng chúng ở bất cứ đâu.

*Ví dụ:*
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-section {
  height: 100vh;
  @include flex-center; // Gọi mixin ra dùng
}
```

**d. `@extend` / Inheritance (Kế thừa)**
Tính năng này cho phép một selector chia sẻ toàn bộ các thuộc tính của một selector khác. Nó giúp giảm thiểu việc lặp lại code (DRY - Don't Repeat Yourself).

*Ví dụ:*
```scss
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}
```

#### 2. Tại sao trình duyệt KHÔNG đọc được `.scss`?
* **Lý do:** Trình duyệt (Chrome, Safari, Firefox...) chỉ được thiết kế để hiểu và thực thi các tệp tin chuẩn hóa là HTML, CSS và JavaScript. SCSS là một "tiền xử lý" (pre-processor) chứa các cú pháp lập trình (biến, vòng lặp, hàm) mà bộ giải mã CSS của trình duyệt không nhận diện được.

**Các bước để chuyển SCSS → CSS (Compilation):**
Để trang web chạy được, bạn cần một bước gọi là Biên dịch (Compile):

* **Cài đặt trình biên dịch:** Sử dụng các công cụ như Sass (Node.js), các phần mềm như Prepros, hoặc tiện ích mở rộng (Extension) trên VS Code như *Live Sass Compiler*.
* **Quá trình biên dịch:** Trình biên dịch sẽ đọc file `.scss`, xử lý các biến, mixins, lồng nhau... và tự động xuất ra một file `.css` thuần túy.
* **Nhúng vào HTML:** Bạn sẽ nhúng file `.css` (kết quả sau khi biên dịch) vào thẻ `<link>` của file HTML, chứ KHÔNG nhúng file `.scss`.