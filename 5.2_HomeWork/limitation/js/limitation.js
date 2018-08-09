'use strict'

const textarea = document.querySelector('.textarea');
const block = document.querySelector('.block');
const message = document.querySelector('.message');
let mouseOut = false;

// оптимизируем ввод
function debounce(callback, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            callback();
        }, delay)
    };
}

textarea.addEventListener('focus',() => {
    block.classList.add('active')
    }
)

textarea.addEventListener('click',() => {
    block.classList.add('active')
    message.classList.remove('view')
    }
)

// сбрасываем состояние при начале ввода в поле
textarea.addEventListener('input',() => {
    block.classList.add('active')
    message.classList.remove('view')
    mouseOut = false;
})

// при остановке ввода более 2 сек сообщение
textarea.addEventListener('keydown', debounce(() => {
    if (!mouseOut) {
      block.classList.remove('active')
      message.classList.add('view')
      }}, 2000)
)

// реагируем по движению мыши
textarea.addEventListener('mouseout',() => {
    block.classList.remove('active')
    message.classList.remove('view')
    mouseOut = true;
})


// **********************************************
// // при клике по полю ожидаем ввод если нет то сообщение 
// textarea.addEventListener('focus',debounce(() => {
//     block.classList.remove('active')
//     message.classList.add('view')
//     },2000)
// )

// // сбрасываем состояние при начале ввода в поле
// textarea.addEventListener('input',() => {
//     block.classList.add('active')
//     message.classList.remove('view')
// })

// // при остановке ввода более 2 сек сообщение
// textarea.addEventListener('keydown', debounce(() => {
//     block.classList.remove('active')
//     message.classList.add('view')
//     }, 2000)
// )

// // реагируем по движению мыши
// textarea.addEventListener('mouseover',() => {
//     block.classList.add('active')
//     message.classList.remove('view')
// })

// textarea.addEventListener('mouseout',() => {
//     block.classList.remove('active')
//     message.classList.remove('view')
// })

