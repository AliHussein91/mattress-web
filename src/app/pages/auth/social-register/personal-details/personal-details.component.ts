import { AuthService, SocialUserDataObj } from '@app/pages/auth/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { PhoneInputComponent } from '../../../../shared/components/phone-input/phone-input.component';
import { StepTrackerService } from '../../services/step-tracker.service';
import { CountriesService } from '../../../../shared/services/countries.service';
import { phoneValidator } from '../../../../shared/services/phone.validator';
import { UploadMediaService } from '../../../../shared/services/upload-media.service';
import { GMapComponent } from "../../../../shared/components/g-map/g-map.component";
import { Country } from '@app/core/modal';
import { CountryListFacade } from '@app/core/state/country/facade';
import { LogService, LogType } from '@app/shared/services/log.service';


@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [TranslateModule, PhoneInputComponent, InputComponent, ReactiveFormsModule, GMapComponent],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent implements OnInit {
  // Injectables
  router = inject(Router)
  route = inject(ActivatedRoute)
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  countryService = inject(CountriesService)
  stepTrackerService = inject(StepTrackerService)
  uploadMediaService = inject(UploadMediaService)
  protected facade = inject(CountryListFacade);
  logger = inject(LogService)
  // Map visibility toggle
  isMapOn = false
  // User address selected on the map
  address!: string
  // County id for the registered user
  countryId: any
  // County alpha-2 for the user phone to be used for validation and phone format
  phoneCountry: CountryCode = 'EG'
  // Loader
  isLoading: boolean = false
  // Getting the countries list
  protected countryList: Country[] = [];
  // Form
  form = this.fb.nonNullable.group({
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
    country: ['', [Validators.required]],
    lat: ['', [Validators.required]],
    lng: ['', [Validators.required]],
  })


  // Form submission call
  onSubmit() {
    // Test form validity
    this.form.markAllAsTouched()
    if (!this.form.valid) return
    // Initiate Loader
    this.isLoading = true;
    // Update phone format
    const phone = this.form.getRawValue().phone
    parsePhoneNumber(phone, this.phoneCountry).formatNational()
    // Create register obj
    const registerUser: SocialUserDataObj = {
      "data": {
        "type": "user",
        "id": "null",
        "attributes": {
          "mobile_number": phone,
          "country_id": this.countryId,
          "lat": this.form.getRawValue().lat,
          "lng": this.form.getRawValue().lng,
          "user_id": this.authService.socialUserDetails()?.id!,
          "device_token": '',
          "device_type": ''
        }
      }
    }
    // Call the register endpoint
    this.register(registerUser)
  }

  // Call the register endpoint
  register(registerUser: SocialUserDataObj) {
    this.authService.completeSocialUserData(registerUser).subscribe({
      next: data => {
        this.next()
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  // Updating the register navigation and navigating to next screen
  next() {
    this.stepTrackerService.onNext()
    this.router.navigateByUrl('/auth/register-social/delivery-details')
  }
  // Get county list 
  getCountries() {
    this.facade.countylist$.subscribe((data) => {
      this.countryList = data;
    });
  }
  // Show and hide google map toggle
  showMap() {
    this.isMapOn = true
  }
  // Update the phone country for validation
  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode
  }
  // Get the selected address on map to show on the address feild
  getUserAddress(event: string) {
    this.address = event
    this.isMapOn = false
  }
  // Get the selected address on map to send with the registeration request
  getUserCoords(event: { lat: number, lng: number }) {
    const coords = event
    this.form.get('lat')?.setValue(coords.lat.toString())
    this.form.get('lng')?.setValue(coords.lng.toString())
  }
  // Update the country id on country selection to send with the request
  onCountryChange(countryName: string): void {
    const selectedCountry = this.countryList.find(country => country.name === countryName);
    if (selectedCountry) {
      this.countryId = selectedCountry.id;
    }
  }

  ngOnInit(): void {
    this.getCountries()
  }
}
