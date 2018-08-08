'use strict'

const trash = document.querySelector('#trash_bin')
var canRemove = false;
const logoS = document.querySelectorAll('.logo')

Array.from(logoS).forEach(logo => {
    logo.setAttribute('draggable', true)
})

document.addEventListener('dragstart', event => {
    if (event.target.classList.contains('logo')) {
        event.target.style.opacity = '0.4';
        event.dataTransfer.setData('text', '');
    }
});

document.addEventListener('dragover', event => {
    if (event.target == trash) {
        event.preventDefault();
        canRemove = true;
    }
  });
  
document.addEventListener('dragleave', event => {
    if (event.target == trash) {
        canRemove = false;
    }
});

document.addEventListener('dragend', event => {
    if (canRemove) {
        event.target.style.display="none"
        canRemove = false;

    }
});

trash.addEventListener('dblclick', () => {
    Array.from(logoS).forEach(logo => {
        logo.style.display=""
        logo.style.opacity = '1';
    })
})