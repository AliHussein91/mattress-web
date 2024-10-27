import {
  afterNextRender,
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { } from '../../../../assets/img/en.png';
import { NgClass, NgIf } from '@angular/common';
import { Country } from '@app/core/modal';

@Component({
  selector: 'app-flag-drop-down',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './flag-drop-down.component.html',
  styleUrl: './flag-drop-down.component.scss',
})
export class FlagDropDownComponent implements  OnChanges {
  @Input({ required: true }) countries: Country[] = [];
  @Input({ required: true }) enableBorder: boolean = true;
  @Input({ required: true }) enableCaroot: boolean = true;
  @Output() action = new EventEmitter<Country>();
  selectedCountry: Country = new Country();
  isVisible: boolean = false;

  
  ngOnChanges(changes: SimpleChanges): void {
    if (localStorage.getItem('selectedCountryId')) {
      this.selectedCountry = this.countries.find(
        (country) => {
          return country.id == +localStorage.getItem('selectedCountryId')!
        }
      )!;
    } else {
      this.selectedCountry = this.countries[0];
    }
    
  }
  showList() {
    this.isVisible = !this.isVisible;
  }

  onSelect(country: Country) {
    this.selectedCountry = country;
    this.action.emit(country);
  }

}
