'use strict'

const drumPad = document.getElementsByClassName('drum-kit__drum');

function sound() {
    this.getElementsByTagName('audio')[0].currentTime = 0;
    this.getElementsByTagName('audio')[0].play();
}

for (const pad of drumPad) {
    pad.onclick = sound;
}