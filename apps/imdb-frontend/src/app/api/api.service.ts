import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = environment.APIEndpoint;

  authUrl = '/auth';
  movieUrl = '/movies';

  constructor(private http: HttpClient) {}
  login(account: any) {
    return this.http.post<any>(`${this.url}${this.authUrl}/login`, account);
  }

  dashboard() {
    return this.http.get<any>(`${this.url}/dashboard`);
  }

  register(account: any) {
    return this.http.post<any>(
      `${this.url}${this.authUrl}/registration`,
      account
    );
  }

  forgetPassword(email: any) {
    return this.http.post<any>(`${this.url}/password-reset`, email);
  }

  resetPassword(password: any, userId: string) {
    return this.http.post<any>(
      `${this.url}/password-reset/${userId}`,
      password
    );
  }

  facebookLogin() {
    return this.http.get<any>(`${this.url}${this.authUrl}/login/success`, {
      withCredentials: true,
    });
  }

  //Movies api
  popularMovies() {
    // return this.http.get<any>(`${this.url}${this.movieUrl}`);
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/popular?api_key=06f4d29c928ab57e506335b4d50c0290&language=en-US&page=1`);
  }

  singleMovieInfo(movieId: any) {
    return this.http.get<any>(`${this.url}${this.movieUrl}/${movieId}`);
  }

  movieTrailers(movieId: any) {
    return this.http.get<any>(`${this.url}${this.movieUrl}/videos/${movieId}`);
  }

  movieCast(movieId: any) {
    return this.http.get<any>(`${this.url}${this.movieUrl}/credits/${movieId}`);
  }
}
