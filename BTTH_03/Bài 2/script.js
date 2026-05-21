// --- 1. DOM Elements ---
const btnOpenForm = document.getElementById('btnOpenForm');
const btnCloseModal = document.getElementById('btnCloseModal');
const modal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const modalTitle = document.getElementById('modalTitle');
const editingIndexInput = document.getElementById('editingIndex');
const notificationArea = document.getElementById('notificationArea');

// --- 2. Trạng thái ứng dụng ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// --- 3. Các hàm xử lý độc lập ---

// Hàm lưu dữ liệu
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Hàm hiển thị thông báo
function showMessage(msg) {
    notificationArea.textContent = msg;
    notificationArea.classList.remove('hidden');
    setTimeout(() => {
        notificationArea.classList.add('hidden');
    }, 2500);
}

// Hàm cập nhật thống kê
function updateTaskSummary() {
    const total = tasks.length;
    // Dùng filter để đếm số công việc hoàn thành
    const completed = tasks.filter(task => task.completed === true).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

// Hàm render danh sách công việc (A)
function renderTasks() {
    taskList.innerHTML = ''; 

    if (tasks.length === 0) {
        taskList.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #777;">Chưa có công việc nào. Hãy thêm mới!</div>';
        updateTaskSummary();
        return;
    }

    tasks.forEach((task, index) => {
        // Nếu hoàn thành thì thêm class 'completed'
        const completedClass = task.completed ? 'completed' : '';
        // Xử lý class CSS cho mức độ ưu tiên
        const priorityClass = task.priority.toLowerCase().replace(' ', '-');

        const card = document.createElement('div');
        // Thêm class động dựa vào trạng thái
        card.className = `task-card ${completedClass}`; 
        
        card.innerHTML = `
            <div class="task-header">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${index})">
                <h3>${task.title}</h3>
            </div>
            <div class="task-meta">
                <p>${task.desc}</p>
                <p><strong>Hạn:</strong> ${task.deadline}</p>
                <p><strong>Ưu tiên:</strong> <span class="priority-tag ${priorityClass}">${task.priority}</span></p>
            </div>
            <div class="task-actions">
                <button class="btn btn-edit" onclick="openEditForm(${index})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteTask(${index})">Xóa</button>
            </div>
        `;
        taskList.appendChild(card);
    });

    updateTaskSummary();
}

// Hàm reset form
function resetForm() {
    taskForm.reset();
    editingIndexInput.value = '-1';
    modalTitle.textContent = 'Thêm Công Việc Mới';
}

// --- 4. Xử lý các sự kiện thao tác ---

// Mở và đóng form
btnOpenForm.addEventListener('click', () => {
    resetForm();
    modal.classList.remove('hidden');
});

btnCloseModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Thêm hoặc Cập nhật công việc (B & C)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTask = {
        title: document.getElementById('taskTitle').value.trim(),
        desc: document.getElementById('taskDesc').value.trim(),
        deadline: document.getElementById('taskDeadline').value,
        priority: document.getElementById('taskPriority').value,
        // Nếu tạo mới thì mặc định completed = false
        completed: false 
    };

    const editIndex = parseInt(editingIndexInput.value);

    if (editIndex === -1) {
        // Thêm mới
        tasks.unshift(newTask); // Thêm lên đầu mảng
        showMessage('Đã thêm công việc mới!');
    } else {
        // Giữ lại trạng thái hoàn thành cũ khi sửa
        newTask.completed = tasks[editIndex].completed;
        tasks[editIndex] = newTask;
        showMessage('Đã cập nhật công việc!');
    }

    saveTasks();
    renderTasks();
    modal.classList.add('hidden');
});

// Đưa dữ liệu lên form để sửa (C)
window.openEditForm = function(index) {
    const task = tasks[index];
    
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskPriority').value = task.priority;
    
    editingIndexInput.value = index;
    modalTitle.textContent = 'Sửa Công Việc';
    modal.classList.remove('hidden');
};

// Xóa công việc (D)
window.deleteTask = function(index) {
    if (confirm(`Bạn có chắc muốn xóa công việc: "${tasks[index].title}"?`)) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        showMessage('Đã xóa công việc!');
    }
};

// Đổi trạng thái Hoàn thành / Chưa hoàn thành (E)
window.toggleTaskStatus = function(index) {
    // Đảo ngược trạng thái boolean
    tasks[index].completed = !tasks[index].completed; 
    
    saveTasks();
    renderTasks(); // Render lại sẽ tự động áp dụng/gỡ bỏ CSS class 'completed'
    
    const msg = tasks[index].completed ? 'Đã đánh dấu hoàn thành!' : 'Đã bỏ đánh dấu hoàn thành!';
    showMessage(msg);
};

// --- 5. Khởi chạy ---
renderTasks();