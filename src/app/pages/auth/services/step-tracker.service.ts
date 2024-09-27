import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepTrackerService {

  step = signal(1)

  onNext() {
    this.step() < 3 ? this.step.update(value => value + 1) : null
  }

  onPrevious() {
    this.step() > 1 ? this.step.update(value => value - 1) : null
  }
}
