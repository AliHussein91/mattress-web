import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SimpleHeaderComponent } from '../../../shared/components/simple-header/simple-header.component';
import { passwordValidator } from '../../../shared/services/password.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isVisible = false
  passType = 'password'

  fb = inject(FormBuilder)
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    // stayIn: [false]
  })


  onSubmit() {
    console.log(this.loginForm.getRawValue())
  }

  showPassword() {
    this.isVisible = !this.isVisible
    this.isVisible ? this.passType = 'text' : this.passType = 'password'
  }

  // Stay In Functionality Here

}
