import { SocialLoginObj } from './../services/auth.service';
import { Credentials } from './../../../shared/types/credentials';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SimpleHeaderComponent } from '../../../shared/components/simple-header/simple-header.component';
import { AuthService, ResetPasswordUser } from '../services/auth.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { SocialAuthService, GoogleSigninButtonModule, FacebookLoginProvider, GoogleLoginProvider, } from '@abacritt/angularx-social-login';
import { LogService, LogType } from '@app/shared/services/log.service';
import { OTPResend } from '../register/confirm-registration/confirm-registration.component';

let FB:any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule, RouterLink, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  

  // Injectables
  authService = inject(AuthService)
  socialAuthService = inject(SocialAuthService)
  router = inject(Router)
  profileService = inject(ProfileService)
  fb = inject(FormBuilder)
  logger = inject(LogService)
  // Password Visibility
  isVisible = false
  passType = 'password'
  // Loader
  isLoading: boolean = false
  // Form
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })
  busyFacebookLogin = false;
  token = "";
  facebookLogin() {
    try {
      console.log(FB)
      //@ts-ignore
      FB.login(
        (response: any) => {
    
          if (response.authResponse) {
      
            this.busyFacebookLogin = true
  
            //@ts-ignore
            FB.api("/me", (response) => {
              console.log("Good to see you, " + response.name + ".");
              console.log(response);
              this.router.navigateByUrl('/register-social')
            });
          } else {
            // User canceled the login or did not fully authorize
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "email" }
      ); // Add any additional permissions your app requires
    } catch (error) {
      console.error("🚀 ~ file: LoginForm.vue:192 ~ facebookLogin ~ error", error)
    }
  
  }
  

  signInWithFB(): void {
    console.log('clicked');
    this.busyFacebookLogin = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      console.log("🚀 ~ LoginComponent ~ this.socialAuthService.signIn ~ res:", res)
      this.socialLogin(res.authToken)

      this.busyFacebookLogin = false;
    }).catch((error) => {
      this.busyFacebookLogin = false;
      console.error("🚀 ~ LoginComponent ~ this.socialAuthService.signIn ~ error:", error)
      
    });
  }
  refreshGoogleToken(): void {
    try {
  this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then((res) => {
    console.log("🚀 ~ LoginComponent ~ this.socialAuthService.refreshAuthToken ~ res:", res)
    
  });
      
    } catch (error) {
      console.error("🚀 ~ LoginComponent ~ refreshGoogleToken ~ error:", error)
    }
  }

  // Form submission call
  onSubmit() {
    // Test form validity
    this.loginForm.markAllAsTouched()
    if (!this.loginForm.valid) return
    // Initiate Loader
    this.isLoading = true
    // Create login obj
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
    // Call the login endpoint
    this.login(credentials)
  }

  // Calling login Endpoint from AuthService
  login(credentials: Credentials) {
    this.authService.login(credentials).subscribe({
      next: res => {
        this.authService.isLoggedIn(res)
        this.router.navigateByUrl('/')
      },
      error: error => {
        this.authService.isLoggedOut()
        this.isLoading = false;
        this.confirmAccount(error.error.errors[0].title, this.loginForm.getRawValue().email)
        error && error.error && this.logger.showSuccess(LogType.error, error.error.errors[0].detail, error.error.errors[0].detail)
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  // Show and hide password toggle
  showPassword() {
    this.isVisible = !this.isVisible
    this.isVisible ? this.passType = 'text' : this.passType = 'password'
  }

  confirmAccount(error: string, email: string) {
    localStorage.setItem('confirmationEmail', email)
    const resendObj: OTPResend = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": {
          "identifier": email
        }
      }
    }
    if (error == "this_account_is_not_confirmed") {
      this.authService.signupResendOtp(resendObj).subscribe({
        next: () => { this.router.navigateByUrl('/auth/confirm-account') },
        error: (error) => { this.logger.showSuccess(LogType.error, error.error.errors[0].detail, error.error.errors[0].detail) }
      })
    }
  }

  ngOnInit(): void {
  }
  socialLogin(token:string){
    this.authService.socialLogin(token).subscribe({
      next: (data) => {
        // do something
        // If new user, save the id returned from API to AuthService
        // this.authService.socialUserId.set('THE_RETURNED_ID')
        // Then navigate to /Register-social
        this.router.navigateByUrl('/register-social')
        // else if existing user navigate to home /
        this.router.navigateByUrl('/')
      },
      error: (error) => {
        // do something
      },
      complete: () => {
        // do something
      }
    })
  }
}
