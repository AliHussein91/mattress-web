import { SocialLoginObj } from './../services/auth.service';
import { Credentials } from './../../../shared/types/credentials';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SimpleHeaderComponent } from '../../../shared/components/simple-header/simple-header.component';
import { AuthService, ResetPasswordUser } from '../services/auth.service';
import { ProfileService } from '../../../shared/services/profile.service';
import {
  SocialAuthService,
  GoogleSigninButtonModule,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { LogService, LogType } from '@app/shared/services/log.service';
import { OTPResend } from '../register/confirm-registration/confirm-registration.component';
import { UserProfile } from '@app/shared/types/user-profile';

let FB: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SimpleHeaderComponent,
    TranslateModule,
    ReactiveFormsModule,
    RouterLink,
    GoogleSigninButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  // Injectables
  authService = inject(AuthService);
  socialAuthService = inject(SocialAuthService);
  router = inject(Router);
  profileService = inject(ProfileService);
  fb = inject(FormBuilder);
  logger = inject(LogService);
  // Password Visibility
  isVisible = false;
  passType = 'password';
  // Loader
  isLoading: boolean = false;
  // Form
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  busyFacebookLogin = false;
  token = '';
  user!: UserProfile;
  facebookLogin() {
    try {
      console.log(FB);
      //@ts-ignore
      FB.login(
        (response: any) => {
          if (response.authResponse) {
            this.busyFacebookLogin = true;

            //@ts-ignore
            FB.api('/me', (response) => {
              console.log('Good to see you, ' + response.name + '.');
              console.log(response);
              this.router.navigateByUrl('/register-social');
            });
          } else {
            // User canceled the login or did not fully authorize
            console.log('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'email' },
      ); // Add any additional permissions your app requires
    } catch (error) {
      console.error(
        '🚀 ~ file: LoginForm.vue:192 ~ facebookLogin ~ error',
        error,
      );
    }
  }
  handleGoogleToken(token: any) {
    console.log('🚀 ~ LoginComponent ~ handleGoogleToken ~ token:', token);
    this.authService.socialLogin(token).subscribe({
      next: (data) => {
        console.log('Login successful:', data);
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  handleGoogleError(error: any) {
    console.error('Google login error:', error);
  }
  //sign in with google
  // signInWithGoogle(): void {
  //   console.log('a7aaaaaaaaaaaaaaaaa');
  //   this.socialAuthService
  //     .signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then((res) => {
  //       console.log(
  //         '🚀 ~ LoginComponent ~ this.socialAuthService.signIn ~ res:',
  //         res,
  //       );
  //       this.socialLogin(res.idToken);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         '🚀 ~ LoginComponent ~ this.socialAuthService.signIn ~ error:',
  //         error,
  //       );
  //     });
  // }

  // signInWithFB(): void {
  //   console.log('clicked');
  //   this.busyFacebookLogin = true;
  //   this.socialAuthService
  //     .signIn(FacebookLoginProvider.PROVIDER_ID)
  //     .then((res) => {
  //       console.log(
  //         '🚀 ~ LoginComponent ~ this.socialAuthService.signIn ~ res:',
  //         res,
  //       );
  //       this.socialLogin(res.authToken);

  //       this.busyFacebookLogin = false;
  //     })
  //     .catch((error) => {
  //       this.busyFacebookLogin = false;
  //       console.error(
  //         '🚀 ~ LoginComponent ~ this.socialAuthService.signIn ~ error:',
  //         error,
  //       );
  //     });
  // }
  refreshGoogleToken(): void {
    try {
      this.socialAuthService
        .refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
        .then((res) => {
          console.log(
            '🚀 ~ LoginComponent ~ this.socialAuthService.refreshAuthToken ~ res:',
            res,
          );
        });
    } catch (error) {
      console.error('🚀 ~ LoginComponent ~ refreshGoogleToken ~ error:', error);
    }
  }

  // Form submission call
  onSubmit() {
    // Test form validity
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) return;
    // Initiate Loader
    this.isLoading = true;
    // Create login obj
    const credentials: Credentials = {
      data: {
        type: 'user',
        id: 'null',
        attributes: {
          identifier: this.loginForm.getRawValue().email,
          password: this.loginForm.getRawValue().password,
        },
      },
    };
    // Call the login endpoint
    this.login(credentials);
  }

  getProfile() {
    this.isLoading = true;
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.profileService.userProfile.set(data);
        localStorage.setItem('profile', JSON.stringify(this.user));
        localStorage.setItem('selectedCountryId', String(this.user.country_id));
        this.isLoading = false;
      },
      error: (error) => {
        this.logger.showSuccess(
          LogType.error,
          error.error.errors[0].title,
          error.error.errors[0].detail,
        );
      },
    });
  }

  // Calling login Endpoint from AuthService
  login(credentials: Credentials) {
    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        this.authService.isLoggedIn(res);
        localStorage.setItem('selectedCountryId', res.country_id);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.authService.isLoggedOut();
        this.isLoading = false;
        this.confirmAccount(
          error.error.errors[0].title,
          this.loginForm.getRawValue().email,
        );
        error &&
          error.error &&
          this.logger.showSuccess(
            LogType.error,
            error.error.errors[0].detail,
            error.error.errors[0].detail,
          );
      },
      complete: () => {
        this.isLoading = false;
        this.getProfile();
      },
    });
  }

  // Show and hide password toggle
  showPassword() {
    this.isVisible = !this.isVisible;
    this.isVisible ? (this.passType = 'text') : (this.passType = 'password');
  }

  confirmAccount(error: string, email: string) {
    localStorage.setItem('confirmationEmail', email);
    const resendObj: OTPResend = {
      data: {
        type: 'user',
        id: 'null',
        attributes: {
          identifier: email,
        },
      },
    };
    if (error == 'this_account_is_not_confirmed') {
      this.authService.signupResendOtp(resendObj).subscribe({
        next: () => {
          this.router.navigateByUrl('/auth/confirm-account');
        },
        error: (error) => {
          this.logger.showSuccess(
            LogType.error,
            error.error.errors[0].detail,
            error.error.errors[0].detail,
          );
        },
      });
    }
  }

  ngOnInit(): void {}
  socialLogin(token: string) {
    this.authService.socialLogin(token).subscribe({
      next: (data) => {
        if (data.phone_number == '' || !data.phone_number) {
          this.authService.socialUserId.set(data.id);
          this.router.navigateByUrl('/register-social');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        // do something
      },
    });
  }

  signInWithGoogle() {
    this.isLoading = true;

    // Check if Google SDK is loaded
    if (typeof window.google !== 'undefined') {
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id:
          '727793797091-qeg0b7hfpbcm9qb3oihoqvo1m4orasb8.apps.googleusercontent.com', // Replace with your actual client ID
        callback: this.handleGoogleResponse.bind(this),
      });
      // @ts-ignore
      window.google.accounts.id.prompt();
    } else {
      console.error('Google SDK not loaded');
      this.isLoading = false;
    }
  }

  handleGoogleResponse(response: any) {
    console.log('Google login response:', response);
    this.isLoading = false;
    // Handle Google login success
    // Decode the JWT token and process user data
    // this.router.navigate(['/dashboard']);
  }

  signInWithFacebook() {
    this.isLoading = true;
    // Check if Facebook SDK is loaded
    // @ts-ignore
    if (typeof window.FB !== 'undefined') {
      // @ts-ignore
      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            console.log('Facebook login successful:', response);
            // Handle successful Facebook login
            // this.router.navigate(['/dashboard']);
          } else {
            console.log('Facebook login failed');
          }
          this.isLoading = false;
        },
        { scope: 'email,public_profile' },
      );
    } else {
      console.error('Facebook SDK not loaded');
      this.isLoading = false;
    }
  }
}
