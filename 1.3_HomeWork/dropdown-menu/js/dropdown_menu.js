'use strict'

const dropMenue = document.getElementsByClassName('wrapper-dropdown');

function showMenue() {
    dropMenue[0].classList.toggle("active");
}

dropMenue[0].onclick = showMenue;
