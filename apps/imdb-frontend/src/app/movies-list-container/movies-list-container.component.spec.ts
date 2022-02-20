import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { MoviesListContainerComponent } from './movies-list-container.component';

describe('MoviesListContainerComponent', () => {
  let component: MoviesListContainerComponent;
  let fixture: ComponentFixture<MoviesListContainerComponent>;

  beforeEach(waitForAsync (() => {
    const mockModule = MockBuilder(MoviesListContainerComponent)
    .build();
    mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];
    TestBed.configureTestingModule(mockModule);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
