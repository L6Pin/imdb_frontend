import { BreakpointObserver, LayoutModule, Breakpoints } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockBuilder } from 'ng-mocks';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      const mockModule = MockBuilder(HeaderComponent)
        .keep(TranslateModule.forRoot())
        .keep(RouterTestingModule.withRoutes([]))
        .keep(NoopAnimationsModule)
        .keep(Breakpoints.Handset)
        .provide({ provide: BreakpointObserver, useValue: { pipe: map }})
        .provide(BreakpointObserver)
        .provide(LayoutModule)
        .provide(HttpClientTestingModule)
        .provide(MatButtonModule)
        .provide(MatIconModule)
        .provide(MatListModule)
        .provide(MatSidenavModule)
        .provide(MatToolbarModule)
        .provide({ provide: Observable, useValue: {} })
        .build();
      mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];
      
      TestBed.configureTestingModule(mockModule);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
