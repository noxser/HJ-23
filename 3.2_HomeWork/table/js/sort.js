'use strict';

function handleTableClick(event) {
    // Исключаем нажатия на ячейки, только на заголовках
    if (event.target.classList.contains('prop__value')) {
        return;
    }
    const table = event.target.closest('table');
    // задаем дефолтное состояние сортировки при смене столбца
    if (table.dataset.sortBy != event.target.dataset.propName) {
        event.target.dataset.dir = null;
    }
    table.dataset.sortBy = event.target.dataset.propName;
    event.target.dataset.dir == 1 ? event.target.dataset.dir = -1 : event.target.dataset.dir = 1;  
    sortTable(
        event.target.dataset.propName, 
        event.target.dataset.dir
    );
}
