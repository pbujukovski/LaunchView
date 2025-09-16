import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  // Lazy-loaded route groups
  {
    path: 'auth',
    title: 'Authentication',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'missions',
    title: 'Missions',
    canActivate: [authGuard],
    loadChildren: () => import('./features/missions/missions.routes').then(m => m.MISSIONS_ROUTES),
  },
  { path: '404-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404-not-found' },
];
