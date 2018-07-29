'use strict';

function createElement(content) {
    // всли на входе не валидное значение то возврашаем пустую строку.
    if ((content === undefined) || (content === null) || (content === false)) {
        return document.createTextNode('');
    }
    // всли на входе строка число то возврашаем строку.
    if ((typeof content === 'string') || (typeof content === 'number') || (content === true)) {
        return document.createTextNode(content.toString());
    }
    // если на входе массив то пробегаемся по нему и заныриваем в глубь 
    if (Array.isArray(content)) {
        return content.reduce((f, elem) => {
            f.appendChild(createElement(elem));
            return f;
        }, document.createDocumentFragment());
    }
    
    // создаем документ по тегу
    const element = document.createElement(content.name);

    // заполняем атрибуты на входе объект
    if (content.props) {
        Object.keys(content.props).forEach(
            key => element.setAttribute(key, content.props[key])
        );
    }
    
    if (content.childs) element.appendChild(createElement(content.childs));
 
    return element;
}