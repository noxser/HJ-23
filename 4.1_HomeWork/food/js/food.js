'use strict';

const urlRecieptInfo = 'https://neto-api.herokuapp.com/food/42';
const urlRecieptRating = 'https://neto-api.herokuapp.com/food/42/rating';
const urlRecieptСonsumers = 'https://neto-api.herokuapp.com/food/42/consumers';

// генерит имя для колбека нашел в инетах)
function randomName() {
    return 'callBack' + String(Math.random()).slice(-3);
}

function recieptInfo(reciept) {
    document.querySelector('[data-pic]').style.backgroundImage = `url(${reciept.pic})`;
    document.querySelector('[data-title]').textContent = reciept.title;
    document.querySelector('[data-ingredients]').textContent = Array.from(reciept.ingredients).join(', ');  
}

function recieptRating(rating) {
    document.querySelector('[data-rating]').textContent = rating.rating.toFixed(2);
    document.querySelector('[data-votes]').textContent = `(${rating.votes} оценок)`;
    document.querySelector('[data-star ]').style.width = `${rating.rating*100/10}%`;
}

function recieptСonsumers(usersInfo) {
    let dataHTML = '';
        usersInfo.consumers.forEach(consumers => {
            dataHTML += `<img src=${consumers.pic} title=${consumers.name}>`;
        });
        dataHTML += `<span>(${usersInfo.total})</span>`;
        document.querySelector('[data-consumers]').innerHTML = dataHTML;
}

function loadJSONP(url) {
    const callBackName = randomName();
    return new Promise((done, fail) => {
        window[callBackName] = done;
        const script = document.createElement('script');
        script.src = `${url}?jsonp=${callBackName}`;
        document.body.appendChild(script);
    });
}

document.addEventListener('DOMContentLoader',(
    loadJSONP(urlRecieptInfo)
        .then(recieptInfo).catch(err => console.log(err)),
    loadJSONP(urlRecieptRating)
        .then(recieptRating).catch(err => console.log(err)),
    loadJSONP(urlRecieptСonsumers)
        .then(recieptСonsumers).catch(err => console.log(err))
    )
);   