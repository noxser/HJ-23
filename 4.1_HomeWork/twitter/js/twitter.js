'use strict';

const url = 'https://neto-api.herokuapp.com/twitter/jsonp'

function createWidget(userData) {
    document.querySelector('[data-wallpaper]').src = userData.wallpaper;
    document.querySelector('[data-username]').textContent = userData.username;
    document.querySelector('[data-description]').textContent = userData.description;
    document.querySelector('[data-pic]').src = userData.pic
    document.querySelector('[data-tweets]').value = userData.tweets;
    document.querySelector('[data-followers]').value = userData.followers;
    document.querySelector('[data-following]').value = userData.following;
}

function loadJSONP(url) {
    // можно навесить функцию для генерации имени колбека
    const callBackName ='randomName';
    return new Promise((done, fail) => {
        window[callBackName] = done;
        const script = document.createElement('script');
        script.src = `${url}?jsonp=${callBackName}`;
        document.body.appendChild(script);
    })
}

document.addEventListener('DOMContentLoader', 
    loadJSONP(url)
        .then(createWidget)
        .catch(err => console.log(err))
    );

