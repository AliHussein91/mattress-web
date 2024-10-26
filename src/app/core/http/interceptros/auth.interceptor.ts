import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { AuthService } from '../../../pages/auth/services/auth.service';

function getCurrentCountryId() {
  if(localStorage.getItem('profile')) {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile).country_id : null;
  }else{
    const countryList = localStorage.getItem('countryList');
    return countryList ? JSON.parse(countryList).data[0] : null;
  }
}
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  let token, value;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
    value = `Bearer ${token}`
    req = req.clone({
      headers: req.headers.append('Authorization', value),
      params: req.params.append('country_id', localStorage.getItem('selectedCountryId') || getCurrentCountryId())
    })
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        authService.isLoggedOut()
        router.navigate(['/auth/login']);
      }
      return throwError(() => error)

    })
  );
};
