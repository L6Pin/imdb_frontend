import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';

// Table sort imports
import { MatSort } from '@angular/material/sort';

//Movies Model
import { Movie } from '../../Models/Movies';

//NgRx imports
import { Store } from '@ngrx/store';

import { moviesFacade } from '../../Store/Facade/movies.facade';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'imdb-frontend-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  public displayedColumns: string[] = ['original_title', 'vote_average'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public userEmail$: Observable<any> = this.facade.userEmail$;
  public movies$: Observable<any> = of({});
  
  constructor(private facade: moviesFacade) { }

  ngOnInit(): void {
    this.facade.dispatchPopularMovies();
    this.movies$ = this.facade.popularMovies$.pipe(
      map((resp: any) => {
        const ELEMENT_DATA: Movie[] = [];
        let dataSource = new MatTableDataSource<Movie>(ELEMENT_DATA);
        dataSource.data = resp;
        dataSource.paginator = this.paginator;
        dataSource.sort = this.sort;
        return dataSource;
      })
    );
  }
}
