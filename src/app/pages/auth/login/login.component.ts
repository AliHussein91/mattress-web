import { Credentials } from './../../../shared/types/credentials';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { LogService, LogType } from '@app/shared/services/log.service';
import { OTPResend } from '../register/confirm-registration/confirm-registration.component';
import { UserProfile } from '@app/shared/types/user-profile';
import { NotificationsService } from '@app/shell/services';
import { SwalModalService } from '@app/shared/services';
import { ActionsUtilties } from '@app/shared/util';

let FB: any;
declare const google: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends ActionsUtilties implements OnInit {
  notificationsService = inject(NotificationsService);
  authService = inject(AuthService);
  #swal = inject(SwalModalService);
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
  device_token = '';
  user!: UserProfile;
  ngOnInit(): void {
    this.notificationsService.requestPermission((deviceToken: string) => {
      this.device_token = deviceToken;
    });
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
        if (this.hasAction(res, 'complete_user_data')) {
          res.meta && res.meta.message && this.#swal.watched(res.meta.message);
          this.router.navigateByUrl(`/auth/complete-info?userId=${res.id}`);
        } else {
          this.authService.isLoggedIn(res);
          localStorage.setItem('selectedCountryId', res.country_id);
          this.router.navigateByUrl('/');
        }
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
        // this.isLoading = false;
        // this.getProfile();
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

  socialLogin(token: string, provider: 'google' | 'facebook' = 'facebook') {
    this.authService.socialLogin(token, provider, this.device_token).subscribe({
      next: (data) => {
        if (!data.meta || !data.meta.token) {
          this.authService.socialUserId.set(data.id);
          this.router.navigateByUrl(`/auth/complete-info?userId=${data.id}`);
        } else {
          this.authService.loginWithSocial(data);
          this.router.navigateByUrl('/');
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        // do something
        this.getProfile();
      },
    });
  }

  signInWithGoogle() {
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        '727793797091-qeg0b7hfpbcm9qb3oihoqvo1m4orasb8.apps.googleusercontent.com',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      callback: (tokenResponse: any) => {
        this.handleGoogleResponse(tokenResponse.access_token);
      },
    });
    client.requestAccessToken();
  }

  handleGoogleResponse(response: string) {
    this.socialLogin(response, 'google');
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
            this.socialLogin(response.authResponse.accessToken);
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
