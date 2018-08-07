'use strict';

const pupil = document.querySelector('.big-book__pupil');
const eye = document.querySelector('.big-book__eye');

// при загрузке коордтинаты мыши на 0 0
let mouseX = 0;
let mouseY = 0;

// находим координаты центра глаза + добавляем величину прокрутки экрана
const eyeX = (eye.getBoundingClientRect().left + eye.getBoundingClientRect().right) / 2 + pageXOffset;
const eyeY = (eye.getBoundingClientRect().top + eye.getBoundingClientRect().bottom) / 2 + pageYOffset;
// задаем отступ до левого края 
const leftEye = eyeX;
const upEye = eyeY;
// вычисляем отступ до правого края (получаем ширину документа с учетом полосы прокрутки)
const rightEye = document.body.scrollWidth - eyeX;
const downEye = document.body.scrollHeight - eyeY;

// получаем координаты курсора 
document.addEventListener('mousemove', event => {
    mouseX = event.pageX;
    mouseY = event.pageY;
}); 

// реализуем анимацию при движении мыши по документу
function tick() {
    //отслеживаем координаты курсора и вычисляем смещение зрачка
    const pupilX = mouseX < eyeX ? 30 * (mouseX - eyeX) / leftEye : 30 * (mouseX - eyeX) / rightEye;
    const pupilY = mouseY < eyeY ? 30 * (mouseY - eyeY) / upEye : 30 * (mouseY - eyeY) / downEye;
    const sizeChanger = Math.max(Math.abs(pupilX), Math.abs(pupilY));
    // меняем размер глаза в зависимости от удаленияот центра 
    const pupilSize = 3 - (sizeChanger / 15);
    // прописываем смещения 
    pupil.style.setProperty('--pupil-x', `${pupilX}px`);
    pupil.style.setProperty('--pupil-y', `${pupilY}px`);
    pupil.style.setProperty('--pupil-size', pupilSize);
    // ждем отрисовки
    window.requestAnimationFrame(tick);
}

tick();