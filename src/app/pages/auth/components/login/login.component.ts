import { Component, inject } from '@angular/core';
import { SimpleHeaderComponent } from "../../../../shell/components/simple-header/simple-header.component";
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordValidator } from '../../validators/password.validator';

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
    password: ['', [Validators.required,passwordValidator()]],
    // stayIn: [false]
  })


  onSubmit() {
    console.log(this.loginForm.getRawValue())
  }

  showPassword() {
    this.isVisible = !this.isVisible
    this.isVisible? this.passType = 'text' : this.passType = 'password'
  }
  
  // Stay In Functionality Here

}
