Câu A1
1. Trong 0.3 giây tiếp theo, điều kỳ diệu xảy ra:

Request của tôi xuất phát từ laptop → đi qua router WiFi nhà trọ
→ Qua nhà mạng VNPT → chạy xuyên cáp quang dưới đáy Thái Bình Dương
→ Đến data center của Shopee 
→ Server xử lý: "Minh muốn xem News Feed"
→ Response chạy ngược lại: cáp quang → VNPT → router → laptop
→ Chrome nhận file HTML, CSS, JS → render ra giao diện → Minh thấy News Feed
0.3 giây. 13.000 km. Hàng triệu phép tính. Và tất cả bắt đầu bằng ba chữ cái: H. T. M. L.
(File tuan1_html5, chương 01, phần đầu tiên)

2. nó cho tôi biết trang web đang tải những gì, mất bao lâu và dữ liệu nào đang được gửi đi hoặc nhận về.
![alt text](image-5.png)
*Status Code của request đầu tiên là ![alt text](image-2.png)
*Tổng thời gian load trang là ![alt text](image-3.png)
*Một request trả về file CSS là ![alt text](image-4.png)

Câu A2
Sau khi đọc chương 4, em thấy trang web trên bị Google đánh giá SEO thấp vì dùng quá nhiều <div>, với lại thẻ <div> là 1 thẻ non-semantic.
4 lỗi semantic đó là
*1. <div class="header">, <div class="main"> và <div class="footer"> ta có thể dùng các thẻ chuẩn HTML5 đó là <header>, <main> và <footer>
*2. thiếu thẻ <nav> và danh sách <ul>, <li> sửa lại. <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
*3. không sử dụng thẻ heading, ta cần thêm thẻ heading bởi vì tên sản phẩm đang được bọc trong <div class="title"> sửa lại: <h1 class="title">iPhone 16 Pro</h1>
*4. không dùng thẻ <article> ta nên thay:<div class="product"> sẽ hơn là <div class="product"> tại vì nếu dùng <div class="product"> nó sẽ mất đi tính nguyên khôi của khối thông tin.
(tuan_1_html5, chương 4 phần tại sao lại không dùng div)

Câu A3
![alt text](image.png)
<div> hộp 1, hộp 2, hộp 3 là thẻ block nên nó sẽ chiếm trọn 1 dòng
<span>Text A</span>
<span>Text B</span> là thẻ inline đi liền nhau mà thẻ block chiếm 1 dòng nên nó sẽ tự động xuống dòng 2 
<span>Text C</span>
<strong>Text D</strong> tương tự 2 thẻ A B nhưng thẻ D được in đậm 

Câu A4
sự khác nhau giữa 3 thẻ <thead>, <tbody>, <tfoot> là
<thead> là phần đầu 
<tbody> là phần thân 
<tfoot> là phần chân
ta không nên dùng table để tạo layout trang web bởi vì
-sai ngữ nghĩa nên sẽ gây ảnh hưởng xấu đến SEO
-kém linh hoạt trên thiết bị di động
-hiệu suất render thấp
(tuan_1_html5, chương 5, phần bảng dữ liệu)
