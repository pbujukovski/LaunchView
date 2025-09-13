import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    take(1),
    map(isAuthed => {
      // if already logged in → redirect to dashboard (or home)
      if (isAuthed) {
        return router.createUrlTree(['/missions']);
      }
      return true;
    })
  );
};
