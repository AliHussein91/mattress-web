import { IAction } from './action';

export interface ICart {
  actions: { data: IAction[] };
  cartProducts: { data: CartProduct[] };
  id: string;
  products_prices_sum_coast: number;
  shipping_coast: number;
  currency: string;
  total_coast: number;
  type: 'cart';
  promoCode: { data: PromoCode };
}

export type CartProduct = {
  actions: { data: IAction[] };
  id: string;
  price: number;
  product: {
    data: {
      id: string;
      description: string;
      image: string;
      name: string;
      type: 'product';
    };
  };
  productSize: { data: { id: string; size: string; type: 'product_size' } };
  quantity: number;
  changed: boolean;
  type: 'cart_product';
};

export type PromoCode = {
  UserPromoCode: {
    data: {
      actions: { data: IAction[] };
      code: string;
      discount_value: string;
      id: string;
      original_price: string;
      price_after_discount: string;
      status: string;
      type: 'user-promo-code';
    };
  };
  code: string;
  id: string;
  type: 'promo-code';
};
