import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {
  @Output() status = new EventEmitter<boolean>()
  @Input({ required: true }) seconds: number = 30
  timer: any

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds--
      if (this.seconds === 0){
         clearInterval(this.timer)
          this.status.emit(true)
        }
    }, 1000);
  }

  formatTimer() {
    const minutes: number = Math.floor(this.seconds / 60)
    const remainingSeconds: number = this.seconds % 60

    const formattedMinutes: string = this.padNumber(minutes)
    const formattedSedonds: string = this.padNumber(remainingSeconds)

    return `${formattedMinutes}:${formattedSedonds}`
  }

  padNumber(number: number) {
    return (number < 10)? `0${number}`:`${number}`
  }

  ngOnInit(): void {
    this.startTimer()
  }
}
