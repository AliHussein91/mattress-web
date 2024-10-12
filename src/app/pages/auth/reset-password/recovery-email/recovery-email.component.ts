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

  fb = inject(FormBuilder)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  isLoading: boolean = false
  passRecoveryForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  })
  authService = inject(AuthService);

  onSubmit() {
    this.passRecoveryForm.markAllAsTouched()
    if (!this.passRecoveryForm.valid) return
    this.isLoading = true
    const userInfo: ResetPasswordUser = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": { "identifier": this.passRecoveryForm.getRawValue().email }
      }
    }
    this.authService.getOTP(userInfo).subscribe({
      next: data => {
        console.log(data)
        this.authService.resetPasswordUser.set(userInfo)
        this.router.navigate(['verification'], { relativeTo: this.activatedRoute })
      },
      error: error => console.log(error)
    })
  }

}
