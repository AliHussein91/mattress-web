import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { profileGuard } from './core/auth/guards/profile.guard';

export const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    data: { pageTitle: 'Home' },
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((routes) => routes.authRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/shop/shop.module').then((c) => c.ShopModule),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(c => c.PrivacyComponent)
  },
  {
    path: 'terms-conditions',
    loadComponent: () => import('./pages/terms-conditions/terms-conditions.component').then(c => c.TermsConditionsComponent)
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./pages/contact-us/contact-us.component').then(c => c.ContactUsComponent)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.routes').then(routes => routes.profileRoutes),
    canActivate: [profileGuard]
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(c => c.CartComponent),
  },
  {
    path: "**",
    redirectTo: ''
  },
];

