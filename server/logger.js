const fs = require('fs');
const moment = require('moment');

const logger = (req, res, next) => {
    let currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    let action;
    switch (req.method) {
        case 'POST':
            action = "Добавление товара";
            break;
        case 'PUT':
            action = "Изменение количества товара";
            break;
        case 'DELETE':
            action = "Удаление товара";
            break;
        case 'GET':
            action = "Получение данных";
            break;
    }
    let url = req.url;
    let log = `${action}: ${url} ${currentDate}`
    fs.appendFile('server/db/log.txt', JSON.stringify(log) + "\n", err => {
        if (err) {
            console.log(err);
        }
    })

    next()
}

module.exports = logger;