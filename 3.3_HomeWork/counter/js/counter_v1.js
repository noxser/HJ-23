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
    // document.cookie = 'text=' + encodeURIComponent(counter.innerText);
}

Array.from(buttons).forEach(button => {
    button.addEventListener('click', event => clickButton());
});

function onLoad() {
    counter.innerText = 0;
    if (document.cookie) {
        counter.innerText = document.cookie.replace(/\D+/ig, '');  // убираем все буквы из строки
    }
}

document.addEventListener('DOMContentLoaded', onLoad());

window.onbeforeunload = function () {
    var date = new Date(new Date().getTime() + 60 * 1000);  // создаем дату удаления куки
    // по обновлению вкладки сразу пишем текущие данные в куку.
    document.cookie = 'value='+ encodeURIComponent(counter.innerText) + '; path=/; expires=' + date.toUTCString();
}
