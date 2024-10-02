import { User } from './../../../shared/types/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { END_Points } from '../../../core/http/global/global-config';
import { OTPIdentifier } from '../../../shared/types/otp-identifier';
import { OTPConfirmation, UserInfo } from '../../../shared/types/otp-confirmation';
import { ResetPassword } from '../../../shared/types/reset-password';
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


  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(this.authURL.login, credentials).pipe(
      catchError(
        (err) => {
          let errMsg = "An unknown error occured!"
          // console.error(err.error.errors[0].title)
          switch (err.error.errors[0].title) {
            case 'there_is_no_account_with_this_email':
              errMsg = "The email account is not registered."
              break;
            case 'this_account_is_not_confirmed':
              errMsg = "The email account is not verified."
              break;
            case 'trying_to_login_with_invalid_password':
              errMsg = "Incorrect email or password"
              break;
            default:
              break;
          }
          return throwError(() => { new Error(errMsg) })
        })
    )
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
      ),
      catchError(
        (err) => {
          let errMsg = "An unknown error occured!"
          console.error(err.errors.title)
          switch (err.error.errors[0].title) {
            case 'unauthorized_action':
              errMsg = "User not logged in already."
              break;

            default:
              break;
          }
          return throwError(() => {
            return new Error(errMsg)
          })
        })
    )
  }

  getOTP(identifier: ResetPasswordUser): Observable<any> {
    return this.http.post<any>(this.authURL.resetPasswordSendCode, identifier).pipe(
      catchError(
        (err) => {
          let errMsg = "An unknown error occured!"
          switch (err.error.errors[0].title) {
            case 'user_not_found':
              errMsg = "User is not registered."
              break;

            default:
              break;
          }
          return throwError(() => {
            return new Error(errMsg)
          })
        })
    )
  }

  resendOTP(identifier: ResetPasswordUser): Observable<any> {
    return this.http.post<any>(this.authURL.resetPasswordSendCode, identifier).pipe(
      catchError(
        (err) => {
          let errMsg = "An unknown error occured!"
          switch (err.error.errors[0].title) {
            case 'user_not_found':
              errMsg = "User is not registered."
              break;

            default:
              break;
          }
          return throwError(() => {
            return new Error(errMsg)
          })
        })
    )
  }

  confirmOTP(otp: ResetPasswordUser): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.authURL.resetPasswordConfirmCode, otp).pipe(
      catchError(
        (err) => {
          let errMsg = "An unknown error occured!"
          switch (err.error.errors[0].title) {
            case 'user_not_found':
              errMsg = "User is not registered."
              break;

            default:
              break;
          }
          return throwError(() => {
            return new Error(errMsg)
          })
        })
    )
  }

  resetPassword(password: ResetPasswordUser): Observable<any> {
    return this.http.post<any>(this.authURL.resetPasswordChangePassword, password).pipe(
      
      catchError(
        (err) => {
          console.log(err);
          
          let errMsg = "An unknown error occured!"
          switch (err.error.errors[0].title) {
            case 'user_not_found':
              errMsg = "User is not registered."
              break;

            default:
              break;
          }
          return throwError(() => {
            return new Error(errMsg)
          })
        })
    )

  }

  signup(user: UserRegistation): Observable<any> {
    return this.http.post<UserRegistation>(this.authURL.register, user).pipe(
    )
  }





}
