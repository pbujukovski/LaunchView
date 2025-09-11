import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withDebugTracing()),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(AUTH_ROUTES, withDebugTracing()),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration(withEventReplay())]
};
