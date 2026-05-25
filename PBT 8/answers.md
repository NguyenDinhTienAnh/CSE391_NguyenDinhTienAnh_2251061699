# PHẦN A 

## Câu A1 

### 1. Function Declaration
```javascript
function tinhThueBaoHiem(luong) {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}

console.log(tinhThueBaoHiem(15000000));  // { thue: 1500000, thuc_nhan: 13500000 }
console.log(tinhThueBaoHiem(10000000));  // { thue: 0, thuc_nhan: 10000000 }
```

### 2. Function Expression
```javascript
const tinhThueBaoHiem = function(luong) {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

console.log(tinhThueBaoHiem(15000000));  // { thue: 1500000, thuc_nhan: 13500000 }
console.log(tinhThueBaoHiem(10000000));  // { thue: 0, thuc_nhan: 10000000 }
```

### 3. Arrow Function
```javascript
const tinhThueBaoHiem = (luong) => {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

console.log(tinhThueBaoHiem(15000000));  // { thue: 1500000, thuc_nhan: 13500000 }
console.log(tinhThueBaoHiem(10000000));  // { thue: 0, thuc_nhan: 10000000 }
```

### Hoisting — Khác biệt quan trọng

**CÓ SỰ KHÁC NHAU GIỮA 3 CÁCH:**

#### Ví dụ 1: Function Declaration được hoisted toàn bộ
```javascript
console.log(tinhThueBaoHiem(15000000));  // ✅ CHẠY OK: { thue: 1500000, thuc_nhan: 13500000 }

function tinhThueBaoHiem(luong) {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}

// Function Declaration được hoisting: JavaScript di chuyển toàn bộ function lên đầu scope
```

#### Ví dụ 2: Function Expression hoisted nhưng giá trị là undefined
```javascript
console.log(tinhThueBaoHiem(15000000));  // ❌ LỖI: TypeError: tinhThueBaoHiem is not a function

const tinhThueBaoHiem = function(luong) {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

// const được hoisting nhưng không được khởi tạo (Temporal Dead Zone)
// Variable name được hoisting nhưng giá trị là undefined cho đến khi gán
```

#### Ví dụ 3: Arrow Function hoisted nhưng giá trị là undefined (giống Expression)
```javascript
console.log(tinhThueBaoHiem(15000000));  // ❌ LỖI: TypeError: tinhThueBaoHiem is not a function

const tinhThueBaoHiem = (luong) => {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

// Arrow Function có hoisting giống Function Expression
```

**Kết luận hoisting:**
| Cách | Hoisting | Gọi trước khai báo | Ghi chú |
|-----|----------|------------------|--------|
| **Function Declaration** | ✅ Toàn bộ function | ✅ Chạy OK | Function có thể gọi trước khai báo |
| **Function Expression** | ⚠️ Chỉ variable (undefined) | ❌ Lỗi | Phải gọi sau khai báo |
| **Arrow Function** | ⚠️ Chỉ variable (undefined) | ❌ Lỗi | Phải gọi sau khai báo |

---

## Câu A2 

### Đoạn 1: Counter với Closure

```javascript
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

**Giải thích:**
- Biến `count` nằm trong scope của hàm `counter()`
- 3 method (increment, decrement, getCount) là arrow functions tạo thành **closure** - chúng "nhớ" biến `count`
- Mỗi lần gọi các method, chúng truy cập vào cùng 1 biến `count` trong scope cha
- `++count`: tăng count lên 1 rồi trả về → 1, 2, 3
- `--count`: giảm count xuống 1 rồi trả về → 2
- `getCount()`: trả về giá trị hiện tại → 2

**Output:**
```
1
2
3
2
2
```

---

### Đoạn 2: var vs let trong setTimeout

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

**Output sau 100ms:**
```
var: 3
var: 3
var: 3
```

**Output sau 200ms:**
```
let: 0
let: 1
let: 2
```

---

### Giải thích chi tiết: Tại sao var và let cho kết quả khác nhau?

#### Với `var`:

1. **Scope của var là function scope, không phải block scope**
   - Vòng lặp `for (var i = 0; i < 3; i++)` không tạo scope mới cho mỗi lần lặp
   - Biến `i` chỉ có 1 bản copy duy nhất trong scope global/function

2. **Cơ chế hoạt động:**
   ```javascript
   // Vòng lặp kết thúc
   for (var i = 0; i < 3; i++) {    // i = 0, 1, 2
       setTimeout(() => console.log("var:", i), 100);  // Thêm callback vào queue
   }
   // Sau khi vòng lặp kết thúc, i = 3
   
   // Sau 100ms, callbacks thực thi
   // Tất cả 3 callbacks đều đọc giá trị của i = 3
   ```

3. **Timeline:**
   ```
   [Vòng lặp]  →  i = 0, add callback  →  i = 1, add callback  →  i = 2, add callback  →  i = 3 (loop ends)
                                                                                          ↓
   [100ms sau]  →  Callback 1: console.log(i)  // i = 3 ✗
                →  Callback 2: console.log(i)  // i = 3 ✗
                →  Callback 3: console.log(i)  // i = 3 ✗
   ```

#### Với `let`:

1. **Scope của let là block scope**
   - Mỗi lần lặp, `let j` tạo ra 1 binding mới trong block scope của vòng lặp đó
   - Vòng lặp 1: j = 0, Vòng lặp 2: j = 1, Vòng lặp 3: j = 2
   - Mỗi callback "nhớ" giá trị j của lần lặp mà nó được tạo (closure)

2. **Cơ chế hoạt động:**
   ```javascript
   for (let j = 0; j < 3; j++) {
       // Iteration 1: Tạo block scope với j = 0
       setTimeout(() => console.log("let:", j), 200);  // Callback "nhớ" j = 0
   }
   for (let j = 0; j < 3; j++) {
       // Iteration 2: Tạo block scope với j = 1
       setTimeout(() => console.log("let:", j), 200);  // Callback "nhớ" j = 1
   }
   for (let j = 0; j < 3; j++) {
       // Iteration 3: Tạo block scope với j = 2
       setTimeout(() => console.log("let:", j), 200);  // Callback "nhớ" j = 2
   }
   ```

3. **Timeline:**
   ```
   [Vòng lặp]  →  Block 1: j = 0, add callback(j=0)  →  Block 2: j = 1, add callback(j=1)  →  Block 3: j = 2, add callback(j=2)
                                                                                          ↓
   [200ms sau]  →  Callback 1: console.log(j)  // j = 0 ✓ (closure)
                →  Callback 2: console.log(j)  // j = 1 ✓ (closure)
                →  Callback 3: console.log(j)  // j = 2 ✓ (closure)
   ```

#### Sơ đồ so sánh:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ var i                          │ let j                     │
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ Scope: Function/Global         │ Scope: Block (mỗi lần)   │
│ 1 biến i duy nhất              │ 3 biến j riêng biệt      │
│ Tất cả callback đọc i = 3      │ Mỗi callback đọc j riêng │
│ Output: 3, 3, 3                │ Output: 0, 1, 2          │
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Kết luận

- **`var` không tạo scope mới mỗi lần lặp** → Tất cả callbacks share 1 biến i → Kết quả là giá trị cuối cùng của i (3)
- **`let` tạo scope mới mỗi lần lặp** → Mỗi callback có closure riêng → Kết quả là giá trị j lúc tạo callback
- Đây là lý do tại sao **`let` được khuyến cáo sử dụng thay vì `var`** trong JavaScript hiện đại

---

## Câu A3 

Cho mảng: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`

Viết 1 dòng code cho mỗi yêu cầu (dùng arrow function):

**1. Lấy các số chẵn** → [2, 4, 6, 8, 10]
```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = nums.filter(n => n % 2 === 0);
// Output: [2, 4, 6, 8, 10]
```

**2. Nhân mỗi số với 3** → [3, 6, 9, ..., 30]
```javascript
const tripled = nums.map(n => n * 3);
// Output: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
```

**3. Tính tổng tất cả** → 55
```javascript
const sum = nums.reduce((total, n) => total + n, 0);
// Output: 55
```

**4. Tìm số đầu tiên > 7** → 8
```javascript
const firstGreater7 = nums.find(n => n > 7);
// Output: 8
```

**5. Kiểm tra CÓ số > 10 không** → false
```javascript
const hasGreater10 = nums.some(n => n > 10);
// Output: false
```

**6. Kiểm tra TẤT CẢ đều > 0** → true
```javascript
const allPositive = nums.every(n => n > 0);
// Output: true
```

**7. Tạo mảng "Số X là [chẵn/lẻ]"** → ["Số 1 là lẻ", "Số 2 là chẵn", ...]
```javascript
const descriptions = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// Output: ["Số 1 là lẻ", "Số 2 là chẵn", "Số 3 là lẻ", "Số 4 là chẵn", ..., "Số 10 là chẵn"]
```

**8. Đảo ngược mảng (không mutate gốc)** → [10, 9, ..., 1]
```javascript
const reversed = [...nums].reverse();
// Hoặc: const reversed = nums.slice().reverse();
// Output: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// Original nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] (không đổi)
```

**Bảng tóm tắt Array Methods:**

| Method | Mục đích | Return | Mutate |
|--------|---------|--------|--------|
| `filter()` | Lọc phần tử thỏa điều kiện | Array mới |  |
| `map()` | Transform mỗi phần tử | Array mới |  |
| `reduce()` | Gộp thành 1 giá trị | Single value | |
| `find()` | Tìm phần tử đầu tiên | Single value |  |
| `some()` | CÓ phần tử thỏa điều kiện? | Boolean |  |
| `every()` | TẤT CẢ phần tử thỏa điều kiện? | Boolean |  |
| `reverse()` | Đảo ngược | Array |  (gốc) |

---

## Câu A4 

### Không chạy code, dự đoán output:

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};
```

### Phần 1: Destructuring

```javascript
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     //  ReferenceError: specs is not defined
```

**Giải thích:**
- `{ name, price, specs: { ram, color } }` → Destructure lấy: `name`, `price`, `ram`, `color`
- Cấp độ lồng nhau: `specs.ram` → `ram` (chỉ lấy `ram`, không lấy `specs`)
- Biến `specs` không được tạo, chỉ `ram` và `color` được tạo từ `specs` object
- Dòng thứ 2: lỗi vì không có biến `specs` được khai báo

**So sánh destructuring:**
```javascript
//  Sai - specs không được tạo ra
const { specs: { ram, color } } = product;
console.log(specs);  // ReferenceError

//  Đúng - nếu muốn biến specs
const { specs } = product;
console.log(specs);  // { ram: 8, storage: 256, color: "Titan" }

//  Đúng - nếu muốn cả specs và ram
const { specs, specs: { ram } } = product;
```

---

### Phần 2: Spread Operator

```javascript
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (gốc không đổi)
```

**Giải thích:**
- `{ ...product, price: 23990000, sale: true }` → Tạo object mới
  1. Spread `product`: copy tất cả properties từ product
  2. Override `price`: 25990000 → 23990000
  3. Thêm `sale: true`
- `updated` là object mới, `product` không bị thay đổi (shallow copy ở cấp độ 1)
- Output: `23990000`, `true`, `25990000`

---

### Phần 3: Spread Gotcha - Shallow Copy

```javascript
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16 (hay 8? Tại sao?)
```

**Output: 16**  (product thay đổi!)

**Giải thích chi tiết:**

Spread operator chỉ copy **sâu cấp 1 (shallow copy)**:

```javascript
// Cấu trúc product gốc:
product = {
    name: "iPhone 16",          // String - copy by value
    price: 25990000,            // Number - copy by value
    specs: { ram: 8, ... }      // Object - copy by REFERENCE 
}

// Sau spread:
copy = {
    name: "iPhone 16",          //  Copy value riêng
    price: 25990000,            //  Copy value riêng
    specs: { ram: 8, ... }      //  POINTER ĐẾN CÙNG OBJECT!
}

// Cả product và copy.specs đều trỏ tới cùng 1 object:
copy.specs === product.specs  // true ✓

// Khi thay đổi:
copy.specs.ram = 16;
// Thay đổi object mà cả copy và product đều trỏ tới
product.specs.ram;  // 16 (thay đổi theo!)
```

**Sơ đồ Memory:**
```
┌─────────────────┐
│ product object  │
│ name: ...       │
│ price: ...      │
│ specs: ─────────┼──┐
└─────────────────┘  │
                     │
┌─────────────────┐  │
│ copy object     │  │
│ name: ...       │  │
│ price: ...      │  │
│ specs: ─────────┼──┤
└─────────────────┘  │
                     │
                     ▼
              ┌──────────────────┐
              │ specs: { ram: 8 }│ ◄─── Cùng 1 object
              │ storage: 256     │
              │ color: "Titan"   │
              └──────────────────┘
```

**Khi `copy.specs.ram = 16`:**
```
              ┌──────────────────┐
              │ specs: { ram:16 }│ ◄─── Cả 2 đều thay đổi!
              │ storage: 256     │
              │ color: "Titan"   │
              └──────────────────┘
```

---

### Cách fix: Deep Copy

**Cách 1: Destructuring lồng nhau**
```javascript
const deepCopy = {
    ...product,
    specs: { ...product.specs }
};
deepCopy.specs.ram = 16;
console.log(product.specs.ram);  // 8 ✓ (không đổi)
```

**Cách 2: JSON (đơn giản nhưng chậm)**
```javascript
const deepCopy = JSON.parse(JSON.stringify(product));
deepCopy.specs.ram = 16;
console.log(product.specs.ram);  // 8 ✓
```

**Cách 3: structuredClone (hiện đại nhất)**
```javascript
const deepCopy = structuredClone(product);
deepCopy.specs.ram = 16;
console.log(product.specs.ram);  // 8 ✓
```

---

### Bảng Tóm Tắt: Shallow vs Deep Copy

| Method | Cấp 1 | Cấp 2+ | Syntax | Ghi chú |
|--------|-------|--------|--------|---------|
| **Spread `{...}`** | Copy |  Reference | `{...obj}` | Nhanh, shallow |
| **Destructuring** |  Copy |  Reference | `{...obj, nested: {...obj.nested}}` | Verbose |
| **JSON** |  Copy |  Copy | `JSON.parse(JSON.stringify(obj))` | Chậm, không copy functions |
| **structuredClone()** |  Copy |  Copy | `structuredClone(obj)` | Modern, nhanh, hỗ trợ functions |
