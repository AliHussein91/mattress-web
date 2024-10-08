import { Credentials } from './../../../shared/types/credentials';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SimpleHeaderComponent } from '../../../shared/components/simple-header/simple-header.component';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { SocialAuthService, GoogleSigninButtonModule, FacebookLoginProvider, GoogleLoginProvider, } from '@abacritt/angularx-social-login';
import { FormatterService } from '@app/shared/services/formatter.service';
import { FormatterSingleton } from '@app/shared/util';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule, RouterLink, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  authService = inject(AuthService)
  formatter = FormatterSingleton.getInstance()
  socialAuthService = inject(SocialAuthService)
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

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user)
      //perform further logics
    });
  }


  // signInWithFB(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  refreshGoogleToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

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
      next: async res => {
        localStorage.setItem('token', res.meta.token)
        const addresses = res.included.filter(item => item.type == 'address')
        localStorage.setItem('addresses', JSON.stringify(addresses))
        this.authService.isSigned.set(true)
        this.router.navigateByUrl('/profile')
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
