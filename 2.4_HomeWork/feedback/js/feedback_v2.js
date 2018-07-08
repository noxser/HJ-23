'use strict'

const formGroup = document.forms[0].elements
const outputGroup = document.getElementsByTagName('output')
const buttonContentForm = document.querySelector('.contentform .button-contact')
const buttonOutput = document.querySelector('#output .button-contact')


// проверяем заполнение формы и активность кнопки
function completeForm() {
    var goodForm = 12;
    for (var i = 0; i < formGroup.length; i++) {
        formGroup[i].value !== '' ? --goodForm : ++goodForm;
    }
    goodForm == 0 ? buttonContentForm.disabled = false : buttonContentForm.disabled = true;
}

Array.from(formGroup).forEach(inputs => {
    inputs.addEventListener('input', completeForm);
});

// фильтруем вовод в поле zip
function chekInPut(e) {
    if (e.key < '0' || e.key > '9') {
        return e.preventDefault()
    } 
    return
}

document.forms[0].zip.addEventListener('keypress', chekInPut)

// обрабатываем клик по кнопкам
function showMessage() {
    event.preventDefault();
    document.getElementsByClassName('contentform')[0].classList.toggle('hidden')
    document.getElementById('output').classList.toggle('hidden')
    for (var i = 0; i < formGroup.length; i++) {
        if (outputGroup[formGroup[i].name] !== undefined) {
            outputGroup[formGroup[i].name].value = 111;
        }
    }
}
    
buttonContentForm.addEventListener('click', showMessage);
buttonOutput.addEventListener('click', showMessage);

