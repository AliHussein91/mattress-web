import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '@app/shared/types/address';
import { AuthService, AddressApiResponseItem } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '@app/shared/components/input/input.component';

@Component({
  selector: 'app-delivery-addresses',
  standalone: true,
  imports: [TranslateModule,InputComponent,ReactiveFormsModule],
  templateUrl: './delivery-addresses.component.html',
  styleUrl: './delivery-addresses.component.scss'
})
export class DeliveryAddressesComponent {
 // Injectables
 router = inject(Router)
 fb = inject(FormBuilder)
 authService = inject(AuthService)
 // Show and hide new address form toggle
 isAdding = false
 // Show and hide deletion confirmation dialog box toggle
 isConfirming = false
 // User addresses array
 addresses = signal<Address[]>([])
 // User selected address to delete
 addressToDelete!: Address
 // Form
 form = this.fb.nonNullable.group({
   address: ['', [Validators.required]],
   city: ['', [Validators.required]],
   province: ['', [Validators.required]],
   country: ['', [Validators.required]],
 })



 onSubmit(isEnd: boolean = false) {
   // Test form validity
   this.form.markAllAsTouched()
   if (!this.form.valid) return
   // Create add address obj
   const addressObj: { data: Address } = {
     "data": {
       "type": "new address",
       "id": 'null',
       "attributes": {
         "user_id": this.authService.socialUserDetails()?.id,
         "address": `${this.form.getRawValue().address}, ${this.form.getRawValue().city}, ${this.form.getRawValue().province}, ${this.form.getRawValue().country}`,
         "mobile_number": this.authService.socialUserDetails()?.phone!
       }
     }
   }
   this.authService.signupAddAddress(addressObj).subscribe({
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
