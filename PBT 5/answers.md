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

## Phần B - THỰC HÀNH CODE
# Bài B3

## Lệnh biên dịch SCSS sang CSS

Để biên dịch thư mục `scss/` thành file CSS sử dụng thư viện `sass` (Dart Sass), hãy mở Terminal/Command Prompt tại thư mục gốc của project và chạy lệnh sau:

```bash
# Biên dịch 1 lần:
sass scss/style.scss style.css

# Hoặc chế độ tự động theo dõi thay đổi (--watch):
sass --watch scss/style.scss:style.css
```
## Phần C - SUY LUẬN

### Bài C1: Phân tích Responsive Website (Shopee.vn)

#### 1. Phân tích giao diện trên 3 kích thước màn hình

**A. Giao diện Mobile (375px)**
* **Navigation (Điều hướng):** Menu ngang trên cùng biến mất. Thay vào đó, thanh điều hướng chuyển thành một thanh tìm kiếm thu gọn ghim ở đầu trang (Sticky Header) cùng biểu tượng giỏ hàng/chat. Ngoài ra, xuất hiện một thanh Bottom Navigation Bar (chứa các tab: Trang chủ, Mall, Video, Thông báo, Tôi) ở dưới cùng màn hình để dễ dàng thao tác bằng ngón tay cái.
* **Lưới Content (Grid):** Khu vực "Gợi ý hôm nay" (Product Grid) bị thu hẹp chỉ còn 2 cột thẻ sản phẩm.
* **Elements bị ẩn:** Các banner quảng cáo dọc hai bên, danh sách menu phụ ở top-bar (Kênh Người Bán, Tải ứng dụng, Kết nối) và toàn bộ cấu trúc Footer chi tiết đều bị ẩn đi hoặc chuyển thành dạng accordion thu gọn.
* **Font size:** Kích thước chữ được tăng tương đối so với tỷ lệ màn hình và các khoảng cách (padding/margin) được nới lỏng để chống chạm nhầm (touch-friendly).

**B. Giao diện Tablet (768px)**
* **Navigation:** Thanh tìm kiếm được mở rộng hơn. Không có Bottom Navigation như trên điện thoại, nhưng các menu phụ vẫn được giữ ở mức tối giản.
* **Lưới Content (Grid):** Lưới sản phẩm thường hiển thị 4 cột. Các danh mục sản phẩm (Categories) hiển thị dưới dạng thanh trượt ngang (horizontal scroll) thay vì hiển thị toàn bộ.
* **Elements bị ẩn:** Banner hai bên trang vẫn bị ẩn để nhường không gian tối đa cho hiển thị sản phẩm ở giữa.

**C. Giao diện Desktop (1440px)**
* **Navigation:** Header hiển thị đầy đủ (Full Header). Phía trên cùng có thanh Top-bar chứa các liên kết tiện ích. Thanh tìm kiếm cực lớn nằm giữa, kèm theo các từ khóa gợi ý phổ biến ngay bên dưới.
* **Lưới Content (Grid):** Hiển thị tối đa không gian với 6 cột thẻ sản phẩm cho phần "Gợi ý hôm nay". Khối "Danh mục" hiển thị đầy đủ thành một mạng lưới chi tiết không cần cuộn ngang.
* **Elements bị ẩn:** Không có phần tử nào bị ẩn. Giao diện hiển thị toàn bộ nội dung từ Banner lớn, Flash Sale, cho đến Footer đầy đủ nhiều cột thông tin.
* **Font size:** Cỡ chữ tiêu chuẩn, mật độ thông tin dày đặc hơn do có lợi thế về không gian hiển thị hoặc thao tác bằng chuột chính xác.

---

### Bài C2

#### 1. Wireframe & Chiến lược bố cục (Layout Strategy)

**A. Mobile (< 768px)**
* **Bố cục tổng thể:** 1 cột duy nhất (Single column), cuộn dọc từ trên xuống dưới.
* **Header:** Logo và số điện thoại nằm trên cùng 1 hàng (chia hai bên) hoặc xếp chồng lên nhau.
* **Hero Image:** Trải toàn bộ chiều ngang (`100vw`), chiều cao vừa phải (ví dụ `30vh`) để người dùng thấy ngay nội dung bên dưới.
* **Grid ảnh món ăn:** Xếp thành 2 cột (3 hàng) để tiết kiệm chiều dài trang, hoặc 1 cột nếu ảnh cần chi tiết cao.
* **Form đặt bàn:** Nằm ngay dưới khu vực ảnh món ăn. Các trường nhập liệu (input) xếp dọc 100% chiều ngang để dễ chạm/gõ phím trên điện thoại.
* **Bản đồ (Map):** Nằm dưới cùng, ngay trên Footer.
* **Những gì bị ẩn trên Mobile?** Các yếu tố trang trí rườm rà trên Hero image, hoặc có thể ẩn bớt text mô tả chi tiết của món ăn trong Grid (chỉ giữ lại ảnh và tên món) để tối ưu không gian hiển thị.

**B. Tablet (768px - 1023px)**
* **Bố cục tổng thể:** Kết hợp 1 cột và 2 cột.
* **Header & Hero:** Hiển thị rộng rãi hơn, Hero image cao hơn (khoảng `40-50vh`).
* **Grid ảnh món ăn:** Đổi thành 3 cột (2 hàng).
* **Bản đồ nằm đâu?** Tối ưu không gian bằng cách đặt Form đặt bàn và Bản đồ nằm ngang hàng nhau (Side-by-side) chia tỷ lệ 50-50 (1 hàng 2 cột). Form bên trái, bản đồ bên phải.
* **Footer:** Dàn ngang các thông tin thay vì xếp chồng.

**C. Desktop (≥ 1024px)**
* **Bố cục tổng thể:** Layout 2 cột chính (Tỷ lệ 70% - 30% hoặc 60% - 40%). Cột lớn bên trái chứa nội dung chính, cột nhỏ bên phải làm Sidebar.
* **Có Sidebar không?** CÓ.
* **Vùng Main (Trái):** Chứa Grid ảnh món ăn (3 cột ảnh) và Form đặt bàn ngay bên dưới.
* **Vùng Sidebar (Phải):** Chứa Bản đồ Google Maps ghim cố định (`position: sticky`) kèm theo số điện thoại hotline to, rõ ràng và giờ mở cửa.

#### 2. CSS Skeleton (Grid + Mobile-First)

```css
.layout-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
}

.hero {
    height: 30vh;
    background-color: #ddd;
}


.main-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 15px;
}


.food-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}


.booking-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

.sidebar-map {
    width: 100%;
    height: 250px;
    background-color: #ccc; 
}

.footer {
    padding: 20px;
    text-align: center;
}

@media (min-width: 768px) {
    .hero {
        height: 40vh;
    }

    .main-content {
        padding: 0 30px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
    .form-map-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        align-items: stretch;
    }
}

@media (min-width: 1024px) {
    .layout-wrapper {
        max-width: 1200px;
        margin: 0 auto; 
    }

    .hero {
        height: 50vh;
    }

 
    .main-content {
        grid-template-columns: 2fr 1fr; 
        gap: 40px;
    }


    .content-left {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .sidebar-map {
        height: auto;
        min-height: 400px;
        position: sticky; 
        top: 20px;
    }

    
    .form-map-wrapper {
        display: block; 
    }
}
```

