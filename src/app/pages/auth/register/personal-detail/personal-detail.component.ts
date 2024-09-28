import { RouterLink } from '@angular/router';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { AvatarInputComponent } from '../../../../shell/components/avatar-input/avatar-input.component';
import { InputComponent } from '../../../../shell/components/input/input.component';
import { PhoneInputComponent } from '../../../../shell/components/phone-input/phone-input.component';
import { CountriesService } from '../../../../shell/services/countries.service';
import { phoneValidator } from '../../../../shell/services/phone.validator';
import { StepTrackerService } from '../../services/step-tracker.service';

@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [RouterLink, TranslateModule, InputComponent, AvatarInputComponent, PhoneInputComponent, ReactiveFormsModule],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.scss'
})
export class PersonalDetailComponent {

  fb = inject(FormBuilder)

  countryService = inject(CountriesService)
  stepTrackerService = inject(StepTrackerService)
  phoneCountry: CountryCode = 'EG'
  registerForm = this.fb.nonNullable.group({
    image: [null, [AvatarInputComponent.prototype.validate]],
    firstName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
    country: ['', [Validators.required]]
  })

 
  countriesOptions = this.countryService.countries.map(({ english_name }) => english_name)


  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode
  }

  onSubmit() {
    const phone = this.registerForm.getRawValue().phone
    const user = { ...this.registerForm.getRawValue(), phone: parsePhoneNumber(phone, this.phoneCountry).formatInternational() }
    console.log(user);

  }

  next() {
    this.stepTrackerService.onNext()
  }
}