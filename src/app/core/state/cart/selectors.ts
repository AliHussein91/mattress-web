import { createSelector } from '@ngrx/store'; 
import { cartFeature } from './reducer';
import { Country } from '@app/core/modal';
import { ICart } from '@app/shared/types';
const selectAll = cartFeature.selectCart;

const selectCart = () =>
  createSelector(selectAll, (state: ICart) =>
    state
  );

export const CartSelectors = {
  selectAll,
  selectCart,
};
