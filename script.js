//global variables
let booksDisplay = document.querySelector("#books-display");
let plusButton = document.querySelector("#plus-button");
let addButton = document.querySelector("#add");
let bookNameField = document.querySelector("#book-name");
let authorNameField = document.querySelector("#author");
let pagesField = document.querySelector("#pages");
let form = document.querySelector("#form");



let books = [];
function Book(author, title, pages)
{
    this.author = author;
    this.title = title;
    this.pages = pages;
    
    //helper properties.
    this.shown = false;
    this.index = 0;
}

Book.prototype.display = function()
{
    let book = document.createElement("div");
    book.classList.add("book");
    
    let title = document.createElement("p");
    title.classList.add("title");
    
    let author = document.createElement("p");
    author.classList.add("author");
    
    let pages = document.createElement("p");
    pages.classList.add("pages");

    let removeButton = document.createElement("p");
    removeButton.textContent = "×";
    removeButton.classList.add("remove-book");

    title.textContent = this.title;
    author.textContent = this.author;
    pages.textContent = this.pages;


    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);

    removeButton.addEventListener("click", (event) =>
    {
        booksDisplay.removeChild(book);
        let temp = [];
        for(let book of books)
        {
            if(book.index != this.index)
            {
                temp.push(book);
            }
        }
        books = temp;
    });

    book.appendChild(removeButton);
    booksDisplay.appendChild(book);
}

addButton.addEventListener("click", (event) =>
{
    if(pagesField.value == "" || bookNameField.value == "" || authorNameField.value == "")
    {
        alert("Please enter a value before adding your book!");
    }
    else
    {
        addBook(new Book(authorNameField.value, bookNameField.value, pagesField.value));
        showBooks();
    }
});

plusButton.addEventListener("click", (event) =>
{
    event.target.style.display = "none";
    form.style.display = "flex";
});
function addBook(book)
{
    book.index = books.length;
    books.push(book);
}

function showBooks()
{
    for(let book of books)
    {
        if(!book.shown)
        {
            book.display(); 
            book.shown = true;
        }
    }
}

addBook(new Book("Mark Manson", "The subtle art of not giving a fuck", "300~"));
showBooks();