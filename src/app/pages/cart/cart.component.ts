import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NumberRestricDirective } from '../../shared/directives/numbers-only.directive';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TranslateModule, RouterLink, NumberRestricDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart :{img: string, name: string, price: number}[] = [
    {
      img: '../../../assets/img/product.png',
      name: 'مرتبة سرتا بخاصية الميموري فوم مقاس 195X100',
      price: 1200

    },
    {
      img: '../../../assets/img/product.png',
      name: 'مرتبة سرتا بخاصية الميموري فوم مقاس 195X100',
      price: 1200

    },
  ]
  amount = 2500
  reward = 'free delivery'
  value = signal('76%')
  totalPrice = 2800;
}
