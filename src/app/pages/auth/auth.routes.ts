import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PersonalDetailComponent } from "./register/personal-detail/personal-detail.component";
import { DeliveryDetailsComponent } from "./register/delivery-details/delivery-details.component";
import { PasswordDetailsComponent } from "./register/password-details/password-details.component";
import { RegisterSuccessComponent } from "./register/register-success/register-success.component";
import { authGuard } from "../../core/auth/guards/auth.guard";


export const authRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
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
        ],
    },
    {
        path: 'auth-success',
        component: RegisterSuccessComponent,

    },
    {
        path: 'reset-password',
        loadChildren: () => import("./reset-password/reset-password.routes").then(routes => routes.resetPasswordRoutes)
    }
]