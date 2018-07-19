'use strict';

const Buttons = document.querySelectorAll('.button');

function onClick(event) {
  event.preventDefault();
  var innerTXT = event.target.closest('form').querySelector('.error-message'); // erorr messadge
  const formData = new FormData(event.target.closest('form')); // форм дата

  let objFromForm =  {}; // преобразуем форм дата в объект!!!
  for (const [key, value] of formData) {
    objFromForm[key] = value;
  }

  const formType = event.target.closest('form').classList[0] == 'sign-in-htm';
  const URLs = formType
    ? 'https://neto-api.herokuapp.com/signin'
    : 'https://neto-api.herokuapp.com/signup';
  
  const xhr = new XMLHttpRequest();
  xhr.open('POST', URLs , true); 
  xhr.setRequestHeader('Content-Type', 'application/json'); 
  xhr.addEventListener("load", onLoadEnd);
  xhr.send(JSON.stringify(objFromForm));
  // xhr.send(JSON.stringify(formData));  // не работало почемуто ошибка не полные данные по ка в obj не переделал

  function onLoadEnd() {
    if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
        return;
    }
    if (JSON.parse(xhr.responseText).error == undefined) {
      formType
      ? innerTXT.value = `Пользователь ${JSON.parse(xhr.responseText).name} успешно авторизован`
      : innerTXT.value = `Пользователь ${JSON.parse(xhr.responseText).name} успешно зарегистрирован`;
    } else {
      innerTXT.value = JSON.parse(xhr.responseText).message;
    }
  }
}

Array.from(Buttons).forEach(button => {
  button.addEventListener('click', onClick);
});

// m@m.ru m m ; zz@zz.ru z z ;
