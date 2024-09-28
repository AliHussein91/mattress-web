import { Component, inject, OnInit } from '@angular/core';
import { SimpleHeaderComponent } from "../../../../shell/components/simple-header/simple-header.component";
import { TranslateModule } from '@ngx-translate/core';
import { AvatarInputComponent } from "../shared/avatar-input/avatar-input.component";
import { InputComponent } from "../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { PhoneInputComponent } from "../shared/phone-input/phone-input.component";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, AvatarInputComponent, InputComponent, RouterLink, ReactiveFormsModule, PhoneInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  fb = inject(FormBuilder)
  countryService = inject(CountriesService)

  step: number = 1
  countryCode!: string
  countriesOptions = this.countryService.countries.map(({ english_name }) => english_name)

  ngOnInit(): void {
    // this.clientLocation = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]
  }


}

