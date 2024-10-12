import { Component, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';
import { AuthService, ResetPasswordUser } from '../../services/auth.service';
import { UserProfile } from '@app/shared/types/user-profile';
import { FormatterSingleton } from '@app/shared/util';


@Component({
  selector: 'app-code-verification',
  standalone: true,
  imports: [TranslateModule, SimpleHeaderComponent, NgOtpInputModule],
  templateUrl: './code-verification.component.html',
  styleUrl: './code-verification.component.scss'
})
export class CodeVerificationComponent {
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
  secTimer: string = "00:30"
  resend = false
  isCorrect = true
  isEmpty = true
  code!: string

  authService = inject(AuthService)
  formatter = FormatterSingleton.getInstance()
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  constructor() {
    this.timer();
  }

  onOtpChange(code: string) {
    code.length > 0 ? this.isEmpty = false : this.isEmpty = true
    if (code.length === 4) {
      this.code = code
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
    this.timer();
    this.isCorrect = true
    const t = setTimeout(() => {
      this.resend = false
      clearTimeout(t)
    }, 1000);
    this.ngOtpInput.setValue('');
    this.authService.resendOTP(userInfo).subscribe({
      next: data => {
        console.log(data)
      },
      error: error => console.log(error)
    })
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
      next: async data => {
        const profile: UserProfile = await this.formatter.formatData(data)
        this.authService.resetPasswordUser.set({ ...userInfo, "data": { ...userInfo.data, "attributes": { ...userInfo.data.attributes, "user_id": profile.id } } })
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

  timer() {
    let seconds: number = 30; // Start from 30 seconds
    let textSec: string = "0";
    let statSec: number = 30;
    // const prefix = minute < 10 ? "0" : "";
    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec as any as string;
      this.secTimer = `00:${textSec}`;
      if (seconds == 0) {
        clearInterval(timer);
        this.resend = true;

      }
    }, 1000);
  }
}
