'use strict';

const url = 'https://neto-api.herokuapp.com/profile/me';

function createProfile(userData) {
    if (userData.id) {
        document.querySelector('[data-pic]').src = userData.pic;
        document.querySelector('[data-name]').textContent = userData.name;
        document.querySelector('[data-position]').textContent = userData.position;
        document.querySelector('[data-description]').textContent = userData.description;

        const urlTech = `https://neto-api.herokuapp.com/profile/${userData.id}/technologies`;
        loadJSONP(urlTech)
            .then(createProfile)
            .catch(err => console.log(err)
        );

    } else {
        let dataHTML = '';
        userData.forEach(technologie => {
            dataHTML += `<span class="devicons devicons-${technologie}"></span>`;
        });
        document.querySelector('[data-technologies]').innerHTML = dataHTML;
        document.querySelector('.content').style = 'display: initial';
    }
}

function loadJSONP(url) {
    // можно навесить функцию для генерации имени колбека
    const callBackName ='randomName';
    return new Promise((done, fail) => {
        window[callBackName] = done;
        const script = document.createElement('script');
        script.src = `${url}?jsonp=${callBackName}`;
        document.body.appendChild(script);
    });
}

document.addEventListener('DOMContentLoader', 
    loadJSONP(url)
        .then(createProfile)
        .catch(err => console.log(err))
    );

