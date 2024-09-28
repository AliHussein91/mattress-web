import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

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
  },
  {
    path: 'shop',
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

  },
  {

    path: "**",
    redirectTo: ''
  },
];

