import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";


export const authRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
    }
]