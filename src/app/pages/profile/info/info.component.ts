import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarInputComponent } from '../../../shared/components/avatar-input/avatar-input.component';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RouterLink } from '@angular/router';
import { CountriesService } from '../../../shared/services/countries.service';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../profile';



@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TranslateModule, RouterLink, AvatarInputComponent, PhoneInputComponent, InputComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {

  flag!: any
  user!: Profile
  profileService = inject(ProfileService)

  countryService = inject(CountriesService)
  ngOnInit(): void {
    // this.profileService.getProfile().subscribe({
    //   next: profile => {
    //     console.log(profile);
    //     this.user = profile

    //     const len: number = this.user.included.length - 1
    //     this.flag = this.user.included[len].attributes.name
    //   },
    //   error: error => console.log(error)

    // })
    // console.log(this.user);

  }
}
