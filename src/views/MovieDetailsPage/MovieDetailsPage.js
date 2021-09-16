import { useState, useEffect, lazy, Suspense } from "react";

import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";

import * as moviesAPI from "../../services/searchAPI";
import LoaderComponent from "../../components/Loader/Loader";
import styles from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast/Cast"));
const Reviews = lazy(() => import("../Reviews/Reviews"));

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function HomeSubView() {
  const { url } = useRouteMatch();
  const { moviesId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMovieById(moviesId)

      .then((data) => {
        setMovie(data);
      })

      .catch((error) => {
        console.log(error);
        setError("Something is wrong, try again");
      });
  }, [moviesId, error]);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" className={styles.button} onClick={onGoBack}>
            Go back
          </button>
          <div className={styles.movieInfo}>
            <img
              src={`${IMAGE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className={styles.movieInfoImg}
            />
            <div className={styles.movieInfoDetails}>
              <h1 className={styles.title}>{movie.title} </h1>
              <p>User Score: {movie.vote_average * 10}%</p>
              <p className={styles.overview}>
                Overview
                <span className={styles.description}>{movie.overview}</span>
              </p>
              {movie.genres && (
                <>
                  <h3 className={styles.title}>Genres</h3>
                  <ul className={styles.genre}>
                    {movie.genres.map((genre) => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <nav className={styles.navigation}>
            <NavLink
              to={{
                pathname: `${url}/cast`,
                state: { from: { location } },
              }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Cast
            </NavLink>

            <NavLink
              to={{
                pathname: `${url}/reviews`,
                state: { from: { location } },
              }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Reviews
            </NavLink>
          </nav>

          <Suspense fallback={<LoaderComponent />}>
            <Switch>
              <Route path="/movies/:moviesId/cast">
                <Cast />
              </Route>

              <Route path="/movies/:moviesId/reviews">
                <Reviews />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}
