'use strict'

const btnDefault = document.querySelector('.btn-default');   
const btnSuccess = document.querySelector('.btn-success');   
const btnWarning = document.querySelector('.btn-warning');   
const selectFrom = document.querySelector('.form-control');
const seatMapTitle = document.getElementById('seatMapTitle');
var seatMapDiv = document.getElementById('seatMapDiv')
const totalPax = document.getElementById('totalPax')
const totalAdult = document.getElementById('totalAdult')
const totalHalf = document.getElementById('totalHalf')

function loadData(event) {
    event.preventDefault();
    var plane = ''
    for (var i = 0; i < selectFrom.options.length; i++) {
        if (selectFrom.options[i].selected) {
            plane = selectFrom.options[i].value;
        }
    }

    fetch(`https://neto-api.herokuapp.com/plane/${plane}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`
            seatMapDiv.textContent =''
            for (var i = 0; i < data.scheme.length ; i++) {
                seatMapDiv.appendChild(createScheme(i, data.scheme[i], data.letters6, data.letters4))
            }
        });

    btnSuccess.disabled = false;
    btnWarning.disabled = false;
}

// формируем ряд в самолете
function createScheme (i, numberSeats, letters6, letters4) {
    const seatingRow = document.createElement('div');
    seatingRow.className = 'row seating-row text-center';
    
    const rowNumber = document.createElement('div');
    rowNumber.className = 'col-xs-1 row-number'
    const h2 = document.createElement('h2');
    h2.className = ''
    h2.textContent = `${i + 1}`

    const col1 = document.createElement('div');
    const col2 = document.createElement('div');
    col1.className = 'col-xs-5'
    col2.className = 'col-xs-5'

    const noSeat = document.createElement('div');
    noSeat.className = 'col-xs-4 no-seat';
    const seat = document.createElement('div');
    const seatLable = document.createElement('div');
    seat.className = 'col-xs-4 seat';
    seatLable.className = 'seat-label'

    // заполянем посадочне места в соответствии со схемой 
    if (numberSeats === 0) {
        col1.appendChild(noSeat.cloneNode(true))
        col2.appendChild(noSeat)
    } else {
        if (numberSeats == 4) {
            col2.appendChild(noSeat.cloneNode(true))
        };

        for (var i = 0; i < numberSeats/2 ; i++) {
            if (numberSeats == 4) {
                seatLable.textContent = letters4[i]
                seat.appendChild(seatLable)
                col1.appendChild(seat.cloneNode(true))
            } else {
                seatLable.textContent = letters6[i]
                seat.appendChild(seatLable)
                col1.appendChild(seat.cloneNode(true))
            }
        }

        for (var i = 0; i < numberSeats/2 ; i++) {
            seatLable.textContent = letters6[i+3]
            seat.appendChild(seatLable)
            col2.appendChild(seat.cloneNode(true))
        }
    }
 
    // компонуем остальные элементы документа в кучу.
    rowNumber.appendChild(h2)  
    seatingRow.appendChild(rowNumber);
    seatingRow.appendChild(col1);
    seatingRow.appendChild(col2);

    return seatingRow
}

// занимаем все места
function takeAllSeats(event){
    event.preventDefault();
    const allSeat = document.querySelectorAll('#seatMapDiv .seat');
    Array.from(allSeat).forEach(seat => {
        seat.className = 'col-xs-4 seat adult';
    })
    countSeats();
}

// очишаем занятые места
function disableAllSeats(event){
    event.preventDefault();
    const allSeat = document.querySelectorAll('#seatMapDiv .seat');
    Array.from(allSeat).forEach(seat => {
        seat.className = 'col-xs-4 seat';
    })
    countSeats();
}

// подсчитываем занятые места
function countSeats() {
    var adultSeats = 0;
    var halfSeats = 0;
    const allSeat = document.querySelectorAll('#seatMapDiv .seat');
    Array.from(allSeat).forEach(seat => {
        if (seat.classList.contains('adult')) {
            ++adultSeats;
        } else if (seat.classList.contains('half')) {
            ++halfSeats;
        }
    })
    totalAdult.textContent = adultSeats;
    totalPax.textContent = adultSeats + halfSeats;
    totalHalf.textContent = halfSeats;
}

// обрабатываем нажатия на схеме
// при повторном клике унимаем отметку
// перехватываем нажатие alt
function choseSeats(event) {
    event.preventDefault();
    var type = '';
    event.altKey ? type = 'half': type ='adult';
    
    if (event.target.classList.contains('seat-label')) {
        if (event.target.parentElement.classList.contains('adult')) {
            event.target.parentElement.classList.toggle('adult')
        }
        else if (event.target.parentElement.classList.contains('half')) {
            event.target.parentElement.classList.toggle('half')
        } else {
            event.target.parentElement.classList.toggle(type);
        }
    } 
    if (event.target.classList.contains('seat')) {
        if (event.target.classList.contains('adult')) {
            event.target.classList.toggle('adult');
        }
        else if (event.target.classList.contains('half')) {
            event.target.classList.toggle('half');
        } else {
            event.target.classList.toggle(type);
        }
    }  
    countSeats();
}


btnSuccess.disabled = true;
btnWarning.disabled = true;

btnDefault.addEventListener('click', loadData)
btnSuccess.addEventListener('click', takeAllSeats)  
btnWarning.addEventListener('click', disableAllSeats) 
seatMapDiv.addEventListener('click', choseSeats)

