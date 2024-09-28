import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { SimpleHeaderComponent } from '../../../../shell/components/simple-header/simple-header.component';

@Component({
  selector: 'app-register-success',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule,RouterLink],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.scss'
})
export class RegisterSuccessComponent {

}
