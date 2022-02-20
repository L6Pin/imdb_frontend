import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordModalComponent } from '../../forgot-password-modal/forgot-password-modal.component';
import { TokenService } from '../../token.service';
import { environment } from '../../../environments/environment';
import { moviesFacade } from '../../Store/Facade/movies.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'imdb-frontend-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  email: string = '';
  url = environment.APIEndpoint;
  fbUrl = `${this.url}/auth/facebook`;
  hidePw = true;
  public loggedUserObject$: Observable<any> = this.facade.loggedUserObject$;

  constructor(
    private api: ApiService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog,
    private tokenService: TokenService,
    private facade: moviesFacade
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
    });
  }

  ngOnInit(): void {
    this.loggedUserObject$.subscribe(data => console.log(data))
   
  }

  login() {
    this.api.login(this.loginForm.value).subscribe(
      (res) => {
        this.facade.dispatchSaveUserEmail(this.loginForm.value.email);
        this.facade.dispatchLoggedUserObject(this.loginForm.value)
        localStorage.setItem('token', res.token);
        this.tokenService.tokenSubj.next(res.token);
        this.router.navigateByUrl('/movies');
      },
      (err) => {
        if (err.error.status > 499) {
          this._snackBar.open(
            this.translate.instant('err.server'),
            this.translate.instant('error.close'),
            {
              duration: 3000,
            }
          );
        } else if (
          err.error.message ===
          'User account not verified. Please check you email!'
        ) {
          this._snackBar.open(
            this.translate.instant('login.errors.emailNotConfirmed'),
            this.translate.instant('error.close'),
            {
              duration: 3000,
            }
          );
        } else {
          this._snackBar.open(
            this.translate.instant('login.errors.emailPassword'),
            this.translate.instant('error.close'),
            {
              duration: 3000,
            }
          );
        }
      }
    );
  }

  openForgotPasswordDialog() {
    const dialogRef = this.dialog.open(ForgotPasswordModalComponent, {
      width: '400px',
      backdropClass: 'backdropBackground',
      data: {
        email: this.email,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
