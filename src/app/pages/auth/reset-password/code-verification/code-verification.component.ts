import { Component, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';
import { AuthService, ResetPasswordUser } from '../../services/auth.service';
import { FormatterSingleton } from '@app/shared/util';
import { TimerComponent } from "../../../../shared/components/timer/timer.component";
import { LogService, LogType } from '@app/shared/services/log.service';


@Component({
  selector: 'app-code-verification',
  standalone: true,
  imports: [TranslateModule, SimpleHeaderComponent, NgOtpInputModule, TimerComponent],
  templateUrl: './code-verification.component.html',
  styleUrl: './code-verification.component.scss'
})
export class CodeVerificationComponent {
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
        this.logger.showSuccess(LogType.error, error.error.errors[0].title, error.error.errors[0].detail)
      }
    })
  }
  // Verify the OTP
  onVerify() {
    // Create confirm obj
    const confirmationObj: ResetPasswordUser = {
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
  confOTP(confirmationObj: ResetPasswordUser) {
    this.authService.confirmOTP(confirmationObj).subscribe({
      next: data => {
        this.isCorrect = true
        this.authService.resetPasswordUser.set({ ...confirmationObj, "data": { ...confirmationObj.data, "attributes": { ...confirmationObj.data.attributes, "user_id": data.data.id } } })
        this.router.navigate(['create-password'], { relativeTo: this.activatedRoute.parent })
      },
      error: error => {
        this.isCorrect = false
        this.logger.showSuccess(LogType.error, error.error.errors[0].title, error.error.errors[0].detail)
      }
    })
  }
  // Show and hide the resend button toggle
  showResend(status: boolean) {
    this.resend = status
  }
  // Get registeration email
  getEmail() {
    let email: string
    if (localStorage.getItem('identifier') !== null) {
      email = localStorage.getItem('identifier')!
    } else {
      email = this.authService.resetPasswordUser()!.data.attributes.identifier!
    }
    return email
  }
}
