import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { END_Points } from '../../../core/http/global/global-config';
import { UserRegistation } from '../../../shared/types/user-registration';
import { Credentials } from '../../../shared/types/credentials';
import { Token } from '../../../shared/types/Token';
import { UserProfile } from '@app/shared/types/user-profile';


interface LogOutObj {
  "meta": {
    "message": string
  }
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authURL = END_Points.auth
  http = inject(HttpClient)
  isSigned = signal<boolean>(false)
  resetPasswordUser = signal<ResetPasswordUser | null>(null)
  isChangingPassword = signal(false)


  login(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(this.authURL.login, credentials)
  }

  autoLogin() {
    const token = localStorage.getItem('token')
    if (!token) {
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

  confirmOTP(otp: ResetPasswordUser):Observable<UserProfile> {
    return this.http.post<UserProfile>(this.authURL.resetPasswordConfirmCode, otp)
  }

  resetPassword(password: ResetPasswordUser): Observable<any> {
    this.isChangingPassword.set(true)
    return this.http.post<any>(this.authURL.resetPasswordChangePassword, password)

  }

  signup(user: UserRegistation): Observable<any> {
    this.isChangingPassword.set(false)
    return this.http.post<UserRegistation>(this.authURL.register, user)
  }





}
