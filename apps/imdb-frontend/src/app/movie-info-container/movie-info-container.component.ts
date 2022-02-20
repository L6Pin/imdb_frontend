import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';

import { DomSanitizer } from '@angular/platform-browser';
import { moviesFacade } from '../Store/Facade/movies.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'imdb-frontend-movie-info-container',
  templateUrl: './movie-info-container.component.html',
  styleUrls: ['./movie-info-container.component.scss'],
})
export class MovieInfoContainerComponent implements OnInit {
  private id: any;
  public movieInfo: any;
  private movieTrailersKeys: any;
  public movieTrailerLinks: any = [];
  public movieCast: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public sanitizer: DomSanitizer,
    public facade: moviesFacade
  ) {}

  public singleMovie$: Observable<any> = this.facade.singleMovie$

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // this.api.singleMovieInfo(this.id)?.subscribe((res) => {
      
    //   this.movieInfo = res.data;
    //   this.facade.dispatchSelectedMovie(res.data)
    // });

    this.facade.dispatchSingleMovieInfo(this.id)
    this.singleMovie$.subscribe(movie => this.movieInfo = movie.data)


    

    this.api.movieTrailers(this.id)?.subscribe((res) => {
      this.movieTrailersKeys = res.data.results;
      this.movieTrailersKeys.forEach((key: any) => {
        this.movieTrailerLinks.push(`https://www.youtube-nocookie.com/embed/${key.key}`);
      });
    });

    this.api.movieCast(this.id)?.subscribe((res) => {
      this.movieCast = res.data.cast;
      this.movieCast.splice(10);
    });
  }
}
