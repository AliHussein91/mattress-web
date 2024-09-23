import { LocalizeService } from './../../../shell/services/localize.service';
import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { SimpleHeaderComponent } from "../../../shell/components/simple-header/simple-header.component";
import { TranslateModule } from '@ngx-translate/core';
import { AvatarInputComponent } from "../shared/avatar-input/avatar-input.component";
import { InputComponent } from "../shared/input/input.component";
import { CountriesService } from '../services/countries.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, AvatarInputComponent, InputComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {


  step: number = 1
  countryService = inject(CountriesService)
  localizeService = inject(LocalizeService)
  countries = this.countryService.countries
  countryCode!: string
  countriesOptions = this.countryService.countries.map(({ english_name }) => english_name)
  clientLocation!: string
  phoneCodeList = 'none'


  ngOnInit(): void {
    // this.clientLocation = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]


  }

  showCountryCodes() {
    this.phoneCodeList === 'none' ? this.phoneCodeList = 'block' : this.phoneCodeList = 'none'
  }

  searchCountry(event : Event) {

    console.log(event);
    console.log('here');
    
  }
}

