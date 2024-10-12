import { Country } from '@app/core/modal';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
 
export const countryListActions = createActionGroup({
  source: 'Cart',
  events: {
    load: emptyProps(),
    loaded: props<{ countryList: Country[] }>(),
    // add: props<{ customer: Country }>(),
    // added: props<{ customer: Country }>(),
    // update: props<{ customer: Country }>(),
    // updated: props<{ customer: Country }>(),
    // remove: props<{ id: number }>(),
    removed: emptyProps(),
  },
});
