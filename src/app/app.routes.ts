import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { profileGuard } from './core/auth/guards/profile.guard';
import { countryGuard } from './core/auth/guards';

export const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    data: { pageTitle: 'Home' },
    canActivate: [countryGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((routes) => routes.authRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'products',
    canActivate: [countryGuard],
    loadChildren: () =>
      import('./pages/shop/shop.module').then((c) => c.ShopModule),
  },
  {
    path: 'privacy',
    canActivate: [countryGuard],
    loadComponent: () =>
      import('./pages/Privacy/privacy.component').then(
        (c) => c.PrivacyComponent,
      ),
  },
  {
    path: 'select-country',
    loadComponent: () =>
      import('./pages/select-country/select-country.component').then(
        (c) => c.SelectCountryComponent,
      ),
  },
  {
    path: 'terms-conditions',
    canActivate: [countryGuard],
    loadComponent: () =>
      import('./pages/terms-conditions/terms-conditions.component').then(
        (c) => c.TermsConditionsComponent,
      ),
  },
  {
    path: 'contact-us',
    canActivate: [countryGuard],
    loadComponent: () =>
      import('./pages/contact-us/contact-us.component').then(
        (c) => c.ContactUsComponent,
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.routes').then(
        (routes) => routes.profileRoutes,
      ),
    canActivate: [profileGuard, countryGuard],
  },
  {
    path: 'cart',
    canActivate: [countryGuard],
    loadComponent: () =>
      import('./pages/cart/cart.component').then((c) => c.CartComponent),
  },
  {
    path: 'payment',
    canActivate: [countryGuard],
    loadChildren: () =>
      import('./pages/payment/payment.routes').then(
        (routes) => routes.paymentRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
