import { Route } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { PersonalDetailComponent } from "./components/register/personal-detail/personal-detail.component";
import { DeliveryDetailsComponent } from "./components/register/delivery-details/delivery-details.component";
import { PasswordDetailsComponent } from "./components/register/password-details/password-details.component";
import { RegisterSuccessComponent } from "./components/register/register-success/register-success.component";


export const authRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent),
        children: [
            {
                path: '',
                component: PersonalDetailComponent
            },
            {
                path: 'delivery-details',
                component: DeliveryDetailsComponent
            },
            {
                path: 'create-password',
                component: PasswordDetailsComponent
            },

            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    {
        path: 'register-success',
        component: RegisterSuccessComponent
    },
    {
        path: 'reset-password',
        loadChildren: () => import("./components/reset-password/reset-password.routes").then(m => m.resetPasswordRoutes)
    }
]