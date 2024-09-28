import { Route } from "@angular/router";
import { RecoveryEmailComponent } from "./recovery-email/recovery-email.component";
import { CodeVerificationComponent } from "./code-verification/code-verification.component";
import { CreatePasswordComponent } from "./create-password/create-password.component";

export const resetPasswordRoutes: Route[] = [{
    path: '',
    component: RecoveryEmailComponent

},
{
    path: 'verification',
    component: CodeVerificationComponent
},
{
    path: 'create-password',
    component: CreatePasswordComponent
}
]