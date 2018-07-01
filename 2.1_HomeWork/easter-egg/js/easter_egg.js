'use strict'

const nav = document.getElementsByTagName('nav')[0];
const netology = document.getElementsByClassName('secret')[0];
const secretCode = ["KeyY", "KeyT", "KeyN", "KeyJ", "KeyK", "KeyJ", "KeyU", "KeyB", "KeyZ"]
var listFromKeyboar = []

function showMenue(event) {
    if (event.ctrlKey && event.altKey && event.code == 'KeyT') {
        nav.classList.toggle('visible');
        listFromKeyboar = [];
    }
}

document.addEventListener('keydown', showMenue);

function showNetology(event) {
    if (listFromKeyboar[0] != "KeyY" || listFromKeyboar.length >8) {
        listFromKeyboar = [];
    }
    listFromKeyboar.push(event.code);
    if (listFromKeyboar.join('') == secretCode.join('')  ) {
        netology.classList.toggle('visible');
        listFromKeyboar = [];
    }
}

document.addEventListener('keydown', showNetology);

