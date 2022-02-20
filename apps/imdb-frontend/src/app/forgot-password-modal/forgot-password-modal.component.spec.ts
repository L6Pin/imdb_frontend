import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordModalComponent } from './forgot-password-modal.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBuilder } from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ForgotPasswordModalComponent', () => {
  let component: ForgotPasswordModalComponent;
  let fixture: ComponentFixture<ForgotPasswordModalComponent>;
  beforeEach(
    waitForAsync(() => {
      const mockModule = MockBuilder(ForgotPasswordModalComponent)
        .keep(TranslateModule.forRoot())
        .keep(FormsModule)
        .keep(ReactiveFormsModule)
        .keep(MatDialogModule)
        .provide({ provide: MatDialogRef, useValue: {} })
        .provide(HttpClientTestingModule)
        .provide(MatSnackBarModule)
        .provide(FormBuilder)
        .build();
      mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];

      TestBed.configureTestingModule(mockModule);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
