import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';
import { AuthService, ResetPasswordUser } from '../../services/auth.service';


@Component({
  selector: 'app-recovery-email',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './recovery-email.component.html',
  styleUrl: './recovery-email.component.scss'
})
export class RecoveryEmailComponent {

  // Injectables
  authService = inject(AuthService);
  fb = inject(FormBuilder)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  // Loader
  isLoading: boolean = false
  // Form
  passRecoveryForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  })

  onSubmit() {
    // Test form validity
    this.passRecoveryForm.markAllAsTouched()
    if (!this.passRecoveryForm.valid) return
    // Initiate Loader
    this.isLoading = true
    // Create reset password obj
    const userInfo: ResetPasswordUser = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": { "identifier": this.passRecoveryForm.getRawValue().email }
      }
    }
    this.resetPassword(userInfo)
  }

  // Call the reset password endpoint
  resetPassword(userInfo: ResetPasswordUser) {
    this.authService.getOTP(userInfo).subscribe({
      next: data => {
        this.authService.resetPasswordUser.set(userInfo)
        this.router.navigate(['verification'], { relativeTo: this.activatedRoute })
      },
      error: error => console.log(error)
    })
  }

}
