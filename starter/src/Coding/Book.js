import React from "react";
import PropTypes from "prop-types"; 
import * as BooksAPI from "../BooksAPI";

const Book = ({
  title,
  authors,
  imageUrl,
  book,
  setBooks, // Đảm bảo prop setBooks được chuyển xuống từ component cha
  isSearch,
  bookshelf
}) => {

  const handleShelfOnChange = event => {
    if (event.target.value !== "move") {
      BooksAPI.update(book, event.target.value).then(() => {
        if (!isSearch) {
          BooksAPI.getAll().then(newBooks => {
            setBooks(newBooks);
          });
        }
      });
    }
  };

  const handleShelfOnChangeInSearch = event => {
    if (event.target.value !== "move") {
      BooksAPI.update(book, event.target.value);
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageUrl}")`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={event => {
              if (!isSearch) {
                handleShelfOnChange(event);
              } else {
                handleShelfOnChangeInSearch(event);
              }
            }}
            defaultValue={bookshelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read.</option>
            <option value="read">Read.</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors && authors.join(", ")}
      </div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string, 
  book: PropTypes.object.isRequired,
  setBooks: PropTypes.func, 
  isSearch: PropTypes.bool,
  bookshelf: PropTypes.string.isRequired
};

export default Book;
