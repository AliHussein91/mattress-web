import { Route } from '@angular/router';
import { PaymentComponent } from './payment.component';
export const paymentRoutes: Route[] = [
  {
    path: '',
    component: PaymentComponent,
  },
  {
    path: 'card',
    loadComponent: () =>
      import('./methods/card/card.component').then((c) => c.CardComponent),
  },
];
