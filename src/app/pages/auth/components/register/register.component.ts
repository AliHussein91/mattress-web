import { AvatarInputComponent } from './../shared/avatar-input/avatar-input.component';
import { Component, inject, OnInit } from '@angular/core';
import { SimpleHeaderComponent } from "../../../../shell/components/simple-header/simple-header.component";
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from "../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { PhoneInputComponent } from "../shared/phone-input/phone-input.component";
import { phoneValidator } from '../../validators/phone.validator';
import { CountryCode } from 'libphonenumber-js';


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
  phoneCountry: CountryCode = 'EG'
  registerForm = this.fb.nonNullable.group({
    image: [null, [AvatarInputComponent.prototype.validate]],
    firstName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z]+|[a-zA-Z\u0600-\u06FF]+)$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z]+|[a-zA-Z\u0600-\u06FF]+)$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [ Validators.required,phoneValidator(this.phoneCountry)]],
    country: ['', [Validators.required]]
  })

  step: number = 1
  countryCode!: string
  countriesOptions = this.countryService.countries.map(({ english_name }) => english_name)

  ngOnInit(): void {
    // this.clientLocation = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]
  }

  onCountryCodeChange(countryCode : CountryCode){
    this.phoneCountry = countryCode
  }
  
  onSubmit() {
    console.log(this.registerForm.getRawValue());

  }

}

