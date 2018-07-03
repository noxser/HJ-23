'use strict'

const pianoKeys = document.getElementsByTagName('li');
const modPiano = document.getElementsByTagName('ul')[0];
const sounds = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];
var pathSound = '/middle/';

function playSound(event) {
    let keyNum = Array.from(pianoKeys).indexOf(this);  // находим индеекс нажатой клавиши
    this.getElementsByTagName('audio')[0].src = 'sounds'+ pathSound + sounds[keyNum];
    this.getElementsByTagName('audio')[0].play();
  }

function hiLoSound(event) {
    if (event.shiftKey) {
        modPiano.classList.add('lower')
        pathSound = '/lower/';
    }
    if (event.altKey) {
        modPiano.classList.add('higher')
        pathSound = '/higher/';
    }
}

function defaultSound(event) {
    modPiano.classList.remove('higher', 'lower')
    modPiano.classList.add('middle')
    pathSound = '/middle/';
}

Array.from(pianoKeys).forEach(key => {
    key.addEventListener('click',playSound);
});

document.addEventListener('keydown', hiLoSound);
document.addEventListener('keyup', defaultSound);

