import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AddressCardComponent } from "../../../shared/components/address-card/address-card.component";

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [TranslateModule, AddressCardComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  addresses: {}[] = [
    {
      line: '27 street district 5',
      city: 'Mohandseen',
      region: 'Giza',
      country: 'Cairo'
    },
    {
      line: '27 street district 5',
      city: 'Mohandseen',
      region: 'Giza',
      country: 'Cairo'
    }
  ]
}
