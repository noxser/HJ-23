'use strict'

const buttons = document.getElementsByClassName('add');
var cartCount = 0;
var cartTotalPrice = 0;

function addInCart() {
    console.log(Number(this.dataset.price));
    document.getElementById('cart-count').innerHTML = ++cartCount;
    cartTotalPrice = cartTotalPrice + Number(this.dataset.price);
    document.getElementById('cart-total-price').innerHTML = getPriceFormatted(cartTotalPrice);
}

Array.from(buttons).forEach(button => {
    button.addEventListener('click', addInCart);
});