import { Component } from '@angular/core';
import { SimpleHeaderComponent } from "../../../../../shell/components/simple-header/simple-header.component";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-success',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule,RouterLink],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.scss'
})
export class RegisterSuccessComponent {

}
