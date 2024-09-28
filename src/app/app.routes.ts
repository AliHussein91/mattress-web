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
    loadComponent: () => import('./pages/Privacy/privacy.component').then(c => c.PrivacyComponent)
}];
