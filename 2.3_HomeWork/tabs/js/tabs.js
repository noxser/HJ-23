'use strict'

const tabs = document.querySelectorAll('.tabs a'); 
const content = document.querySelector('.tabs #content');   
const preloader = document.querySelector('.tabs #preloader')

var xhr = new XMLHttpRequest();

xhr.open("GET", tabs[0].getAttribute('href'), true);
xhr.addEventListener("loadstart", onLoadStart);
xhr.addEventListener("loadend", onLoadEnd);
xhr.send();

function onLoadStart() {
    preloader.classList.remove('hidden')
}

function onLoadEnd() {
    preloader.classList.add('hidden')
    content.innerHTML = xhr.responseText;
}

function clickOnTab(event) {
    event.preventDefault();
    const currentTab = document.querySelectorAll('.tabs .active');   
    Array.from(currentTab).forEach(
        tab => tab.classList.remove('active'));
    this.classList.add('active');

    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.getAttribute('href'), true);
    xhr.addEventListener("loadstart", onLoadStart);
    xhr.addEventListener("loadend", onLoadEnd);
    xhr.send();
    preloader.classList.remove('hidden')
    
    function  onLoadEnd() {
        content.innerHTML = xhr.responseText;
        preloader.classList.add('hidden')
    }
}

Array.from(tabs).forEach(tab => {
    tab.addEventListener('click', clickOnTab);
});

