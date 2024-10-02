import { Component, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';
import { AuthService, ResetPasswordUser } from '../../services/auth.service';


@Component({
  selector: 'app-code-verification',
  standalone: true,
  imports: [TranslateModule, SimpleHeaderComponent, NgOtpInputModule],
  templateUrl: './code-verification.component.html',
  styleUrl: './code-verification.component.scss'
})
export class CodeVerificationComponent {
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
  secTimer!: string;
  resend = false
  isCorrect = true
  isEmpty = true
  code!: string

  authService = inject(AuthService)

  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

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
    const userInfo: ResetPasswordUser = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": { "identifier": this.authService.resetPasswordUser()!.data.attributes.identifier }
      }
    }
    this.resend = false
    this.isCorrect = true
    this.ngOtpInput.setValue('');
    this.authService.resendOTP(userInfo).subscribe({
      next: data => {
        console.log(data)
      },
      error: error => console.log(error)
    })
    this.timer(0.5);
  }

  onVerify() {
    const userInfo: ResetPasswordUser = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": { "otp": this.code }
      }
    }

    this.authService.confirmOTP(userInfo).subscribe({
      next: data => {
        this.authService.resetPasswordUser.set({ ...userInfo, "data": {...userInfo.data, "attributes": { ...userInfo.data.attributes, "user_id": data.data.id } } })
        console.log(this.authService.resetPasswordUser());

        this.isCorrect = true
        this.router.navigate(['create-password'], { relativeTo: this.activatedRoute.parent })
      },
      error: error => {
        console.log(error)
        this.isCorrect = false
      }
    })
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
