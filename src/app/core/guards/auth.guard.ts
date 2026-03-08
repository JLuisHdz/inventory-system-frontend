import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  /*if (authService.()) {
   router.navigate(['/unauthorized']);
   return false;
}
   */

  const token = authService.getToken();

  if (!token) {

    router.navigate(['/login']);
    return false;

  }

  return true;

};