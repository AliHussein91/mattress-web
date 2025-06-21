import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const countryGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (
    !localStorage.getItem('selectedCountryId') &&
    !localStorage.getItem('token')
  ) {
    router.navigateByUrl('/select-country');
    return false;
  } else {
    return true;
  }
};
