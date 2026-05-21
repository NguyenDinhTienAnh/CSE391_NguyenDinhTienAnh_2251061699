// --- 1. Truy xuất các phần tử DOM ---
const btnOpenAddForm = document.getElementById('btnOpenAddForm');
const btnCloseModal = document.getElementById('btnCloseModal');
const modal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const studentBody = document.getElementById('studentBody');
const modalTitle = document.getElementById('modalTitle');
const editingIndexInput = document.getElementById('editingIndex');
const notificationArea = document.getElementById('notificationArea');

// Các phần tử thống kê
const totalStudentsEl = document.getElementById('totalStudents');
const avgClassScoreEl = document.getElementById('avgClassScore');

// --- 2. Trạng thái ứng dụng (State) ---
// Đọc dữ liệu từ localStorage, nếu chưa có thì dùng mảng rỗng []
let students = JSON.parse(localStorage.getItem('students')) || [];

// --- 3. Các hàm chức năng chính ---

// A. Hiển thị danh sách (Render bảng)
function renderStudents() {
    studentBody.innerHTML = ''; // Xóa trắng dữ liệu cũ
    
    if (students.length === 0) {
        studentBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chưa có dữ liệu sinh viên. Hãy thêm mới!</td></tr>';
    } else {
        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.className}</td>
                <td>${student.email}</td>
                <td>${student.score}</td>
                <td>
                    <button class="btn btn-edit" onclick="prepareEditForm(${index})">Sửa</button>
                    <button class="btn btn-delete" onclick="deleteStudent(${index})">Xóa</button>
                </td>
            `;
            studentBody.appendChild(tr);
        });
    }
    updateStatistics();
}

// Hàm cập nhật khu vực thống kê
function updateStatistics() {
    totalStudentsEl.textContent = students.length;
    
    if (students.length === 0) {
        avgClassScoreEl.textContent = '0.0';
        return;
    }
    
    // Dùng hàm reduce để tính tổng điểm
    const totalScore = students.reduce((sum, student) => sum + parseFloat(student.score), 0);
    const avgScore = (totalScore / students.length).toFixed(2);
    avgClassScoreEl.textContent = avgScore;
}

// Hàm lưu dữ liệu xuống localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Hàm reset form về trạng thái trống
function resetForm() {
    studentForm.reset();
    editingIndexInput.value = '-1'; // Đặt lại index về trạng thái Thêm mới
    modalTitle.textContent = 'Thêm sinh viên mới';
}

// Hiển thị thông báo (tự động ẩn sau 3 giây)
function showNotification(message, type = 'success') {
    notificationArea.textContent = message;
    notificationArea.className = `notification ${type}`;
    setTimeout(() => {
        notificationArea.classList.add('hidden');
    }, 3000);
}

// --- 4. Xử lý Sự kiện (Event Listeners) ---

// 1 & 2. Mở / Đóng form
btnOpenAddForm.addEventListener('click', () => {
    resetForm();
    modal.classList.remove('hidden');
});

btnCloseModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    resetForm();
});

// 3 & 5. Sự kiện Submit form (Xử lý cả Thêm và Sửa)
studentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form tự động reload trang

    // Lấy dữ liệu từ các ô input
    const newStudent = {
        id: document.getElementById('studentId').value.trim(),
        name: document.getElementById('fullName').value.trim(),
        dob: document.getElementById('dob').value,
        className: document.getElementById('className').value.trim(),
        email: document.getElementById('email').value.trim(),
        score: document.getElementById('avgScore').value
    };

    const editingIndex = parseInt(editingIndexInput.value);

    // Kiểm tra xem đang ở chế độ Thêm mới hay Cập nhật
    if (editingIndex === -1) {
        // Chế độ thêm mới (B)
        students.push(newStudent);
        showNotification('Thêm sinh viên thành công!');
    } else {
        // Chế độ sửa (C)
        students[editingIndex] = newStudent;
        showNotification('Cập nhật thông tin thành công!');
    }

    // Luồng xử lý chung sau khi thay đổi dữ liệu
    saveStudents();
    renderStudents();
    modal.classList.add('hidden');
});

// 4. Hàm mồi dữ liệu lên form để Sửa
window.prepareEditForm = function(index) {
    const student = students[index];
    
    // Đổ dữ liệu cũ vào input
    document.getElementById('studentId').value = student.id;
    document.getElementById('fullName').value = student.name;
    document.getElementById('dob').value = student.dob;
    document.getElementById('className').value = student.className;
    document.getElementById('email').value = student.email;
    document.getElementById('avgScore').value = student.score;

    // Đánh dấu index đang sửa và đổi tiêu đề
    editingIndexInput.value = index;
    modalTitle.textContent = 'Cập nhật sinh viên';
    
    // Mở popup
    modal.classList.remove('hidden');
};

// 6. Xóa sinh viên (D)
window.deleteStudent = function(index) {
    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${students[index].name} không?`)) {
        // Cắt phần tử khỏi mảng
        students.splice(index, 1); 
        
        saveStudents();
        renderStudents();
        showNotification('Đã xóa sinh viên khỏi danh sách.');
    }
};

// --- 5. Khởi chạy ứng dụng ---
renderStudents();