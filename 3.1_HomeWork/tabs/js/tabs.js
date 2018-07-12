'use strict'

function createTab(container) {
    
    const tabNav = container.querySelector('.tabs-nav');
    const arcticles = container.getElementsByTagName('article');

    // удаляем демо таб, и скрываем все статьи кроме первой
    tabNav.removeChild(tabNav.firstElementChild)
    Array.from(arcticles).forEach(tab => {
        if (tab != tab.parentElement.firstElementChild) {
            tab.classList.add('hidden');
        } 
    });

    // создаем табы берем информацию из data тегов статей
    function createNav(arcticle) {
        tabNav.innerHTML = tabNav.innerHTML + (
            `<li><a class="fa ${arcticle.dataset.tabIcon}">${arcticle.dataset.tabTitle}</a></li>`
        )
    }

    Array.from(arcticles).forEach(item => createNav(item));

    // задаем состояние по умолчанию первый таб
    tabNav.firstElementChild.classList.add('ui-tabs-active');

    // логика для обработки кликов по табам
    const tabLi = tabNav.getElementsByTagName('li');
    function clickTab() {
        Array.from(tabLi).forEach(tab => {
            tab.classList.remove('ui-tabs-active');
        });
        this.classList.add('ui-tabs-active');
        Array.from(arcticles).forEach(tab => {
            if (event.target.innerHTML != tab.dataset.tabTitle) {
                tab.classList.add('hidden');
            } else {
                tab.classList.remove('hidden');
            }
        });    
    }

    Array.from(tabLi).forEach(tab => {
        tab.addEventListener('click', clickTab);
    });
}

const tabs = document.getElementById('tabs');
document.addEventListener('DOMContentLoaded', createTab(tabs));
