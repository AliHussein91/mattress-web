import { AuthService } from './../services/auth.service';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { SimpleHeaderComponent } from '../../../shared/components/simple-header/simple-header.component';

@Component({
  selector: 'app-auth-success',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, RouterLink],
  templateUrl: './auth-success.component.html',
  styleUrl: './auth-success.component.scss'
})
export class AuthSuccessComponent {
  authService = inject(AuthService)
  isChangingPassword = this.authService.isChangingPassword()
}
