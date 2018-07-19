'use strict';

fetch('https://neto-api.herokuapp.com/cart/colors',{method: 'get'})
    .then(res => {
        return res
    })
    .then(res => res.json())
    .then(data => {
        colorsSet(data)
    })

fetch('https://neto-api.herokuapp.com/cart/sizes',{method: 'get'})
    .then(res => {
        return res
    })
    .then(res => res.json())
    .then(data => {
        sizesSet(data)
})

fetch('https://neto-api.herokuapp.com/cart',{method: 'get'})
    .then(res => {
        return res
    })
    .then(res => res.json())
    .then(data => {
        createCart(data)
})

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
				</div>`
        }
    )
}
    
function sizesSet(data) {
    const colorSwatch = document.querySelector('#sizeSwatch');
		data.forEach(function (item) {
			let available;
            let	checked;
            
            item.isAvailable 
                ? (available = 'available', checked = 'checked') 
                : (available = 'soldout', checked = 'disabled')
			
			colorSwatch.innerHTML += `
                <div data-value="${item.type}" class="swatch-element plain ${item.type} ${available}">
                    <input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${checked}>
                        <label for="swatch-0-${item.type}">
                        ${item.title}
                        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                    </label>
                </div>`
        }
    )
}

function createCart(data) {
    
// color: "blue"
// id: "2721888517"
// pic: "https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png"
// price: 800
// productId: "2721888517"
// quantity: 9
// size: "m"
// title: "Tony Hunfinger T-Shirt New York"


    const quickCart = document.querySelector('#quick-cart');
    quickCart.innerHTML = ''
    data.forEach(function (item) {
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
    let open, priceSum;

    data.lenght == 0 ? open = '' : open = 'open';
    
    priceSum = item.price * item.quantity;

    quickCart.innerHTML +=
    `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${open}">
        <span>
            <strong class="quick-cart-text">Оформить заказ<br></strong>
            <span id="quick-cart-price">$${priceSum}</span>
        </span>
    </a>`

    const remove = document.querySelector('.remove');
	remove.addEventListener('click', empty);
  
}

const addToCartText = document.querySelector('#AddToCart');

function addToCart(event) {
    event.preventDefault();
    // console.log(event.target)
    const formData = new FormData(event.target.closest('form')); // форм дата

    formData.append('productId', event.target.closest('form').dataset.productId);

    for (const [key, value] of formData) {
        console.log(key, value);
      }
    fetch('https://neto-api.herokuapp.com/cart', {body:formData, method: 'post'})
    .then(res => {
        return res
    })
    .then(res => res.json())
    .then(data => {
        createCart(data)
})
    
}

function removeFromCart(event) {
    event.preventDefault();
    // console.log(event.target)
    const formData = new FormData(event.target.closest('form'));

    formData.append('productId', event.target.closest('form').dataset.productId);

    for (const [key, value] of formData) {
        console.log(key, value);
      }
    fetch('https://neto-api.herokuapp.com/cart/remove', {body:formData, method: 'post'})
    .then(res => {
        return res
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
})
}

addToCartText.addEventListener('click', addToCart)

// превьюшки картинок
const thumbs = document.querySelector('.thumbs');
const bigImg = document.querySelector('#big-image');

function clickThumbs(event) {
    event.preventDefault();
    const curActiv = document.querySelector('a.active');
    curActiv.classList.remove('active')
    event.target.closest('a').classList.add('active')
    bigImg.style.backgroundImage = `url(${event.target.closest('a').href})`
}

thumbs.addEventListener('click', clickThumbs)