import { User } from './../../../shared/types/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { END_Points } from '../../../core/http/global/global-config';
import {  UserInfo } from '../../../shared/types/user-info';
import { UserRegistation } from '../../../shared/types/user-registration';
import { Credentials } from '../../../shared/types/credentials';


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
  currentUser = signal<User | undefined | null>(undefined)
  resetPasswordUser = signal<ResetPasswordUser | null>(null)
  isChangingPassword = signal(false)


  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(this.authURL.login, credentials)
  }

  autoLogin() {
    const userData = localStorage.getItem('userData')
    if (!userData) {
      return
    }
    this.currentUser.set(JSON.parse(userData))
  }

  logout() {
    return this.http.post<LogOutObj>(this.authURL.logout, {}).pipe(
      tap(
        () => {
          this.currentUser.set(null)
          localStorage.removeItem('token')
          localStorage.removeItem('userData')
        }
      )
    )
  }

  getOTP(identifier: ResetPasswordUser): Observable<any> {
    return this.http.post<any>(this.authURL.resetPasswordSendCode, identifier)
  }

  resendOTP(identifier: ResetPasswordUser): Observable<any> {
    return this.http.post<any>(this.authURL.resetPasswordSendCode, identifier)
  }

  confirmOTP(otp: ResetPasswordUser): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.authURL.resetPasswordConfirmCode, otp)
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
