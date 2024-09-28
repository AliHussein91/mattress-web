import { Component } from '@angular/core';
import { HeaderComponent } from "../../shell/header/header.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [HeaderComponent, TranslateModule],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {

}
