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

---

# PHẦN C 

## Câu C1 

### Trước (Ugly Code): 30+ dòng

```javascript
function processOrders(orders) {
    var result = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "completed") {
            if (orders[i].total > 100000) {
                var item = {};
                item.id = orders[i].id;
                item.customer = orders[i].customer;
                item.total = orders[i].total;
                item.discount = orders[i].total * 0.1;
                item.finalTotal = orders[i].total - item.discount;
                result.push(item);
            }
        }
    }
    // Bubble sort
    for (var j = 0; j < result.length; j++) {
        for (var k = j + 1; k < result.length; k++) {
            if (result[j].finalTotal < result[k].finalTotal) {
                var temp = result[j];
                result[j] = result[k];
                result[k] = temp;
            }
        }
    }
    return result;
}
```

**Vấn đề:**
-  Sử dụng `var` (scope issues)
-  Nested for loops phức tạp
-  Bubble sort O(n²) chậm
-  Manual object creation
-  Khó đọc, khó bảo trì

### Sau (Clean Code): 8 dòng

```javascript
function processOrders(orders) {
    return orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
}
```

**Cải thiện:**
-  Dùng `const` (block scope, safer)
-  Chain array methods (declarative)
-  `.sort()` tối ưu O(n log n)
-  Destructuring + object shorthand
-  Arrow functions
-  Dễ đọc, dễ test, dễ bảo trì

**So sánh:**

| Aspect | Trước | Sau |
|--------|--------|--------|
| Dòng code | 30+ | 8 |
| Readability | Xấu | Tuyệt |
| Performance | O(n + n²) | O(n log n) |
| Maintainability | Khó | Dễ |
| Modern JS | Không | Có |

**Kết quả test với dữ liệu:**

```javascript
const testOrders = [
    { id: 1, customer: "Nguyễn A", total: 500000, status: "completed" },
    { id: 2, customer: "Trần B", total: 80000, status: "completed" },
    { id: 3, customer: "Lê C", total: 200000, status: "pending" },
    { id: 4, customer: "Phạm D", total: 150000, status: "completed" },
    { id: 5, customer: "Hoàng E", total: 300000, status: "completed" }
];

processOrders(testOrders);
```

**Output (sắp xếp giảm dần theo finalTotal):**
```javascript
[
    { id: 1, customer: "Nguyễn A", total: 500000, discount: 50000, finalTotal: 450000 },
    { id: 5, customer: "Hoàng E", total: 300000, discount: 30000, finalTotal: 270000 },
    { id: 4, customer: "Phạm D", total: 150000, discount: 15000, finalTotal: 135000 }
]
```

**Giải thích chi tiết:**

1. `.filter()` - Lọc 2 điều kiện:
   - `status === "completed"` → loại Lê C (pending)
   - `total > 100000` → loại Trần B (80000)

2. `.map()` - Transform mỗi order:
   - Destructuring: `{ id, customer, total }` từ order
   - Tính: `discount = total * 0.1`, `finalTotal = total * 0.9`
   - Trả về object mới

3. `.sort()` - Sắp xếp giảm dần:
   - `(a, b) => b.finalTotal - a.finalTotal`
   - 450000 > 270000 > 135000

---

## Câu C2

### Yêu cầu:
Tự viết `map`, `filter`, `reduce` (không dùng built-in Array methods)

### Triển khai:

```javascript
const miniArray = {
    // map(arr, fn) - Transform mỗi element
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    
    // filter(arr, fn) - Giữ lại elements thỏa điều kiện
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    
    // reduce(arr, fn, initialValue) - Gộp lại thành 1 giá trị
    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        let startIndex = 0;
        
        // Nếu không có initialValue, dùng phần tử đầu tiên
        if (initialValue === undefined) {
            accumulator = arr[0];
            startIndex = 1;
        }
        
        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        
        return accumulator;
    }
};
```

### Chi tiết từng method:

#### 1. map(arr, fn)

**Cách hoạt động:**
- Loop qua mỗi element
- Call `fn(element, index, array)` với đủ 3 tham số
- Push kết quả vào array mới
- Return array mới

**Test cases:**
```javascript
console.log(miniArray.map([1, 2, 3], x => x * 2));
// → [2, 4, 6] ✓

console.log(miniArray.map([1, 2, 3, 4], x => x ** 2));
// → [1, 4, 9, 16] ✓
```

#### 2. filter(arr, fn)

**Cách hoạt động:**
- Loop qua mỗi element
- Nếu `fn(element)` return **true** → push vào result
- Return array mới chỉ chứa elements thỏa điều kiện

**Test cases:**
```javascript
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));
// → [3, 4] ✓

console.log(miniArray.filter([1, 2, 3, 4], x => x % 2 === 0));
// → [2, 4] ✓ (số chẵn)
```

#### 3. reduce(arr, fn, initialValue)

**Cách hoạt động (với initialValue):**
```javascript
miniArray.reduce([1, 2, 3, 4], (acc, x) => acc + x, 0)

Initial: accumulator = 0
Loop:
  i=0: accumulator = fn(0, 1) = 0 + 1 = 1
  i=1: accumulator = fn(1, 2) = 1 + 2 = 3
  i=2: accumulator = fn(3, 3) = 3 + 3 = 6
  i=3: accumulator = fn(6, 4) = 6 + 4 = 10
Return: 10 ✓
```

**Cách hoạt động (không có initialValue):**
```javascript
miniArray.reduce([1, 2, 3, 4], (acc, x) => acc + x)

Initial: accumulator = arr[0] = 1, startIndex = 1
Loop:
  i=1: accumulator = fn(1, 2) = 1 + 2 = 3
  i=2: accumulator = fn(3, 3) = 3 + 3 = 6
  i=3: accumulator = fn(6, 4) = 6 + 4 = 10
Return: 10 ✓
```

**Test cases:**
```javascript
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10 ✓

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b));
// → 10 ✓ (không có initialValue)

console.log(miniArray.reduce(['a', 'b', 'c'], (acc, x) => acc + x, ''));
// → 'abc' ✓
```

### So sánh với built-in Array methods:

```javascript
// miniArray.map
console.log(miniArray.map([1,2,3], x => x * 2));      // [2, 4, 6]
// vs built-in
console.log([1,2,3].map(x => x * 2));                // [2, 4, 6]
// ✓ Kết quả giống hệt

// miniArray.filter
console.log(miniArray.filter([1,2,3,4], x => x > 2)); // [3, 4]
// vs built-in
console.log([1,2,3,4].filter(x => x > 2));           // [3, 4]
// ✓ Kết quả giống hệt

// miniArray.reduce
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // 10
// vs built-in
console.log([1,2,3,4].reduce((a,b) => a+b, 0));     // 10
// ✓ Kết quả giống hệt
```

### Điểm nổi bật của miniArray:

 **Hoàn toàn tương tự built-in methods**
- Hỗ trợ đủ 3 tham số: element, index, array
- Hỗ trợ initialValue optional cho reduce()
- Cơ chế hoạt động 100% tương tự

 **Có thể chain các operations:**
```javascript
const result = miniArray.filter(
    miniArray.map([1, 2, 3, 4, 5], x => x * 2),
    x => x > 4
);
// → [6, 8, 10]
```

 **Thích hợp cho học tập:**
- Hiểu rõ cơ chế bên dưới mỗi method
- Không dùng magic, chỉ dùng for loops
- Dễ debug và trace execution

