import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './login-container/login-container.component';
import { RegisterContainerComponent } from './register-container/register-container.component';
import { ResetPasswordContainerComponent } from './reset-password-container/reset-password-container.component';
import { TestComponent } from './test/test.component';
import { MoviesListContainerComponent } from './movies-list-container/movies-list-container.component';
import { MovieInfoContainerComponent } from './movie-info-container/movie-info-container.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: RegisterContainerComponent },
  { path: 'login', component: LoginContainerComponent },
  { path: 'dashboard', component: TestComponent, canActivate: [AuthGuard]},
  { path: 'movies', component: MoviesListContainerComponent },
  { path: 'movies/:id', component: MovieInfoContainerComponent },
  { path: 'reset-password/:id', component:ResetPasswordContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
