import { Component, inject } from '@angular/core';
import { SimpleHeaderComponent } from "../../../../../shell/components/simple-header/simple-header.component";
import { TranslateModule } from '@ngx-translate/core';
import { passwordValidator } from '../../../validators/password.validator';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../validators/confirmation-password.validator';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent {


  fb = inject(FormBuilder)

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
}
