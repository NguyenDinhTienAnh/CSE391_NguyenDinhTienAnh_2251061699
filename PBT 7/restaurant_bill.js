function tinhHoaDonNhaHang(danhSachMonAn, hinhChiPhi = {}) {
    // Dữ liệu input
    // danhSachMonAn: Array của {name, gia, soLuong}
    // hinhChiPhi: {ngayHT: "Monday-Sunday", tip: 0-100, ...}
    
    // 1. Tính tổng tiền hàng
    let tongTienHang = 0;
    let chiTietMonAn = [];
    
    for (let i = 0; i < danhSachMonAn.length; i++) {
        const mon = danhSachMonAn[i];
        const thanhTien = mon.gia * mon.soLuong;
        tongTienHang += thanhTien;
        
        chiTietMonAn.push({
            stt: i + 1,
            ten: mon.name,
            soLuong: mon.soLuong,
            donGia: mon.gia,
            thanhTien: thanhTien
        });
    }
    
    // 2. Tính giảm giá dựa trên tổng tiền
    let phanTramGiam = 0;
    
    if (tongTienHang > 1000000) {
        phanTramGiam = 15;  // Giảm 15% nếu > 1 triệu
    } else if (tongTienHang > 500000) {
        phanTramGiam = 10;  // Giảm 10% nếu > 500k
    }
    
    // 3. Kiểm tra ngày thứ 3 (Wednesday) để giảm thêm 5%
    const hienTai = new Date();
    const thuTrongTuan = hienTai.getDay(); // 0=Chủ nhật, 1=Thứ 2, 2=Thứ 3, ...
    
    if (thuTrongTuan === 3) { // 3 = Thứ 4 (Wednesday)
        phanTramGiam += 5;    // Giảm thêm 5%
    }
    
    const soTienGiam = tongTienHang * phanTramGiam / 100;
    const tongTienSauGiam = tongTienHang - soTienGiam;
    
    // 4. Tính VAT (8%)
    const vat = tongTienSauGiam * 0.08;
    const tongTienSauVat = tongTienSauGiam + vat;
    
    // 5. Tính tip (mặc định 5% nếu không được chỉ định)
    const phanTramTip = hinhChiPhi.tip || 5;
    const tip = tongTienSauVat * phanTramTip / 100;
    
    // 6. Tính tổng thanh toán
    const tongThanhToan = tongTienSauVat + tip;
    
    // 7. In hóa đơn
    let hoaDon = "";
    
    // Header
    hoaDon += "╔══════════════════════════════════════╗\n";
    hoaDon += "║        HÓA ĐƠN NHÀ HÀNG           ║\n";
    hoaDon += "╠══════════════════════════════════════╣\n";
    
    // Chi tiết các món ăn
    for (let i = 0; i < chiTietMonAn.length; i++) {
        const mon = chiTietMonAn[i];
        const stt = mon.stt.toString().padEnd(2);
        const ten = mon.ten.padEnd(12);
        const soLuong = ("x" + mon.soLuong).padEnd(4);
        const donGia = ("@" + formatTien(mon.donGia)).padEnd(7);
        const thanhTien = ("= " + formatTien(mon.thanhTien)).padEnd(11);
        
        hoaDon += `║ ${stt}. ${ten} ${soLuong} ${donGia} ${thanhTien}║\n`;
    }
    
    // Thống kê
    hoaDon += "╠══════════════════════════════════════╣\n";
    hoaDon += `║ Tổng cộng:              ${formatTienPhaiKhop(tongTienHang)}  ║\n`;
    hoaDon += `║ Giảm giá (${phanTramGiam}%):${formatTienPhaiKhop(soTienGiam)}║\n`;
    hoaDon += `║ VAT (8%):${formatTienPhaiKhop(vat)}║\n`;
    hoaDon += `║ Tip (${phanTramTip}%):${formatTienPhaiKhop(tip)}║\n`;
    hoaDon += "╠══════════════════════════════════════╣\n";
    hoaDon += `║ THANH TOÁN:${formatTienPhaiKhop(tongThanhToan)}║\n`;
    hoaDon += "╚══════════════════════════════════════╝\n";
    
    console.log(hoaDon);
    
    return {
        tongTienHang: tongTienHang,
        phanTramGiam: phanTramGiam,
        soTienGiam: soTienGiam,
        vat: vat,
        tip: tip,
        tongThanhToan: tongThanhToan
    };
}

// Hàm trợ giúp: Format tiền tệ
function formatTien(so) {
    return Math.round(so).toLocaleString('vi-VN');
}

// Hàm trợ giúp: Format tiền để căn chỉnh trong hóa đơn
function formatTienPhaiKhop(so) {
    const tien = formatTien(so);
    const khoangTrang = " ".repeat(Math.max(0, 20 - tien.length));
    return khoangTrang + tien + "đ  ";
}

// ========== TEST CASES ==========

console.log("\n========== TEST 1: Hóa đơn bình thường ==========\n");
const hoaDon1 = tinhHoaDonNhaHang([
    { name: "Phở bò     ", gia: 65000, soLuong: 2 },
    { name: "Trà đá     ", gia: 5000, soLuong: 3 },
    { name: "Bún chả   ", gia: 55000, soLuong: 1 }
]);

console.log("\n========== TEST 2: Hóa đơn > 500k (giảm 10%) ==========\n");
const hoaDon2 = tinhHoaDonNhaHang([
    { name: "Cơm rang  ", gia: 85000, soLuong: 3 },
    { name: "Canh chua ", gia: 45000, soLuong: 2 },
    { name: "Nước cam  ", gia: 25000, soLuong: 2 }
]);

console.log("\n========== TEST 3: Hóa đơn > 1M (giảm 15%) ==========\n");
const hoaDon3 = tinhHoaDonNhaHang([
    { name: "Vịt quay  ", gia: 350000, soLuong: 1 },
    { name: "Cua hoàng ", gia: 450000, soLuong: 1 },
    { name: "Rượu vang ", gia: 250000, soLuong: 1 }
]);

console.log("\n========== TEST 4: Hóa đơn với tip 10% ==========\n");
const hoaDon4 = tinhHoaDonNhaHang(
    [
        { name: "Lẩu thái  ", gia: 280000, soLuong: 2 },
        { name: "Nước chanh", gia: 15000, soLuong: 4 }
    ],
    { tip: 10 }
);
