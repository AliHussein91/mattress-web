import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserAddress } from '@app/pages/profile/address/address.component';
import { ProfileService } from '@app/shared/services/profile.service';


@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
  @Input({ required: true }) counter!: string
  @Input({ required: true }) address!: UserAddress
  @Output() deleteAddressEvent = new EventEmitter()

  profileService = inject(ProfileService)

  onDelete(){
    this.deleteAddressEvent.emit(this.address)
  }
}
