let books = [];

function Book(author, title, pages)
{
    this.author = author;
    this.title = title;
    this.pages = pages;
}

function addBook(book)
{
    books.push(book);
}

function showBooks()
{
    for(let book of books)
    {

    }
}

addBook(new Book("Mark Manson", "The subtle art of not giving a fuck", "300~"));