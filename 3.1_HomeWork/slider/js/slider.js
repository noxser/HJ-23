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
        if (button.dataset.action == 'first' || button.dataset.action == 'prev') {
            button.addEventListener('click', event => changeSlider(false))
        } 
        if (button.dataset.action == 'next' || button.dataset.action == 'last') {
            button.addEventListener('click', event => changeSlider(true))
        }
    });

    // состояние по умолчанию
    slides.firstElementChild.classList.add('slide-current');
    first.classList.add('disabled');
    prev.classList.add('disabled');

    // логика работы кнопок
    function changeSlider(move) {
        // игнорируем повторные клики по не активным кнопкам
        if (event.target.classList.contains('disabled')) {
            return;
        }

        const currentSlide = container.querySelector('.slide-current');
        var activatedSlide;

        if (event.target.dataset.action == 'last') {
            activatedSlide = currentSlide.parentElement.lastElementChild;
        } else if (event.target.dataset.action == 'first') {
            activatedSlide = currentSlide.parentElement.firstElementChild;
        } else {
            activatedSlide = move ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
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

  