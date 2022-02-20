import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegistrationFormComponent } from './registration-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MockBuilder } from 'ng-mocks';
import { FormBuilder} from '@angular/forms'


describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let apiServiceMock: any;

  beforeEach(waitForAsync(() => {

    const mockModule = MockBuilder(RegistrationFormComponent)
      .keep(RouterTestingModule.withRoutes([]))
      .keep(TranslateModule.forRoot())
      .keep(FormsModule)
      .keep(ReactiveFormsModule)
      .provide(HttpClientTestingModule)
      .provide(MatSnackBarModule)
      .provide(FormBuilder)
      .provide(CommonModule)
      .build();
    mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];
    
    TestBed.configureTestingModule(mockModule);
   
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    apiServiceMock = {
      register: jest.fn(),
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

  describe('Test: Register Form', () => {
    it('should invalidate the form', () => {
      component.loginForm.controls.email.setValue('');
      component.loginForm.controls.password.setValue('');
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should invalidate the form', () => {
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
    it('should call register()', () => {
      const formData = {
        username: 'demo',
        password: 'pass1234',
      };
      const spyloginUser = jest
        .spyOn(apiServiceMock, 'register')
        .mockReturnValue(true);
      expect(apiServiceMock.register(formData)).toBe(true);
      expect(spyloginUser).toHaveBeenCalledWith(formData);
    });
  });
});



