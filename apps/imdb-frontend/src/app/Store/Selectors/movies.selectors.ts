import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  moviesAdapter,
  moviesPartialState,
  movieState,
  MOVIES_FEATURE_KEY,
} from '../Reducers/movies.reducers';

export const getMoviesState = createFeatureSelector<
  moviesPartialState,
  movieState
>(MOVIES_FEATURE_KEY);

export const selectUserEmail = createSelector(
  getMoviesState,
  (state: movieState) => state.userEmail
);

export const selectUserObject = createSelector(
  getMoviesState,
  (state: movieState) => state.loggedUser
)

export const selectAppLanguage = createSelector(
  getMoviesState,
  (state: movieState) => state.language
)

export const selectSingleMovie = createSelector(
  getMoviesState,
  (state: movieState) => state.selectedMovie
)

export const selectPopularMovies = createSelector(
  // 'movies' refers to the 'movies' from 'StoreModule.forRoot({ movies: moviesReducer })'
  getMoviesState,
  moviesAdapter.getSelectors().selectAll
);

