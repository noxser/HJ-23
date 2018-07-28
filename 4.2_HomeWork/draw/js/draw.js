'use strict';

var brushRadius = 100; // стартовый радиус кисти
let hue = 0; // задаем стартовый тон для hue 
const canvas = document.getElementById('draw');
const ctx = canvas.getContext("2d");
let brushRadiusDown = true; // уменьшаем радиус кисти с 100 и вниз до 5 если true и на оборот
let switchHue = false; // меняем направление изменения тона 
let curves = [];
let drawing = false;
let needsRepaint = false;

// меняем радиус кисти
function brushRadiusChange() {
  if(brushRadiusDown) {
    if( brushRadius > 6 ) {
      --brushRadius
    } else {
      --brushRadius
      brushRadiusDown = false
    }
  } else {
    if( brushRadius < 100 ) {
      ++brushRadius
    } else {
      --brushRadius
      brushRadiusDown = true
    }
  }
  return brushRadius;
}

// меняем тон кисти
function changeHue() {
  if(switchHue) {
    if( hue > 5 ) {
      --hue
    } else {
      --hue
      switchHue = false
    }
  } else {
    if( hue < 359 ) {
      ++hue
    } else {
      --hue
      switchHue = true
    }
  }
  return hue;
}

// рисуем точку
function circle(point) {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${point.hue}, 100%, 50%)`;
  ctx.arc(...point, point.brushRadius / 2, 0, 2 * Math.PI);
  ctx.fill();
}

// рисует кривую между двумя точками
function smoothCurveBetween (p1, p2) {
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = p1.brushRadius;
  ctx.strokeStyle = `hsl(${p1.hue}, 100%, 50%)`;
  ctx.beginPath();
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.quadraticCurveTo(...p1, ...cp); // квадратичная кривая
  ctx.stroke();
}

// получаем массив точек и строим кривую
function smoothCurve(points) {
  ctx.moveTo(...points[0]);
  for(let i = 1; i < points.length - 1; i++) {
    smoothCurveBetween(points[i], points[i + 1]);
  }
}

// изменяем размер холста
function updateCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

// перехват событий мыши
canvas.addEventListener("mousedown", (evt) => {
  if (evt.which == 1) {
    drawing = true;
    switchHue = evt.shiftKey; // нажимаем shift меняем направление hue
    const curve = []; // создаем новую кривую
    const point = [evt.offsetX, evt.offsetY]; // создаем новую точку
    point.hue = hue;
    point.brushRadius = brushRadius;
    curve.push(point); 
    curves.push(curve); // кривую добавляем в массив кривых
    needsRepaint = true; 
  }
});

// при поднятии мыши останавливаем рисование
canvas.addEventListener("mouseup", (evt) => {
  drawing = false;
});

canvas.addEventListener("mouseleave", (evt) => {
  drawing = false;
});

// перехватываем координаты курсора при движении мыши
canvas.addEventListener("mousemove", (evt) => {
  if (evt.which == 1) {
    if (drawing) {
      const point = [evt.offsetX, evt.offsetY] // создаем новую точку
      point.hue = hue;
      point.brushRadius = brushRadius;
      curves[curves.length - 1].push(point);
      needsRepaint = true;
    }
  }
});

// очистка двойной клик
canvas.addEventListener('dblclick', () => {
  curves = [];
  needsRepaint = true;
});

// очистка изменение размера окна
window.addEventListener('resize', () => {
  updateCanvasSize();
  curves = [];
  needsRepaint = true;
});

// перерисовка холста по tick
function repaint () {
  // очишаем холст перед перерисовкой
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  curves
    .forEach((curve) => {
      circle(curve[0]);
      smoothCurve(curve);
    });
}

//сам тик меняет каждый раз радиус кисти и тон
function tick () {
  brushRadiusChange();
  changeHue();
  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }
  window.requestAnimationFrame(tick);
}

updateCanvasSize()
tick();

