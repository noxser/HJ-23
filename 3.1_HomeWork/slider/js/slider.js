'use strict'

function slider(container) {

    const slides = document.querySelector('.slides');
    const slideButtons = document.querySelectorAll('a[data-action]');
    const prev = document.querySelector('a[data-action = prev]');
    const next = document.querySelector('a[data-action = next]');
    const first = document.querySelector('a[data-action = first]');
    const last = document.querySelector('a[data-action = last]');

    // навешиваем обработчики на кнопки
    Array.from(slideButtons).forEach(button => {
        button.addEventListener('click', changeSliders);
    });

    // состояние по умолчанию
    slides.firstElementChild.classList.add('slide-current');
    first.classList.add('disabled');
    prev.classList.add('disabled');

    // логика работы кнопок
    function changeSliders(event) {
        // игнорируем повторные клики по не активным кнопкам
        if (event.target.classList.contains('disabled')) {
            return;
        }

        const currentSlide = container.querySelector('.slide-current');
        var activatedSlide;
        var currentAction = event.target.dataset.action;

        if (currentAction == 'last') {
            activatedSlide = currentSlide.parentElement.lastElementChild;
        } else if (currentAction == 'first') {
            activatedSlide = currentSlide.parentElement.firstElementChild;
        } else {
            activatedSlide = (currentAction == 'next' || currentAction == 'last') 
            ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
        }
        
        currentSlide.classList.remove('slide-current');
        activatedSlide.classList.add('slide-current');

        // меняем состояние кнопок после клика
        if (activatedSlide.nextElementSibling) {
            next.classList.remove('disabled');
            last.classList.remove('disabled');
        } else {
            next.classList.add('disabled');
            last.classList.add('disabled');
        }
        if (activatedSlide.previousElementSibling) {
            prev.classList.remove('disabled');
            first.classList.remove('disabled');
        } else {
            prev.classList.add('disabled');
            first.classList.add('disabled');
        }
    }
 }

  const sliders = document.querySelectorAll('.slider');
  Array.from(sliders).forEach(item => slider(item));

  