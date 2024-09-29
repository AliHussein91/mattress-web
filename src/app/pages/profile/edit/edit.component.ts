import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { CountriesService } from '../../../shared/services/countries.service';
import { phoneValidator } from '../../../shared/services/phone.validator';
import { AvatarInputComponent } from '../../../shared/components/avatar-input/avatar-input.component';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, AvatarInputComponent, PhoneInputComponent, InputComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  fb = inject(FormBuilder)

  countryService = inject(CountriesService)
  phoneCountry: CountryCode = 'EG'
  userInfoForm = this.fb.nonNullable.group({
    image: [null,],
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
    const phone = this.userInfoForm.getRawValue().phone
    const user = { ...this.userInfoForm.getRawValue(), phone: parsePhoneNumber(phone, this.phoneCountry).formatInternational() }
    console.log(user);

  }

  username: string = "Ali Hussein"
  imgPath: string = '../../../../../assets/img/test-profile-img.png'

  onImgPicked(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length > 0) {
      const img: File = files[0];
      if (!img.type.startsWith('image/')) {
        console.log('here');
        this.userInfoForm.controls.image.setErrors({ invalidFileType: true })
        return
      }
      this.imgPath = URL.createObjectURL(img)
    }

  }
}