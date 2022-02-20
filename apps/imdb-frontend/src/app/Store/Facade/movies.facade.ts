import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as movieActions from '../Actions/movies.actions';
import * as movieSelectors from '../Selectors/movies.selectors';
import * as movieReducers from '../Reducers/movies.reducers';

@Injectable()
export class moviesFacade {
  constructor(private store: Store<movieReducers.moviesPartialState>) {}

  popularMovies$ = this.store.pipe(select(movieSelectors.selectPopularMovies));
  userEmail$ = this.store.pipe(select(movieSelectors.selectUserEmail));
  loggedUserObject$ = this.store.pipe(select(movieSelectors.selectUserObject));
  appLanguage$ = this.store.pipe(select(movieSelectors.selectAppLanguage));
  singleMovie$ = this.store.pipe(select(movieSelectors.selectSingleMovie))

  public dispatchPopularMovies() {
    this.store.dispatch(movieActions.getPopularMovies());
  }

  public dispatchSaveUserEmail(userEmail: string) {
    this.store.dispatch(movieActions.saveUserEmail({ email: userEmail }));
  }

  public dispatchLoggedUserObject(userObject: any) {
    this.store.dispatch(
      movieActions.saveUserObject({ loggedUserObject: userObject })
    );
  }

  public dispatchAppLanguage(currentLanguage: string) {
    this.store.dispatch(
      movieActions.getAppLanguage({ currentLanguage: currentLanguage })
    );
  }

  public dispatchSelectedMovie(selectedMovie: any){
    this.store.dispatch(movieActions.saveSelectedMovie({selectedMovie: selectedMovie}))
  }

  public dispatchSingleMovieInfo(id: any){
    this.store.dispatch(movieActions.getSingleMovieInfo({id: id}))
  }
}
