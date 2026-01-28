const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const STORAGE_KEY = 'tareas';

// --------------------
// Utilidades LocalStorage
// --------------------
function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// --------------------
// Renderizado
// --------------------
function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.texto;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// --------------------
// Acciones
// --------------------
function addTask() {
  const texto = taskInput.value.trim();
  if (!texto) return;

  const tasks = getTasks();
  tasks.push({
    id: Date.now(),
    texto
  });

  saveTasks(tasks);
  taskInput.value = '';
  renderTasks();
}

function deleteTask(id) {
  const tasks = getTasks().filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

// --------------------
// Eventos
// --------------------
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

// --------------------
// Inicialización
// --------------------
renderTasks();

// --------------------
// Registro del Service Worker
// --------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(() => console.log('Service Worker registrado correctamente'))
      .catch(err => console.error('Error al registrar el Service Worker:', err));
  });
}
