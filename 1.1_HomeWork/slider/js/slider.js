'use strict';
const imgsName = [
    'airmax.png',
    "airmax-jump.png", 
    "airmax-on-foot.png", 
    "airmax-playground.png", 
    'airmax-top-view.png', 
    ];
  const img = document.getElementById("slider");
  let step = 1;
  setInterval(() => {
    if (step == imgsName.length) {
      step = 0
      }
    img.src = "i/" + imgsName[step];
    ++step;
  }, 5000);