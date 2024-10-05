import { AuthService } from './../../auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarInputComponent } from '../../../shared/components/avatar-input/avatar-input.component';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RouterLink } from '@angular/router';
import { User } from '../../../shared/types/user';
import { CountriesService } from '../../../shared/services/countries.service';



@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TranslateModule, RouterLink, AvatarInputComponent, PhoneInputComponent, InputComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {

  flag!: string
  user!: User
  authService = inject(AuthService)

  countryService = inject(CountriesService)
  ngOnInit(): void {
    const user = localStorage.getItem('userData')
    if (!user) return
    this.user = JSON.parse(user)
    this.flag = this.countryService.countries.filter(country => country.english_name.toLowerCase() == this.user.included[0].attributes.name.toLowerCase())[0].url
  }
}
