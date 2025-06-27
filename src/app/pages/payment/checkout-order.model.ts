import { IOrderProduct, IOrderUserAddress, PromoCode } from '@app/shared/types';

export interface ICheckoutOrder {
  applied_promocode: number;
  created_at: Date;
  extra_notes: string | null;
  id: string;
  lat: string;
  lng: string;
  products_prices_sum_coast: number;
  promoCode: {
    data: PromoCode;
  };
  shipping_coast: number;
  status: string | null;
  total_coast: number;
  type: string;
  orderProducts: {
    data: IOrderProduct[];
  };
  userAddress: {
    data: IOrderUserAddress;
  };
  meta: {
    payment_iframe_url: string;
  };
}
