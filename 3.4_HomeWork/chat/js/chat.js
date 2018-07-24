'use strict';

const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const messageInput = chat.querySelector('.message-input');
const messageSubmit = chat.querySelector('.message-submit');
const messageStatus = chat.querySelector('.message-status');
const messagesContent = chat.querySelector('.messages-content');
const loadingMessage = chat.querySelector('.loading');
const inputMessage = chat.querySelectorAll('div.message')[1];
const personalMessage = chat.querySelector('.message-personal');
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

function curTime() {
    // используем 'en-GB' для отобраени 01:01:00 дальше оставляем только часы и минуты
    return (new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'}));
};

// поменяем линки на аватарку для кодпена
loadingMessage.querySelector('img').src = 'https://netology-code.github.io/hj-homeworks/websocket/chat/i/profile-80.jpg';
inputMessage.querySelector('img').src = 'https://netology-code.github.io/hj-homeworks/websocket/chat/i/profile-80.jpg';

connection.addEventListener('open', () => {
    messageSubmit.disabled = false;
    chatStatus.textContent = chatStatus.dataset.online;
    const msg = messageStatus.cloneNode(true);
    msg.querySelector('.message-text').textContent = 'Пользователь появился в сети';
    messagesContent.appendChild(msg);
});

connection.addEventListener('message', event => {
    let mes;
    if (event.data === '...') {
        mes = loadingMessage.cloneNode(true);
        messagesContent.appendChild(mes);
    };
    if (event.data != '...') {
        let removeloading = messagesContent.querySelector('.message loading');
        if (removeloading) {
            messagesContent.removeChild(removeloading);
        };
        mes = inputMessage.cloneNode(true);
        mes.querySelector('span').textContent = event.data;
        mes.querySelector('.timestamp').textContent =`${curTime()}`;
        messagesContent.appendChild(mes);
    };
});

messageSubmit.addEventListener('click', event => {
    event.preventDefault();
    connection.send(messageInput.value);
    let mes = personalMessage.cloneNode(true);
    mes.querySelector('.message-text').innerText = messageInput.value;
    mes.querySelector('.timestamp').innerText =`${curTime()}`;
    messagesContent.appendChild(mes);
    messageInput.value = '';
});

connection.addEventListener('error', error => {
    console.log(`Ошибка: ${error.data}`);
});

connection.addEventListener('close', event => {
    console.log('Соединение закрыто сервером');
    chatStatus.textContent = chatStatus.dataset.offline;
    messageSubmit.disabled = true;
    let mes = messageStatus.cloneNode(true);
    mes.querySelector('.message-text').textContent = 'Пользователь не в сети';
    messagesContent.appendChild(mes);
});

window.addEventListener('beforeunload', () => {
    connection.close(1000);
});

