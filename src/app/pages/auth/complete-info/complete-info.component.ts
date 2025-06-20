import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country } from '@app/core/modal';
import { CountryListFacade } from '@app/core/state/country/facade';
import { PhoneInputComponent } from '@app/shared/components/phone-input/phone-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { CountryCode, parseNumber, parsePhoneNumber } from 'libphonenumber-js';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-complete-info',
  standalone: true,
  imports: [PhoneInputComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './complete-info.component.html',
  styleUrl: './complete-info.component.scss',
})
export class CompleteInfoComponent implements OnInit {
  fb = inject(FormBuilder);
  protected countryList: Country[] = [];
  protected facade = inject(CountryListFacade);
  protected authService = inject(AuthService);
  phoneCountry: CountryCode = 'EG';
  router = inject(Router);
  route = inject(ActivatedRoute);
  form = this.fb.nonNullable.group({
    mobile_number: ['', [Validators.required]],
    country_id: ['', [Validators.required]],
  });
  busyLoading: boolean = false;

  ngOnInit(): void {
    this.getCountries();
  }
  getCountries() {
    this.facade.countylist$.subscribe((data) => {
      this.countryList = data;
    });
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    let lat, lng;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      return;
    }

    const formData = this.form.getRawValue();
    this.authService
      .completeSocialUserData({
        data: {
          type: 'user',
          id: this.route.snapshot.queryParams['userId'],
          attributes: {
            user_id: this.route.snapshot.queryParams['userId'],
            lat: lat ? lat : '',
            lng: lng ? lng : '',
            mobile_number: formData.mobile_number,
            country_id: Number(formData.country_id),
          },
        },
      })
      .subscribe({
        next: (data) => {
          console.log('User Data:', data);
          localStorage.setItem('selectedCountryId', data.country.data.id);
          this.authService.loginWithSocial(data);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          this.busyLoading = false;
        },
      });
  }
  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode;
    this.updatePhoneValidator();
  }
  updatePhoneValidator() {
    this.form.get('phone')?.setValidators([Validators.required]);
    this.form.get('phone')?.updateValueAndValidity();
  }
}
