import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
 @Input() address:string = " ٥شارع لبنان المتفرع من ميدان لبنان - المهندسين - الجيزة - مصر"
}
