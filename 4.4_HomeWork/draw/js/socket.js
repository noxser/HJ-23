'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

ws.addEventListener('open', event => {
  console.log("Соединение установлено.");
});

ws.addEventListener('message', event => {
  console.log(event.data)
});

ws.addEventListener('error', error => {
  console.log('Ошибка ' + error.data);
});

editor.addEventListener('update', (event) => {
  const canvas = event.canvas;
  canvas.toBlob(blob => {
    ws.send(blob);
  })
});

window.addEventListener('beforeunload', () => {
  ws.close(1000);
});
