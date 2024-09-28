import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SimpleHeaderComponent } from '../../../shell/components/simple-header/simple-header.component';
import { StepTrackerService } from '../services/step-tracker.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, RouterLink, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  stepTrackerService = inject(StepTrackerService)
  
  step = this.stepTrackerService.step


}

