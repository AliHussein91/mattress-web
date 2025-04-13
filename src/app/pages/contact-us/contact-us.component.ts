import { Message } from './message';
import { Component, inject, OnDestroy} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { CountriesService } from '../../shared/services/countries.service';
import { phoneValidator } from '../../shared/services/phone.validator';
import { ContactUsService } from './service/contact-us.service';
import { LogService, LogType } from '@app/shared/services/log.service';
import { UserProfile } from '@app/shared/types/user-profile';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [TranslateModule, RouterLink, ReactiveFormsModule, InputComponent, PhoneInputComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements  OnDestroy {


  companyPhone: string = '+02 - 0123456789'
  companyEmail: string = 'mattress@shop.org'
  companyAddress: string = 'Lebanon sq. - Mohandseen - Giza'
  user !: UserProfile

  messageStatus: boolean = false
  timeout!: any;

  charCount: number = 0

  contactUsService = inject(ContactUsService)
  countryService = inject(CountriesService)
  translateService = inject(TranslateService)
  logger =inject(LogService)
  countryCode!: string
  countriesOptions = this.countryService.countries.map(({ english_name }) => english_name)


  fb = inject(FormBuilder)
  phoneCountry: CountryCode = 'EG'
  contactForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required,  phoneValidator(this.phoneCountry)]],
    message: ['', [Validators.required, Validators.maxLength(250), Validators.pattern(/^(?=.*[a-zA-Z\u0621-\u064A\u066E\u066F].*[a-zA-Z\u0621-\u064A\u066E\u066F].*[a-zA-Z\u0621-\u064A\u066E\u066F])[a-zA-Z0-9\s\u0621-\u064A\u066E\u066F]+$/)]],
  })

  constructor() {
    this.getUserInfo()
  }

  getUserInfo(){
    if (localStorage.getItem('profile')) {
      this.user = JSON.parse(localStorage.getItem('profile') || '{}')
      this.phoneCountry = parsePhoneNumber(this.user.mobile_number).country!
      this.contactForm.patchValue({
        firstName: this.user.name.split(" ")[0] || '',
        lastName: this.user.name.replace(this.user.name.split(" ")[0], "") || '',
        email: this.user.email || '',
        phone: parsePhoneNumber(this.user.mobile_number, this.phoneCountry.toUpperCase() as CountryCode).formatNational() || ''
      })
    }
  }

  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode
  }

  onSubmit() {
    this.contactForm.markAllAsTouched()
    if (!this.contactForm.valid) return
    const phone = this.contactForm.getRawValue().phone
    const parsedPhone = parsePhoneNumber(phone, this.phoneCountry).formatInternational().replaceAll(" ", "")
    const message: Message = {
      "data": {
        "id": null,
        "type": "country",
        "attributes": {
          "name": this.contactForm.getRawValue().firstName + " " + this.contactForm.getRawValue().lastName,
          "email": this.contactForm.getRawValue().email,
          "mobile_number":parsedPhone,
          "message": this.contactForm.getRawValue().message
        }
      }
    }
    this.contactUsService.sendMessage(message).subscribe({
      next: data => {
        console.log(data)
        this.contactForm.reset()
        this.getUserInfo()
        this.charCount = 0
        this.logger.showSuccess(LogType.success, this.translateService.instant('Message Sent Successfully'), data.meta.message)

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
