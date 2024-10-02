import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') ?? ''
  const value = token ? `Bearer ${token}` : ''
  req = req.clone({
    headers: req.headers.append('Authorization', value)
  })
  return next(req);
};
