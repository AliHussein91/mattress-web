import { Component, inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogService, LogType } from '@app/shared/services/log.service';
import { FormatterSingleton } from '@app/shared/util';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { AuthService, ResetPasswordUser } from '../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { TimerComponent } from "../../../shared/components/timer/timer.component";
import { OTPConfirmation } from '../register/confirm-registration/confirm-registration.component';

@Component({
  selector: 'app-confirm-account',
  standalone: true,
  imports: [TranslateModule, TimerComponent, NgOtpInputModule],
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.scss'
})
export class ConfirmAccountComponent {
  // Injectables
  authService = inject(AuthService)
  formatter = FormatterSingleton.getInstance()
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  logger = inject(LogService)
  // View controls
  resend = false
  isCorrect = true
  isEmpty = true
  // OTP code value
  code!: string
  // Child element accessor
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
  // Tracking OTP input value change
  onOtpChange(code: string) {
    code.length > 0 ? this.isEmpty = false : this.isEmpty = true
    if (code.length === 4) {
      this.code = code
    } else if (code.length <= 4) {
      this.isCorrect = true
    }
  }
  // Resend a new OTP
  onResend() {
    // Reset status and timer
    this.isCorrect = true
    this.resend = false
    // Clear input value
    this.ngOtpInput.setValue('');
    // Create resend obj
    const resendObj: ResetPasswordUser = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": {
          "identifier": this.getEmail()
        }
      }
    }
    // Call the resendOTP endpoint
    this.resendOTP(resendObj)
  }
  // Calling resendOTP from AuthService
  resendOTP(resendObj: ResetPasswordUser) {
    this.authService.resendOTP(resendObj).subscribe({
      error: error => {
        console.log(error);
        this.logger.showSuccess(LogType.error, error.error.errors[0].detail, error.error.errors[0].detail)
      }
    })
  }
  // Verify the OTP
  onVerify() {
    // Create confirm obj
    const confirmationObj: OTPConfirmation = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": { "otp": this.code }
      }
    }
    // Calling the confirm OTP from AuthService
    this.confOTP(confirmationObj)

  }
  // Calling the confirm OTP from AuthService
  confOTP(confirmationObj: OTPConfirmation) {
    this.authService.singupConfOtp(confirmationObj).subscribe({
      next: data => {
        this.isCorrect = true
        this.router.navigateByUrl('/auth/login')
      },
      error: error => {
        this.isCorrect = false
        this.logger.showSuccess(LogType.error, error.error.errors[0].detail, error.error.errors[0].detail)
      }
    })
  }
  // Show and hide the resend button toggle
  showResend(status: boolean) {
    this.resend = status
  }
  // Get registeration email
  getEmail() {
    if (localStorage.getItem('confirmationEmail') !== null) {
      return localStorage.getItem('confirmationEmail')!
    } else {
      this.router.navigateByUrl('/auth/login')
      return
    }
  }
}
