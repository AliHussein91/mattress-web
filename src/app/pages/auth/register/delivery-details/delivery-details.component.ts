import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StepTrackerService } from '../../services/step-tracker.service';
import { InputComponent } from "../../../../shared/components/input/input.component";


export interface DeliveryAddress {
  "data": {
    "type": "new address",
    "id": null,
    "attributes": {
        "user_id": number,
        "address": string,
        "mobile_number":string
    }
  }
}

@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, RouterLink, InputComponent],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.scss'
})
export class DeliveryDetailsComponent {

  fb = inject(FormBuilder)
  stepTrackerService = inject(StepTrackerService)
  items = []

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
