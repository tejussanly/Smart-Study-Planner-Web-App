let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No study tasks added yet.</p>";
    return;
  }

  tasks.forEach((task, index) => {
    const taskCard = document.createElement("div");
    taskCard.className = task.completed ? "task-card completed" : "task-card";

    taskCard.innerHTML = `
      <h3>${task.task}</h3>
      <p><strong>Subject:</strong> ${task.subject}</p>
      <p><strong>Deadline:</strong> ${task.deadline}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Status:</strong> ${task.completed ? "Completed" : "Pending"}</p>

      <div class="task-actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${index})">
          Delete
        </button>
      </div>
    `;

    taskList.appendChild(taskCard);
  });
}

function addTask() {
  const subject = document.getElementById("subjectInput").value.trim();
  const task = document.getElementById("taskInput").value.trim();
  const deadline = document.getElementById("deadlineInput").value;
  const priority = document.getElementById("priorityInput").value;

  if (subject === "" || task === "" || deadline === "" || priority === "") {
    alert("Please fill in all fields.");
    return;
  }

  const newTask = {
    subject: subject,
    task: task,
    deadline: deadline,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  displayTasks();

  document.getElementById("subjectInput").value = "";
  document.getElementById("taskInput").value = "";
  document.getElementById("deadlineInput").value = "";
  document.getElementById("priorityInput").value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

displayTasks();
