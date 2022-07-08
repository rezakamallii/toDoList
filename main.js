const todoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");

const todoList = document.querySelector(".todo-list");

const filterOption = document.querySelector(".filter-todo");

toDoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCompleteTodo);
filterOption.addEventListener("click", filterTodo);

document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(event) {
    event.preventDefault();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    saveLocalTodo(todoInput.value);

    newTodo.classList.add("todo-list");
    toDoDiv.appendChild(newTodo);

    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    toDoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    toDoDiv.appendChild(trashButton);

    todoList.appendChild(toDoDiv);
}

function deleteCompleteTodo(event) {
    const item = event.target;
    console.log(item);
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        console.log(todo);
        removeLocalTodo(todo);
        todo.remove();

    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}


function removeLocalTodo(todo) {
    //delete form localStorage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    const todoIndex = todo.children[0].innerText;
    // const todoIndex = todo.children;
    // console.log(todoIndex);

    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(todo => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else { todo.style.display = "none" }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else { todo.style.display = "flex" }
                break;
        }
    })
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.forEach(todo => {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;


        newTodo.classList.add("todo-list");
        toDoDiv.appendChild(newTodo);


        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("complete-btn");
        toDoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        toDoDiv.appendChild(trashButton);

        todoList.appendChild(toDoDiv);
    })
}