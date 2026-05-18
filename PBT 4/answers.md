## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
| :--- | :--- | :--- | :--- | :--- |
| **static** (Mặc định) | Có | Flow mặc định của HTML | Có | Bố cục trang web thông thường. |
| **relative** | Có | Vị trí ban đầu của chính nó | Có | Nudge (dịch chuyển nhẹ) phần tử; làm gốc tọa độ (container) cho thẻ con dùng `absolute`. |
| **absolute** | Không (Nhường chỗ cho phần tử khác) | Nearest positioned ancestor (Tổ tiên gần nhất được định vị) | Có (Cuộn cùng với thẻ cha) | Dropdown menu, Tooltip, Icon gắn ở góc của một khối, Modal/Popup. |
| **fixed** | Không | Viewport (Cửa sổ trình duyệt) | Không (Đứng yên trên màn hình) | Sticky header, Nút "Back to top", Thanh chat góc màn hình. |
| **sticky** | Có (Cho đến khi chạm ngưỡng) | Nearest scrolling ancestor / Viewport | Có (Cho tới ngưỡng top/bottom thì dính lại như `fixed`) | Tiêu đề các nhóm trong danh bạ, Thanh Navigation dính khi cuộn qua, Table header. |

1. Phần tử `absolute` sẽ tham chiếu đến document (thường được hiểu là `body` hoặc initial containing block) khi nó không có bất kỳ thẻ cha (hoặc ông nội, cụ cố...) nào được set thuộc tính `position` khác `static`. Lúc này, tọa độ `top`, `left`, `right`, `bottom` của nó sẽ được tính từ các mép ngoài cùng của toàn bộ trang web.
2. Nó sẽ tham chiếu thẻ parent (hoặc một thẻ tổ tiên bất kỳ) khi thẻ cha/tổ tiên đó được thiết lập một thuộc tính `position` khác `static` (cụ thể là `relative`, `absolute`, `fixed`, hoặc `sticky`).

---

### Câu 2

#### Trường hợp 1
* **Phân tích:** `display: flex` (mặc định xếp theo hàng ngang `row`). Thuộc tính `flex: 1` áp dụng cho tất cả các item có nghĩa là chúng sẽ chia đều không gian trống của thẻ container.
* **Bố cục (4 items):** 1 hàng ngang duy nhất, 4 cột có chiều rộng hoàn toàn bằng nhau.
* **Sơ đồ:**
```text
+-------------------------------------------------------+
|                       container                       |
| +------------+ +------------+ +------------+ +------+ |
| |   Item 1   | |   Item 2   | |   Item 3   | |Item 4| |
| +------------+ +------------+ +------------+ +------+ |
+-------------------------------------------------------+

## Phần C

### Câu C1

**1. Navigation bar ngang (logo + menu + buttons)**
* **Lựa chọn:** Flexbox
* **Lý do:** Vì navbar là một bố cục 1 chiều. Flexbox sinh ra để giải quyết hoàn hảo bài toán này. Nó giúp mình dễ dàng đẩy các phần tử ra xa nhau (`justify-content: space-between` hoặc `gap`), căn giữa theo chiều dọc (`align-items: center`) mà không cần quan tâm đến chiều rộng cố định của từng khối bên trong.

**2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)**
* **Lựa chọn:** Grid
* **Lý do:** Vì đây là bố cục 2 chiều rõ ràng (gồm nhiều hàng và nhiều cột). Bạn chỉ cần định nghĩa `grid-template-columns: repeat(3, 1fr)`. Dù có 10 hay 1000 bức ảnh, CSS Grid sẽ tự động tạo ra các hàng mới và xếp ảnh vào đúng 3 cột bằng nhau, căn gióng thẳng tắp cả chiều ngang lẫn chiều dọc.

**3. Layout blog: main content + sidebar**
* **Lựa chọn:** Grid
* **Lý do:** Vì đối với việc phân chia các vùng không gian lớn của toàn trang (macro-layout), Grid là vua. Nó cho phép bạn chia tỷ lệ cột chính xác và nhanh chóng (ví dụ: `grid-template-columns: 1fr 300px;`). Tuy Flexbox cũng làm được, nhưng Grid giúp code ở cấp độ container minh bạch hơn mà không cần phải viết CSS phức tạp cho từng item con.

**4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)**
* **Lựa chọn:** Grid
* **Lý do:** Vì rất nhanh gọn với `grid-template-columns: repeat(4, 1fr);`, đảm bảo 4 cột luôn bằng nhau chằn chặn bất chấp nội dung bên trong dài ngắn ra sao.

**5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)**
* **Lựa chọn:** Flexbox
* **Lý do:** Vì nội bộ bên trong một thẻ card là bố cục 1 chiều (xếp theo cột dọc). Bằng cách đặt container là `display: flex; flex-direction: column;`, bạn có thể dễ dàng dùng `margin-top: auto;` cho nút bấm.

---

### Câu C2

#### 1. Lỗi: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
* **Nguyên nhân:** Mặc định thẻ `.card-container` (flex cha) có thuộc tính `align-items: stretch`, làm cho các thẻ `.card` dài bằng nhau. Tuy nhiên, nội dung bên trong mỗi `.card` lại hiển thị theo dòng chảy khối (block flow) thông thường. Khi phần text ngắn/dài khác nhau, nút `.btn` sẽ nằm ngay dưới text đó, dẫn đến việc các nút không nằm thẳng hàng ở đáy thẻ.
* **Cách sửa:** Biến chính thẻ `.card` thành một flex container theo chiều dọc (`column`) và dùng `margin-top: auto` cho nút `.btn` để đẩy nó xuống sát đáy phần không gian trống.

```css
.card-container { 
    display: flex; 
    flex-wrap: wrap; 
}

.card { 
    width: 30%; 
    margin: 1.5%; 
    display: flex; 
    flex-direction: column; 
}

.card img { width: 100%; }
.card h3 { font-size: 18px; }

.card .btn { 
    padding: 10px; 
    margin-top: auto;
}

#### 2. Lỗi: Item vẫn dính góc trái trên (Dù đã muốn căn giữa tuyệt đối)
* **Nguyên nhân:** Khai báo `display: flex;` chỉ kích hoạt môi trường Flexbox. Khai báo `text-align: center;` ở phần tử con chỉ có tác dụng căn giữa phần văn bản bên trong khối con đó. Để căn giữa cả một khối flex item so với flex container cha, bạn phải dùng các thuộc tính căn gióng của chính Flexbox trên thẻ cha.
* **Cách sửa:** Thêm `justify-content` (căn ngang) và `align-items` (căn dọc) vào container `.hero`.

```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center; 
    align-items: center; 
}

.hero-content {
    text-align: center;
}

#### 3. Lỗi: Sidebar bị co lại khi content quá dài
* **Nguyên nhân:** Thuộc tính ngầm định của mọi flex item là `flex-shrink: 1` (cho phép co lại khi không gian container không đủ). Khi nội dung của `.content` quá dài hoặc có những phần tử không thể bẻ dòng (như ảnh lớn, link dài), nó sẽ ép vùng không gian của `.layout`, khiến trình duyệt bóp nghẹt chiều rộng `250px` của `.sidebar` để nhường chỗ.
* **Cách sửa:** Ngăn không cho sidebar co lại bằng cách gán `flex-shrink: 0`.

```css
.layout { 
    display: flex; 
}

.sidebar { 
    width: 250px; 
    flex-shrink: 0; 
}

.content { 
    flex: 1; 
    min-width: 0; 
}