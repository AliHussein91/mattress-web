import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalModalService } from '@app/shared/services';
import { ICart } from '@app/shared/types';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService } from '../cart/services/cart.service';
import { AddressCardComponent } from '@app/shared/components/address-card/address-card.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { PhoneInputComponent } from '@app/shared/components/phone-input/phone-input.component';
import { LogService, LogType } from '@app/shared/services/log.service';
import { phoneValidator } from '@app/shared/services/phone.validator';
import { ProfileService } from '@app/shared/services/profile.service';
import { FormatterSingleton } from '@app/shared/util';
import { CountryCode } from 'libphonenumber-js';
import { UserAddress } from '../profile/address/address.component';
import { Address } from '@app/shared/types/address';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,FormsModule,AddressCardComponent, ReactiveFormsModule, TranslateModule, InputComponent, PhoneInputComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  protected http = inject(HttpClient);
  #swal = inject(SwalModalService);
  #translate = inject(TranslateService);
  #store = inject(Store);
  #cartService = inject(CartService);
  cart: ICart = {} as ICart;
  busyloadingCart : boolean = false;
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
  
  
  constructor() {
   
  }
  ngOnInit(): void {
    this.getCart();
    this.getAddresses();
    const profile = JSON.parse(localStorage.getItem('profile')!)
    this.form.patchValue({
      phone: profile.mobile_number
    })
  }

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
  getCart() {
    this.busyloadingCart = true;
    this.#cartService.getCart().subscribe({
      next: async (value: ICart) => {
        this.cart = { ...value } as any;
        const { cartProducts } = { ...value } as any;
      },
      error: (err: any) => {
        console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
      },
      complete: () => {
        this.busyloadingCart = false;
      },
    });
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
}
