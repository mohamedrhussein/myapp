import React from "react";
import Book from "./Book";

const Shelf = ({ title, books, setBooks }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <div className="books-grid">
                    {books &&
                        books.map((book, index) => (
                            <li key={index}>
                                <Book
                                    title={book.title}
                                    authors={book.authors}
                                    imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                                    bookshelf={book.shelf}
                                    book={book}
                                    setBooks={setBooks}
                                />
                            </li>
                        ))}
                </div>
            </div>
        </div>
    );
};
export default Shelf;