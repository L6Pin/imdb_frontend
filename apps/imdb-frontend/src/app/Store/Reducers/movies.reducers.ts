import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from '../Actions/movies.actions';
import { Movie, movieEntity } from '../../Models/Movies';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
export const MOVIES_FEATURE_KEY = 'movies';

export interface movieState extends EntityState<movieEntity> {
  userEmail: string;
  loggedUser: {
    userEmail: string;
    testData1: string;
    testData2: string;
  };
  language: string;
  selectedMovie: {};
}

export const moviesAdapter: EntityAdapter<movieEntity> =
  createEntityAdapter<movieEntity>();

export interface moviesPartialState {
  readonly [MOVIES_FEATURE_KEY]: movieState;
}

export const initialState: movieState = moviesAdapter.getInitialState({
  userEmail: '',
  loggedUser: {
    userEmail: '',
    testData1: 'LoremIpsum1',
    testData2: 'LoremIpsum2',
  },
  language: 'en',
  selectedMovie: {},
});

const _moviesReducer = createReducer(
  initialState,
  on(MoviesActions.getPopularMoviesSuccess, (state, { movies }) => {
    return moviesAdapter.addMany(
      [...movies.results].sort((a: any, b: any) =>
        a.title.localeCompare(b.title)
      ),
      state
    );
  }),
  on(MoviesActions.getPopularMoviesFailure, (state) => {
    console.log('Error: Could not get movies!');
    return state;
  }),
  on(MoviesActions.saveUserEmail, (state, { email }) => ({
    ...state,
    userEmail: email,
  })),
  on(MoviesActions.saveUserObject, (state, { loggedUserObject }) => ({
    ...state,
    loggedUser: {
      ...state.loggedUser,
      userEmail: loggedUserObject.email,
    },
  })),
  on(MoviesActions.getAppLanguage, (state, { currentLanguage }) => ({
    ...state,
    language: currentLanguage,
  })),
  on(MoviesActions.saveSelectedMovie, (state, { selectedMovie }) => ({
    ...state,
    selectedMovie: selectedMovie,
  })),
  on(MoviesActions.getSingleMovieInfoSuccess, (state, { singleMovie }) => ({
    ...state,
    selectedMovie: singleMovie,
  })),
  on(MoviesActions.getSingleMovieInfoFailure, (state) => {
    console.log('Error: Could not get single movie info!');
    return state;
  })
);

export function moviesReducer(state: any, actions: any) {
  return _moviesReducer(state, actions);
}
