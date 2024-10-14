import { Component, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StepTrackerService } from '../../services/step-tracker.service';
import { TimerComponent } from "../../../../shared/components/timer/timer.component";

export interface OTPConfirmation {
  "data": {
    "type": "user",
    "id": "null",
    "attributes": {
      "otp": string
    }
  }
}

export interface OTPResend {
  "data": {
    "type": "user",
    "id": "null",
    "attributes": {
      "identifier": string
    }
  }
}

@Component({
  selector: 'app-confirm-registration',
  standalone: true,
  imports: [TranslateModule, NgOtpInputModule, TimerComponent],
  templateUrl: './confirm-registration.component.html',
  styleUrl: './confirm-registration.component.scss'
})
export class ConfirmRegistrationComponent {
  // Injectables
  authService = inject(AuthService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  stepTrackerService = inject(StepTrackerService)
  // Child element accessor
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
  // View controls
  resend = false
  isCorrect = true
  isEmpty = true
  // Loader
  isLoading: boolean = false
  // OTP code value
  code!: string

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
    const resendObj: OTPResend = {
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
  resendOTP(resendObj: OTPResend) {
    this.authService.signupResendOtp(resendObj).subscribe({
      error: error => {
        console.log(error);
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
        "attributes": {
          "otp": this.code
        }
      }
    }
    // Calling the confirm OTP from AuthService
    this.confOTP(confirmationObj)
  }

  // Calling the confirm OTP from AuthService
  confOTP(confirmationObj: OTPConfirmation) {
    this.authService.singupConfOtp(confirmationObj).subscribe({
      next: data => {
        this.authService.registredAccount.set(data)
        this.authService.registrationEmail.set('')
        localStorage.removeItem('registrationEmail')
        this.next()
      },
      error: error => {
        console.log(error)
        this.isCorrect = false
      }
    })
  }

  // Updating the register navigation and navigating to next screen
  next() {
    this.stepTrackerService.onNext()
    this.router.navigateByUrl('/auth/register/delivery-details')
  }

  // Show and hide the resend button toggle
  showResend(status: boolean) {
    this.resend = status
  }

  // Get registeration email
  getEmail() {
    let email: string
    if (localStorage.getItem('registrationEmail') !== null) {
      email = localStorage.getItem('registrationEmail')!
    } else {
      email = this.authService.registrationEmail()
    }
    return email
  }

}
