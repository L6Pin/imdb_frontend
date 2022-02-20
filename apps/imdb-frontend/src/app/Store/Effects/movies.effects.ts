import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../api/api.service';
import { Injectable } from '@angular/core';
import * as MoviesActions from '../Actions/movies.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MovieEffects {
  constructor(private actions: Actions, private api: ApiService) {}

  getPopularMovies = createEffect(() =>
    this.actions.pipe(
      ofType(MoviesActions.getPopularMovies),
      switchMap(() =>
        this.api.popularMovies().pipe(
          map((movies) =>
            MoviesActions.getPopularMoviesSuccess({ movies: movies })
          ),
          catchError(() => of(MoviesActions.getPopularMoviesFailure()))
        )
      )
    )
  );

  getSingleMovieInfo = createEffect(() =>
    this.actions.pipe(
      ofType(MoviesActions.getSingleMovieInfo),
      switchMap(({id}) =>
        this.api
          .singleMovieInfo(id)
          .pipe(
            map((movie) =>
             {
               console.log(id)
               return  MoviesActions.getSingleMovieInfoSuccess({ singleMovie: movie })
             }
            ),
            catchError(() => of (MoviesActions.getSingleMovieInfoFailure))
          )
      )
    )
  );
}

//withLatestFrom - ubacuju se stvar iz state-a u efekat iz akcije
//Merge map
//obican map
