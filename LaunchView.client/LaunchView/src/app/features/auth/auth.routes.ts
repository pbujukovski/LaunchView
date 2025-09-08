import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';


export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthComponent, // must have a <router-outlet>
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          {
            path: 'login',
            title: 'Login',
            loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
            //canActivate: [loginGuardIfLoggedIn], // optional: if already logged in, redirect to /dashboard
          },
          {
            path: 'register',
            title: 'Register',
            loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
          },
        ],
      },
]
// export const AUTH_ROUTES: Routes = [
//     // { path: '', redirectTo: '', pathMatch: 'full' },   // no leading slash
//     // { path: '', component: AuthComponent },
//     // { path: 'login', component: LoginComponent },
//     // { path: 'register', component: RegisterComponent },

//     {path: '', component: AuthComponent, pathMatch: 'full', children: [
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegisterComponent },
//       ]
//       },
//     // Optional: client 404
//     // { path: '**', redirectTo: 'auth' },
//   ];




