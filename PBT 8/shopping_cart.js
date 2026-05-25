function createCart() {
    // Private data
    let items = [];
    let discountCode = null;
    
    const discounts = {
        "SALE10": 0.10,      // -10%
        "SALE20": 0.20,      // -20%
        "FREESHIP": 30000    // -30000
    };
    
    // Helper function to format currency with Vietnamese format
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN');
    };
    
    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }
        },
        
        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },
        
        // Tính tổng tiền
        getTotal() {
            let total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (discountCode) {
                if (discountCode === "FREESHIP") {
                    total -= discounts[discountCode];
                } else {
                    // Tính phần trăm giảm
                    total -= total * discounts[discountCode];
                }
            }
            
            return Math.max(0, total); // Không để tổng âm
        },
        
        // Áp dụng mã giảm giá
        applyDiscount(code) {
            if (discounts[code]) {
                discountCode = code;
            } else {
                console.log(`Mã giảm giá "${code}" không hợp lệ`);
            }
        },
        
        // In giỏ hàng dạng bảng
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng trống!");
                return;
            }
            
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            
            items.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                const productName = item.name.padEnd(13);
                const qty = String(item.quantity).padEnd(2);
                const price = formatCurrency(item.price).padStart(10);
                const total = formatCurrency(itemTotal).padStart(10);
                console.log(`│ ${index + 1} │ ${productName} │ ${qty} │ ${price}  │ ${total}  │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            const total = this.getTotal();
            const totalFormatted = formatCurrency(total);
            const spaces = 46 - totalFormatted.length - 3;
            console.log(`│ Tổng cộng:${" ".repeat(spaces)}${totalFormatted}đ │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        
        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountCode = null;
        }
    };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();
// Kỳ vọng:
// ┌──────────────────────────────────────────────┐
// │ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │
// │ 1 │ iPhone 16      │  2 │ 25.990.000  │ 51.980.000  │
// │ 2 │ AirPods Pro    │  2 │  6.990.000  │ 13.980.000  │
// ├──────────────────────────────────────────────┤
// │ Tổng cộng:                       65.960.000đ │
// └──────────────────────────────────────────────┘

cart.applyDiscount("SALE10");
cart.printCart();
// → Tổng: 59.364.000đ (giảm 10%)

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2
