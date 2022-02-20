import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api/api.service';
import { TokenService } from './token.service';


@Component({
  selector: 'imdb-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.api.facebookLogin().subscribe(res => {
      if (res.message === 'Create new password') {
        this.router.navigateByUrl('reset-password/' + res.id);
      } else {
        localStorage.setItem('token', res.token);
        this.tokenService.tokenSubj.next(res.token);
      }
    });
  }

  title = 'imdb-frontend';
}
