'use strict';

const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');
const colorStars = ['#ffffff', '#ffe9c4', '#d4fbff'] 
canvas.style.background = 'black'
 
function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
	return Math.round(getRandom(min, max));
}

// генерируем звездное небо)
function generetaStars(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var i = 0;
    while (i < randomInt(200, 400)) {
        var x = randomInt(0, canvas.width);
        var y = randomInt(0, canvas.height);
        var size = getRandom(0, 1.1);
        var rectangle = new Path2D();
        ctx.globalAlpha = getRandom(0.8, 1);
        rectangle.rect(x, y, size, size);
        ctx.fillStyle = colorStars[randomInt(0, 2)];
        ctx.fill(rectangle);
        i++;
    }
}

// document.addEventListener('DOMContentLoader', generetaStars())
canvas.addEventListener('click', generetaStars)
