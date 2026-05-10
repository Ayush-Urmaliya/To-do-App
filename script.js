const text = document.getElementById("taskInput");
const addButton = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const deleteButton = document.getElementById("deleteBtn");

// save tasks to localStorage
function saveTasks() {
  const items = list.querySelectorAll('li');
  const tasks = [];
  items.forEach(function (li) {
    tasks.push({
      text: li.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// load tasks from localStorage
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved === null) return;
  const tasks = JSON.parse(saved);
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add('completed');
    }
    li.addEventListener('click', function () {
      li.classList.toggle('completed');
      saveTasks();
    });
    list.appendChild(li);
  });
}

// add button
addButton.addEventListener("click", function () {
  const taskText = text.value.trim();
  if (taskText === '') {
    alert('Please Enter A Task!');
    return;
  }
  const li = document.createElement('li');
  li.textContent = taskText;
  li.addEventListener('click', function () {
    li.classList.toggle('completed');
    saveTasks();
  });
  list.appendChild(li);
  text.value = '';
  saveTasks();
});

// delete button
deleteButton.addEventListener('click', function () {
  if (list.children.length === 0) {
    alert('No Tasks To Clear!');
    return;
  }
  const sure = confirm("Are You Sure You Want to Clear All Tasks?");
  if (sure) {
    list.innerHTML = '';
    saveTasks();
  }
});
// load saved tasks when page opens
loadTasks();