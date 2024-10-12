import { createSelector } from '@ngrx/store'; 
import { countryListFeature } from './reducer';
import { Country } from '@app/core/modal';
const selectAll = countryListFeature.selectCountryList;

const selectById = (id: number) =>
  createSelector(selectAll, (state: Country[]) =>
    state.find((p) => p.id === id)
  );

export const fromCountries = {
  selectAll,
  selectById,
};
