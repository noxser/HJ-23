'use strict'

const imgs = document.getElementsByTagName('a');
const bigImg = document.getElementById('view');

function currentImgs(event) {
    event.preventDefault();
    const currentImg = document.getElementsByClassName('gallery-current');
    Array.from(currentImg).forEach(
        img => img.classList.remove('gallery-current'));
    this.classList.add('gallery-current');
    bigImg.src = this.href;
  }

Array.from(imgs).forEach(img => {
    img.addEventListener('click', currentImgs);
});
