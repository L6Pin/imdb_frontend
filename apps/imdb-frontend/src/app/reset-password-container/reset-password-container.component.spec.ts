import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { ResetPasswordContainerComponent } from './reset-password-container.component';

describe('ResetPasswordContainerComponent', () => {
  let component: ResetPasswordContainerComponent;
  let fixture: ComponentFixture<ResetPasswordContainerComponent>;

  beforeEach(waitForAsync (() => {
    const mockModule = MockBuilder(ResetPasswordContainerComponent)
    .build();
    mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];
    TestBed.configureTestingModule(mockModule);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
