'use strict';

const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');

ws.addEventListener('open', event => {
  console.log("Соединение установлено.");
});

ws.addEventListener('error', error => {
  console.log('Ошибка ' + error.data);
});

ws.addEventListener('message', event => {
  const now = new Date();
  if (isFirst) {
    JSON.parse(event.data)
      .forEach(data => realtime.addData(
        [Number(data.online)],`${now.getHours()}:${data.time}`)
      );
    isFirst = false;
  } else {
    var data = JSON.parse(event.data)
    realtime.removeData();
    realtime.addData([Number(data.online)],`${now.getHours()}:${data.time}`);  
  }
});

window.addEventListener('beforeunload', () => {
  ws.close(1000);
});
