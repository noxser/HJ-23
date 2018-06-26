'use strict';

const imgsName = [
    "breuer-building.jpg", 
    "guggenheim-museum.jpg", 
    "headquarters.jpg", 
    'IAC.jpg', 
    'new-museum.jpg'
    ];
    
  const img = document.getElementById("currentPhoto");
  const buttonPrevPhoto = document.getElementById('prevPhoto');
  const buttonNextPhoto = document.getElementById('nextPhoto');

  let step = 0

  function buttonClickNext() {
    ++step;
    if (step == imgsName.length) {
      step = 0
      }
    img.src = "i/" + imgsName[step];
  }

  function buttonClickPrev() {
    --step;
    if (step < 0) { step = imgsName.length + step}
    img.src = "i/" + imgsName[step];
  }

  buttonNextPhoto.onclick = buttonClickNext;
  buttonPrevPhoto.onclick = buttonClickPrev;