'use strict'

var gBooks;
var gBookId = 1;

function createBook(name, price, bookImg) {

    var book = {
        name,
        price,
        bookImg,
        rate: 0,
        id: gBookId++
    }
    saveToStorage('gBookId', gBookId);
    return book;
}

function saveBooks() {
    saveToStorage('books', gBooks);
}

function loadBooks() {

    gBooks = loadFromStorage('books', []);
    gBookId = loadFromStorage('gBookId', 1);
}

function createBooks() {

    gBooks.push(createBook('Don\'t go shopping when you\'re high', '9.99', './img/book1.png'));
    gBooks.push(createBook('Your baby looks like Gary Busey', '10.99', './img/book2.png'));
    gBooks.push(createBook('You\'re not dying Tommy!', '15.99', './img/book3.png'));
    gBooks.push(createBook('I didn\'t ask to be born', '6.99', './img/book4.png'));
    saveBooks();
}

function getBooksToRender() {
    return gBooks;
}

function getBookByID(bookId) {
    return gBooks.find(function (gBook) {
        return gBook.id === bookId;
    });
}

function getBookIndexByID(bookId) {
    return gBooks.findIndex(function (gBook) {
        return gBook.id === bookId;
    })
}

function deleteBook(bookId) {
    var bookIndex = getBookIndexByID(bookId);
    gBooks.splice(bookIndex, 1);
}

function addBook() {
    var elName = document.querySelector('input[name="new-book-name"]');
    var elPrice = document.querySelector('input[name="new-book-price"]');
    var elImage = document.querySelector('input[name="new-book-image"]');
    var name = elName.value;
    var price = elPrice.value;
    var image = elImage.value;
    gBooks.push(createBook(name, price, image));
    hideAddBookModal();
    saveBooks();
    renderBooks();
}

function updateBookPrice(bookId) {
    var elUpdatedPrice = document.querySelector('input[name="update-book-price"]');
    var updatedPrice = elUpdatedPrice.value;
    var book = getBookByID(bookId);
    book.price = updatedPrice;    
    saveBooks();
    renderBooks();
    hideUpdateBookPriceModal();
}

function updateBook(bookId, bookPrice) {
    var book = getBookByID(bookId);
    book.price = bookPrice;
    saveBooks();
}

function addToBookRate(bookId) {
    var book = getBookByID(bookId);
    if (book.rate === 10) return;

    book.rate++;
    saveBooks();
    showBookInfo(bookId);
}

function removeToBookRate(bookId) {

    var book = getBookByID(bookId);
    if (book.rate === 0) return;

    book.rate--;
    saveBooks();
    showBookInfo(bookId);
}
