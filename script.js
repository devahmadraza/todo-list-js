// Select Dom Elements
const input = document.getElementById('todo-input')
const addbtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// Try to load saved node from localStorage if any
const saved = localStorage.getItem('todos')
const todos = saved ? JSON.parse(saved) : []

function savedTodos() {
    // save current nodes to localStorage
    localStorage.setItem('todos', JSON.stringify(todos))
}

// create a dom for todo object and append it to the list
function createTodoNode(todo, index) {
    const li = document.createElement('li')

    // FIX 1: textSpan ko function ke shuru mein banaya taaki har jagah access ho sake
    const textSpan = document.createElement('span')
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px'

    // FIX 2: type ko string 'checkbox' kiya
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;

    // Agar pehle se completed hai toh line-through lagao
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked
        // Visual feedback: strike through when completed
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
        savedTodos()
    })

    // Add double click event listener to edit todo
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt('Edit Todo', todo.text)
        if (newText != null && newText.trim() !== '') {
            todo.text = newText.trim(); // trim() ek method hai brackets ke sath
            textSpan.textContent = todo.text
            savedTodos()
        }
    })

    // Delete Button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete'

    // FIX 3: Event ka naam 'delete' se badal kar 'click' kiya
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1)
        render()
        savedTodos()
    })

    li.appendChild(checkbox)
    li.appendChild(textSpan)
    li.appendChild(delBtn)

    return li; // FIX 4: li element ko return kiya taaki list mein add ho sake
}

// render the whole todo list from todo array
function render() {
    list.innerHTML = ''

    // FIX 5: (todo, index) ko brackets mein wrap kiya
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index)
        list.appendChild(node)
    })
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }
    // push new todo object
    todos.push({ text, completed: false });
    input.value = '';
    render()
    savedTodos()
}
addbtn.addEventListener('click', addTodo)
render()