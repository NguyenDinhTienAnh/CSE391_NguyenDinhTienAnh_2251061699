// ==================== TODO APP ====================
// State management
let todos = [];
let currentFilter = 'all';
const STORAGE_KEY = 'todos';

// DOM Elements
const todoInput = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const todoList = document.querySelector('#todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const itemsLeft = document.querySelector('#itemsLeft');
const clearBtn = document.querySelector('#clearBtn');
const emptyState = document.querySelector('#emptyState');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    render();
    attachEventListeners();
});

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    // Add todo - Enter key
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && todoInput.value.trim()) {
            addTodo();
        }
    });

    // Add todo - Button click
    addBtn.addEventListener('click', () => {
        if (todoInput.value.trim()) {
            addTodo();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            render();
        });
    });

    // Clear completed
    clearBtn.addEventListener('click', clearCompleted);

    // Event delegation - Listen on todoList
    todoList.addEventListener('click', handleTodoListClick);
    todoList.addEventListener('dblclick', handleTodoListDblClick);
    todoList.addEventListener('keypress', handleTodoListKeypress);
}

// ==================== EVENT HANDLERS ====================
function handleTodoListClick(e) {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;

    const id = parseInt(todoItem.dataset.id);

    // Delete button
    if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id);
        return;
    }

    // Checkbox
    if (e.target.classList.contains('todo-checkbox')) {
        toggleTodo(id);
        return;
    }

    // Text click - toggle completed
    if (e.target.classList.contains('todo-text')) {
        toggleTodo(id);
    }
}

function handleTodoListDblClick(e) {
    const todoText = e.target.closest('.todo-text');
    if (!todoText) return;

    const todoItem = todoText.closest('.todo-item');
    const id = parseInt(todoItem.dataset.id);
    
    enterEditMode(id, todoItem);
}

function handleTodoListKeypress(e) {
    if (e.key !== 'Enter') return;

    const editInput = e.target.closest('.todo-edit');
    if (!editInput) return;

    const todoItem = editInput.closest('.todo-item');
    const id = parseInt(todoItem.dataset.id);
    const newText = editInput.value.trim();

    if (newText) {
        editTodo(id, newText);
    }

    exitEditMode(id, todoItem);
}

// ==================== CRUD OPERATIONS ====================
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    saveToLocalStorage();
    render();

    todoInput.value = '';
    todoInput.focus();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    render();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage();
        render();
    }
}

function editTodo(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.text = newText;
        saveToLocalStorage();
        render();
    }
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveToLocalStorage();
    render();
}

// ==================== EDIT MODE ====================
function enterEditMode(id, todoItem) {
    todoItem.classList.add('editing');
    const editInput = todoItem.querySelector('.todo-edit');
    const todoText = todoItem.querySelector('.todo-text');
    
    editInput.value = todoText.textContent;
    editInput.focus();
    editInput.select();
}

function exitEditMode(id, todoItem) {
    todoItem.classList.remove('editing');
}

// ==================== RENDERING ====================
function render() {
    // Filter todos
    const filteredTodos = getFilteredTodos();

    // Clear list
    todoList.innerHTML = '';

    // Render each todo
    filteredTodos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });

    // Update stats
    updateStats();

    // Show/hide empty state
    if (filteredTodos.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;

    // Text
    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    // Edit input
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'todo-edit';
    editInput.value = todo.text;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '❌';
    deleteBtn.setAttribute('aria-label', `Delete todo: ${todo.text}`);

    // Append all
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(editInput);
    li.appendChild(deleteBtn);

    return li;
}

function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

function updateStats() {
    const activeTodos = todos.filter(t => !t.completed);
    itemsLeft.textContent = `${activeTodos.length} item${activeTodos.length !== 1 ? 's' : ''} left`;

    const completedTodos = todos.filter(t => t.completed);
    clearBtn.disabled = completedTodos.length === 0;
}

// ==================== LOCAL STORAGE ====================
function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            todos = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading todos from localStorage:', e);
            todos = [];
        }
    }
}
