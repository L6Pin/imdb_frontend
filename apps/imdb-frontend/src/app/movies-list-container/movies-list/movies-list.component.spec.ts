import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { MoviesListComponent } from './movies-list.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(
    waitForAsync(() => {
      const mockModule = MockBuilder(MoviesListComponent)
        .keep(TranslateModule.forRoot())
        .keep(MatTableModule)
        .provide(Injectable)
        .provide({ provide: BehaviorSubject, useValue: {}})
        .provide(HttpClientTestingModule)
        .provide({ provide: Observable, useValue: {} })
        .build();
        mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];
      
        TestBed.configureTestingModule(mockModule);
      })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
