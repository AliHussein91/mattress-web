import { createFeature, createReducer, on } from '@ngrx/store';
import { cartActions } from './actons';
import { ICart } from '@app/shared/types';

export interface State {
  cart: ICart;
}

export const initialState: State = {
  cart: {} as ICart,
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer<State>(
    initialState,
    on(cartActions.load, (state) => ({ ...state })),
    on(cartActions.loaded, (state, { cart }) => ({
      ...state,
      cart,
    })),
    on(cartActions.removed, () => initialState),
  ),
});
