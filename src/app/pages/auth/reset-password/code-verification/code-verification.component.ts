import { OTPConfirmation } from './../../../../shared/types/otp-confirmation';
import { Component, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';
import { AuthService } from '../../services/auth.service';
import { catchError, of, tap } from 'rxjs';

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

  onSend() {
    this.resend = false
    this.isCorrect = true
    this.ngOtpInput.setValue('');
    this.timer(0.5);
    console.log('Code sent');
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

  // onVerify() {
  //   this.authService.OTPConfirmation({ "data": { "type": "user", "id": "null", "attributes": { "otp": this.code } } }).pipe(
  //     tap({
  //       next: data => console.log(data),
  //       error: (error) => {
  //         error ? this.isCorrect = false : null
  //         console.error('Error cauth in component')
  //       }
  //     }),
  //     catchError(error => {
  //       console.log("Error caught and replaced with empty string")
  //       return of([])
  //     })
  //   )
  //   // .subscribe({
  //   //   next: data => {
  //   //     this.authService.user.set(data)
  //   //     this.isCorrect = true
  //   //     this.router.navigate(['create-password'], { relativeTo: this.activatedRoute.parent })
  //   //   },
  //   //   error: (error) => {
  //   //     error? this.isCorrect = false : null
  //   //   }
  //   // })

  // }

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
