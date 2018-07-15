'use strict';

const goods = document.querySelector('.items-list');

function clickOnGoods(event) {
    if (!(event.target.classList.contains('add-to-cart'))) {
        return;
    }
    addToCart({
        title: `${event.target.dataset.title}`,
        price: `${event.target.dataset.price}`
    });
}

goods.addEventListener('click', clickOnGoods);

