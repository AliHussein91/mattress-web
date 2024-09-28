import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/auth/auth.routes').then(routes => routes.authRoutes)
    },
    {
        path: 'privacy',
        loadComponent: () => import('./pages/privacy/privacy.component').then(c => c.PrivacyComponent)
    },
    {
        path: 'contact-us',
        loadComponent: () => import('./pages/contact-us/contact-us.component').then(c => c.ContactUsComponent)
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.routes').then(routes => routes.profileRoutes),
        
    }
];
