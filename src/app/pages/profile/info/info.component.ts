import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarInputComponent } from '../../../shared/components/avatar-input/avatar-input.component';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { CountriesService } from '../../../shared/services/countries.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { UserProfile } from '../../../shared/types/user-profile';
import { AuthService } from '@app/pages/auth/services/auth.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TranslateModule, RouterLink, AvatarInputComponent, PhoneInputComponent, InputComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {

  flag!: any
  user!: UserProfile
  profileService = inject(ProfileService)
  authService = inject(AuthService)
  routerService = inject(Router)

  countryService = inject(CountriesService)
  ngOnInit(): void {
    if (localStorage.getItem('profile')) {
      const profile = localStorage.getItem('profile')
      this.user = JSON.parse(profile!)
    } else {
      this.authService.isSigned.set(false)
      this.routerService.navigateByUrl('/auth/login')
      localStorage.removeItem('token')
    }

  }
}
