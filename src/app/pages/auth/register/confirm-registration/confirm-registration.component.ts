import { Component, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StepTrackerService } from '../../services/step-tracker.service';

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
  imports: [TranslateModule, NgOtpInputModule],
  templateUrl: './confirm-registration.component.html',
  styleUrl: './confirm-registration.component.scss'
})
export class ConfirmRegistrationComponent {
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
  secTimer!: string;
  resend = false
  isCorrect = true
  isEmpty = true
  code!: string

  authService = inject(AuthService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  stepTrackerService = inject(StepTrackerService)

  constructor() {
    this.timer(0.5);
  }

  onOtpChange(code: string) {
    code.length > 0 ? this.isEmpty = false : this.isEmpty = true
    if (code.length === 4) {
      this.code = code
      console.log(code);

    } else if (code.length <= 4) {
      this.isCorrect = true
    }
  }

  onResend() {
    const resend: OTPResend = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": {
          "identifier": this.authService.registrationEmail()
        }
      }
    }
    console.log(resend);
    this.authService.signupResendOtp(resend).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
        
      }
    })
    this.resend = false
    this.timer(0.5);
  }

  onVerify() {
    const confirmation: OTPConfirmation = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": {
          "otp": this.code
        }
      }
    }
    this.authService.singupConfOtP(confirmation).subscribe({
      next: data => {
        this.authService.registredAccountId.set(data.user.id)
        this.authService.registrationEmail.set('')
        this.next()
      },
      error: error => {
        console.log(error)
        this.isCorrect = false
      }
    })

  }

  next() {
    this.stepTrackerService.onNext()
    this.router.navigateByUrl('/auth/register/delivery-details')
  }

  timer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: string = "0";
    let statSec: number = 30;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec as any as string;

      this.secTimer = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        clearInterval(timer);
        this.resend = true
      }
    }, 1000);
  }
}
