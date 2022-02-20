import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegisterContainerComponent } from './register-container.component';
import { MockBuilder } from 'ng-mocks';

describe('RegisterContainerComponent', () => {
  let component: RegisterContainerComponent;
  let fixture: ComponentFixture<RegisterContainerComponent>;

  beforeEach(waitForAsync (() => {
    const mockModule = MockBuilder(RegisterContainerComponent)
    .keep(TranslateModule.forRoot())
    .build();
    mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];
    TestBed.configureTestingModule(mockModule);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
