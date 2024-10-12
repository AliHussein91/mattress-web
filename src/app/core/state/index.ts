import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CountryEffects } from './country/effects';
import { countryListFeature } from './country/reducer';
import { cartEffects } from './cart/effects';
import { cartFeature } from './cart/reducer';


export const allStoreProviders = [
  provideState(countryListFeature),
  provideState(cartFeature),
  provideEffects(CountryEffects),
  provideEffects(cartEffects),
];
export { countries } from './country/data';
