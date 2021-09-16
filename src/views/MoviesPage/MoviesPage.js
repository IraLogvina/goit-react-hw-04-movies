import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import * as SearchApi from "../../services/searchAPI";
import MoviesGallery from "../../components/MoviesGallery/MoviesGallery";
import Searchbar from "../../components/SearchFilms/SearchFilms";
import { useLocation, useHistory } from "react-router-dom";

export default function MoviesView() {
  const [search, setSearch] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState("idle");
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

  const handleInputSubmit = (input) => {
    history.push({
      pathname: location.pathname,
      search: `query=${input}`,
    });
    setSearch(input);
    setLoaderStatus("idle");
  };

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    setLoading(true);

    SearchApi.fetchMovieBySearch(searchQuery)
      .then((data) => {
        if (data.results.length === 0) {
          setMovies(data.results);
          setLoaderStatus("rejected");
          return;
        }

        setMovies(data.results);
        setLoaderStatus("idle");
      })
      .catch((newError) => {
        setError(newError);
      })
      .finally(() => setLoading(false));
  }, [search, error, searchQuery]);

  return (
    <>
      <Searchbar inputSubmit={handleInputSubmit} />

      {loading && loaderStatus === "idle" && <Loader />}

      {movies && <MoviesGallery gallery={movies} searchOption={search} />}

      {loaderStatus === "rejected" && search !== null && (
        <h1>Nothing found.... Try again</h1>
      )}
    </>
  );
}
