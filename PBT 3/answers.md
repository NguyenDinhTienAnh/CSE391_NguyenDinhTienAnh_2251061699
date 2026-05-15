# PHIẾU BÀI TẬP 03 — CSS CORE (Selects/Box Model/Inheritance/Cascade)

## A1 (5đ) — 3 cách nhúng CSS vào HTML

### 1) Inline CSS

```html
<p style="color: red;">Hello</p>
```

- **Ưu điểm:** Chỉ áp dụng cho đúng 1 element; nhanh để test.
- **Nhược điểm:** Khó bảo trì; trộn logic nội dung với style; không tái sử dụng.
- **Khi nào dùng:** Sửa nhanh chỗ cụ thể hoặc demo.

### 2) Internal CSS (trong thẻ `<style>`)

```html
<head>
  <style>
    p {
      color: red;
    }
  </style>
</head>
```

- **Ưu điểm:** Không cần file ngoài, phù hợp cho trang nhỏ/ trang tĩnh.
- **Nhược điểm:** Không dùng lại cho nhiều trang, nếu trang nhiều sẽ khó quản lý.
- **Khi nào dùng:** Bài tập/trang tĩnh nhỏ.

### 3) External CSS (file `.css` riêng)

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

- **Ưu điểm:** Tái sử dụng cho nhiều trang, dễ bảo trì, dễ đồng bộ UI.
- **Nhược điểm:** Phải quản lý nhiều file.
- **Khi nào dùng:** Website/app thực tế.

### Câu thêm: nếu cùng 1 element có cả 3 cách đồng thời áp dụng, cách nào thắng?

**Inline CSS thắng (cao nhất)** → sau đó đến **Internal** → cuối cùng **External**.

- Inline: ưu tiên cao do thuộc tính `style`.
- Internal: sau Inline.
- External: ưu tiên thấp hơn.

---

## A2 (8đ) — CSS Selectors — Dự đoán kết quả

1. `h1` → **Chọn:** `ShopTLU`.
2. `.price` → **Chọn:** `25.990.000đ`, `45.990.000đ`.
3. `#app header` → **Chọn:** toàn bộ `header`.
4. `nav a:first-child` → **Chọn:** `Home`.
5. `.product.featured h2` → **Chọn:** `MacBook Pro`.
6. `article > p` → **Chọn:**
   - `25.990.000đ`
   - `Mô tả sản phẩm...` (của iPhone)
   - `45.990.000đ`
   - `Mô tả sản phẩm...` (của MacBook)
7. `a[href="/"]` → **Chọn:** `Home`
8. `.top-bar.dark h1` → **Chọn:** `ShopTLU`

---

## A3 (7đ) — Box Model — Tính toán kích thước

### Trường hợp 1: `content-box` (mặc định)

```css
.box-1 {
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

- **Chiều rộng hiển thị (border-box ngoài cùng) =**
  width(content) + padding`x`2 + border`x`2
  = 400 + 20`x`2 + 5`x`2
  = 400 + 40 + 10
  = **450px**
- **Không gian chiếm trên trang =** border-box + margin`x`2
  = 450 + 10`x`2
  = 450 + 20
  = **470px**

### Trường hợp 2: `border-box`

```css
.box-2 {
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

- **Chiều rộng hiển thị (border-box ngoài cùng) =** **400px**
- **Kích thước content thực tế =**
  border-box - padding`x`2 - border`x`2
  = 400 - 20`x`2 - 5`x`2
  = 400 - 40 - 10
  = **350px**
- **Không gian chiếm trên trang =**
  400 + margin`x`2 = 400 + 20 = **420px**

### Trường hợp 3: Margin collapse

```css
.box-a {
  margin-bottom: 25px;
}
.box-b {
  margin-top: 40px;
}
```

- **Khoảng cách giữa box-a và box-b =** **max(25px, 40px) = 40px**
- **Giải thích tại sao KHÔNG phải 65px:**
  Margin giữa 2 khối dọc theo cùng trục có thể **collapse** → thay vì cộng, trình duyệt chọn **giá trị lớn hơn**.

**Nâng cao:** `.box-a { margin-bottom: -10px; }` và `.box-b { margin-top: 40px; }`

- **Khoảng cách =**
  collapse của `-10` và `40` ⇒ **40px + (-10px) = 30px**
  (vì một margin âm sẽ kéo sát lại, tổng thể là 30px)

---

## A4 (5đ) — Specificity (Độ ưu tiên)

Target: `<p class="price" id="main-price">`

### 1) Tính specificity score (a,b,c)

Rule A: `p { color: black; }`

- Specificity: 1

Rule B: `.price { color: blue; }`

- Specificity: 10

Rule C: `#main-price { color: red; }`

- Specificity: 100

Rule D: `p.price { color: green; }`

- Specificity: 11

### 2) Element sẽ có màu gì?

Vì rule C có specificity là 100 ( cao nhất trong 4 rule ) nên thẻ `<p>` sẽ chọn rule C.

⇒ **Màu: red (Rule C)**

### 3) Nếu thêm `style="color: orange;"`

Inline style có độ ưu tiên cao nhất (vượt specificity thường).
⇒ **Màu: orange**

### 4) Nếu Rule A thêm `!important`?

- `!important` sẽ thắng so với các rule không `!important`.

⇒ **Màu: black** (do Rule A có `!important`)

# Phần B

## Bài B1: Liệt kê Selector
Dưới đây là các Selector được sử dụng trong bài tập để quản lý giao diện:

- **Universal Selector (`*`):** Thiết lập `box-sizing: border-box` cho toàn bộ trang.
- **Element Selector:** `body`, `a`, `th`, `td` (Tác động trực tiếp vào cấu trúc thẻ).
- **ID Selector:** `#main-header` (Định dạng duy nhất cho vùng đầu trang).
- **Class Selector:** `.navbar`, `.skill-table`, `.active` (Sử dụng cho các nhóm đối tượng lặp lại).
- **Descendant Selector:** `.navbar a` (Chỉ áp dụng cho các liên kết bên trong thanh điều hướng).
- **Pseudo-class:** `:hover` (Trạng thái di chuột), `:nth-child(even)` (Định dạng dòng chẵn/lẻ).

---

## Bài B2: Kết quả thực nghiệm Box Model

| Đặc điểm | Hộp 1 (`content-box`) | Hộp 2 (`border-box`) |
| :--- | :--- | :--- |
| **Width thiết lập** | 300px | 300px |
| **Chiều rộng thực tế** | **350px** | **300px** |
| **Cách tính** | `300 + 20(pad) + 20(pad) + 5(border) + 5(border)` | Đã bao gồm Padding và Border bên trong |



**Giải thích sự khác biệt:**
- Với `content-box`, thuộc tính `width` chỉ tính cho phần nội dung. Padding và Border sẽ đẩy kích thước hộp to ra thêm.
- Với `border-box`, thuộc tính `width` là kích thước tổng thể cuối cùng. Nội dung bên trong sẽ tự động co lại để nhường chỗ cho Padding và Border.

---

## Bài B3: Bảng tính Độ ưu tiên (Specificity Score)

Bảng dưới đây liệt kê thứ tự ưu tiên của các Selector từ thấp đến cao (thang đo: ID, Class, Element).

| STT | Selector | Specificity Score | Màu sắc dự kiến |
| :-- | :--- | :--- | :--- |
| 1 | `*` | `0, 0, 0` | Gray |
| 2 | `p` | `0, 0, 1` | Silver |
| 3 | `.text` | `0, 1, 0` | Blue |
| 4 | `.text.highlight` | `0, 2, 0` | Green |
| 5 | `p.text:not(.none)` | `0, 2, 1` | Purple |
| 6 | `#demo` | `1, 0, 0` | Orange |
| 7 | `p#demo` | `1, 0, 1` | Brown |
| 8 | `#demo.text` | `1, 1, 0` | Red |
| 9 | `#demo.text.highlight` | `1, 2, 0` | Teal |
| 10 | `body #demo.text.highlight` | `1, 2, 1` | **Darkblue** |

---
## Phần C

### Câu C1

#### 1. Phân tích lỗi (Tính toán chiều rộng thực tế)
Trong CSS mặc định (`box-sizing: content-box`), chiều rộng thực tế của một phần tử được tính theo công thức:

> **Total Width = Width + Left Padding + Right Padding + Left Border + Right Border**

#### 2. Giải thích tại sao layout bị vỡ
Tổng chiều rộng thực tế của Sidebar và Content là **1064px**, trong khi đó Container bao ngoài chỉ rộng **960px**. Vì không đủ chỗ chứa trên một hàng, trình duyệt buộc phải đẩy phần tử xuất hiện sau (Content) xuống dòng mới.

#### 3. Giải pháp khắc phục
* **Cách 1: Sử dụng `box-sizing: border-box` (Khuyên dùng)**
  Cách này giúp trình duyệt tự động tính toán lại phần nội dung (content) sao cho tổng kích thước không vượt quá `width` đã khai báo. Tuy nhiên, vì tổng 300 + 660 = 960, nhưng chúng ta lại có thêm Border, nên ta cần điều chỉnh nhẹ thông số.
* **Cách 2: Không dùng `border-box`**
  (Tính toán và trừ kích thước thủ công của Padding và Border vào Width ban đầu).

#### 4. Tổng kết
* **Chiều rộng thực tế Sidebar:** 342px.
* **Chiều rộng thực tế Content:** 722px.
* **Nguyên nhân:** Tổng chiều rộng thực tế (1064px) > Chiều rộng Container (960px).
* **Giải pháp:** Đã triển khai 2 cách (Border-box và Trừ kích thước thủ công) trong file `debug_layout.css`.

### Câu C2
#### 1. Phân tích kết quả (Dự đoán)

* **A. "Sản phẩm A" (`h2`)**
  * **Font-size:** `20px`
    * *Giải thích:* Selector `.card .title` nhắm trực tiếp vào thẻ `h2` này và thiết lập kích thước `20px`. Mặc dù thẻ cha `.container` có `14px`, nhưng quy tắc trực tiếp luôn thắng quy tắc kế thừa.
  * **Color:** `Green`
    * *Giải thích:* Ở đây có sự tranh chấp giữa `#featured .title` (màu đỏ) và `.highlight`. Tuy nhiên, lớp `.highlight` sử dụng từ khóa `!important`. Trong CSS Cascade, `!important` là "vũ khí" mạnh nhất, phá vỡ mọi quy tắc về độ ưu tiên (Specificity) thông thường.

* **B. "Mô tả sản phẩm" (`p` trong card featured)**
  * **Color:** `Blue`
    * *Giải thích:* Thẻ `p` này có thuộc tính `color: inherit`. Điều này bắt buộc nó phải lấy màu từ thẻ cha trực tiếp của nó là `.card`. Thẻ `.card` được quy định màu xanh (blue). Do đó, thẻ `p` kế thừa màu xanh này.

* **C. "Sản phẩm B" (`h2`)**
  * **Font-size:** `20px`
    * *Giải thích:* Tương tự sản phẩm A, nó khớp với selector `.card .title`.
  * **Color:** `Blue`
    * *Giải thích:* Thẻ `h2` này có class `.title`. Trong file CSS, không có selector nào khác quy định màu cho `.title` ngoại trừ các trường hợp đặc biệt (như `#featured` hoặc `.highlight` mà thẻ này không có). Vì `color` là một thuộc tính có tính kế thừa, nó sẽ lấy màu từ thẻ cha `.card` là màu xanh.

* **D. "Mô tả sản phẩm B" (`p.highlight`)**
  * **Color:** `Green`
    * *Giải thích:* Mặc dù thẻ `p` nói chung trong card có lệnh `color: inherit` (để lấy màu xanh từ `.card`), nhưng class `.highlight` được gắn trực tiếp trên thẻ `p` này và có `!important`. Một lần nữa, `!important` ghi đè hoàn toàn giá trị kế thừa.

#### 2. Tổng kết bảng kết quả

| Phần tử | Thuộc tính | Kết quả | Lý do chính |
| :--- | :--- | :--- | :--- |
| **Sản phẩm A** | `font-size` | `20px` | `.card .title` thắng inheritance. |
| **Sản phẩm A** | `color` | `Green` | `.highlight` có `!important`. |
| **Mô tả SP A** | `color` | `Blue` | `inherit` từ `.card`. |
| **Sản phẩm B** | `font-size` | `20px` | Khớp `.card .title`. |
| **Sản phẩm B** | `color` | `Blue` | Kế thừa từ `.card`. |
| **Mô tả SP B** | `color` | `Green` | `.highlight` có `!important`. |
