'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse')

connection.addEventListener('open', () => {
	showBubbles(connection);
});

document.addEventListener('click', onClick);

function onClick (event) {
    connection.send(JSON.stringify({
        x: event.clientX, 
        y: event.clientY})
    );
    showBubbles(connection);
}

connection.addEventListener('error', error => {
    console.log(`Ошибка: ${error.data}`);
})

window.addEventListener('beforeunload', () => {
    connection.close(1000);
});