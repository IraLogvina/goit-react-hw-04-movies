import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

// import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader/Loader";
import Container from "./components/Container";
import AppBar from "./components/AppBar";

const HomePage = lazy(() => import("./views/HomePage"));

const MoviesPage = lazy(() => import("./views/MoviesPage/MoviesPage"));

const MovieDetailsPage = React.lazy(() =>
  import('./views/MovieDetailsPage/MovieDetailsPage'),
);

const NotFound = lazy(() => import("./views/NotFound/NotFound"));

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:moviesId">
            <MovieDetailsPage />
          </Route>

          <Route path="">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
