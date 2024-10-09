import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PersonalDetailComponent } from "./register/personal-detail/personal-detail.component";
import { DeliveryDetailsComponent } from "./register/delivery-details/delivery-details.component";
import { AuthSuccessComponent } from "./auth-success/auth-success.component";
import { ConfirmRegistrationComponent } from "./register/confirm-registration/confirm-registration.component";


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
                path: 'verify',
                component: ConfirmRegistrationComponent
            },
            {
                path: 'delivery-details',
                component: DeliveryDetailsComponent
            },
            {
                path: '**',
                redirectTo: ''
            }
        ],
    },
    {
        path: 'auth-success',
        component: AuthSuccessComponent,

    },
    {
        path: 'reset-password',
        loadChildren: () => import("./reset-password/reset-password.routes").then(routes => routes.resetPasswordRoutes)
    }
]