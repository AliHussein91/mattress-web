import { Message } from './../../../contact-us/message';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CountryCode, parseNumber, parsePhoneNumber } from 'libphonenumber-js';
import { AvatarInputComponent } from '../../../../shared/components/avatar-input/avatar-input.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { PhoneInputComponent } from '../../../../shared/components/phone-input/phone-input.component';
import { StepTrackerService } from '../../services/step-tracker.service';
import { CountriesService } from '../../../../shared/services/countries.service';
import { phoneValidator } from '../../../../shared/services/phone.validator';
import { imageValidator } from '../../../../shared/services/image.validator';
import { UploadMediaService } from '../../../../shared/services/upload-media.service';
import { passwordValidator } from '@app/shared/services/password.validator';
import { GMapComponent } from '../../../../shared/components/g-map/g-map.component';
import { Country } from '@app/core/modal';
import { CountryListFacade } from '@app/core/state/country/facade';
import { LogService, LogType } from '@app/shared/services/log.service';

export interface RegisterUser {
  data: {
    type: 'user';
    id: 'null';
    attributes: {
      profile_picture: string;
      name: string;
      email: string;
      mobile_number: any;
      country_id: string;
      password: string;
      password_confirmation: string;
      lat: string;
      lng: string;
      invitation_token: string | null;
    };
  };
}

@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [
    TranslateModule,
    InputComponent,
    AvatarInputComponent,
    PhoneInputComponent,
    ReactiveFormsModule,
    GMapComponent,
  ],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.scss',
})
export class PersonalDetailComponent implements OnInit {
  // Injectables
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  countryService = inject(CountriesService);
  stepTrackerService = inject(StepTrackerService);
  uploadMediaService = inject(UploadMediaService);
  protected facade = inject(CountryListFacade);
  translateService = inject(TranslateService);
  logger = inject(LogService);
  // Map visibility toggle
  isMapOn = false;
  // User address selected on the map
  address!: string;
  // Invitation token if available in the url params
  refCode!: string | null;
  // County id for the registered user
  countryId: any;
  // County alpha-2 for the user phone to be used for validation and phone format
  phoneCountry: CountryCode = 'EG';
  // Password Visibility
  isVisible = false;
  isConVisible = false;
  passType = 'password';
  confType = 'password';
  // Loader
  isLoading: boolean = false;
  // Getting the countries list
  protected countryList: Country[] = [];
  // Form
  form = this.fb.nonNullable.group(
    {
      image: [null, [imageValidator]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmation: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      refCode: '',
    },
    { validators: this.passwordMatchValidator.bind(this) },
  );

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmation = control.get('confirmation')?.value;
    return password === confirmation ? null : { mismatch: true };
  }

  // Form submission call
  onSubmit() {
    // Test form validity
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    // Initiate Loader
    this.isLoading = true;
    // Update phone format
    const phone = this.form.getRawValue().phone;
    const parsedPhone = parsePhoneNumber(phone, this.phoneCountry)
      .formatInternational()
      .replaceAll(' ', '');
    // Create register obj
    const registerUser: RegisterUser = {
      data: {
        type: 'user',
        id: 'null',
        attributes: {
          profile_picture: this.uploadMediaService.uploads()?.data[0].id!,
          name:
            this.form.getRawValue().firstName +
            ' ' +
            this.form.getRawValue().lastName,
          email: this.form.getRawValue().email,
          mobile_number: parsedPhone,
          country_id: this.countryId,
          password: this.form.getRawValue().password,
          password_confirmation: this.form.getRawValue().confirmation,
          lat: this.form.getRawValue().lat,
          lng: this.form.getRawValue().lng,
          invitation_token: this.form.getRawValue().refCode || null,
        },
      },
    };
    // Saving email to localStorage
    localStorage.setItem('registrationEmail', this.form.getRawValue().email);
    // Call the register endpoint
    this.register(registerUser);
  }

  // Call the register endpoint
  register(registerUser: RegisterUser) {
    this.authService.signup(registerUser).subscribe({
      next: (data) => {
        this.authService.registrationEmail.set(this.form.getRawValue().email);
        this.next();
      },
      error: (error) => {
        // console.log({error: error});

        this.logger.showSuccess(
          LogType.error,
          error.error.message,
          error.error.message,
        );

        this.uploadMediaService.uploads.set(null);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  // Get invitation token form url params
  getToken() {
    this.route.queryParamMap.subscribe((params) => {
      if (this.route.snapshot.queryParamMap.has('invitation_token')) {
        this.form.get('refCode')?.setValue(params.get('invitation_token')!);
        this.form.get('refCode')?.disable();
      }
    });
  }
  // Call uploadMedia API on profile image change
  uploadMedia() {
    const formData = new FormData();
    this.form.get('image')?.valueChanges.subscribe((file) => {
      if (file !== null) {
        const img = file as File;
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/gif',
          'image/svg+xml',
        ];
        if (allowedTypes.includes(img.type)) {
          const formData = new FormData();
          formData.append('media[]', img);
          this.isLoading = true;
          this.uploadMediaService.uploadMedia(formData).subscribe({
            next: (data) => {
              this.uploadMediaService.uploads.set(data);
            },
            error: (error) => {
              this.logger.showSuccess(
                LogType.error,
                error.error.errors[0].title,
                error.error.errors[0].detail,
              );
              this.isLoading = false;
            },
            complete: () => (this.isLoading = false),
          });
        } else {
          this.logger.showSuccess(
            LogType.error,
            this.translateService.instant('Invalid file type'),
            this.translateService.instant('Only image files are allowed'),
          );
        }
      }
    });
  }
  // Updating the register navigation and navigating to next screen
  next() {
    this.stepTrackerService.onNext();
    this.router.navigateByUrl('/auth/register/verify');
  }
  // Get county list
  getCountries() {
    this.facade.countylist$.subscribe((data) => {
      this.countryList = data;
    });
  }
  // Show and hide google map toggle
  showMap() {
    this.isMapOn = true;
  }
  // Update the phone country for validation
  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode;
    this.updatePhoneValidator();
  }

  updatePhoneValidator() {
    this.form
      .get('phone')
      ?.setValidators([Validators.required, phoneValidator(this.phoneCountry)]);
    this.form.get('phone')?.updateValueAndValidity();
  }

  // Get the selected address on map to show on the address feild
  getUserAddress(event: string) {
    this.address = event;
    this.isMapOn = false;
  }
  // Get the selected address on map to send with the registeration request
  getUserCoords(event: { lat: number; lng: number }) {
    const coords = event;
    this.form.get('lat')?.setValue(coords.lat.toString());
    this.form.get('lng')?.setValue(coords.lng.toString());
  }
  // Update the country id on country selection to send with the request
  onCountryChange(countryName: string): void {
    const selectedCountry = this.countryList.find(
      (country) => country.name === countryName,
    );
    if (selectedCountry) {
      this.countryId = selectedCountry.id || null;
    }
  }
  // Show and hide password & confirmation toggles
  showPassword() {
    this.isVisible = !this.isVisible;
    this.isVisible ? (this.passType = 'text') : (this.passType = 'password');
  }
  showConfirmation() {
    this.isConVisible = !this.isConVisible;
    this.isConVisible ? (this.confType = 'text') : (this.confType = 'password');
  }

  ngOnInit(): void {
    this.getToken();
    this.uploadMedia();
    this.getCountries();
  }
}
