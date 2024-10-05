import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { AuthService } from '../../../pages/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  let token, value;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
    value = `Bearer ${token}`
    req = req.clone({
      headers: req.headers.append('Authorization', value)
    })
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        localStorage.getItem('token') && localStorage.removeItem('token');
        authService.isSigned.set(false)
        router.navigate(['/auth/login']);
      }
      return throwError(() => new Error("Unauthorized Access"))

    })
  );
};
