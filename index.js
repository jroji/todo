let list = [];
let currentView = 'ongoing';

const listFromStorage = window.localStorage.getItem('todo-list');
if (listFromStorage) {
    list = JSON.parse(listFromStorage);
}

repaint();

function repaint() {
    window.localStorage.setItem('todo-list', JSON.stringify(list));
    // Obtenemos el contenedor de HTML y lo vaciamos
    const container = document.querySelector('.todo-list');
    container.innerHTML = '';
    // Hacemos un bucle para ejecutar esa función para cada elemento de la lista
    list.forEach(function(todoItem) {
        paintItem(todoItem, container);
    });
    addEvents();
}

function addEvents() {
    const todolistchecks = document.querySelectorAll('.todo-list_check');
    todolistchecks.forEach(function(item, index) {
        item.addEventListener('click', () => {
            if (list[index].status === 'completed') {
                list[index].status = 'ongoing'
            } else {
                list[index].status = 'completed'
            }
            repaint();
        });
    });
}

function paintItem(todoItem, container) {
    // if (todoItem.status === currentView) {
        const template = `<div class="todo-list_item ${todoItem.status}">
        <input class="todo-list_check" type="checkbox" ${todoItem.status === 'completed' ? 'checked' : ''}>
        <label class="todo-list_label">${todoItem.text}</label>
        </div>`;
        container.innerHTML = container.innerHTML + template;
    // }
}

function addTodo() {
    // // Buscamos el input y guardamos el valor
    const inputValue = document.querySelector('.todo-actions_input').value;

    // Creamos un objeto para almacenar distintos datos
    const todoObject = {
        text: inputValue,
        status: 'ongoing', // completed
        date: new Date(),
    };

    // // Metemos el objeto en la lista de elementos
    list.push(todoObject);
    repaint();
   
}