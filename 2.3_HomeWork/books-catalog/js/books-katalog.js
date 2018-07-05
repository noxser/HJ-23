'use strict'

const booksPlace = document.getElementById('content');
booksPlace.innerHTML= ('Загрузка!');

var xhr = new XMLHttpRequest();
xhr.open("GET", 'https://neto-api.herokuapp.com/book/', true);
xhr.addEventListener("loadend", onLoadEnd);
xhr.send();

function  createHTML(data) {
    return `<li data-title="${data.title}" data-author="${data.author.name}" data-info="${data.info}" 
    data-price="490"> <img src="${data.author.pic}"> </li>`
}

function onLoadEnd() {
    var booksInfo = JSON.parse(xhr.responseText);
    booksPlace.innerHTML = booksInfo.map(createHTML).join('');
}

