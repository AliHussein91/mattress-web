import { ICart } from '@app/shared/types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
 
export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    load: emptyProps(),
    loaded: props<{ cart:ICart }>(),
    // add: props<{ customer: Country }>(),
    // added: props<{ customer: Country }>(),
    // update: props<{ customer: Country }>(),
    // updated: props<{ customer: Country }>(),
    // remove: props<{ id: number }>(),
    removed: emptyProps(),
  },
});
