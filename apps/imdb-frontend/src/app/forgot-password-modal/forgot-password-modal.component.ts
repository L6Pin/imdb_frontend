import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'imdb-frontend-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
})
export class ForgotPasswordModalComponent implements OnInit {
  forgotPasswordform: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.forgotPasswordform = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  forgotPassword() {
    const email = {
      email: this.forgotPasswordform.get('email')?.value,
    };

    this.api.forgetPassword(email).subscribe(
      (res) => {
        this._snackBar.open(
          this.translate.instant('forgotPassword.emailSent'),
          this.translate.instant('error.close'),
          {
            duration: 3000,
          }
        );
        this.dialogRef.close();
      },
      (err) => {
        if (err.error.message === 'user with given email does not exist') {
          this._snackBar.open(
            this.translate.instant('forgotPassword.errors.userDoesNotExist'),
            this.translate.instant('error.close'),
            {
              duration: 3000,
            }
          );
        }
      }
    );
  }
}
