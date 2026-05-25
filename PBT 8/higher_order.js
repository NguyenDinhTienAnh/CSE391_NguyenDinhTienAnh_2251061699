// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return (value) => {
        return fns.reduce((acc, fn) => fn(acc), value);
    };
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("=== TEST PIPE ===");
console.log(process(5)); // → "Kết quả: 20"


// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        // Tạo key từ arguments
        const key = JSON.stringify(args);
        
        // Nếu kết quả đã tính → trả về từ cache
        if (key in cache) {
            return cache[key];
        }
        
        // Nếu chưa → tính, lưu vào cache, rồi trả về
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

console.log("\n=== TEST MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // → "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // → (không in "Đang tính...", lấy cache!)
console.log(expensiveCalc(500000));  // → "Đang tính..." → tính giá trị mới


// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId = null;
    
    return function(...args) {
        // Xóa timeout cũ (nếu có)
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Tạo timeout mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

console.log("\n=== TEST DEBOUNCE ===");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Gọi liên tục → chỉ lần cuối mới chạy
console.log("Gọi 5 lần liên tục...");
search("h");
search("ho");
search("hom");
search("home");
search("home p"); // Chỉ cái này mới chạy

// Chờ để thấy kết quả
setTimeout(() => {
    console.log("(Debounce hoàn tất)");
}, 1000);


// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxAttempts}`);
            const result = await fn();
            return result;
        } catch (error) {
            lastError = error;
            console.log(`Lỗi attempt ${attempt}: ${error.message}`);
            
            // Nếu chưa hết lần → chờ trước khi retry
            if (attempt < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }
    
    throw new Error(`Thất bại sau ${maxAttempts} attempts: ${lastError.message}`);
}

// Test retry
console.log("\n=== TEST RETRY ===");
let callCount = 0;

const unstableFunction = async () => {
    callCount++;
    if (callCount < 3) {
        throw new Error("Network error");
    }
    return "Success!";
};

retry(unstableFunction, 3)
    .then(result => console.log("Kết quả:", result))
    .catch(error => console.log("Failed:", error.message));


// === BONUS EXAMPLES ===
console.log("\n=== BONUS: COMPOSE (ngược lại pipe) ===");
function compose(...fns) {
    return (value) => {
        return fns.reduceRight((acc, fn) => fn(acc), value);
    };
}

const mathOps = compose(
    x => "Kết quả: " + x,
    x => x.toString(),
    x => x + 10,
    x => x * 2
);
console.log(mathOps(5)); // Cùng kết quả: "Kết quả: 20"


console.log("\n=== BONUS: CURRY ===");
function curry(fn) {
    const arity = fn.length; // Số tham số
    
    return function curried(...args) {
        if (args.length >= arity) {
            return fn.apply(this, args);
        } else {
            return (...nextArgs) => curried(...args, ...nextArgs);
        }
    };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3)); // → 6
console.log(add(1, 2)(3)); // → 6
console.log(add(1)(2, 3)); // → 6
