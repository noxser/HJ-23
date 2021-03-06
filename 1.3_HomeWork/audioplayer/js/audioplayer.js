'use strict'

const track = ['LA Chill Tour.mp3', 'LA Fusion Jam.mp3', 'This is it band.mp3'];

const playstate = document.getElementsByClassName('playstate')[0];
const stopButton = document.getElementsByClassName('stop')[0];
const buttonNextTrack = document.getElementsByClassName('next')[0];
const buttonPrevTrack = document.getElementsByClassName('back')[0];
const player = document.getElementsByTagName('audio')[0]
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const title = document.getElementsByClassName('title')[0];

function buttonClickPlayPause() {
    if (mediaplayer.classList.contains('play')) {
        mediaplayer.classList.remove('play');
        player.pause();
    } else {
        mediaplayer.classList.add('play');
        player.play();
        // проверяем играет ли музыка если нет то отключаем анимамцию
        function stopThenEnd() {
            if (player.ended) {
                buttonClickStop(); // отключаем анимацию
                clearInterval(timer); // убиваем таймер
            }
        }
        var timer = setInterval(stopThenEnd, 1000); // по таймеру проверяем каждую секунду
    }
}

function buttonClickStop() {
    mediaplayer.classList.remove('play');
    player.currentTime = 0;
    player.pause();
}

let step = 0

function buttonClickNext() {
    ++step;
    if (step == track.length) {
        step = 0
    }
    player.src = "mp3/" + track[step];
    if (mediaplayer.classList.contains('play')) {
        player.play();
    }
    title.title = track[step].replace('.mp3','')
}

function buttonClickPrev() {
    --step;
    if (step < 0) { step = track.length + step}
    player.src = "mp3/" + track[step];
    if (mediaplayer.classList.contains('play')) {
        player.play();
    }
    title.title = track[step].replace('.mp3','')
}

playstate.onclick = buttonClickPlayPause;
buttonNextTrack.onclick = buttonClickNext;
buttonPrevTrack.onclick = buttonClickPrev;
stopButton.onclick = buttonClickStop;
