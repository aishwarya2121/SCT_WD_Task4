const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Add or Edit To-Do
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText === "") {
        alert("You must write something in your to-do");
        return;
    }

    const now = new Date();
    const time = now.toLocaleString();

    if (addBtn.value === "Edit") {
        const oldText = editTodo.target.previousElementSibling.previousElementSibling.innerHTML;
        updateLocalTodo(oldText, inputText, time);
        editTodo.target.previousElementSibling.previousElementSibling.innerHTML = inputText;
        editTodo.target.previousElementSibling.innerHTML = time;
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        createTodoElement(inputText, time);
        saveLocalTodo({ text: inputText, time: time });
        inputBox.value = "";
    }
};

// Create and Display To-Do
const createTodoElement = (text, time) => {
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.innerText = text;

    const span = document.createElement("span");
    span.innerText = time;
    span.style.fontSize = "12px";
    span.style.marginLeft = "10px";
    span.style.color = "#555";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");

    li.appendChild(p);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
};

// Handle Edit or Delete
const updateTodo = (e) => {
    const target = e.target;
    const li = target.parentElement;

    if (target.innerText === "Remove") {
        const text = li.children[0].innerText;
        deleteLocalTodo(text);
        todoList.removeChild(li);
    }

    if (target.innerText === "Edit") {
        inputBox.value = li.children[0].innerText;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
};

// Save to localStorage
const saveLocalTodo = (todo) => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Get from localStorage on page load
const getLocalTodos = () => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.forEach(todo => createTodoElement(todo.text, todo.time));
};

// Delete from localStorage
const deleteLocalTodo = (text) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(todo => todo.text !== text);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Update in localStorage
const updateLocalTodo = (oldText, newText, newTime) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.findIndex(todo => todo.text === oldText);
    if (index !== -1) {
        todos[index] = { text: newText, time: newTime };
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

// Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
