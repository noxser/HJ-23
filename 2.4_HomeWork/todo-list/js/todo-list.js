'use strict'

const tasks = document.getElementsByTagName('input');
const listBlock = document.getElementsByClassName('list-block')[0];
const output = document.getElementsByTagName('output')[0];
var completeTasks = 0;

function checkedOnStart() {
    Array.from(tasks).forEach(task => {
        if (task.checked) {
            output.value = `${++completeTasks} из ${tasks.length}`;
            }
        }
    )
}

function onClick() {
    listBlock.classList.remove('complete')
    if (this.checked) {
        output.value = `${++completeTasks} из ${tasks.length}`;
    } else { 
        output.value = `${--completeTasks} из ${tasks.length}`;
    }
    if (completeTasks == tasks.length) {
        listBlock.classList.add('complete')
    }
}

Array.from(tasks).forEach(task => {
    task.addEventListener('click', onClick);
});

document.addEventListener('DOMContentLoaded', checkedOnStart);


