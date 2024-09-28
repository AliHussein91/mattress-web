import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../shell/components/header/header.component";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shell/components/input/input.component';
import { PhoneInputComponent } from '../../shell/components/phone-input/phone-input.component';
import { phoneValidator } from '../../shell/services/phone.validator';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { CountriesService } from '../../shell/services/countries.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [HeaderComponent, TranslateModule, RouterLink, ReactiveFormsModule, InputComponent, PhoneInputComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  companyPhone: string = '+02 - 0123456789'
  companyEmail: string = 'mattress@shop.org'
  companyAddress: string = 'Lebanon sq. - Mohandseen - Giza'

  messageStatus: boolean = false

  countryService = inject(CountriesService)
  countryCode!: string
  countriesOptions = this.countryService.countries.map(({ english_name }) => english_name)


  fb = inject(FormBuilder)
  phoneCountry: CountryCode = 'EG'
  contactForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
    message: ['', [Validators.required]],
  })


  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode
  }

  onSubmit() {
    const phone = this.contactForm.getRawValue().phone
    const user = { ...this.contactForm.getRawValue(), phone: parsePhoneNumber(phone, this.phoneCountry).formatInternational() }
    console.log(user);
    this.messageStatus = true
    this.contactForm.reset()
    const t = setTimeout(() => {
      this.messageStatus = false
    }, 5000);
  }
}
