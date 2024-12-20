import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { AuthService } from '../../../pages/auth/services/auth.service';

function getCurrentCountryId() {
  if (localStorage.getItem('profile')) {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile).country_id : null;
  } else {
    const countryIdFromList = localStorage.getItem('countryList')
      ? JSON.parse(localStorage.getItem('countryList')!).data[0]
      : 1;
    return localStorage.getItem('selectedCountryId')
      ? localStorage.getItem('selectedCountryId')
      : countryIdFromList;
  }
}
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let token, value;
  token = localStorage.getItem('token');
  value = `Bearer ${token}`;
  req = req.clone({
    ...(token && { headers: req.headers.append('Authorization', value) }),
    ...(localStorage.getItem('selectedCountryId') && {
      params: req.params.append('country_id', getCurrentCountryId()),
    }),
  });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        authService.isLoggedOut();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    }),
  );
};
