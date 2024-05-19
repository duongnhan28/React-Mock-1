import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState([]);
  const history = useHistory();

  const setDefaultShelves = useCallback((searchedLocal, myBooks) => {
    return searchedLocal.map(book => {
      for (let i = 0; i < myBooks.length; i++) {
        if (myBooks[i].id === book.id) {
          return { ...book, shelf: myBooks[i].shelf };
        }
      }
      return { ...book, shelf: "none" };
    });
  }, []);

  const handleSearchOnChange = useCallback(() => {
    if (searchText.length !== 0) {
      BooksAPI.search(searchText).then(searched => {
        if (!searched.error) {
          BooksAPI.getAll().then(myBooks => {
            setSearched(setDefaultShelves(searched, myBooks));
          });
        } else {
          setSearched([]);
        }
      });
    } else {
      setSearched([]);
    }
  }, [searchText, setDefaultShelves]);

  useEffect(() => {
    handleSearchOnChange();
  }, [handleSearchOnChange]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={event => setSearchText(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searched.map((book, index) => (
            <Book
              key={index}
              title={book.title}
              authors={book.authors}
              imageUrl={book.imageLinks && book.imageLinks.thumbnail}
              bookshelf={book.shelf}
              book={book}
              isSearch
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
