import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AvatarInputComponent } from '../../../shared/components/avatar-input/avatar-input.component';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { CountriesService } from '../../../shared/services/countries.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { phoneValidator } from '@app/shared/services/phone.validator';
import { imageValidator } from '@app/shared/services/image.validator';
import { UploadMediaService } from '@app/shared/services/upload-media.service';
import { ProfileUpdates } from '@app/shared/types/profileUpdates';
import { CommonModule } from '@angular/common';
import { UserProfile } from '@app/shared/types/user-profile';
import { LogService, LogType } from '@app/shared/services/log.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    TranslateModule,
    AvatarInputComponent,
    PhoneInputComponent,
    InputComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit {
  // Injectables
  profileService = inject(ProfileService);
  uploadMediaService = inject(UploadMediaService);
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  logger = inject(LogService);
  countryService = inject(CountriesService);
  translateService = inject(TranslateService);
  // User profile called from API
  user!: UserProfile; //FIX IMPORTANT
  // Edit form visibility toggle
  isEditing: boolean = false;
  // County alpha-2 for the user phone to be used for validation and phone format
  phoneCountry: CountryCode = 'EG';
  numberFlag!: string;
  // Loader
  isLoading: boolean = false;
  // Form
  form = this.fb.nonNullable.group({
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
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
  });
  private imageSubscription: any;
  // Calling the get profile endpoint
  getProfile() {
    this.isLoading = true;
    this.profileService.getProfile().subscribe({
      next: (data) => {
        try {
          this.user = data;
          this.numberFlag = this.countryService.countries.find(
            (country) =>
              country.alpha2_code.toUpperCase() ===
              this.phoneCountry.toUpperCase(),
          )?.url!;
          this.profileService.userProfile.set(data);
          localStorage.setItem('profile', JSON.stringify(this.user));
          localStorage.setItem(
            'selectedCountryId',
            String(this.user.country_id),
          );
          this.isLoading = false;
          this.phoneCountry =
            parsePhoneNumber(
              this.user.mobile_number,
              data.country.data.country_code.toUpperCase() as CountryCode,
            ).country ?? 'EG';
        } catch (error) {
          console.log(
            '🚀 ~ InfoComponent ~ this.profileService.getProfile ~ error:',
            error,
          );
        }
      },
      error: (error) => {
        this.logger.showSuccess(
          LogType.error,
          error.error.errors[0].title,
          error.error.errors[0].detail,
        );
      },
    });
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
  // Update the edit profile form with the original user details
  editProfile() {
    this.form.setValue({
      image: null,
      firstName: this.user.name.split(' ')[0],
      lastName: this.user.name.replace(this.user.name.split(' ')[0], ''),
      email: this.user.email,
      phone: parsePhoneNumber(
        this.user.mobile_number,
        this.phoneCountry.toUpperCase() as CountryCode,
      ).formatNational(),
    });

    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
    this.imageSubscription = this.form
      .get('image')
      ?.valueChanges.subscribe((file) => {
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
    this.isEditing = true;
  }

  // Form submission call
  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    const phone = this.form.getRawValue().phone;
    const parsedPhone = parsePhoneNumber(phone, this.phoneCountry)
      .formatInternational()
      .replaceAll(' ', '');
    // Create update profile obj
    const updatesObj: ProfileUpdates = {
      data: {
        type: 'user',
        id: 'null',
        attributes: {
          name:
            this.form.getRawValue().firstName +
            ' ' +
            this.form.getRawValue().lastName,
          email: this.form.getRawValue().email,
          mobile_number: parsedPhone,
          profile_picture: this.uploadMediaService.uploads()?.data[0].id!,
          lat: this.user.lat,
          lng: this.user.lng,
        },
      },
    };
    // Call the API to update the user profile details
    this.updateProfile(updatesObj);
  }
  // Call the API to update the user profile details
  updateProfile(updatesObj: ProfileUpdates) {
    this.isLoading = true;
    this.profileService.updateProfile(updatesObj).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.uploadMediaService.uploads.set(null);
        this.isEditing = false;
      },
      error: (error) => {
        this.logger.showSuccess(
          LogType.error,
          error.error.errors[0].title,
          error.error.errors[0].detail,
        );
      },
      complete: () => {},
    });
  }
  ngOnInit(): void {
    this.getProfile();
  }

  formatNumber(phone: string) {
    return parsePhoneNumber(
      phone,
      this.phoneCountry.toUpperCase() as CountryCode,
    ).formatInternational();
  }
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.logger.showSuccess(
      LogType.success,
      this.translateService.instant('Copied to clipboard'),
      '',
    );
  }
}
