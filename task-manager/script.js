document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskBody = document.getElementById("taskBody");

  let tasks = [];
  let currentTaskIndex = -1;

  // Load tasks from localStorage (if any)
  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render tasks in the table
  function renderTasks() {
    taskBody.innerHTML = "";
    tasks.forEach((task, index) => {
      taskBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${task}</td>
                    <td>
                        <button class="edit" data-index="${index}">Edit</button>
                        <button class="delete" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
    });
  }

  // Add or update task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();

    if (currentTaskIndex >= 0) {
      // Update task
      tasks[currentTaskIndex] = task;
      currentTaskIndex = -1;
    } else {
      // Add new task
      tasks.push(task);
    }

    taskInput.value = "";
    saveTasks();
    renderTasks();
  });

  // Event delegation for edit and delete buttons
  taskBody.addEventListener("click", (e) => {
    const target = e.target;
    const index = target.getAttribute("data-index");

    if (target.classList.contains("edit")) {
      editTask(index);
    } else if (target.classList.contains("delete")) {
      deleteTask(index);
    }
  });

  // Edit task
  function editTask(index) {
    taskInput.value = tasks[index];
    currentTaskIndex = index;
  }

  // Delete task
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  // Initial load
  loadTasks();
});
