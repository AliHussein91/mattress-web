import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadChildren: () => import('./pages/auth/auth.routes').then(routes => routes.authRoutes)
},
{
    path: 'privacy',
    loadComponent: () => import('./pages/Privacy/privacy.component').then(c => c.PrivacyComponent)
}];
