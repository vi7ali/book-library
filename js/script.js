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

addButton.addEventListener('click', displayAddBookDiv);

function displayAddBookDiv() {    
    let addBookContainer = document.createElement('div');
    addBookContainer.setAttribute('class', 'addbook-container');
    
}

function render(){
    myLibrary.forEach( (book) => {
        for ( let key in book ) addToGrid(createGridDiv(book[key]));
        addToGrid(createGridDiv('edit'));
    });
}

function addToGrid(newDiv){
    gridContainer.appendChild(newDiv);
}

function createGridDiv(content) {
    let newDiv = document.createElement('div');
    let newContent = document.createTextNode(content);
    newDiv.appendChild(newContent);
    return newDiv;
}

render();