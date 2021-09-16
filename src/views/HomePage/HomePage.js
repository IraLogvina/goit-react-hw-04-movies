import { useState, useEffect } from "react";
import * as SearchApi from "../../services/searchAPI";
import MoviesGallery from "../../components/MoviesGallery/MoviesGallery";

export default function HomePage() {
    
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    SearchApi.fetchTrendingMovies().then((data) => setTrending(data.results));
  }, []);

  return <>{trending && <MoviesGallery gallery={trending} />}</>;
}
