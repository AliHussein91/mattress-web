import { AuthService, ResetPasswordUser } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';
import { confirmPasswordValidator } from '../../../../shared/services/confirmation-password.validator';
import { passwordValidator } from '../../../../shared/services/password.validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent {


  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  isVisible = false
  isConVisible = false
  passType = 'password'
  confType = 'password'

  passwordForm = this.fb.nonNullable.group({
    password: ['', [Validators.required, passwordValidator()]],
    confirmation: ['', [Validators.required]]
  },
    {
      validators: confirmPasswordValidator
    })


  showPassword() {
    this.isVisible = !this.isVisible
    this.isVisible ? this.passType = 'text' : this.passType = 'password'

  }
  showConfirmation() {
    this.isConVisible = !this.isConVisible
    this.isConVisible ? this.confType = 'text' : this.confType = 'password'
  }

  onSubmit() {
    const userInfo: ResetPasswordUser = this.authService.resetPasswordUser()!
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
    console.log(this.authService.resetPasswordUser());

    this.authService.resetPassword(this.authService.resetPasswordUser()!).subscribe({ next: data => { console.log(data), this.authService.resetPasswordUser.set(null) }, error: error => console.log(error) })
    this.router.navigate(['auth', 'auth-success'], { relativeTo: this.activatedRoute.root })
  }
}
