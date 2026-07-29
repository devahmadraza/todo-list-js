const input =document.getElementById('todo-input')
const add= document.getElementById('add-btn')
const list=document.getElementById('todo-list')

const saved = localStorage.getItem('todos')
const todos= saved ? JSON.parse(saved) : []


function savedtodos(){
    localStorage.setItem('todos',JSON.stringify(todos))
}

function createTodoNode(todo , index){
 const li = document.createElement('li')
li.style.listStyle='none'
 const textspan = document.createElement('span')
 textspan.textContent=todo.text
 textspan.style.margin='0px 8px'

 const checkbox = document.createElement('input')
 checkbox.type='checkbox'
 checkbox.checked=!!todo.completed
 if (todo.completed) {
     textspan.style.textDecoration='line-through'
    }
checkbox.addEventListener('change' ,()=>{
todo.completed = checkbox.checked
textspan.style.textDecoration = todo.completed ? 'line-through': ''
savedtodos()
})

const delbtn=document.createElement('button')
{
delbtn.textContent='Delete'
delbtn.style.margin='0px 10px'
delbtn.style.color='red'
delbtn.style.backgroundColor='yellow'
}
function deletetodo(){
todos.splice(index , 1)
savedtodos()
render()
}


textspan.addEventListener('dblclick',()=>{
const newtext=prompt('Enter new text', todo.text)
if(newtext != null && newtext.trim!='') 
    todo.text=newtext
savedtodos()
render()
})


delbtn.addEventListener('click',deletetodo)



li.appendChild(checkbox)
li.appendChild(textspan)
li.appendChild(delbtn)
return li
}





function render(){
list.innerHTML=''
todos.forEach((todo , index)=>{
      const node = createTodoNode(todo , index)
      list.appendChild(node)
}

)}


function addbtn(){
const text = input.value.trim('')
if(!text){
    return
}
todos.push({text : text , completed :false})
input.value=''
savedtodos()
render()

}

add.addEventListener('click', addbtn)
render()