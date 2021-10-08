//global variables
const booksDisplay = document.querySelector("#books-display");
const plusButton = document.querySelector("#plus-button");
const addButton = document.querySelector("#add");
const bookNameField = document.querySelector("#book-name");
const authorNameField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const form = document.querySelector(".form");
const shadow = document.querySelector(".shadow");


let books = [];
function Book(author, title, pages)
{
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = false;
    
    //helper properties.
    this.shown = false;
    this.index = 0;
}

Book.prototype.compose = function()
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

    let readDiv = document.createElement("div");
    readDiv.classList.add("book-status");
    
    if(!this.read)
    {
        readDiv.textContent = "Not read";
        readDiv.classList.add("book-not-read");
    }
    else
    {
        readDiv.textContent = "Read";
        readDiv.classList.add("book-read");
    }

    let wrapper = document.createElement("div");
    wrapper.classList.add("book-options");
    wrapper.appendChild(readDiv);
    wrapper.appendChild(removeButton);

    title.textContent = this.title + ".";
    author.textContent = "By: " + this.author + ".";
    pages.textContent = this.pages + " pages.";

    removeButton.addEventListener("click", (event) =>
    {
        localStorage.removeItem(this.title);
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

    readDiv.addEventListener("click", event =>
    {
        if(this.read == false)
        {
            event.target.classList.remove("book-not-read");
            event.target.classList.add("book-read");
            event.target.textContent = "Read";
            this.read = true;
            localStorage.setItem(this.title, JSON.stringify(this));
        }
        else
        {
            event.target.textContent = "Not read";
            event.target.style.backgroundColor = ""; 
            this.read = false;
            event.target.classList.remove("book-read");
            event.target.classList.add("book-not-read");
            localStorage.setItem(this.title, JSON.stringify(this));
        }
    });

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(wrapper);
    return book;
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
        form.classList.remove("form-active");
        shadow.style.display = "none";
        showBooks();
    }
});

plusButton.addEventListener("click", (event) =>
{
    form.classList.add("form-active");
    shadow.style.display = "block";
});

shadow.addEventListener("click", (event) =>
{
    form.classList.remove("form-active");
    event.target.style.display = "none";
});


function addBook(book)
{
    book.index = books.length;
    books.push(book);
    localStorage.setItem(book.title, JSON.stringify(book));
}

function showBooks()
{
    for(let book of books)
    {
        if(!book.shown)
        {
            booksDisplay.appendChild(book.compose()); 
            book.shown = true;
        }
    }
}

function retrieveBooks()
{
    let index = 0;
    while(localStorage.key(index) != null)
    {
        let item = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let book = new Book(item["author"], item["title"], item["pages"]);
        book.read = item["read"];
        books.push(book);
        index++;
    }
}
retrieveBooks();
showBooks();