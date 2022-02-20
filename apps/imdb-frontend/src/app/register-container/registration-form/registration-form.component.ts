import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'imdb-frontend-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  loginForm: FormGroup;
  hidePw = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    });
  }
  register() {
    this.api.register(this.loginForm.value).subscribe(
      (res) => {
        this._snackBar.open(
          this.translate.instant('registration.confirmEmail'),
          this.translate.instant('error.close'),
          {
            duration: 3000,
          }
        );
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 3000);
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
        }
        this._snackBar.open(
          this.translate.instant('registration.errors.userExists'),
          this.translate.instant('error.close'),
          {
            duration: 3000,
          }
        );
      }
    );
  }
}
