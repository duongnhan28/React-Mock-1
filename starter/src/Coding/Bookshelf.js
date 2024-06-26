import React from "react";
import PropTypes from "prop-types"; 
import Book from "./Book";

const Bookshelf = props => {
  const { books, title, setBooks } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book, index) => (
              <li key={index}>
                <Book
                  title={book.title}
                  authors={book.authors}
                  imageUrl={book.imageLinks?.thumbnail}
                  bookshelf={book.shelf}
                  book={book}
                  setBooks={setBooks} 
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  setBooks: PropTypes.func.isRequired
};

export default Bookshelf;
