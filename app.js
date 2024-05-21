document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("contenedor_tarea");
    const abrir = document.getElementById("nueva_tarea");
    const cerrar = document.getElementById("cerrar");

    cerrar.addEventListener("click", function () {
        contenedor.classList.remove("visible");
      });

    abrir.addEventListener("click", function () {
      contenedor.classList.add("visible")
    });
  });
  
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task').addEventListener('click', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        displayTask(task);
    });
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskDescription = document.getElementById('task-description');
    const taskDate = document.getElementById('task-date');
    const taskDueDate = document.getElementById('task-due-date');

    const taskText = taskInput.value.trim();
    const description = taskDescription.value.trim();
    const startDate = taskDate.value;
    const dueDate = taskDueDate.value;

    if (taskText && description && startDate && dueDate) {
        const task = {
            text: taskText,
            description: description,
            startDate: startDate,
            dueDate: dueDate,
            completed: false
        };
        displayTask(task);
        saveTask(task);
        taskInput.value = '';
        taskDescription.value = '';
        taskDate.value = '';
        taskDueDate.value = '';
    }
}

function calculateTimeLeft(dueDate) {
    const currentDate = new Date();
    const diffMs = new Date(dueDate) - currentDate;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
}

function displayTask(task) {
    const tableBody = document.querySelector('#tasks_table tbody');
    const taskRow = document.createElement('tr');

    const taskTextCell = document.createElement('td');
    taskTextCell.textContent = task.text;
    taskRow.appendChild(taskTextCell);

    const taskDescriptionCell = document.createElement('td');
    taskDescriptionCell.textContent = task.description;
    taskRow.appendChild(taskDescriptionCell);

    const taskDateCell = document.createElement('td');
    taskDateCell.textContent = task.startDate;
    taskRow.appendChild(taskDateCell);

    const taskDueDateCell = document.createElement('td');
    taskDueDateCell.textContent = task.dueDate;
    taskRow.appendChild(taskDueDateCell);

    const timeLeftCell = document.createElement('td');
    const timeLeft = calculateTimeLeft(task.dueDate);
    timeLeftCell.textContent = timeLeft + ' días';
    taskRow.appendChild(timeLeftCell);

    const taskCompletedCell = document.createElement('td');
    const taskCompletedCheckbox = document.createElement('input');
    taskCompletedCheckbox.type = 'checkbox';
    taskCompletedCheckbox.className = 'complete';
    taskCompletedCheckbox.checked = task.completed;
    taskCompletedCheckbox.addEventListener('change', () => {
        task.completed = taskCompletedCheckbox.checked;
        updateTasks();
    });
    taskCompletedCell.appendChild(taskCompletedCheckbox);
    taskRow.appendChild(taskCompletedCell);

    const taskActionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'btn-eliminar';
    deleteButton.addEventListener('click', () => {
        tableBody.removeChild(taskRow);
        removeTask(task);
    });
    taskActionsCell.appendChild(deleteButton);
    taskRow.appendChild(taskActionsCell);

    tableBody.appendChild(taskRow);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTasks() {
    const taskRows = document.querySelectorAll('#tasks_table tbody tr');
    const tasks = Array.from(taskRows).map(taskRow => ({
        text: taskRow.cells[0].textContent,
        description: taskRow.cells[1].textContent,
        startDate: taskRow.cells[2].textContent,
        dueDate: taskRow.cells[3].textContent,
        completed: taskRow.querySelector('.complete').checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskToRemove.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


