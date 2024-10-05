import { RouterLink } from '@angular/router';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { AvatarInputComponent } from '../../../../shared/components/avatar-input/avatar-input.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { PhoneInputComponent } from '../../../../shared/components/phone-input/phone-input.component';
import { StepTrackerService } from '../../services/step-tracker.service';
import { CountriesService } from '../../../../shared/services/countries.service';
import { phoneValidator } from '../../../../shared/services/phone.validator';
import { imageValidator } from '../../../../shared/services/image.validator';
import { UploadMediaService } from '../../../../shared/services/upload-media.service';

@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [RouterLink, TranslateModule, InputComponent, AvatarInputComponent, PhoneInputComponent, ReactiveFormsModule],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.scss'
})
export class PersonalDetailComponent implements OnInit {


  fb = inject(FormBuilder)
  uploadMediaService = inject(UploadMediaService)

  countryService = inject(CountriesService)
  stepTrackerService = inject(StepTrackerService)
  phoneCountry: CountryCode = 'EG'
  registerForm = this.fb.nonNullable.group({
    image: [null, [imageValidator]],
    firstName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
    country: ['', [Validators.required]]
  })

  ngOnInit(): void {
      const formData = new FormData()
      this.registerForm.get('image')?.valueChanges.subscribe(
        file => {
          if (file !== null) {
            const img = file as File;
            if (img.type.startsWith('image/')) {
              formData.append('media[]', img);
              this.uploadMediaService.uploadMedia(formData).subscribe({
                next: data => this.uploadMediaService.uploads.set(data),
                error: error => console.log(error)
              });
            } else {
              console.log('Only image files are allowed');
            }
          }
        }
      );
  }
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
