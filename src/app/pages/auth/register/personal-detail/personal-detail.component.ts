import { AuthService } from '@app/pages/auth/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
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
import { passwordValidator } from '@app/shared/services/password.validator';
import { GMapComponent } from "../../../../shared/components/g-map/g-map.component";


export interface RegisterUser {
  "data": {
    "type": "user",
    "id": "null",
    "attributes": {
      "profile_picture": string,
      "name": string,
      "email": string,
      "mobile_number": number,
      "country_id": string,
      "password": string,
      "password_confirmation": string,
      "lat": string,
      "lng": string,
      "invitation_token": string | null
    }
  }
}


@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [RouterLink, TranslateModule, InputComponent, AvatarInputComponent, PhoneInputComponent, ReactiveFormsModule, GMapComponent],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.scss'
})
export class PersonalDetailComponent implements OnInit {


  router = inject(Router)
  route = inject(ActivatedRoute)
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  uploadMediaService = inject(UploadMediaService)
  isMapOn = false
  address!: string
  refCode!: string | null
  countryId: any

  countryList!: {
    data: {
      "id": string
      "type": string
      "name": string
      "country_code": string
      "flag": string
    }[]
  }
  isVisible = false
  isConVisible = false
  passType = 'password'
  confType = 'password'

  countryService = inject(CountriesService)
  stepTrackerService = inject(StepTrackerService)
  phoneCountry: CountryCode = 'EG'
  form = this.fb.nonNullable.group({
    image: [null, [imageValidator, Validators.required]],
    firstName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
    country: ['', [Validators.required]],
    password: ['', [Validators.required, passwordValidator()]],
    confirmation: ['', [Validators.required]],
    lat: ['', [Validators.required]],
    lng: ['', [Validators.required]],
    refCode: '',
  })
  // countriesOptions = this.countryService.countries.map(({ english_name }) => english_name)

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (this.route.snapshot.queryParamMap.has('invitation-token')) {
        this.form.get('refCode')?.setValue(params.get('invitation-token')!)
        this.form.get('refCode')?.disable()
      }
    })
    const formData = new FormData()
    this.form.get('image')?.valueChanges.subscribe(
      file => {
        if (file !== null) {
          const img = file as File;
          if (img.type.startsWith('image/')) {
            formData.append('media[]', img);
            this.uploadMediaService.uploadMedia(formData).subscribe({
              next: data => {
                this.uploadMediaService.uploads.set(data)
              },
              error: error => console.log(error)
            });
          } else {
            console.log('Only image files are allowed');
          }
        }
      }
    );
    if (localStorage.getItem('countryList')) {
      const countryList = localStorage.getItem('countryList')
      this.countryList = JSON.parse(countryList!)
    }
  }


  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (!this.form.valid) return
    const phone = this.form.getRawValue().phone
    // parsePhoneNumber(phone, this.phoneCountry).formatNational()
    const registerUser: RegisterUser = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": {
          "profile_picture": this.uploadMediaService.uploads()?.data[0].id!,
          "name": this.form.getRawValue().firstName + " " + this.form.getRawValue().lastName,
          "email": this.form.getRawValue().email,
          "mobile_number": Number(this.form.getRawValue().phone),
          "country_id": this.countryId,
          "password": this.form.getRawValue().password,
          "password_confirmation": this.form.getRawValue().confirmation,
          "lat": this.form.getRawValue().lat,
          "lng": this.form.getRawValue().lng,
          "invitation_token": this.form.getRawValue().refCode || null
        }
      }
    }
    this.authService.signup(registerUser).subscribe({
      next: data => {
        console.log(data)
        this.authService.registrationEmail.set(this.form.getRawValue().email)
        this.next()
      },
      error: error => {
        console.log(error)
        this.uploadMediaService.uploads.set(null)
      }
    })
    console.log(registerUser);
  }

  next() {
    this.stepTrackerService.onNext()
    this.router.navigateByUrl('/auth/register/verify')
  }

  showMap() {
    this.isMapOn = true
  }

  getUserAddress(event: string) {
    this.address = event
    this.isMapOn = false
  }

  getUserCoords(event: { lat: number, lng: number }) {
    const coords = event
    this.form.get('lat')?.setValue(coords.lat.toString())
    this.form.get('lng')?.setValue(coords.lng.toString())
  }

  onCountryChange(countryName: string): void {
    const selectedCountry = this.countryList.data.find(country => country.name === countryName);
    if (selectedCountry) {
      this.countryId = selectedCountry.id;
    }
  }

  showPassword() {
    this.isVisible = !this.isVisible
    this.isVisible ? this.passType = 'text' : this.passType = 'password'

  }
  showConfirmation() {
    this.isConVisible = !this.isConVisible
    this.isConVisible ? this.confType = 'text' : this.confType = 'password'
  }
}
