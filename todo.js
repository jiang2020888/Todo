const log = console.log.bind(console)

const e = selector => document.querySelector(selector)

const templateTodo = function(todo) {
    let t = `
            <div class="todo-cell">
                <button class="todo-done">完成</button>
                <button class="todo-delete">删除</button>
                <span>${todo}</span>
            </div>
        `
    return t
}

const loadTodos = function() {
    let s = localStorage.savedTodos
    if (s === undefined) {
        return []
    } else {
        let ts = JSON.parse(s)
        return ts
    }
}

const saveTodo = function(todo) {
    todos.push(todo)
    let s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

const insertTodos = function(todos) {
    let todoContainer = e('#id-div-container')
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i]
        let html = templateTodo(todo)
        todoContainer.insertAdjacentHTML('beforeend', html)
    }
}

let todos = loadTodos()
insertTodos(todos)

const deleteTodo = function(container, todoCell) {
    for (let i = 0; i < container.children.length; i++) {
        let cell = container.children[i]
        if (cell === todoCell) {
            todoCell.remove()
            let todos = loadTodos()
            todos.splice(i, 1)
            let s = JSON.stringify(todos)
            localStorage.savedTodos = s
        }
    }
}

const bindEventAdd = function() {
    let addButton = e('.add-btn')
    addButton.addEventListener('click', function() {
        let todoInput = e('.add-input')
        let todo = todoInput.value
        saveTodo(todo)
        let todoContainer = e('#id-div-container')
        let t = templateTodo(todo)
        todoContainer.insertAdjacentHTML('beforeend', t)
    })
}

const bindEventDelegate = function() {
    let todoContainer = e('#id-div-container')
    todoContainer.addEventListener('click', function(event) {
        log('container click', event.target)
        let self = event.target
        if (self.classList.contains('todo-done')) {
            log('done')
            let todoDiv = self.parentElement
            todoDiv.classList.toggle('done')
        } else if (self.classList.contains('todo-delete')) {
            log('delete')
            let todoDiv = self.parentElement
            deleteTodo(todoContainer, todoDiv)
        }
    })
}

const bindEvents = function() {
    bindEventAdd()
    bindEventDelegate()
}

const __main = function() {
    bindEvents()
}

__main()