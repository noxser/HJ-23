'use strict'

const formGroup = document.getElementsByClassName('form-group')
const outputGroup = document.getElementsByTagName('output')
const buttonContentForm = document.querySelector('.contentform .button-contact')
const buttonOutput = document.querySelector('#output .button-contact')

// проверяем заполнение формы и активность кнопки
function completeForm() {
    var good = 11;
    for (var i = 0; i < formGroup.length; i++) {
        if (formGroup[i].getElementsByTagName('input')[0] == undefined ) {
            if(formGroup[i].getElementsByTagName('textarea')[0].value == '') {
                --good;
            }
        } else {
            if(formGroup[i].getElementsByTagName('input')[0].value == '') {
               --good;
            }
        }   
    }
    if (good == formGroup.length) {
        buttonContentForm.disabled = false
    } else {
        buttonContentForm.disabled = true
    }
}

Array.from(formGroup).forEach(inputs => {
    inputs.addEventListener('input', completeForm);
});

// фильтруем вод в поле zip
function chekInPut(e) {
    if (e.key < '0' || e.key > '9') {
        return e.preventDefault()
    } 
    return
}

document.forms[0].zip.addEventListener('keypress', chekInPut)

// обрабатываем клик по кнопкам
function showMessage(event) {
    var namez, valuee;
    event.preventDefault();
    document.getElementsByClassName('contentform')[0].classList.toggle('hidden')
    document.getElementById('output').classList.toggle('hidden')
    for (var i = 0; i < formGroup.length; i++) {
        if (formGroup[i].getElementsByTagName('input')[0] == undefined ) {
            namez =  formGroup[i].getElementsByTagName('textarea')[0].name
            valuee = formGroup[i].getElementsByTagName('textarea')[0].value 
            if (outputGroup[namez] !== undefined) {
                outputGroup[namez].value = valuee;
            }
        } else {
            namez =  formGroup[i].getElementsByTagName('input')[0].name
            valuee = formGroup[i].getElementsByTagName('input')[0].value  
            if (outputGroup[namez] !== undefined) {
                outputGroup[namez].value = valuee;
            }
        }
    }
}
    
buttonContentForm.addEventListener('click', showMessage);
buttonOutput.addEventListener('click', showMessage);

