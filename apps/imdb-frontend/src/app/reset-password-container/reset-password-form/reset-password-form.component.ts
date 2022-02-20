import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'imdb-frontend-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent implements OnInit {
  resetPasswordForm: FormGroup;
  routeSub!: Subscription;
  hidePw = true;
  hidePw2 = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.resetPasswordForm = this.formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }
  id = '';

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  cancel(){
    this.router.navigateByUrl('login');
  }

  resetPassword() {
    const password = {
      password: this.resetPasswordForm.get('newPassword')?.value,
    };
    this.api.resetPassword(password, this.id).subscribe(
     (res) => {
      this.router.navigateByUrl('login');
      this._snackBar.open(
        this.translate.instant('resetPassword.passwordChanged'),
        this.translate.instant('error.close'),
         {
        duration: 3000,
      });
    },
    (err) => {
      this._snackBar.open('Password reset failed', 'Close', {
        duration: 3000,
      });
    });
  }
}
