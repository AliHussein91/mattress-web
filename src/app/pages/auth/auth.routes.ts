import { Route } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";


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
        loadChildren: ()=> import("./components/reset-password/reset-password.routes").then(m => m.resetPasswordRoutes)
    }
]