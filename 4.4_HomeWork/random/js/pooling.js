'use strict';

const poolingDiv = document.querySelectorAll('.pooling div');

function takeNumberFromServ() {

    function status(response) {
        if (200 <= response.status && response.status < 300) {
            // console.log("Pooling ответ получен.");
            return response;
        }
        throw new Error(response.statusText);
    }

    function json(response) {
        return response.json();
    }

    function numberInDiv(response) {
        Array.from(poolingDiv).forEach(div => {div.className = ''});
        poolingDiv[response-1].className = 'flip-it';
    }

    fetch('https://neto-api.herokuapp.com/comet/pooling', {method : 'get'})
        .then(status)
        .then(json)
        .then(numberInDiv)
        .catch((err) => {console.log(`Произошла ошибка : ${err.message}`)});
}

setInterval(takeNumberFromServ, 5000);

