import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarInputComponent } from '../../../shared/components/avatar-input/avatar-input.component';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RouterLink } from '@angular/router';
import { User } from '../../../shared/types/user';
import { CountriesService } from '../../../shared/services/countries.service';
import { Country } from '../../../shared/types/country';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TranslateModule, RouterLink, AvatarInputComponent, PhoneInputComponent, InputComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {

  flag!: string
  @Input() user: User = {
    first: 'Ali',
    last: 'Hussein',
    email: 'ali.hussein@live.com',
    phone: '+20 1003390002',
    country: 'egypt'
  }

  countryService = inject(CountriesService)
  ngOnInit(): void {
    this.flag = this.countryService.countries.filter(country => country.english_name.toLowerCase() == this.user.country.toLowerCase())[0].url
  }
}
