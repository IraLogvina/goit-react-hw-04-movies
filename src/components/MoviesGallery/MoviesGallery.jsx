import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MoviesGallery.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function MoviesGallery({ gallery }) {
  
  const location = useLocation();

  return (
    <ul className={styles.trendingMovies}>
      {gallery.map((movie) => (
        <li key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: { location } },
            }}
          >
            <img
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className={styles.trendingMovie_image}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
