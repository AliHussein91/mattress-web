import { Component, inject, OnInit } from '@angular/core';
import { FlagDropDownComponent } from '@app/shared/components/flag-drop-down/flag-drop-down.component';
import { TranslateModule } from '@ngx-translate/core';
import { CountryListFacade } from '@app/core/state/country/facade';
import { Country } from '@app/shared/types';

@Component({
  selector: 'app-select-country',
  standalone: true,
  imports: [TranslateModule, FlagDropDownComponent],
  templateUrl: './select-country.component.html',
  styleUrl: './select-country.component.scss',
})
export class SelectCountryComponent implements OnInit {
  protected countryfacade = inject(CountryListFacade);
  protected countryList: any[] = [];
  ngOnInit(): void {
    this.countryfacade.countylist$.subscribe((res: any) => {
      this.countryList = res;
    });
  }

  selectCountry(country: any) {
    console.log(
      '🚀 ~ SelectCountryComponent ~ selectCountry ~ country:',
      country,
    );
  }
}
