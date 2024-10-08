import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarInputComponent } from '../../../shared/components/avatar-input/avatar-input.component';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { CountriesService } from '../../../shared/services/countries.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { UserProfile } from '../../../shared/types/user-profile';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryCode } from 'libphonenumber-js';
import { phoneValidator } from '@app/shared/services/phone.validator';
import { imageValidator } from '@app/shared/services/image.validator';
import { UploadMediaService } from '@app/shared/services/upload-media.service';
import { ProfileUpdates } from '@app/shared/types/profileUpdates';
import { FormatterSingleton } from '@app/shared/util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TranslateModule, RouterLink, AvatarInputComponent, PhoneInputComponent, InputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {

  user!: UserProfile
  isEditing: boolean = false
  profileService = inject(ProfileService)
  uploadMediaService = inject(UploadMediaService)
  authService = inject(AuthService)
  router = inject(Router)
  fb = inject(FormBuilder)
  formatter = FormatterSingleton.getInstance()
  countryService = inject(CountriesService)
  phoneCountry: CountryCode = 'EG'

  form = this.fb.nonNullable.group({
    image: [null, [imageValidator]],
    firstName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z\s]+|[a-zA-Z\u0600-\u06FF\s]+)$/)]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]]
  })

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: async data => {
        this.user = await this.formatter.formatData(data)
        this.profileService.userProfile.set(this.user)
        localStorage.setItem('profile', JSON.stringify(this.user))
      }
    })
  }


  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode
  }

  editProfile() {
    this.form.setValue({
      image: null,
      firstName: this.user.name.split(" ")[0],
      lastName: this.user.name.replace(this.user.name.split(" ")[0], ""),
      email: this.user.email,
      phone: this.user.mobile_number
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
    this.isEditing = true
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (!this.form.valid) return
    const updates: ProfileUpdates = {
      data: {
        "type": "user",
        "id": "null",
        "attributes": {
          "name": this.form.getRawValue().firstName + " " + this.form.getRawValue().lastName,
          "email": this.form.getRawValue().email,
          "mobile_number": this.form.getRawValue().phone,
          "profile_picture": this.uploadMediaService.uploads()?.data[0].id!,
          "lat": this.user.lat,
          "lng": this.user.lng
        }
      }
    }
    this.profileService.updateProfile(updates).subscribe(data => {
      this.ngOnInit()
      console.log(data)
      this.uploadMediaService.uploads.set(null)
      this.isEditing = false

    })
  }
}
