import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieInfoContainerComponent } from './movie-info-container.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBuilder } from 'ng-mocks';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

describe('MovieInfoContainerComponent', () => {
  let component: MovieInfoContainerComponent;
  let fixture: ComponentFixture<MovieInfoContainerComponent>;

  
  beforeEach(
    waitForAsync(() => {
      const mockModule = MockBuilder(MovieInfoContainerComponent)
        .keep(RouterModule.forRoot([]))
        .keep(RouterTestingModule.withRoutes([]))
        .keep(HttpClientTestingModule)
        .keep(DomSanitizer)
        .provide({ provide: APP_BASE_HREF, useValue: '/' })
        .provide(Injectable)
        .build();

        TestBed.configureTestingModule(mockModule);
      })
  );
  
  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
