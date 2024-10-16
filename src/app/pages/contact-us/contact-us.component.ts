import { Message } from './message';
import { Component, inject, OnDestroy } from '@angular/core';
import { HeaderComponent } from "../../shell/header/header.component";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { CountriesService } from '../../shared/services/countries.service';
import { phoneValidator } from '../../shared/services/phone.validator';
import { ContactUsService } from './service/contact-us.service';
import { LogService, LogType } from '@app/shared/services/log.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [HeaderComponent, TranslateModule, RouterLink, ReactiveFormsModule, InputComponent, PhoneInputComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnDestroy {

  companyPhone: string = '+02 - 0123456789'
  companyEmail: string = 'mattress@shop.org'
  companyAddress: string = 'Lebanon sq. - Mohandseen - Giza'

  messageStatus: boolean = false
  timeout!: any;

  contactUsService = inject(ContactUsService)
  countryService = inject(CountriesService)
  logger =inject(LogService)
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
    this.contactForm.markAllAsTouched()
    if (!this.contactForm.valid) return
    const phone = this.contactForm.getRawValue().phone
    const formattedPhone = parsePhoneNumber(phone, this.phoneCountry).formatNational()
    const message: Message = {
      "data": {
        "id": null,
        "type": "country",
        "attributes": {
          "name": this.contactForm.getRawValue().firstName + " " + this.contactForm.getRawValue().lastName,
          "email": this.contactForm.getRawValue().email,
          "mobile_number":formattedPhone,
          "message": this.contactForm.getRawValue().message
        }
      }
    }
    this.contactUsService.sendMessage(message).subscribe({
      next: data => {
        console.log(data)
        this.contactForm.reset()
        this.logger.showSuccess(LogType.success, 'Message Sent', data)

      },
      error: error => {
        this.logger.showSuccess(LogType.error, error.error.errors[0].title, error.error.errors[0].detail)
      }

    })
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout)
  }
}
