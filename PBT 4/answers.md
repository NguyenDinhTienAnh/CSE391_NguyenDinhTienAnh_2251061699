## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
| :--- | :--- | :--- | :--- | :--- |
| **static** (Mặc định) | Có | Flow mặc định của HTML | Có | Bố cục trang web thông thường. |
| **relative** | Có | Vị trí ban đầu của chính nó | Có | Nudge (dịch chuyển nhẹ) phần tử; làm gốc tọa độ (container) cho thẻ con dùng `absolute`. |
| **absolute** | Không (Nhường chỗ cho phần tử khác) | Nearest positioned ancestor (Tổ tiên gần nhất được định vị) | Có (Cuộn cùng với thẻ cha) | Dropdown menu, Tooltip, Icon gắn ở góc của một khối, Modal/Popup. |
| **fixed** | Không | Viewport (Cửa sổ trình duyệt) | Không (Đứng yên trên màn hình) | Sticky header, Nút "Back to top", Thanh chat góc màn hình. |
| **sticky** | Có (Cho đến khi chạm ngưỡng) | Nearest scrolling ancestor / Viewport | Có (Cho tới ngưỡng top/bottom thì dính lại như `fixed`) | Tiêu đề các nhóm trong danh bạ, Thanh Navigation dính khi cuộn qua, Table header. |

1. Phần tử `absolute` sẽ tham chiếu đến document (thường được hiểu là `body` hoặc initial containing block) khi nó không có bất kỳ thẻ cha (hoặc ông nội, cụ cố...) nào được set thuộc tính `position` khác `static`. Lúc này, tọa độ `top`, `left`, `right`, `bottom` của nó sẽ được tính từ các mép ngoài cùng của toàn bộ trang web.
2. Nó sẽ tham chiếu thẻ parent (hoặc một thẻ tổ tiên bất kỳ) khi thẻ cha/tổ tiên đó được thiết lập một thuộc tính `position` khác `static` (cụ thể là `relative`, `absolute`, `fixed`, hoặc `sticky`).

---

### Câu 2

#### Trường hợp 1
* **Phân tích:** `display: flex` (mặc định xếp theo hàng ngang `row`). Thuộc tính `flex: 1` áp dụng cho tất cả các item có nghĩa là chúng sẽ chia đều không gian trống của thẻ container.
* **Bố cục (4 items):** 1 hàng ngang duy nhất, 4 cột có chiều rộng hoàn toàn bằng nhau.
* **Sơ đồ:**
```text
+-------------------------------------------------------+
|                       container                       |
| +------------+ +------------+ +------------+ +------+ |
| |   Item 1   | |   Item 2   | |   Item 3   | |Item 4| |
| +------------+ +------------+ +------------+ +------+ |
+-------------------------------------------------------+
