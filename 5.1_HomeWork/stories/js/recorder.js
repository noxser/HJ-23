'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((done, fail) => {
    // переводим состояние интерфейса готово к началу записи
    app.mode = 'preparing';  
    //передаем конфигурацию медиа устроства из app.config
    navigator.mediaDevices.getUserMedia(app.config)  
    .then(stream => {
      app.preview.srcObject = stream;
      app.preview.addEventListener('canplay', () => {
        // переводим состояние интерфейса в режим записи
        app.mode = 'recording'; 
        // используем стандартный класс MediaRecorder 
        const recorder = new MediaRecorder(stream); 
        // промежуточный массив для записываемого видео 
        let chunks = [];  
        recorder.addEventListener('dataavailable', (e) => chunks.push(e.data));
        recorder.addEventListener('stop', () => {
          // склеиваем записаное видео
          const recorded = new Blob(chunks, { 'type' : recorder.mimeType });
          chunks = null;
          createThumbnail(recorded)
            .then(frameBlob => {
              return { 'video' : recorded, 'frame' : frameBlob };
            })
            .then(done);
        });
        // стартуем запись через 1 секунду
        setTimeout(( () => {
          recorder.start();
          setTimeout(() => {
            recorder.stop(); // останавливаем запись через app.limit
            app.preview.srcObject = null;
            stream.getTracks().forEach(track => track.stop());
          }, app.limit);
        }), 1000);
      });
    });
    // по таймауту бросаем ошибку
    setTimeout(() => {
      fail('Не удалось записать видео');
    }, app.limit + 3000);
  });
}
