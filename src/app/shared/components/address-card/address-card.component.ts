import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProfileService } from '@app/shared/services/profile.service';
import { Address } from '@app/shared/types/address';

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
  @Input({ required: true }) counter!: string
  @Input({ required: true }) address!: Address
  @Output() deleteAddressEvent = new EventEmitter()

  profileService = inject(ProfileService)

  onDelete(){
    this.deleteAddressEvent.emit(this.address)
  }
}
