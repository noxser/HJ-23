'use strict'

const canvas = document.getElementById('wall');
const ctx = canvas.getContext("2d");
let curves = [];

//функуия времени для движения обектов
const timeFunctions = [
	function (x, y, time) {
		return {
			x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
			y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
		};
	},
	function (x, y, time) {
		return {
			x: x + Math.sin((x + (time / 10)) / 100) * 5,
			y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
		}
	}
];

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
	return Math.round(getRandom(min, max));
}

// рисуем окружность
function circle(point) {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = point.size * 5;
  ctx.beginPath();
  var newPosition = timeFunctions[point.moveMetod](...point, Date.now());
  ctx.arc(newPosition.x, newPosition.y, point.size * 12, 2*Math.PI, false);
  ctx.stroke();
}

// рисуем крест
function cross(point) {
  ctx.save();
  ctx.beginPath();

  var newPosition = timeFunctions[point.moveMetod](...point, Date.now());
  var crossSize = point.size * 20;
  var halfCross = crossSize/2;

  ctx.translate(newPosition.x, newPosition.y);
  ctx.rotate(point.angle)
  var x = 0, y = 0;
  ctx.moveTo(x, y); 
  ctx.lineTo(x - halfCross, y); 
  ctx.lineTo(x + halfCross, y);
  ctx.moveTo(x, y); 
  ctx.lineTo(x, y - halfCross); 
  ctx.lineTo(x, y + halfCross);
  ctx.closePath();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = point.size * 5; 
  ctx.stroke();
  ctx.restore(); 
}

// по клику рисуем  крестики нолики
canvas.addEventListener('click', (evt) => {
  curves = [];
  var randdd = randomInt(50, 200);
  var i = 0;
  while (i < randdd) {
      var x = randomInt(0, canvas.width);
      var y = randomInt(0, canvas.height);
      const point = [x, y] // создаем новую точку
      point.size = getRandom(0.1,0.6);
      point.angle = randomInt(0,360) * Math.PI / 180;
      point.moveMetod = randomInt(0,1);
      point.rotationDirection = getRandom(-0.2, 0.2);
      curves.push(point); 
      
    i++;
  }
});

// изменяем размер холста
function updateCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
};

// очистка при изменение размера окна
window.addEventListener('resize', () => {
  updateCanvasSize();
  curves = [];
});

function tick () {
  // очишаем холст перед перерисовкой
  var tempCurve = []
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  curves
    .forEach((curve, i) => {
      if (i%2) {
        circle(curve)
      } else {
        curve.angle = curve.angle + (curve.rotationDirection);
        cross(curve);
      }
      tempCurve.push(curve);
    });
  curves = tempCurve;
}

updateCanvasSize();
setInterval(tick, 1000 / 20);

