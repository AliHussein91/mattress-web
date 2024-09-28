

import {Component, inject} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import {CountriesService} from '../../../services/countries.service';
import {LocalizeService} from '../../../../../shell/services/localize.service';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [FormsModule,TranslateModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneInputComponent,
      multi: true
    }
  ]
})
export class PhoneInputComponent implements ControlValueAccessor {

  countryService = inject(CountriesService)
  localizeService = inject(LocalizeService)
  countries = this.countryService.countries

  clientLocation!: string
  phoneCodeList = 'none'

  phone!: string
  onChange: any = () => { }
  onTouched: any = () => { }

  writeValue(phone: string): void {
    this.phone = phone
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  showCountryCodes() {
    this.phoneCodeList === 'none' ? this.phoneCodeList = 'block' : this.phoneCodeList = 'none'
  }

  searchCountry(event: Event) {

    console.log(event);
    console.log('here');

  }

}
