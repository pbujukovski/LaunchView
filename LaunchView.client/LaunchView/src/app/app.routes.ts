import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 //export const routes: Routes = [];

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  // Lazy-loaded route groups
  {
    path: 'auth',
    title: 'Authentication',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
];
