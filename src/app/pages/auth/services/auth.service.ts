import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { END_Points } from '../../../core/http/global/global-config';
import { Credentials } from '../../../shared/types/credentials';
import { Token } from '../../../shared/types/Token';
import { UserProfile } from '@app/shared/types/user-profile';
import { RegisterUser } from '../register/personal-detail/personal-detail.component';
import { OTPConfirmation, OTPResend } from '../register/confirm-registration/confirm-registration.component';
import { Address } from '@app/shared/types/address';


interface LogOutObj {
  "meta": {
    "message": string
  }
}

export interface AddressApiResponse {
  included: AddressApiResponseItem[];
}

export interface AddressApiResponseItem {
  type: string;
  id: string;
  attributes?: ApiAttributes; // Optional attributes based on type
  relationships?: ApiRelationships; // Optional relationships based on type
}

interface ApiAttributes {
  endpoint_url?: string;
  method?: string;
  label?: string;
  bg_color?: string;
  key?: string;
  address?: string;
  mobile_number?: string;
  name?: string;
  country_code?: string;
  flag?: string;
}

interface ApiRelationships {
  actions?: {
    data: AddressApiResponseItem[];
  };
}

export interface ResetPasswordUser {
  "data": {
    "type": "user",
    "id": "null",
    "attributes": {
      "identifier"?: string
      "otp"?: string
      "user_id"?: string,
      "password"?: string,
      "password_confirmation"?: string
    }
  }
}

export interface confirmationRes {
  "user": {
    "id": number,
    "mobile_number": string,
  }
}

export interface SocialLoginObj {
  "data": {
    "type": "user",
    "id": "null",
    "attributes": {
      "provider": 'google' | 'facebook' | string,
      "token": string,
      "device_token": string,
      "device_type": string
    }
  }
}

export interface SocialUserDataObj {
  "data": {
    "type": "user",
    "id": "null",
    "attributes": {
      "mobile_number": string,
      "country_id": number,
      "lat": string,
      "lng": string,
      "user_id": number,
      "device_token": string,
      "device_type": string
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authURL = END_Points.auth
  http = inject(HttpClient)
  isSigned = signal<boolean>(false)
  loggedUser = signal<Token | null>(null)
  resetPasswordUser = signal<ResetPasswordUser | null>(null)
  isChangingPassword = signal(false)
  registrationEmail = signal('')
  registredAccount = signal<confirmationRes | null>(null)
  socialUserDetails = signal<{id: number, phone: string} | null>(null)


  login(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(this.authURL.login, credentials)
  }

  autoLogin() {
    if (localStorage.getItem('token') === null) {
      return
    }
    this.isSigned.set(true)
  }

  logout() {
    return this.http.post<LogOutObj>(this.authURL.logout, {})
  }

  getOTP(identifier: ResetPasswordUser): Observable<any> {
    return this.http.post<any>(this.authURL.resetPasswordSendCode, identifier)
  }

  resendOTP(identifier: ResetPasswordUser): Observable<any> {
    return this.http.post<any>(this.authURL.resetPasswordSendCode, identifier)
  }

  confirmOTP(otp: ResetPasswordUser): Observable<any> {
    return this.http.post<any>(this.authURL.resetPasswordConfirmCode, otp)
  }

  resetPassword(password: ResetPasswordUser): Observable<any> {
    this.isChangingPassword.set(true)
    return this.http.post<any>(this.authURL.resetPasswordChangePassword, password)

  }

  signup(user: RegisterUser): Observable<any> {
    this.isChangingPassword.set(false)
    return this.http.post(this.authURL.register, user)
  }

  singupConfOtp(confirmation: OTPConfirmation): Observable<confirmationRes> {
    return this.http.post<confirmationRes>(this.authURL.registerConirmOTP, confirmation)
  }

  signupResendOtp(resend: OTPResend) {
    return this.http.post(this.authURL.registerResendOTP, resend)
  }

  signupAddAddress(address: { data: Address }): Observable<AddressApiResponse> {
    return this.http.post<AddressApiResponse>(this.authURL.addAddress, address)
  }

  socialLogin(socialLoginObj: SocialLoginObj): Observable<any> {
    return this.http.post<any>(this.authURL.socialLogin, socialLoginObj)
  }

  completeSocialUserData(socialUserData: SocialUserDataObj): Observable<any> {
    return this.http.post<any>(this.authURL.completeSocialUserData, socialUserData)
  }

  isLoggedIn(profile: Token) {
    localStorage.setItem('token', profile.meta.token)
    this.loggedUser.set(profile)
    this.isSigned.set(true)
  }
  isLoggedOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('addresses')
    localStorage.removeItem('profile')
    this.loggedUser.set(null)
    this.isSigned.set(false)
  }
}
