import { Component, inject } from '@angular/core';
import { StepTrackerService } from '../services/step-tracker.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-social-register',
  standalone: true,
  imports: [TranslateModule, RouterOutlet],
  templateUrl: './social-register.component.html',
  styleUrl: './social-register.component.scss'
})
export class SocialRegisterComponent {
  stepTrackerService = inject(StepTrackerService)

  step = this.stepTrackerService.step
}
