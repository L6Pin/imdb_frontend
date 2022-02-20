import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@imdb-frontend/material';
import { RegisterContainerComponent } from './register-container/register-container.component';
import { RegistrationFormComponent } from './register-container/registration-form/registration-form.component';
import { HeaderComponent } from './header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginFormComponent } from './login-container/login-form/login-form.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { AuthInterceptor } from './interceptor/auth-interceptor.interceptor';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MoviesListContainerComponent } from './movies-list-container/movies-list-container.component';
import { MoviesListComponent } from './movies-list-container/movies-list/movies-list.component';
import { MovieInfoContainerComponent } from './movie-info-container/movie-info-container.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { FormsModule } from '@angular/forms';
import { ResetPasswordContainerComponent } from './reset-password-container/reset-password-container.component';
import { ResetPasswordFormComponent } from './reset-password-container/reset-password-form/reset-password-form.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'  

// NgRx imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//Reducers
import { moviesReducer } from './Store/Reducers/movies.reducers';

//Effects
import { MovieEffects } from './Store/Effects/movies.effects';

//Facade
import { moviesFacade } from './Store/Facade/movies.facade';

//Importing the Redux chrome dev tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterContainerComponent,
    RegistrationFormComponent,
    HeaderComponent,
    LoginContainerComponent,
    LoginFormComponent,
    TestComponent,
    MoviesListContainerComponent,
    MoviesListComponent,
    MovieInfoContainerComponent,
    ForgotPasswordModalComponent,
    ResetPasswordContainerComponent,
    ResetPasswordFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    StoreModule.forRoot({ movies: moviesReducer }),
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, 
      autoPause: true, 
    }),
    RouterModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    moviesFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'bs']);
    translate.setDefaultLang('en');
  }
}
