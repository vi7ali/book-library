"use strict"
let gridContainer = document.getElementById('grid-container');
const addButton = document.getElementById('add');

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

let myLibrary = [{title: 'Book1', author: 'Author1', pages: 100, status: 'read'},
             {title: 'Book2', author: 'Author2', pages: 101, status: 'read'},
             {title: 'Book3', author: 'Author3', pages: 102, status: 'read'},
             {title: 'Book4', author: 'Author4', pages: 103, status: 'read'},
             {title: 'Book5', author: 'Author5', pages: 104, status: 'read'}];

addButton.addEventListener('click', addBook);

function addBook() {    
    for( let i = 0; i < 5; i++ ) {
        addToGrid(createDiv(`${i}`));
    }
}

function render(){
    myLibrary.forEach( (book) => {
        for ( let key in book ) addToGrid(createDiv(book[key]));
        addToGrid(createDiv('edit'));
    });
}

function addToGrid(newDiv){    
    gridContainer.appendChild(newDiv);
}

function createDiv(content) {
    let newDiv = document.createElement('div');
    let newContent = document.createTextNode(content);
    newDiv.appendChild(newContent);
    return newDiv;
}

render();