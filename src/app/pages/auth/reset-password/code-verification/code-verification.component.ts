import { Component, inject, OnInit, afterNextRender, signal, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleHeaderComponent } from "../../../../shell/components/simple-header/simple-header.component";
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { ActivatedRoute, Router } from '@angular/router';

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

  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  constructor() {
    this.timer(0.5);
  }

  onSend() {
    this.resend = false
    this.isCorrect = true
    this.ngOtpInput.setValue('');
    this.timer(0.5);
    console.log('Code sent');
  }

  onOtpChange(code: string) {
    code.length > 0 ? this.isEmpty = false : this.isEmpty = true
    if (code.length === 6) {
      this.code = code
      console.log(code);
      
    } else if (code.length <= 6) {
      this.isCorrect = true
    }
  }

  onVerify() {
    if (this.code != '123456') {
      this.isCorrect = false
    } else {
      this.isCorrect = true
      this.router.navigate(['create-password'], { relativeTo: this.activatedRoute.parent })
    }
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
