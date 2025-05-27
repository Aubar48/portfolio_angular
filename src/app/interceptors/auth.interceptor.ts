import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip auth during SSR
  if (typeof window === 'undefined') {
    return next(req);
  }

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Excluir rutas de autenticación
  const isAuthUrl = req.url.includes('/login') || req.url.includes('/register');

  if (token && !isAuthUrl) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expirado o inválido
          authService.logout();
          Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          }).then(() => {
            router.navigate(['/login']);
          });
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};