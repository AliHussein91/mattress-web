import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../pages/auth/services/auth.service';

export const profileGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isSigned() == false) {
    router.navigateByUrl('/auth/login')
    return false
  }
  return true
};
