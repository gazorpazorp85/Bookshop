'use strict'

function init() {

    loadBooks();
    if (gBooks.length === 0) createBooks();
    renderBooks();
}

function renderBooks() {
    var elBookshopTable = document.querySelector('.bookshop-table');
    var books = getBooksToRender();
    var str = books.map(function (book) {
        return `<div class="row"><div class="book-id">${book.id}</div>
                <div class="book-name">${book.name}</div>
                <div class="book-price">${book.price}$</div>
                <div class="actions">
                <div class="book-read" onclick="showBookInfo(${book.id})">Read</div>
                <div class="book-update" onclick="readAndUpdateBook(${book.id})">Update</div>
                <div class="book-delete" onclick="onDeleteBook(${book.id})">Delete</div></div></div>`;
    });
    elBookshopTable.innerHTML = str.join('');
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function showBookInfo(bookId) {
    var elBookDetails = document.querySelector('.book-details');
    elBookDetails.style.display = 'flex';
    var book = getBookByID(bookId);
    var str = `<div class="modal-book-title">Book Title: ${book.name}
               <img src="./img/xresized.png" onclick="hideBookInfo()"></div><br>
               <div class="modal-book-picture"><img src="${book.bookImg}" width="200" height="300"></div>
               <p class="modal-book-info">Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                                Iusto ullam, laborum illo asperiores vero debitis pariatur molestiae expedita? 
                                                Fuga, culpa?</p>
                <div class="book-rate">Book Rate: <button onclick="addToBookRate(${book.id})">+</button><span>${book.rate}</span>
                                                  <button onclick="removeToBookRate(${book.id})">-</button></div>`
    elBookDetails.innerHTML = str;
}

function hideBookInfo() {
    var elBookInfo = document.querySelector('.book-details');
    elBookInfo.style.display = 'none';
}

function showAddBookModal() {
    var elNewBookDetails = document.querySelector('.new-book-details');
    elNewBookDetails.style.display = 'flex';
    var str = `<img class="modalclose" src="./img/xresized.png" onclick="hideAddBookModal()">
               <div class name="modalrow"><div>Book name: </div><input type="text" name="new-book-name"></div>
               <div class name="modalrow"><div>Book price:</div><input type="text" name="new-book-price"></div>
               <div class name="modalrow"><div>Book image:</div><input type="text" name="new-book-image"></div><br>
               <div class="submit" onclick="addBook()">Submit</div>`
    elNewBookDetails.innerHTML = str;
}

function hideAddBookModal() {
    var elNewBookDetails = document.querySelector('.new-book-details');
    elNewBookDetails.style.display = 'none';
}
function readAndUpdateBook(bookId) {
    var elUpdateBookPrice = document.querySelector('.update-book-price');
    elUpdateBookPrice.style.display = 'flex';
    var str = `<img class="modalclose" src="./img/xresized.png" onclick="hideUpdateBookPriceModal()">
               <div class name="modalrow"><div>Please enter the new price:</div><br><input type="text" name="update-book-price"></div>
               <br><div class="submit" onclick="updateBookPrice(${bookId})">Submit</div>`
    elUpdateBookPrice.innerHTML = str;
    // var bookPrice = prompt('Enter new price of the book:');
    // updateBook(bookId, bookPrice);
    // renderBooks();
}

function hideUpdateBookPriceModal() {
    var elUpdateBookPrice = document.querySelector('.update-book-price');
    elUpdateBookPrice.style.display = 'none';
}