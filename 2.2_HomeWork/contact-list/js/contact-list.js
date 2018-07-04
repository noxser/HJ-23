'use strict'

var contactList = document.getElementsByClassName('contacts-list')[0];

var contacts = JSON.parse(loadContacts());

function createHTML(data) {
    return '<li data-email=\'' + data.email + '\'data-phone=\'' + data.phone + '\'><strong>' + data.name + '</strong></li>';
}

function start() {
    contactList.innerHTML = contacts.map(createHTML).join('')
}

document.addEventListener('DOMContentLoaded', start);

