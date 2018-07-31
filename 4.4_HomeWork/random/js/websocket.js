'use strict';

const webSocketDiv = document.querySelectorAll('.websocket div');
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('open', event => {
  console.log("WebSocket соединение установлено.");
});

ws.addEventListener('message', event => {
    Array.from(webSocketDiv).forEach(div => {
        div.className = '';
    })
    webSocketDiv[event.data-1].className = 'flip-it';
});

ws.addEventListener('error', error => {
  console.log('Ошибка ' + error.data);
});

window.addEventListener('beforeunload', () => {
  ws.close(1000);
});

