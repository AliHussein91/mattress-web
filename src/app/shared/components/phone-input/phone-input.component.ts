import examples from 'libphonenumber-js/mobile/examples'
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Country } from '../../types/country';
import { NumberRestricDirective } from '../../directives/numbers-only.directive'
import { CountryCode, getExampleNumber, PhoneNumber } from 'libphonenumber-js'
import { CountriesService } from '../../services/countries.service';

let alpha: CountryCode = 'EG'

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [FormsModule, TranslateModule, NumberRestricDirective],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneInputComponent,
      multi: true
    }
  ],

})

export class PhoneInputComponent implements ControlValueAccessor, OnInit {

  phone!: string
  isDisabled!: boolean
  onChange: any = (phone: string) => { }
  onTouched: any = () => { }
  @Output() country = new EventEmitter()


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
    this.isDisabled = isDisabled
  }

  onInputChange(inputElement: HTMLInputElement) {
    const inputValue = inputElement.value;
    if (inputValue) {
      this.phone = inputValue
      this.onChange(this.phone)
    }
  }


  countryService = inject(CountriesService)
  countries: Country[] = this.countryService.countries
  searchedCountries: Country[] = this.countries
  selectedCountry!: Country
  @Input() alpha: CountryCode = 'EG'
  isCountyListVisible = false
  template!: string
  phoneNumberExample!: PhoneNumber | undefined

  // Display the country list for the user to choose a code
  toggleCountryList() {
    this.isCountyListVisible = !this.isCountyListVisible
  }

  // Search countries list in Arabic or English
  searchCountry(searchValue: string) {
    let arabic = /[\u0600-\u06FF]/
    if (arabic.test(searchValue)) {
      this.searchedCountries = this.countryService.countries.filter(country => country.arabic_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    } else {
      this.searchedCountries = this.countryService.countries.filter(country => country.english_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    }
  }

  // Select the country to update the contry coude and the placeholder for the phne input
  chooseCountry(country: Country) {
    this.selectedCountry = country
    alpha = this.selectedCountry.alpha2_code.toUpperCase() as CountryCode
    this.phoneNumberExample = getExampleNumber(alpha, examples)
    this.template = this.phoneNumberExample?.nationalNumber as string
    this.country.emit(country.alpha2_code)
    this.writeValue('')
    this.isCountyListVisible = false
  }

  ngOnInit(): void {
    this.selectedCountry = this.countries.find(country => country.alpha2_code.toUpperCase() === this.alpha.toUpperCase())! 
    this.alpha = this.selectedCountry.alpha2_code.toUpperCase() as CountryCode
    this.phoneNumberExample = getExampleNumber(alpha, examples)
    this.template = this.phoneNumberExample?.nationalNumber as string
  }
}
