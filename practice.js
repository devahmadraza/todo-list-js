const input = document.getElementById('todo-input')
const add = document.getElementById('add-btn')
const list = document.getElementById('todo-list')


const saved = localStorage.getItem('todos')
const todos = saved ? JSON.parse(saved) : [];

function savedtodos() {

    localStorage.setItem('todos', JSON.stringify(todos))
}

function createTodoNode(todo, index) {
    const li = document.createElement('li')
    const textspan = document.createElement('span')
    textspan.textContent = todo.text
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = !!todo.completed

    if (todo.completed) {
        textspan.style.textDecoration = 'line-through'
    }
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked
        textspan.style.textDecoration = todo.completed ? 'line-through' : ""
        savedtodos()
    })

    const delbtn = document.createElement('button')
    delbtn.textContent = 'delete'
    delbtn.style.marginLeft = '10px'

    delbtn.addEventListener('click', () => {
        todos.splice(index, 1)
        savedtodos()
        render()
    })

    textspan.addEventListener('dblclick', () => {
        const newtext = prompt('Enter new text', todo.text)
        if (newtext != null && newtext.trim() != '') {
            todo.text = newtext
            todo.text.textContent = newtext
            savedtodos()
            render()
        }

    })
    li.appendChild(checkbox)
    li.appendChild(textspan)
    li.appendChild(delbtn)
    return li;
}
function render() {
    list.innerHTML = ''
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index)
        list.appendChild(node)
    });
}
function addtodo() {
    const text = input.value.trim('')
    if (!text) {
        alert('Type Task Name')
        return
    }
    todos.push({ text: text, completed: false })
    input.value = ''
    savedtodos()
    render()
}

add.addEventListener('click', addtodo)
render()