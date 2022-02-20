import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../api/api.service';
import { moviesFacade } from '../Store/Facade/movies.facade';

@Component({
  selector: 'imdb-frontend-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  innerWidth: any;
  isMobile!: boolean;

  hasToken = true;

  ngOnInit(): void {
    this.checkWidth();
    this.autoLogin();
    this.tokenService.tokenSubj?.subscribe((token) => {
      token ? (this.hasToken = true) : (this.hasToken = false);
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    public translate: TranslateService,
    private tokenService: TokenService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private facade: moviesFacade
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWidth();
  }

  checkWidth() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 600) this.isMobile = false;
    else this.isMobile = true;
  }

  logout() {
    localStorage.removeItem('token');
    this.hasToken = false;
    this.router.navigateByUrl('login');
  }

  autoLogin() {
    const getToken = localStorage.getItem('token') as string;
    this.tokenService.tokenSubj?.next(getToken);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.facade.dispatchAppLanguage(lang);
  }
}
