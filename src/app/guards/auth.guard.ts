import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (typeof window !== 'undefined' && token && isLoggedIn) {
    return true;
  }

  // Limpiar datos de autenticación si hay inconsistencias
  authService.logout();

  router.navigate(['/login']);
  return false;
};