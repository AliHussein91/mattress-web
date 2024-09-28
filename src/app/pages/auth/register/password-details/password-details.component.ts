import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { confirmPasswordValidator } from '../../../../shell/services/confirmation-password.validator';
import { passwordValidator } from '../../../../shell/services/password.validator';
import { StepTrackerService } from '../../services/step-tracker.service';


@Component({
  selector: 'app-password-details',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, TranslateModule],
  templateUrl: './password-details.component.html',
  styleUrl: './password-details.component.scss'
})
export class PasswordDetailsComponent {
  fb = inject(FormBuilder)
  stepTrackerService = inject(StepTrackerService)
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
    console.log(this.passwordForm.getRawValue().password);
  }

  previous(){
    this.stepTrackerService.onPrevious()
  }

}
