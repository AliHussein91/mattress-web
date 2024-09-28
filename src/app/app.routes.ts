import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { pageTitle: 'Home' }
    },
    {
        path: 'auth',
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

    },
    {
        path: "**",
        redirectTo: ''
    }
];

