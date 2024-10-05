import { Credentials } from './../../../shared/types/credentials';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SimpleHeaderComponent } from '../../../shared/components/simple-header/simple-header.component';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../../profile/service/profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router)
  profileService = inject(ProfileService)
  isVisible = false
  passType = 'password'

  fb = inject(FormBuilder)
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    // stayIn: [false]
  })


  onSubmit() {
    this.loginForm.markAllAsTouched()
    if (!this.loginForm.valid) return
    const credentials: Credentials = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": {
          "identifier": this.loginForm.getRawValue().email,
          "password": this.loginForm.getRawValue().password
        }
      }
    }

    this.authService.login(credentials).subscribe({
      next: res => {
        localStorage.setItem('token', res.meta.token)
        this.profileService.userProfile.set(res)
        this.authService.isSigned.set(true)
        this.router.navigateByUrl('/')
      },
      error: error => {
        console.log(error);
        this.authService.isSigned.set(false)

      }
    })
  }

  showPassword() {
    this.isVisible = !this.isVisible
    this.isVisible ? this.passType = 'text' : this.passType = 'password'
  }

  // Stay In Functionality Here

}
