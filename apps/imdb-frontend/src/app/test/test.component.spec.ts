import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestComponent } from './test.component';
import { MockBuilder } from 'ng-mocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(
    waitForAsync(() => {
      const mockModule = MockBuilder(TestComponent)
        .provide(HttpClientTestingModule)
        .build();
      mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];

      TestBed.configureTestingModule(mockModule);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
