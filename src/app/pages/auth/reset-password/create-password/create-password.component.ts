import { AuthService, ResetPasswordUser } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';
import { confirmPasswordValidator } from '../../../../shared/services/confirmation-password.validator';
import { passwordValidator } from '../../../../shared/services/password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService, LogType } from '@app/shared/services/log.service';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent {
  // Injectables
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  logger = inject(LogService)
  // Password Visibility
  isVisible = false
  isConVisible = false
  passType = 'password'
  confType = 'password'
  // Loader
  isLoading: boolean = false
  // Form
  passwordForm = this.fb.nonNullable.group({
    password: ['', [Validators.required, passwordValidator()]],
    confirmation: ['', [Validators.required]]
  },
    {
      validators: confirmPasswordValidator
    })

  // Form submission call
  onSubmit() {
    // Test form validity
    this.passwordForm.markAllAsTouched()
    if (this.passwordForm.invalid) return
    const userInfo: ResetPasswordUser = this.authService.resetPasswordUser()!
    // Create register obj
    this.authService.resetPasswordUser.set({
      ...userInfo, "data": {
        "type": "user",
        "id": "null",
        "attributes": {
          ...userInfo.data.attributes, 'password': this.passwordForm.getRawValue().password,
          'password_confirmation': this.passwordForm.getRawValue().confirmation
        }
      }
    })
    // Call the reset password endpoint
    console.log('submitted');

    this.resetPassword()
  }

  // Call the reset password endpoint
  resetPassword() {
    this.authService.resetPassword(this.authService.resetPasswordUser()!).subscribe({
      next: data => {
        this.authService.resetPasswordUser.set(null)
        localStorage.removeItem('identifier')
        this.router.navigate(['auth', 'auth-success'], { relativeTo: this.activatedRoute.root })
      },
      error: error => {
        console.log(error);
      }
    })
  }
  // Show and hide password & confirmation toggles
  showPassword() {
    this.isVisible = !this.isVisible
    this.isVisible ? this.passType = 'text' : this.passType = 'password'
  }
  showConfirmation() {
    this.isConVisible = !this.isConVisible
    this.isConVisible ? this.confType = 'text' : this.confType = 'password'
  }
}
