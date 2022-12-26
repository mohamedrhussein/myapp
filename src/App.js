import './App.css';
import { useState } from 'react';
import Shelf from './component/Shelf'

function App() {

  const [showSearchPage, setShowSearchpage] = useState(false);

  const bookshelves = [
    { title: "Currently Reading", shelfName: "currentlyReading" },
    { title: "Want to Read", shelfName: "wantToRead" },
    { title: "Read", shelfName: "read" },
  ];

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search"
              onClick={() => setShowSearchpage(showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1><strong>MyReads</strong></h1>
          </div>
          <div className="list-books-content">
            <div>
              {bookshelves.map((shelf, index) => (
                <Shelf
                  key={index}
                  title={shelf.title}
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
