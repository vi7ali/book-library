"use strict"
const addButton = document.getElementById('add');
const titleText = 'Book title';
const authorText = 'Author';
const pagesText = 'Number of pages';
addButton.addEventListener('click', displayAddBookDiv);

let myLibrary = [{title: 'Fight Club', author: 'Chuck Palahniuk', pages: 208, status: 'Read'},
             {title: '1984', author: 'George Orwell', pages: 328, status: 'Read'},
             {title: 'Brave New World', author: 'Aldous Huxley', pages: 311, status: 'Read'},
             {title: 'Fahrenheit 451', author: 'Ray Bradbury', pages: 158, status: 'Read'},
             {title: 'Animal Farm', author: 'George Orwell', pages: 112 , status: 'Read'}];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function render(){
    removeGrid();       
    addToGrid(createHeadRow());
    myLibrary.forEach( (book) => {
        for ( let key in book ) addToGrid(createDiv(book[key]));
        let editButtonsDiv = createEditButtons(book);
        addToGrid(editButtonsDiv);        
    });
}

function addBook() {
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('book-author').value;
    let pages = document.getElementById('book-pages').value;
    let status = document.querySelector('input[name="book-status"]:checked').value;
    if (title !== "" && author !== "" && pages !== "" && !isNaN(pages)) {
        let newBook = new Book(title, author, pages, status);
        myLibrary.push(newBook);
        removeAddBookForm();
        render();   
    }
    else {
        alert('All fields must be filled and pages must be a number!');
    }
}

function displayAddBookDiv() {    
    let addBookContainer = document.createElement('div');
    addBookContainer.setAttribute('id', 'addbook-container');
    addBookContainer.appendChild(generateFormFragment());
    document.body.appendChild(addBookContainer);
    let confirmBtn = document.getElementById('confirm-add');
    let cancelBtn = document.getElementById('cancel-add');
    confirmBtn.addEventListener('click', addBook);
    cancelBtn.addEventListener('click', removeAddBookForm);    
}

function removeAddBookForm() {
    let addBookContainer = document.getElementById('addbook-container');
    addBookContainer.remove();
}

function removeGrid() {
    let grid = document.getElementById('grid-container');
    while (grid.lastChild) {
        grid.removeChild(grid.lastChild);
    }
}

function createInput(id) {
    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.id = id;
    return newInput;
}

function deleteBook(e) {
    let book = myLibrary.find((book) => book.title === e.target.id);
    let index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
    render();
}

function editBook(e) {
    let book = myLibrary.find((book) => book.title === e.target.id);
    book.status = (book.status === 'Read') ? 'In progress' : 'Read';
    render();
}

function addToGrid(element){
    let gridContainer = document.getElementById('grid-container');
    gridContainer.appendChild(element);
}

function createHeadRow() {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(createDiv('Title', 'head-row'));
    fragment.appendChild(createDiv('Author', 'head-row'));
    fragment.appendChild(createDiv('Pages', 'head-row'));
    fragment.appendChild(createDiv('Status', 'head-row'));
    fragment.appendChild(createDiv('Edit', 'head-row'));
    return fragment;
}

function createEditButtons(book) {
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    let editButtonsDiv = document.createElement('div');        
    deleteBtn.id = book.title;
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteBook);
    editBtn.id = book.title;
    editBtn.textContent = 'Status';
    editBtn.addEventListener('click', editBook);
    editButtonsDiv.appendChild(deleteBtn);
    editButtonsDiv.appendChild(editBtn);
    return editButtonsDiv;
}

function createDiv(content="", className="") {
    let newDiv = document.createElement('div');
    let newContent = document.createTextNode(content);
    newDiv.className = className;    
    newDiv.appendChild(newContent);
    return newDiv;
}

function generateFormFragment() {
    let fragment = document.createDocumentFragment();
    let fragmentMainDiv = document.createElement('div');    
    fragmentMainDiv.innerHTML = `
        <div>
            <label for="book-title">Book title:</label>
            <input type="text" id="book-title" name="book-title">
        </div>
        <div>
            <label for="book-author">Author name:</label>
            <input type="text" id="book-author" name="book-author">
        </div>
        <div>
            <label for="book-pages">Pages:</label>
            <input type="text" id="book-pages" name="book-pages">
        </div>
        <div>Status:
            <label for="book-read">Read</label>
            <input type="radio" id="book-read" name="book-status" value="Read">
            <label for="book-notread">In progress</label>
            <input type="radio" id="book-notread" name="book-status" value="In progress" checked>
        </div>
        <div id="buttons">
            <div id="confirm-add" class="form-button">Add book</div>
            <div id="cancel-add" class="form-button">Cancel</div>
        </div>
    `
    fragment.appendChild(fragmentMainDiv);
    return fragment;
}

render();