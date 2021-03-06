'use strict';

const counter = document.querySelector('#counter');
const buttons = document.getElementsByTagName('button');

function clickButton() {
    if (event.target.id == 'increment') {
        ++counter.innerText;
    }
    if (event.target.id == 'decrement' && counter.innerText > 0) {
        --counter.innerText;
    }
    if (event.target.id == 'reset') {
        counter.innerText = 0;
    }
}

Array.from(buttons).forEach(button => {
    button.addEventListener('click', event => clickButton());
});

function onLoad() {
    console.log(localStorage.counter)
    
    if (localStorage.counter) {
        counter.innerText = localStorage.counter;
    } else {
        counter.innerText = 0;
    }
}

document.addEventListener('DOMContentLoaded', onLoad());

window.onbeforeunload = function () {
    localStorage.counter = counter.innerText;
}
