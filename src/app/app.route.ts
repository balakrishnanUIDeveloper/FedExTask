import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '404', component: NotFoundComponent },
  {
    path: '**',
    redirectTo: '/404'
  }
];
