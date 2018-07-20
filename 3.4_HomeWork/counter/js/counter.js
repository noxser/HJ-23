'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter')

connection.addEventListener('message', event => {
    const data = (JSON.parse(event.data))
    const counter = document.querySelector('.counter');
    const output = document.querySelector('output.errors');
    counter.innerHTML = data.connections;
    output.value = data.errors;
})

connection.addEventListener('error', error => {
    console.log(`Ошибка: ${error.data}`);
})

window.addEventListener('beforeunload', () => {
    connection.close(1000);
})

