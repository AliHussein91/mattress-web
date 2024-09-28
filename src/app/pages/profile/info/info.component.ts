import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarInputComponent } from '../../../shell/components/avatar-input/avatar-input.component';
import { PhoneInputComponent } from '../../../shell/components/phone-input/phone-input.component';
import { InputComponent } from '../../../shell/components/input/input.component';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TranslateModule, AvatarInputComponent, PhoneInputComponent, InputComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

}
