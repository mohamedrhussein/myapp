import './App.css';
import React, {useState,useEffect} from 'react';

import * as BooksAPI from "./BooksAPI";

import Shelf from './component/Shelf'
import Book from "./component/Book";

const App = () => {

  const [showSearchPage, setShowSearchpage] = useState(false);
  
  // Shelf Books 
  //==================
  const [allbooks, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((booksData) => {
      setBooks(booksData);
    });
  }, []);

  const bookshelves = [
    { title: "Currently Reading", shelfName: "currentlyReading" },
    { title: "Want to Read", shelfName: "wantToRead" },
    { title: "Read", shelfName: "read" },
  ];
  //==================

  // Search Books
  //==================
  const [searchText, setSearchText] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);

  const getSearchTextBooks = () => {
    if (searchText.length !== 0) {
      BooksAPI.search(searchText).then((searchBooks) => {
        if (!searchBooks.error) {
          BooksAPI.getAll().then((allbooks) => {
            setSearchBooks(setDefaultShelves(searchBooks, allbooks));
          });
        } else {
          setSearchBooks([]);
        }
      });
    } else if (searchText.length === 0) {
      setSearchBooks([]);
    }
  };

  const setDefaultShelves = (searchedBooksLocal, allbooks) => {
    return searchedBooksLocal.map((book) => {
      for (let i = 0; i < allbooks.length; i++) {
        if (allbooks[i].id === book.id) {
          return { ...book, shelf: allbooks[i].shelf };
        }
      }
      return { ...book, shelf: "none" };
    });
  };

  useEffect(() => {
    getSearchTextBooks();
  }, [searchText]);
//==================

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
          <ol className="books-grid">
          {searchBooks &&
            searchBooks.map((book, index) => (
              <Book
                key={index}
                title={book.title}
                authors={book.authors}
                imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                bookshelf={book.shelf}
                book={book}
                isSearching
              />
            ))}
        </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1><strong>MyReads</strong></h1>
          </div>
          <div className="list-books-content">
            <div>
             {bookshelves.map((bookShelf, index) => (
              <Shelf
                key={index}
                title={bookShelf.title}
                books={
                  allbooks &&
                  allbooks.filter(
                    (allbooks) => allbooks && allbooks.shelf === bookShelf.shelfName
                  )
                }
                setBooks={setBooks}
              />
            ))}
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;