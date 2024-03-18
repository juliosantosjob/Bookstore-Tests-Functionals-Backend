const books = require('../fixtures/listBooks');

module.exports = {
    rand: Math.floor(Math.random() * books.books.length) + 1
};