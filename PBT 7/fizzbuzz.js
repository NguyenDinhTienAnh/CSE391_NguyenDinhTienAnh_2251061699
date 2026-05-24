// Bài B4 - FizzBuzz nâng cao

// ========== VERSION 1: Classic FizzBuzz ==========
function classicFizzBuzz() {
    let result = [];
    
    for (let i = 1; i <= 100; i++) {
        let output = "";
        
        if (i % 3 === 0) {
            output += "Fizz";
        }
        if (i % 5 === 0) {
            output += "Buzz";
        }
        
        result.push(output || i);
    }
    
    return result;
}

// ========== VERSION 2: Custom FizzBuzz ==========
function customFizzBuzz(n, rules) {
    let result = [];
    
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        // Kiểm tra từng rule
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }
        
        result.push(output || i);
    }
    
    return result;
}
