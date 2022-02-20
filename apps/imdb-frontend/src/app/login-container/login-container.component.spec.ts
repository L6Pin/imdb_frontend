import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginContainerComponent } from './login-container.component';
import { MockBuilder } from 'ng-mocks';

describe('LoginContainerComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      const mockModule = MockBuilder(LoginContainerComponent)
        .build();
        mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];

        TestBed.configureTestingModule(mockModule);
      })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
