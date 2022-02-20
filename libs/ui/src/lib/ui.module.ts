import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

import { HeaderComponent } from './components/header/header.component';

export const uiRoutes: Route[] = [
  { path: '', component: RegisterComponent },
  { path: 'test', component: RegistrationFormComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [RegisterComponent, RegistrationFormComponent, HeaderComponent],
})
export class UiModule {}
