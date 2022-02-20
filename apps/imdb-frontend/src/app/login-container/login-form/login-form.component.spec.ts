import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { LoginFormComponent } from './login-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MockBuilder } from 'ng-mocks';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let apiServiceMock: any;

  beforeEach(
    waitForAsync(() => {
      const mockModule = MockBuilder(LoginFormComponent)
        .keep(RouterTestingModule.withRoutes([]))
        .keep(TranslateModule.forRoot())
        .keep(MatDialog)
        .keep(FormsModule)
        .keep(ReactiveFormsModule)
        .keep(MatDialogModule)
        .provide(HttpClientTestingModule)
        .provide(MatSnackBarModule)
        .provide(FormBuilder)
        .provide(CommonModule)
        .build();
      mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];

      TestBed.configureTestingModule(mockModule);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    apiServiceMock = {
      login: jest.fn(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test: ngOnInit', () => {
    it('should initialize loginForm', () => {
      const loginForm = {
        email: '',
        password: '',
      };
      expect(component.loginForm.value).toEqual(loginForm);
    });
  });

  describe('Test: Login Form', () => {
    it('should invalidate the form', () => {
      component.loginForm.controls.email.setValue('');
      component.loginForm.controls.password.setValue('');
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should invalidate the form if password does not match the length', () => {
      component.loginForm.controls.email.setValue('demo@');
      component.loginForm.controls.password.setValue('demo123');
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should validate the form', () => {
      component.loginForm.controls.email.setValue('demo@gmail.com');
      component.loginForm.controls.password.setValue('Admin123@');
      expect(component.loginForm.valid).toBeTruthy();
    });
  });

  describe('Test: form valid', () => {
    it('should call loginUser', () => {
      const formData = {
        username: 'demo',
        password: 'pass1234',
      };
      const spyloginUser = jest
        .spyOn(apiServiceMock, 'login')
        .mockReturnValue(true);
      expect(apiServiceMock.login(formData)).toBe(true);
      expect(spyloginUser).toHaveBeenCalledWith(formData);
    });
  });
});
