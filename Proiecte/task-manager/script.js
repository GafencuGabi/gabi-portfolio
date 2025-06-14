// ========== THEME TOGGLE ==========
const themeBtn = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');

function setThemeIcon(isDark) {
  themeIcon.innerHTML = isDark
    // Moon (pentru dark)
    ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f1b08a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>`
    // Sun (pentru light)
    : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f1b08a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  setThemeIcon(dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

themeBtn.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});

const isDark = localStorage.getItem('theme') === 'dark';
setTheme(isDark);

// ========== TASK MANAGER ==========
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filters = document.querySelectorAll('.filter');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let filter = 'all';

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  let filtered = tasks.filter(t =>
    filter === 'all' ? true :
    filter === 'active' ? !t.completed :
    t.completed
  );
  filtered.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');
    li.draggable = true;
    li.dataset.index = idx;

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text" contenteditable="false">${task.text}</span>
      <button class="edit-btn" title="Edit">&#9998;</button>
      <button class="delete-btn" title="Delete">&times;</button>
    `;
    // Checkbox
    li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });
    // Edit
    li.querySelector('.edit-btn').addEventListener('click', () => {
      const span = li.querySelector('.task-text');
      if (span.isContentEditable) {
        span.contentEditable = "false";
        task.text = span.textContent.trim();
        saveTasks();
        renderTasks();
      } else {
        span.contentEditable = "true";
        span.focus();
      }
    });
    // Delete
    li.querySelector('.delete-btn').addEventListener('click', () => {
      tasks.splice(tasks.indexOf(task), 1);
      saveTasks();
      renderTasks();
    });
    // Drag & Drop
    li.addEventListener('dragstart', e => {
      li.classList.add('dragging');
      e.dataTransfer.setData('text/plain', idx);
    });
    li.addEventListener('dragend', () => li.classList.remove('dragging'));
    li.addEventListener('dragover', e => e.preventDefault());
    li.addEventListener('drop', e => {
      e.preventDefault();
      const from = +e.dataTransfer.getData('text/plain');
      const to = idx;
      if (from !== to) {
        const moved = tasks.splice(from, 1)[0];
        tasks.splice(to, 0, moved);
        saveTasks();
        renderTasks();
      }
    });

    taskList.appendChild(li);
  });
  updateCount();
}

// Add task
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.unshift({ text, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
});

// Filters
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    renderTasks();
  });
});

// Clear completed
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
});

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update count
function updateCount() {
  const active = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `${active} task${active !== 1 ? 's' : ''} left`;
}

// Init
renderTasks();