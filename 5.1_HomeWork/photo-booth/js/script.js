'use strict';

// находим элементы
const app = document.querySelector('.app');
const errorMesadge = document.querySelector('#error-message');
const controls = document.querySelector('.controls');
const takePhoto = document.querySelector('#take-photo');
const listPic = document.querySelector('.list');

// создаем недостающие элементы
const video = document.createElement('video');
const audio = document.createElement('audio');
// video.height = 300;
video.autoplay = true;
audio.src = './audio/click.mp3';
document.body.appendChild(audio);

// запрашиваем поток
navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then((stream) => {
        try {
            video.srcObject = stream;
        } catch (error) {
            //устарело
            video.src = URL.createObjectURL(stream);
        }
        controls.classList.add('visible');
        // активируем видео в будке
        app.appendChild(video);
    })
    .catch((err) => {
        // не удалось получить доступ к камере
        console.log(err);
        errorMesadge.className = 'visible';
        errorMesadge.textContent = 'Нет доступа к камере';
    });

function takePicture() {
    video.style.display = 'block';
    errorMesadge.classList.remove('visible');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // проверяем размеры  canvas 
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // копируем текущий кадр видеотега в canvas и создаем картинку в с писке
    ctx.drawImage(video, 0, 0);
    listPic.insertBefore(createImgsFigure(canvas.toDataURL()), listPic.firstElementChild);
    audio.play(); // звук затвора камеры
} 

// формирует элемент HTML - figure
function createImgsFigure(imgsDataURL) {
    const figure = document.createElement('figure');
    figure.innerHTML = `<img src="${imgsDataURL}">
                <figcaption>
                    <a href="${imgsDataURL}" download="snapshot.png">
                        <i class="material-icons">file_download</i>
                    </a>
                    <a><i class="material-icons">file_upload</i></a>
                    <a><i class="material-icons">delete</i></a>
                </figcaption>`
    return figure;
};

// перехватываем клики по фото
function clickIconOnPhoto(event) {
    if (event.target.textContent == 'delete') {
        listPic.removeChild(event.target.closest('figure'));
    }
    if (event.target.textContent == 'file_upload') {
        const fi = event.target.closest('figure')
        const url = fi.firstChild.src
        //преобразуем DataURL в Blob
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const formData = new FormData();             
                formData.append('image', blob);
                // отправляем formData на сервер 
                fetch('https://neto-api.herokuapp.com/photo-booth', {
                    method: 'POST',
                    'Content-Type': 'multipart/form-data',
                    body: formData,
                })
                .then(res => {
                    if (res.status >= 400) throw res.statusText;
                    return res;
                })
                .then(res => console.log(res))
                .catch(err => {
                    console.log(err);
                    video.style.display="none";
                    errorMesadge.className = 'visible';
                    document.querySelector('#error-message').textContent = 'Ошибка: ' + err;
                });
          })
    }
}

listPic.addEventListener('click', clickIconOnPhoto);
takePhoto.addEventListener('click', takePicture);
