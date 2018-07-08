'use strict'

var currencys,codes;
const loader = document.getElementById('loader');
const source = document.getElementById('source');
const result = document.getElementById('result');
const main = document.getElementById('content');
const selectFrom = document.getElementById('from');
const selectTo = document.getElementById('to');

var xhr = new XMLHttpRequest();
xhr.open("GET", 'https://neto-api.herokuapp.com/currency', true);
xhr.addEventListener("loadstart", onLoadStart)
xhr.addEventListener("loadend", onLoadEnd);
xhr.send();

function onLoadStart() {
    loader.classList.remove('hidden');
}

function onLoadEnd() {
    loader.classList.add('hidden');
    main.classList.remove('hidden');
    currencys = JSON.parse(xhr.responseText);
    currencys.forEach(code => {
        selectFrom.options.add(new Option(code.code,code.value));
        selectTo.options.add(new Option(code.code,code.value));
    });
    changeValue();
}

function changeValue() {
    let from, to;
    for (var i = 0; i < selectFrom.options.length; i++) {
        var option = selectFrom.options[i];
        if(option.selected) {
            from = option.value;
        }
      }
      for (var i = 0; i < selectTo.options.length; i++) {
        var option = selectTo.options[i];
        if(option.selected) {
            to = option.value;
        }
      }
      result.value = (Math.round(((from/to)*source.value)*100)/100)
}

selectFrom.addEventListener('input', changeValue);
selectTo.addEventListener('input', changeValue);
source.addEventListener('input', changeValue);