import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PersonalDetailComponent } from "./register/personal-detail/personal-detail.component";
import { DeliveryDetailsComponent } from "./register/delivery-details/delivery-details.component";
import { AuthSuccessComponent } from "./auth-success/auth-success.component";
import { ConfirmRegistrationComponent } from "./register/confirm-registration/confirm-registration.component";
import { ConfirmAccountComponent } from "./confirm-account/confirm-account.component";
import { PersonalDetailsComponent } from "./social-register/personal-details/personal-details.component";
import { DeliveryAddressesComponent } from "./social-register/delivery-addresses/delivery-addresses.component";


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
        path: 'register-social',
        loadComponent: () => import('./social-register/social-register.component').then(c => c.SocialRegisterComponent),
        children: [
            {
                path: '',
                component: PersonalDetailsComponent
            },
            {
                path: 'delivery-details',
                component: DeliveryAddressesComponent
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
        path: 'confirm-account',
        component: ConfirmAccountComponent,

    },
    {
        path: 'reset-password',
        loadChildren: () => import("./reset-password/reset-password.routes").then(routes => routes.resetPasswordRoutes)
    }
]