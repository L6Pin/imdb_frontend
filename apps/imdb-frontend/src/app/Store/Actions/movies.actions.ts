import { createAction, props } from '@ngrx/store';

//Get popular movies
export const getPopularMovies = createAction(
  '[Movies list component] getPopularMovies'
);

export const getPopularMoviesSuccess = createAction(
  '[Movies list component] getPopularMoviesSuccess',
  props<{ movies: any }>()
);

export const getPopularMoviesFailure = createAction(
  '[Movies list component] getPopularMoviesFailure'
);

//Save logged in user email (string)
export const saveUserEmail = createAction(
  '[Login component] saveUserEmail',
  props<{ email: any }>()
);

//Save logged in user object
export const saveUserObject = createAction(
  '[Login component] saveUserObject',
  props<{ loggedUserObject: any }>()
);

//Save current app language
export const getAppLanguage = createAction(
  '[Header component] getAppLanguage',
  props<{ currentLanguage: any }>()
);

//Save selected movie
export const saveSelectedMovie = createAction(
  '[Movie info container] saveSelectedMovie',
  props<{ selectedMovie: any }>()
);

//Get single movie info
export const getSingleMovieInfo = createAction(
  '[Single movie info] getSingleMovieInfo',
  props<{id: any}>()
)

export const getSingleMovieInfoSuccess = createAction(
  '[Single movie info] getSingleMovieInfoSuccess',
  props<{singleMovie: any}>()
)

export const getSingleMovieInfoFailure = createAction(
  '[Single movie info] getSingleMovieInfoFailure'
)
