'use strict';

const buttonAddToCart = document.querySelector('#AddToCart');
const thumbs = document.querySelector('.thumbs');
const bigImg = document.querySelector('#big-image');

fetch('https://neto-api.herokuapp.com/cart/colors', {method : 'get'})
    .then(res => {
        if (200 <= res.status && res.status < 300) {
            return res;
        }
        throw new Error(res.statusText)})
    .then(res => res.json())
    .then(data => {colorsSet(data)})
    .catch((err) => {console.log(`Произошла ошибка : ${err.message}`)})

fetch('https://neto-api.herokuapp.com/cart/sizes', {method : 'get'})
    .then(res => {
        if (200 <= res.status && res.status < 300) {
            return res;
        }
        throw new Error(res.statusText)})
    .then(res => res.json())
    .then(data => {sizesSet(data)})
    .catch((err) => {console.log(`Произошла ошибка : ${err.message}`)})

fetch('https://neto-api.herokuapp.com/cart', {method : 'get'})
    .then(res => {
        if (200 <= res.status && res.status < 300) {
            return res;
        }
        throw new Error(res.statusText)
    })
    .then(res => res.json())
    .then(data => {createCart(data)})
    .catch((err) => {console.log(`Произошла ошибка : ${err.message}`)})

function colorsSet(data) {
    const colorSwatch = document.querySelector('#colorSwatch');
    data.forEach(function (item) {
        let available;
        let	checked;
        
        item.isAvailable 
            ? (available = 'available', checked = 'checked') 
            : (available = 'soldout', checked = 'disabled')
        
        colorSwatch.innerHTML += `
            <div data-value="${item.type}" class="swatch-element color ${item.type} ${available}">
                <div class="tooltip">${item.title}</div>
                <input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${checked}>
                <label for="swatch-1-${item.type}" style="border-color: red;">
                    <span style="background-color: ${item.code};"></span>
                    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                </label>
            </div>`;
        }  
    )

    if (localStorage.color) {
        (document.querySelectorAll('#colorSwatch input'))
            .forEach(function (item) {
                if(item.value == localStorage.color) {
                    item.checked = true;
                }
            }
        )
    }

    colorSwatch.addEventListener('click', (event) => {
        if (event.target.tagName =='INPUT') {
            localStorage.color = event.target.value;
        }
    })
}
    
function sizesSet(data) {
    const sizeSwatch = document.querySelector('#sizeSwatch');
    data.forEach(function (item) {
        let available;
        let	checked;
        
        item.isAvailable 
            ? (available = 'available', checked = 'checked') 
            : (available = 'soldout', checked = 'disabled')
                        
        sizeSwatch.innerHTML += `
            <div data-value="${item.type}" class="swatch-element plain ${item.type} ${available}">
                <input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${checked}>
                    <label for="swatch-0-${item.type}">
                    ${item.title}
                    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                </label>
            </div>`
        }
    )
    if (localStorage.sizes) {
        (document.querySelectorAll('#sizeSwatch input'))
            .forEach(function (item) {
                if(item.value == localStorage.sizes) {
                    item.checked = true;
                }
            }
        )
    }

    sizeSwatch.addEventListener('click', (event) => {
        if (event.target.tagName =='INPUT') {
            localStorage.sizes = event.target.value;
        }
    })
}

function createCart(data) {
    const quickCart = document.querySelector('#quick-cart');
    quickCart.innerHTML = ''
    let resultSum;
    data.forEach(function (item) {
        resultSum = item.price * item.quantity;
        quickCart.innerHTML +=
            `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
                <div class="quick-cart-product-wrap">
                    <img src=${item.pic} title=${item.title}>
                    <span class="s1" style="background-color: #000; opacity: .5">$${item.price}</span>
                    <span class="s2"></span>
                </div>
                <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
                <span class="quick-cart-product-remove remove" data-id=${item.id}></span>
            </div>`
        }
    )
         
    if (data.length != 0) {
        quickCart.innerHTML +=
            `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
                <span>
                    <strong class="quick-cart-text">Оформить заказ<br></strong>
                    <span id="quick-cart-price">$${resultSum}</span>
                </span>
            </a>`
        const remove = document.querySelector('.remove');
        remove.addEventListener('click', removeFromCart);

    }
}

function addToCart(event) {
    event.preventDefault();
    const formData = new FormData(event.target.closest('form'));
    formData.append('productId', event.target.closest('form').dataset.productId);

    fetch('https://neto-api.herokuapp.com/cart', {body : formData, method : 'post'})
        .then(res => {
            if (200 <= res.status && res.status < 300) {
                return res;
            }
            throw new Error(res.statusText)})
        .then(res => res.json())
        .then(data => {createCart(data)})
        .catch((err) => {console.log(`Произошла ошибка : ${err.message}`)});
}

function removeFromCart(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('productId', event.target.dataset.id);

    fetch('https://neto-api.herokuapp.com/cart/remove', {body:formData, method: 'post'})
        .then(res => {
            if (200 <= res.status && res.status < 300) {
                return res;
            }
            throw new Error(res.statusText)})
        .then(res => res.json())
        .then(data => {createCart(data)})
        .catch((err) => {console.log(`Произошла ошибка : ${err.message}`)});
}

function clickThumbs(event) {
    event.preventDefault();
    const curActiv = document.querySelector('a.active');
    curActiv.classList.remove('active');
    event.target.closest('a').classList.add('active');
    bigImg.style.backgroundImage = `url(${event.target.closest('a').href})`;
}

buttonAddToCart.addEventListener('click', addToCart);
thumbs.addEventListener('click', clickThumbs);

