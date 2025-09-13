import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';

export function initAuth(auth: AuthService) {
  return () => auth.restoreAuth();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withDebugTracing()),
    { provide: APP_INITIALIZER, useFactory: initAuth, deps: [AuthService], multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(AUTH_ROUTES, withDebugTracing()),
    provideZoneChangeDetection({ eventCoalescing: true }), 
  ],
   // provideClientHydration(withEventReplay())]
};
