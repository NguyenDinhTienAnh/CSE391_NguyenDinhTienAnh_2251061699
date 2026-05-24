## Phần A
### Câu A1
#### Đoạn 1: Hoisting với `var`

**Code:**
```javascript
console.log(x);
var x = 5;
```
* **Dự đoán Output:** `undefined`
* **Kết quả khi chạy:** `undefined`

**Giải thích:** Trong JavaScript, các biến được khai báo bằng `var` sẽ gặp hiện tượng Hoisting (kéo lên). Trình biên dịch sẽ đem phần khai báo biến (`var x;`) lên đầu scope (phạm vi), nhưng phần gán giá trị (`x = 5;`) thì vẫn giữ nguyên ở vị trí cũ. Code thực thi thực tế dưới góc nhìn của JS Engine sẽ giống như thế này:

### Đoạn 2: Temporal Dead Zone (TDZ) với `let`

**Code:**
```javascript
console.log(y);
let y = 10;
```
* **Dự đoán Output:** Lỗi `ReferenceError`
* **Kết quả khi chạy:** `ReferenceError: Cannot access 'y' before initialization`

**Giải thích:** Khác với `var`, biến khai báo bằng `let` (và `const`) cũng được hoisting lên đầu block, nhưng chúng không được khởi tạo giá trị mặc định là `undefined`. Từ đầu block cho đến dòng khai báo `let y = 10;`, biến `y` nằm trong một vùng gọi là **Temporal Dead Zone (TDZ)**. Bất kỳ nỗ lực nào truy cập vào biến trong vùng TDZ đều sẽ văng lỗi.

#### Đoạn 3: Gán lại giá trị cho `const`

**Code:**
```javascript
const z = 15;
z = 20;
console.log(z);
```
* **Dự đoán Output:** Lỗi `TypeError`
* **Kết quả khi chạy:** `TypeError: Assignment to constant variable.`

**Giải thích:** Khóa `const` được sử dụng để khai báo một hằng số. Sau khi đã khởi tạo (`const z = 15;`), bạn không thể gán lại một giá trị mới cho cùng một định danh đó. Lỗi sẽ ném ra ngay ở dòng `z = 20;`.
#### Đoạn 4: Reference Type (Kiểu tham chiếu) với `const`

**Code:**
```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```
* **Dự đoán Output:** `[1, 2, 3, 4]`
* **Kết quả khi chạy:** `[1, 2, 3, 4]`

**Giải thích kết quả "bất ngờ":** Nhiều người lầm tưởng `const` nghĩa là giá trị hoàn toàn không thể thay đổi (immutable). Thực chất, `const` chỉ ngăn chặn việc gán lại địa chỉ vùng nhớ (reassignment). Vì `arr` là một mảng (kiểu tham chiếu - Reference Type), bạn không thể gán `arr = [5, 6]` (vì điều này thay đổi vùng nhớ), nhưng bạn hoàn toàn có thể thay đổi, thêm, hoặc xóa các phần tử bên trong vùng nhớ đó thông qua các phương thức như `.push()`.
#### Đoạn 5: Block Scope (Phạm vi khối) với `let`

**Code:**
```javascript
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```
* **Dự đoán Output:** `Trong block: 2`
  `Ngoài block: 1`
* **Kết quả khi chạy:** `Trong block: 2`
  `Ngoài block: 1`

**Giải thích:** Cả `let` và `const` đều có phạm vi hoạt động theo khối (Block Scoped), nghĩa là chúng chỉ tồn tại bên trong cặp dấu ngoặc nhọn `{}` chứa chúng.
* Biến `a` bên trong `{ let a = 2; ... }` là một biến hoàn toàn mới và độc lập, che khuất (shadow) biến `a` ở bên ngoài.
* Khi ra khỏi khối `{}`, biến `a` bên trong bị hủy, và câu lệnh `console.log` cuối cùng sẽ truy xuất lại biến `a` ở phạm vi toàn cục (hoặc phạm vi hàm bên ngoài) với giá trị ban đầu là `1`.

### Câu A2
#### 1. Dự đoán kết quả
```javascript
console.log(typeof null);       // "object"
console.log(typeof undefined);  // "undefined"
console.log(typeof NaN);        // "number"

console.log("5" + 3);           // "53"
console.log("5" - 3);           // 2
console.log("5" * "3");         // 15

console.log(true + true);       // 2

console.log([] + []);           // ""
console.log([] + {});           // "[object Object]"
console.log({} + []);           // "[object Object]"
```
#### 2. Giải thích sự khác biệt giữa `"5" + 3` và `"5" - 3`
Sự khác biệt này xuất phát từ cách JavaScript xử lý **Toán tử đa hình (Overloaded Operator)** và cơ chế **Ép kiểu ngầm định (Implicit Type Coercion)**.

* **Trường hợp `"5" + 3` (Kết quả: `"53"`)**
  * Toán tử `+` trong JavaScript có hai công dụng: Cộng số học và **Nối chuỗi (String Concatenation)**. Quy tắc của JS là: Nếu có ít nhất một toán hạng là chuỗi (String), toán tử `+` sẽ ưu tiên thực hiện phép nối chuỗi.
  * Do đó, số `3` bị ép kiểu ngầm định thành chuỗi `"3"`. Phép tính trở thành `"5" + "3"`, tạo ra chuỗi `"53"`.
* **Trường hợp `"5" - 3` (Kết quả: `2`)**
  * Khác với `+`, toán tử trừ `-` (cũng như nhân `*`, chia `/`) chỉ có một công dụng duy nhất là tính toán số học. Khi thấy toán tử này, JS hiểu rằng bạn đang muốn làm toán.
  * Nó sẽ tự động ép kiểu chuỗi `"5"` thành số `5` (Number). Phép tính trở thành phép trừ toán học bình thường: `5 - 3 = 2`.

---

#### 3. Giải thích thêm các kết quả "kỳ lạ" khác (Bonus)
Có một vài dòng code ở trên thường khiến lập trình viên bối rối. Đây là lý do cốt lõi đằng sau chúng:

* **`typeof null === "object"`:** Đây thực chất là một lỗi (bug) lịch sử của JavaScript từ phiên bản đầu tiên (năm 1995). Đáng lẽ nó phải trả về `"null"`, nhưng vì lo ngại việc sửa lỗi sẽ làm hỏng hàng triệu website cũ nên lỗi này được giữ nguyên cho đến tận bây giờ.
* **`typeof NaN === "number"`:** `NaN` là viết tắt của *Not-A-Number* (Không-phải-là-số). Tuy nhiên, về mặt kỹ thuật, nó là một giá trị thuộc kiểu dữ liệu `Number` được quy định bởi chuẩn tính toán máy tính IEEE 754, dùng để biểu diễn một phép toán số học bị hỏng (ví dụ: `"hello" / 2`).
* **`true + true === 2`:** Khi sử dụng phép toán học `+` với kiểu Boolean, JS ép kiểu `true` thành `1` và `false` thành `0`. Nên thực tế nó đang tính `1 + 1 = 2`.
* **`[] + {} === "[object Object]"`:** Khi cộng các Object hoặc Array, JS cố gắng biến chúng thành chuỗi (bằng phương thức `.toString()`).
  * Mảng rỗng `[]` biến thành chuỗi rỗng `""`.
  * Object rỗng `{}` biến thành chuỗi `"[object Object]"`.
  * Khi ghép lại với nhau: `"" + "[object Object]"` tạo ra `"[object Object]"`.

  ### Câu A3
  #### 1. Dự đoán kết quả (True / False)

```javascript
console.log(5 == "5");          // true  (So sánh lỏng lẻo, chuỗi "5" bị ép kiểu thành số 5)
console.log(5 === "5");         // false (So sánh nghiêm ngặt, khác kiểu dữ liệu: Number vs String)
console.log(null == undefined); // true  (Trường hợp đặc biệt quy định bởi đặc tả ECMAScript)
console.log(null === undefined);// false (Khác kiểu dữ liệu: Null vs Undefined)
console.log(NaN == NaN);        // false (NaN không bằng bất kỳ giá trị nào, kể cả chính nó)
console.log(0 == false);        // true  (Cả hai đều bị ép kiểu về giá trị Falsy trong phép so sánh lỏng lẻo)
console.log(0 === false);       // false (Khác kiểu dữ liệu: Number vs Boolean)
console.log("" == false);       // true  (Chuỗi rỗng và false đều là Falsy)
```
#### 2. Giải thích các trường hợp đặc biệt

* **`5 == "5"` (`true`) và `5 === "5"` (`false`):** Toán tử `==` (so sánh trừu tượng - Loose Equality) tự động ép kiểu chuỗi `"5"` thành số `5` trước khi so sánh. Trong khi đó, `===` (so sánh nghiêm ngặt - Strict Equality) kiểm tra cả kiểu dữ liệu; vì một bên là `Number`, một bên là `String` nên kết quả trả về là `false`.
* **`null == undefined` (`true`):** Đây là một quy tắc đặc biệt được định nghĩa sẵn trong đặc tả của JavaScript (ECMAScript). Khi dùng `==`, hai giá trị này được coi là tương đương nhau (đều đại diện cho sự trống rỗng). Tuy nhiên với `===`, chúng thuộc hai kiểu dữ liệu khác nhau (`null` thuộc kiểu Null, `undefined` thuộc kiểu Undefined) nên trả về `false`.
* **`NaN == NaN` (`false`):** Đây là giá trị "độc nhất vô nhị" trong JavaScript. Theo tiêu chuẩn IEEE 754, `NaN` không bằng bất kỳ giá trị nào, kể cả chính nó. Để kiểm tra một giá trị có phải `NaN` hay không, bạn bắt buộc phải dùng hàm `Number.isNaN(value)` hoặc `isNaN()`.
* **`0 == false` và `"" == false` (`true`):** Khi dùng `==` với kiểu Boolean, JavaScript sẽ ép kiểu `false` thành số `0`. Sau đó, chuỗi rỗng `""` cũng được ép kiểu số học thành số `0`. Phép toán lúc này trở thành `0 == 0` nên cho ra kết quả `true`.

---

#### 3. Quy tắc vàng: Nên dùng `==` hay `===`?

**Lời khuyên:** Trong thực tế phát triển dự án, bạn **luôn luôn nên dùng `===` (và `!==`)** cho hầu hết mọi trường hợp so sánh.

**Tại sao?**
* **Tránh được những bug "ngầm" nguy hiểm:** Như bạn đã thấy ở các ví dụ `0 == false` hay `"" == false`, sự ép kiểu ngầm định của `==` rất dễ gây ra những lỗi logic khó lường. Ví dụ, nếu người dùng gửi lên một chuỗi trống `""`, hệ thống dùng `==` có thể vô tình hiểu rằng họ vừa chọn `false` hoặc nhập số `0`.
* **Tăng tính tường minh (Explicit):** Khi bạn viết `===`, bạn đang khẳng định với JS Engine và các lập trình viên khác trong team rằng: *"Tôi muốn giá trị này phải khớp hoàn toàn cả về mặt dữ liệu lẫn kiểu dữ liệu"*. Code sẽ sạch sẽ, dễ đọc và dễ bảo trì hơn.
* **Hiệu năng tốt hơn (Dù rất nhỏ):** Vì `===` không phải mất thời gian thực hiện các bước ép kiểu phức tạp (Type Coercion) khi hai thực thể khác kiểu nhau mà sẽ trả về `false` ngay lập tức, giúp tối ưu hóa luồng xử lý của JS Engine.

### Câu A4
#### 1. Danh sách TẤT CẢ các giá trị Falsy trong JavaScript
Trong JavaScript, chỉ có chính xác **8 giá trị** sau đây được coi là Falsy (khi chuyển sang kiểu Boolean hoặc đưa vào câu lệnh điều kiện sẽ cho ra kết quả `false`):

* **`false`** — Chính bản thân từ khóa boolean `false`.
* **`0`** — Số không (Kiểu `Number`).
* **`-0`** — Số không âm (được dùng trong một số phép toán kỹ thuật).
* **`0n`** — Số không thuộc kiểu `BigInt`.
* **`""`** (hoặc `''`, ````) — Chuỗi rỗng, hoàn toàn không chứa bất kỳ ký tự nào bên trong.
* **`null`** — Giá trị rỗng/không tồn tại mang tính chủ đích.
* **`undefined`** — Biến đã được khai báo nhưng chưa được gán giá trị.
* **`NaN`** — *Not-A-Number* (kết quả của một phép toán số học bị lỗi).

> **Lưu ý đặc biệt:** Mọi giá trị nằm ngoài danh sách 8 mục trên đều được coi là **Truthy** (luôn trả về `true`), bao gồm cả mảng rỗng `[]` hay đối tượng rỗng `{}`.

---

#### 2. Dự đoán kết quả in ra màn hình
Dựa vào quy tắc phân loại Falsy / Truthy ở trên, dưới đây là bảng phân tích chi tiết cho từng dòng lệnh điều kiện:

| Dòng lệnh | Bản chất giá trị | Thuộc tính | Kết quả in hay không? |
| :--- | :--- | :--- | :--- |
| `if ("0")` | Chuỗi chứa ký tự `"0"` (không phải chuỗi rỗng) | **Truthy** | **Có** in chữ A |
| `if ("")` | Chuỗi rỗng hoàn toàn | **Falsy** | **Không** in (B) |
| `if ([])` | Mảng rỗng (Tất cả Object/Array đều là Truthy) | **Truthy** | **Có** in chữ C |
| `if ({})` | Đối tượng rỗng (Object rỗng vẫn là Truthy) | **Truthy** | **Có** in chữ D |
| `if (null)` | Giá trị `null` nằm trong danh sách Falsy | **Falsy** | **Không** in (E) |
| `if (0)` | Số `0` nằm trong danh sách Falsy | **Falsy** | **Không** in (F) |
| `if (-1)` | Số âm (Chỉ có số `0`, `-0` và `0n` mới là Falsy) | **Truthy** | **Có** in chữ G |
| `if (" ")` | Chuỗi chứa 1 dấu cách (khoảng trắng vẫn tính là 1 ký tự) | **Truthy** | **Có** in chữ H |

### Câu A5
#### Sử dụng Template Literals (dấu backtick `), 3 đoạn code sẽ được viết lại như sau:

**Cách 1: Nối chuỗi thông thường (String Interpolation)**
```javascript
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```
**Cách 2: Tạo đường dẫn URL động có tham số**

```javascript
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```
**Cách 3: Tạo chuỗi HTML nhiều dòng (Multiline String)**

```javascript
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```


## Phần C 

### Câu C1

#### Danh sách TẤT CẢ các lỗi tìm được:

| # | Dòng | Lỗi | Giải thích | Cách sửa |
|---|------|-----|-----------|----------|
| 1 | 2 | Thiếu `;` | Return statement thiếu dấu chấm phẩy (mặc dù JS tự động thêm nhưng vẫn là lỗi về style) | Thêm `;` vào cuối dòng |
| 2 | 5 | Thiếu `;` | Câu lệnh `var giamGia = ...` thiếu dấu chấm phẩy | Thêm `;` vào cuối dòng |
| 3 | 8 | **Phép gán thay vì so sánh** ⭐ | `if (giaSauGiam = 0)` dùng `=` (gán) thay vì `===` (so sánh). Điều này sẽ gán 0 cho biến thay vì kiểm tra điều kiện | Sửa thành `if (giaSauGiam === 0)` |
| 4 | 11 | Thiếu `;` | Return statement thiếu dấu chấm phẩy | Thêm `;` vào cuối dòng |
| 5 | 15 | **Input kiểu String** ⭐ | `tinhGiaGiamGia("100000", 20)` truyền "100000" dạng string, dẫn đến phép toán `string * number` không chính xác | Sửa thành `tinhGiaGiamGia(100000, 20)` (số, không phải string) |
| 6 | 15 | Không validate input | Không kiểm tra giaBan có phải là số dương hay không | Thêm điều kiện kiểm tra: `if (giaBan <= 0) return "Giá bán phải > 0"` |
| 7 | 21 | **Lỗi Closure với `var`** ⭐ | Sử dụng `var i` trong vòng lặp với setTimeout gây ra closure issue: Khi callback của setTimeout chạy, giá trị `i` đã là 5 ở tất cả các callback | Sửa `var i` thành `let i` để tạo block scope riêng cho mỗi lần lặp |

#### Code gốc (sai):
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"    //  Lỗi 1: Thiếu ;
    }
    
    var giamGia = giaBan * phanTramGiam / 100   //  Lỗi 2: Thiếu ;
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {                       //  Lỗi 3: = thay vì ===
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam                           //  Lỗi 4: Thiếu ;
}

// Test
const gia = tinhGiaGiamGia("100000", 20)       //  Lỗi 5: String thay vì number
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {                  //  Lỗi 7: var gây closure issue
    setTimeout(function() {
        console.log("Item " + i)               // → In ra "Item 5" năm lần
    }, 1000)
}
```

#### Code sửa (đúng):
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Validate input
    if (typeof giaBan !== 'number' || giaBan <= 0) {
        return "Giá bán phải là số dương";      //  Lỗi 6: Validate
    }
    
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";  //  Lỗi 1: Thêm ;
    }
    
    const giamGia = giaBan * phanTramGiam / 100; // ✅ Lỗi 2: Thêm ; + dùng const
    const giaSauGiam = giaBan - giamGia;
     Lỗi 3: === thay vì =
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;                         //  Lỗi 4: Thêm ;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);        //  Lỗi 5: Number, không String
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {                  //  Lỗi 7: let thay vì var
    setTimeout(function() {
        console.log("Item " + i);              // → In ra "Item 0", "Item 1", ..., "Item 4"
    }, 1000);
}
```

#### Giải thích chi tiết lỗi 7 (Closure với var vs let):

**Tại sao `var` gây lỗi?**
```javascript
// Khi dùng var i
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
// → Output: Item 5, Item 5, Item 5, Item 5, Item 5
// Vì var i được khai báo ở phạm vi FUNCTION, không phải block
// Khi setTimeout chạy sau 1 giây, vòng lặp đã kết thúc với i = 5
// Tất cả 5 callback đều tham chiếu đến cùng một biến i = 5
```

**Tại sao `let` hoạt động đúng?**
```javascript
// Khi dùng let i
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
// → Output: Item 0, Item 1, Item 2, Item 3, Item 4
// Vì let i được khai báo ở phạm vi BLOCK (mỗi lần lặp có 1 block riêng)
// JavaScript tự động tạo ra 5 closure riêng biệt, mỗi cái lưu giá trị i khác nhau
// Callback thứ 1 sẽ dùng i từ lần lặp 1 (i=0)
// Callback thứ 2 sẽ dùng i từ lần lặp 2 (i=1), v.v...
```

---
