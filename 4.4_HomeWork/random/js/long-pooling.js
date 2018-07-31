'use strict';

const longPoolingDiv = document.querySelectorAll('.long-pooling div');

function takeNumberFromServLong() {

    function status(response) {
        if (200 <= response.status && response.status < 300) {
            // console.log("Long-Pooling ответ получен.");
            return response;
        }
        throw new Error(response.statusText);
    }

    function json(response) {
        return response.json();
    }

    function numberInDiv(response) {
        Array.from(longPoolingDiv).forEach(div => {div.className = ''});
        longPoolingDiv[response-1].className = 'flip-it';
        takeNumberFromServLong();
    }

    fetch('https://neto-api.herokuapp.com/comet/long-pooling', {method : 'get'})
        .then(status)
        .then(json)
        .then(numberInDiv)
        .catch((err) => {console.log(`Произошла ошибка : ${err.message}`)});
}

takeNumberFromServLong();

