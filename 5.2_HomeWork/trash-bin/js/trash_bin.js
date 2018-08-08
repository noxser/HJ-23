'use strict'
const trash = document.querySelector('#trash_bin');
let movedPiece = null;
let shiftX = 0;
let shiftY = 0;
let xStart = 0;
let yStart = 0;

const dragStart = event => {
    if (event.target.classList.contains('logo')) {
      movedPiece = event.target;
      // запоминаем начальное положение
      xStart = event.target.getBoundingClientRect().left
      yStart = event.target.getBoundingClientRect().top
      // корректируем смешение курсора при перемешении объекта
      shiftX = event.pageX - xStart - window.pageXOffset;
      shiftY = event.pageY - yStart - window.pageYOffset;
    }
  };

const drag = throttle((x, y) => {
    if (movedPiece) {
        x = x - shiftX;
        y = y - shiftY;
        movedPiece.style.left = x + 'px';
        movedPiece.style.top = y + 'px';
        movedPiece.classList.add('moving');
    }
});

const drop = event => {
    if (event.target == trash) {
        movedPiece.style.display="none"
        movedPiece = null;
    } else {
        movedPiece.classList.remove('moving');
        movedPiece.style.left = xStart + 'px';
        movedPiece.style.top = yStart + 'px';
        movedPiece = null;
    }
};

document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', event => drag(event.pageX, event.pageY));
document.addEventListener('mouseup', drop);

document.addEventListener('touchstart', event => dragStart(event.touches[0]));
document.addEventListener('touchmove', event => drag(event.touches[0].pageX, event.touches[0].pageY));
document.addEventListener('touchend', event => drop(event.changedTouches[0]));

// оптимизируем анимацию
function throttle(callback) {
    let isWaiting = false;
    return function () {
      if (!isWaiting) {
        callback.apply(this, arguments);
        isWaiting = true;
        requestAnimationFrame(() => {
          isWaiting = false;
        });
      }
    };
  }
  
trash.addEventListener('dblclick', () => {location.reload()})
