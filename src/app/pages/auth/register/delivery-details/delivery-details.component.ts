import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from "../../../../shared/components/input/input.component";
import { Address } from '@app/shared/types/address';
import { AddressApiResponseItem, AuthService } from '../../services/auth.service';
import { AddressCardComponent } from "../../../../shared/components/address-card/address-card.component";


@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, RouterLink, InputComponent, AddressCardComponent],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.scss'
})
export class DeliveryDetailsComponent {
  router = inject(Router)
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  form = this.fb.nonNullable.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    province: ['', [Validators.required]],
    country: ['', [Validators.required]],
  })

  isAdding = false
  isConfirming = false
  addresses = signal<Address[]>([])
  addressToDelete!: Address


  onSubmit(isEnd: boolean = false) {
    this.form.markAllAsTouched()
    if (!this.form.valid) return
    const address: { data: Address } = {
      "data": {
        "type": "new address",
        "id": 'null',
        "attributes": {
          "user_id": this.authService.registredAccount()?.user.id!,
          "address": `${this.form.getRawValue().address}, ${this.form.getRawValue().city}, ${this.form.getRawValue().province}, ${this.form.getRawValue().country}`,
          "mobile_number": this.authService.registredAccount()?.user.mobile_number!
        }
      }
    }
    this.authService.signupAddAddress(address).subscribe({
      next: data => {
        this.addresses.set(data.included.filter(isAddress))
        this.form.reset()
        if (isEnd) {
          this.router.navigateByUrl('/auth/auth-success')
        }
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onFinish() {
    if (this.form.valid) {
      this.onSubmit(true)
    } else if (this.form.invalid && this.addresses().length > 0) {
      this.router.navigateByUrl('/auth/auth-success')
    } else if (this.form.invalid && this.addresses().length == 0) {
      this.form.markAllAsTouched()
      console.log('Add address');
    }
  }

  getOrdinalSuffix(index: number): string {
    const suffixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
    return suffixes[index - 1] + " Address" || `${index}th Address`;
  }
}

function isAddress(obj: AddressApiResponseItem): obj is Address {
  return obj.type === 'address';
}
