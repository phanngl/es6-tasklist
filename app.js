// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);

  // remove task event
  taskList.addEventListener('click', removeTask);

  // clear task event
  clearBtn.addEventListener('click', clearTask);

  // filter
  filter.addEventListener('keyup', filterTask);
}

// get tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon htnl
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append the li to ul
    taskList.appendChild(li);
  });
}

// add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task!');
    return;
  }

  // Create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon htnl
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to li
  li.appendChild(link);

  // append the li to ul
  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?'))
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear task
function clearTask(e) {
  // taskList.innerHTML='';

  // faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from LS
  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// 
function filterTask(e) {
  const text = e.target.value;

  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  )
}