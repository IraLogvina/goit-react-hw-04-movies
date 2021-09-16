import React, { useState } from "react";
import styles from "./SearchFilms.module.css";

export default function Searchbar({ inputSubmit }) {

  const [movieTitle, setMovieTitle] = useState("");

  const handleChange = (event) => {
    setMovieTitle(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (movieTitle.trim() === "") {
      alert("Enter search request");
      return;
    }

    inputSubmit(movieTitle);
    setMovieTitle("");
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <input
          className={styles.SearchForm_input}
          type="text"
          value={movieTitle}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Enter the name of the movie to search"
          required
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
}
