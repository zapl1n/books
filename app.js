// DOM elements
const form = document.querySelector("form");
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");

//events
form.addEventListener('submit', addBook);
table.addEventListener('click', deleteBook);
document.addEventListener("DOMContentLoaded", getBooksFromLocalStorage);

function addBook(event){
    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    const isbnInput = document.querySelector('#isbn').value;

    const book = [titleInput, authorInput, isbnInput];
    const tr = document.createElement("tr");

    if(titleInput === "" && authorInput === ""&& isbnInput === ""){
        event.preventDefault();
        window.alert("Väljad ei saa tühjad olla!")
    }else{



        const tableTitle = document.createElement("td");
        const tableAuthor = document.createElement("td");
        const tableIsbn = document.createElement("td");
        const tableRowDelete = document.createElement("td");

        const delAnchor = document.createElement("a");
        delAnchor.setAttribute("href", "#");
        delAnchor.setAttribute("style", "float:right;");
        delAnchor.appendChild(document.createTextNode("X"));


        tableTitle.appendChild(document.createTextNode(titleInput));
        tableAuthor.appendChild(document.createTextNode(authorInput));
        tableIsbn.appendChild(document.createTextNode(isbnInput));
        tableRowDelete.appendChild(delAnchor);

        tr.appendChild(tableTitle);
        tr.appendChild(tableAuthor);
        tr.appendChild(tableIsbn);
        tr.appendChild(tableRowDelete);

        const tbody = document.querySelector("tbody");
        tbody.appendChild(tr);

        addBookToLocalStorage(book);

        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";

        event.preventDefault()
    }
}

function deleteBook(event){
    const tbody = document.querySelector("tbody");
    if(event.target.textContent === "X"){
        if(confirm("Do you want to delete this book?")){
            event.target.parentElement.parentElement.remove()
            let bookISBN = event.target.parentElement.previousElementSibling.textContent;
            deleteBookFromLocalStorage(bookISBN);
            //tbody.removeChild(event.target.parentElement.parentElement);

        }
    }
}

function addBookToLocalStorage(book){
    let books;
    if(localStorage.getItem("books") === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
}

function deleteBookFromLocalStorage(bookISBN){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function (book, index){
        if(book[2] === bookISBN){
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}


function getBooksFromLocalStorage(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    for(let i = 0; i < books.length; i++){
        let book = books[i];
        // create <tr> element
        const tr = document.createElement('tr');
        for(let i = 0; i < book.length; i++){
            // create <td> element
            let td = document.createElement('td');
            // create text element
            let text = document.createTextNode(book[i]);
            // add text to <td>
            td.appendChild(text);
            // add td to tr
            tr.appendChild(td);// add td to tr
            tr.appendChild(td);
        }
        // X link
        // create <td> element
        td = document.createElement('td');
        // create <a> element
        const delAnchor = document.createElement("a");
        delAnchor.setAttribute("href", "#");
        delAnchor.setAttribute("style", "float:right;");
        delAnchor.appendChild(document.createTextNode("X"));
        // add <a> to <li>
        td.appendChild(delAnchor);
        // add td to tr
        tr.appendChild(td);
        // add tr to tbody
        tbody.appendChild(tr);
    }
}