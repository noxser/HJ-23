'use strict'

function slider(container) {
    const checkBox = container.getElementsByTagName('input');
    const undone = container.querySelector('.undone');
    const done = container.querySelector('.done');

    function deal() {
        const task = event.target.parentElement;
        if (!event.target.checked) {
            undone.appendChild(task);
            event.target.removeAttribute('checked');
            // event.target.checked = false  
        } else {
            done.appendChild(task);
            event.target.checked = true;          
        }
    }

    Array.from(checkBox).forEach(item => item.addEventListener('click', event => deal()));
}

const todoList = document.querySelectorAll('.todo-list');
Array.from(todoList ).forEach(item => slider(item));

