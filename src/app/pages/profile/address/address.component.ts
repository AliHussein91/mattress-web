import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AddressCardComponent } from "../../../shared/components/address-card/address-card.component";
import { ProfileService } from '@app/shared/services/profile.service';
import { FormatterSingleton } from '@app/shared/util';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Address } from '@app/shared/types/address';
import { catchError } from 'rxjs';
import { PhoneInputComponent } from "../../../shared/components/phone-input/phone-input.component";
import { phoneValidator } from '@app/shared/services/phone.validator';
import { CountryCode } from 'libphonenumber-js';
import { LogService, LogType } from '@app/shared/services/log.service';


export interface UserAddress {
  "id": string
  "type": string
  "address": string
  "mobile_number": string
  "relationships": [
    "actions"
  ],
  "actions": {
    "data": [
      {
        "id": string
        "type": string
        "endpoint_url": string
        "method": string
        "label": string
        "bg_color": string
        "key": string
      }
    ]
  }
}

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [TranslateModule, AddressCardComponent, ReactiveFormsModule, TranslateModule, InputComponent, PhoneInputComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  // Injectables
  profileService = inject(ProfileService)
  formatter = FormatterSingleton.getInstance()
  fb = inject(FormBuilder)
  logger = inject(LogService)
  // County alpha-2 for the user phone to be used for validation and phone format
  phoneCountry: CountryCode = 'EG'
  // Show and hide new address form toggle
  isAdding = false
  // Show and hide deletion confirmation dialog box toggle
  isConfirming = false
  // User addresses array
  addresses = signal<UserAddress[]>([])
  // User selected address to delete
  addressToDelete!: UserAddress
  // Form
  form = this.fb.nonNullable.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    province: ['', [Validators.required]],
    country: ['', [Validators.required]],
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
  })


  // Calling the addresses endpoint
  getAddresses() {
    this.profileService.getAddress().subscribe({
      next: data => {
        this.addresses.set(data.data)
      },
      error: error => {
        this.logger.showSuccess(LogType.error, error.error.errors[0].title, error.error.errors[0].detail)
      }
    })
  }
// Adding an address title
  getOrdinalSuffix(index: number): string {
    const suffixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
    return suffixes[index - 1] + " Address" || `${index}th Address`;
  }
  // Adding new address
  addAddress() {
    // Test form validity
    this.form.markAllAsTouched()
    if (!this.form.valid) return
    // Create add address obj
    const addressObj: { data: Address } = {
      "data": {
        "type": "new address",
        "id": 'null',
        "attributes": {
          "address": `${this.form.getRawValue().address}, ${this.form.getRawValue().city}, ${this.form.getRawValue().province}, ${this.form.getRawValue().country}`,
          "mobile_number": this.form.getRawValue().phone
        }
      }
    }
    // Call the add address endpoint
    this.addNewAddress(addressObj)
  }
  // Call the add address endpoint
  addNewAddress(addressObj: { data: Address }) {
    this.profileService.addNewAddress(addressObj).subscribe({
      next: data => {
        this.getAddresses()
        this.isAdding = false
      }
    })
  }
  // Selecting the address to be deleted and showing the confirmation dialog box
  setAddressToDelete(address: UserAddress) {
    this.addressToDelete = address
    this.isConfirming = true
  }
  // Call the api to delete the address
  deleteAddress() {
    this.profileService.deleteAddress(this.addressToDelete.id).subscribe({
      next: data => {
        this.getAddresses()
        this.isConfirming = false
        this.form.reset()
      },
      error: error => {
        this.logger.showSuccess(LogType.error, error.error.errors[0].title, error.error.errors[0].detail)
      }
    })
  }
  // Update the phone country for validation
  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode
  }
  ngOnInit(): void {
    this.getAddresses()
    // Updating the edit form with the user phone number
    const profile = JSON.parse(localStorage.getItem('profile')!)
    this.form.patchValue({
      phone: profile.mobile_number
    })
  }
}

