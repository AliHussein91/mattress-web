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



@Component({
  selector: 'app-address',
  standalone: true,
  imports: [TranslateModule, AddressCardComponent, ReactiveFormsModule, TranslateModule, InputComponent, PhoneInputComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
phoneCountry: CountryCode = 'EG'
  profileService = inject(ProfileService)
  formatter = FormatterSingleton.getInstance()
  fb = inject(FormBuilder)

  form = this.fb.nonNullable.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    province: ['', [Validators.required]],
    country: ['', [Validators.required]],
    phone: ['', [Validators.required, phoneValidator(this.phoneCountry)]],
  })

  isAdding = false
  isConfirming = false
  addresses = signal<Address[]>([])
  addressToDelete!: Address




  ngOnInit(): void {
    this.addresses.set(JSON.parse(localStorage.getItem('addresses') ?? '{}'))
    const profile = JSON.parse(localStorage.getItem('profile')!)
    this.form.patchValue({
      phone: profile.mobile_number
    })
  }


  getOrdinalSuffix(index: number): string {
    const suffixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
    return suffixes[index - 1] + " Address" || `${index}th Address`;
  }

  addAddress() {
    this.form.markAllAsTouched()
    if (!this.form.valid) return
    const address: { data: Address } = {
      "data": {
        "type": "new address",
        "id": 'null',
        "attributes": {
          "address": `${this.form.getRawValue().address}, ${this.form.getRawValue().city}, ${this.form.getRawValue().province}, ${this.form.getRawValue().country}`,
          "mobile_number": this.form.getRawValue().phone
        }
      }
    }
    this.profileService.addNewAddress(address).subscribe({
      next: data => {
        console.log(data.included)
        const addresses = data.included.filter(item => item.type == 'address')
        localStorage.setItem('addresses', JSON.stringify(addresses))
        this.addresses.set(addresses)
        this.isAdding = false
      }
    })
  }

  setAddressToDelete(address: Address) {
    this.addressToDelete = address
    this.isConfirming = true
  }

  deleteAddress() {
    this.profileService.deleteAddress(this.addressToDelete.id).pipe(catchError((error)=> error))
    this.profileService.getAddress().subscribe({next: data => {
      const addresses = data.data
      this.addresses.set(addresses)
      localStorage.setItem('addresses', JSON.stringify(addresses))
    }})
    this.isConfirming = false
  }

  onCountryCodeChange(countryCode: CountryCode) {
    this.phoneCountry = countryCode
  }
}

