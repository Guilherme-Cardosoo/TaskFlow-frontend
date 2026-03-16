const API_URL = "http://127.0.0.1:8000/tarefas/";
const inputTask = document.querySelector(".input-task input");
const addButton = document.querySelector(".input-task button");
const taskList = document.querySelector(".task-list");

async function fetchTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    taskList.innerHTML = ""
    data.tarefas.forEach(task => {
        renderTask(task[0], task[1], task[2]);
    });
}

async function addTask() {
    const title = inputTask.value;
    if (!title) return alert("Digite algo!");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: title, concluida: false })
    });

    if (response.ok) {
        inputTask.value = "";
        fetchTasks();
    }
}

async function toggleTask(id) {
    const response = await fetch(`${API_URL}${id}`, {
        method: "PATCH"
    });

    if (response.ok) {
        fetchTasks();
    }
}

async function deleteTask(id) {
    const response = await fetch(`${API_URL}${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        fetchTasks();
    }
}

function renderTask(id, title, completed) {
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""} onchange="toggleTask(${id})">
        <span style="${completed ? 'text-decoration: line-through' : ''}">${title}</span>
        <button class="delete" onclick="deleteTask(${id})">X</button>
    `;
    taskList.appendChild(li);
}

addButton.addEventListener("click", addTask);
window.addEventListener("DOMContentLoaded", fetchTasks);