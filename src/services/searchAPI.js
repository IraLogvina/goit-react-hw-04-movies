const API_KEY = "34af41691c42b7284636395c926a7339";
const BASE_URL = "https://api.themoviedb.org/3";

async function SearchApi(url = "") {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export function fetchTrendingMovies() {
  return SearchApi(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
}

export function fetchMovieById(movieId) {
  return SearchApi(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

export function fetchMovieBySearch(search) {
  return SearchApi(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}`
  );
}

export function fetchCastById(movieId) {
  return SearchApi(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
}

export function fetchReviewById(movieId) {
  return SearchApi(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
}
