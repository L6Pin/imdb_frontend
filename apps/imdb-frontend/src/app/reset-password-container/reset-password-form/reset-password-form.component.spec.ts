import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { ResetPasswordFormComponent } from './reset-password-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms'

describe('ResetPasswordFormComponent', () => {
  let component: ResetPasswordFormComponent;
  let fixture: ComponentFixture<ResetPasswordFormComponent>;

  beforeEach(waitForAsync (() => {
    const mockModule = MockBuilder(ResetPasswordFormComponent)
    .keep(RouterTestingModule.withRoutes([]))
    .keep(TranslateModule.forRoot())
    .keep(FormsModule)
    .keep(ReactiveFormsModule)
    .provide(FormBuilder)
    .build();
    mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];
    TestBed.configureTestingModule(mockModule);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
