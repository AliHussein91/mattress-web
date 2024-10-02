import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';
import { AuthService } from '../../services/auth.service';
import { OTPIdentifier } from '../../../../shared/types/otp-identifier';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-recovery-email',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './recovery-email.component.html',
  styleUrl: './recovery-email.component.scss'
})
export class RecoveryEmailComponent {

  fb = inject(FormBuilder)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  passRecoveryForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  })
  authService = inject(AuthService);

  onSubmit() {
    const userInfo: OTPIdentifier = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": { "identifier": this.passRecoveryForm.getRawValue().email }
      }
    }
    this.authService.getOTP(userInfo).pipe(
      map(data => console.log(data)),
      catchError(
        () => {
          console.error("Error caught in auth service")
          return throwError(() => {
            console.log("Error rethrown by auth service")
            return new Error('Could not post data')
          })
        })
    )
    this.router.navigate(['verification'], { relativeTo: this.activatedRoute })
  }

}
