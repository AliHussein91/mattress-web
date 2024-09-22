import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";


export const authRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    }
]