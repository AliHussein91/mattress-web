import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StepTrackerService } from '../../services/step-tracker.service';

@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, RouterLink],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.scss'
})
export class DeliveryDetailsComponent {

  fb = inject(FormBuilder)
  stepTrackerService = inject(StepTrackerService)

  addressForm = this.fb.nonNullable.group({})


  onSubmit(){
    this.next()
  }

  next(){
    this.stepTrackerService.onNext()
  }

  previous(){
    this.stepTrackerService.onPrevious()
  }
}
