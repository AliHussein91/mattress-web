import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CountryEffects } from './country/effects';
import { countryListFeature } from './country/reducer';


export const provideCustomers = [
  provideState(countryListFeature),
  provideEffects(CountryEffects),
];
export { countries } from './country/data';
