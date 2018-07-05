const request = new XMLHttpRequest();

request.addEventListener("load", onLoad);
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();

function onLoad() {
  const response = JSON.parse(request.responseText);
  setData(response);
};