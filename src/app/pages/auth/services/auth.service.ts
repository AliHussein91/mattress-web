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


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authURL = END_Points.auth
  http = inject(HttpClient)
  currentUser = signal<User | undefined | null>(undefined)


  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(this.authURL.login, credentials).pipe(
      catchError(
        (err) => {
          let errMsg: Error = new Error("An unknown error occured!")
          // console.error(err.error.errors[0].title)
          switch (err.error.errors[0].title) {
            case 'there_is_no_account_with_this_email':
              errMsg.message = "The email account is not registered."
              break;

            default:
              break;
          }
          return throwError(() => { errMsg.message })
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
    return this.http.post(this.authURL.logout, {}).pipe(
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
          // switch (err.error.title);
          // ) {
          //   case value:

          //     break;

          //   default:
          //     break;
          // }
          return throwError(() => {
            return new Error('Could not log out')
          })
        })
    )
  }

  getOTP(identifier: OTPIdentifier): Observable<any> {
    return this.http.post<OTPIdentifier>(this.authURL.resetPasswordSendCode, identifier).pipe(
      catchError(
        () => {
          console.error("Error caught in auth service")
          return throwError(() => {
            return new Error('Could not post data')
          })
        })
    )
  }

  confirmOTP(otp: OTPConfirmation): Observable<any> {
    return this.http.post<OTPConfirmation>(this.authURL.resetPasswordConfirmCode, otp).pipe(
      catchError(
        () => {
          console.error("Error caught in auth service")
          return throwError(() => {
            return new Error('Could not post data')
          })
        })
    )
  }

  resetPassword(password: ResetPassword): Observable<any> {
    return this.http.post<ResetPassword>(this.authURL.resetPasswordChangePassword, password).pipe(
      catchError(
        () => {
          console.error("Error caught in auth service")
          return throwError(() => {
            return new Error('Could not post data')
          })
        })
    )
  }

  signup(user: UserRegistation): Observable<any> {
    return this.http.post<UserRegistation>(this.authURL.register, user).pipe(

    )
  }





}
