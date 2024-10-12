import { Country } from '@app/core/modal';
import { createFeature, createReducer, on } from '@ngrx/store'; 
import { countryListActions } from './actons';

export interface State {
  countryList: Country[];
}

export const initialState: State = {
    countryList: [],
};

export const countryListFeature = createFeature({
  name: 'County',
  reducer: createReducer<State>(
    initialState,
    on(countryListActions.load, (state) => ({ ...state })),
    on(countryListActions.loaded, (state, { countryList }) => ({
      ...state,
      countryList,
    })),
    on(
        // countryListActions.added,
        // countryListActions.updated,
        countryListActions.removed,
      () => initialState
    )
  ),
});
