import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NumberRestricDirective } from '../../shared/directives/numbers-only.directive';
import { CartFacade } from '@app/core/state/cart/facade';
import { ICart } from '@app/shared/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActionsUtilties } from '@app/shared/util';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TranslateModule, RouterLink, NumberRestricDirective,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent extends ActionsUtilties implements OnInit,OnDestroy {

  protected cartFacade = inject(CartFacade);
  protected cart: ICart = {} as ICart;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.cartFacade.cart$.subscribe((res) => {
      this.cart = res;
      console.log('🚀 ~ HeaderComponent ~ ngOnInit ~ this.cart:', this.cart);
    });
  }
 
  amount = 2500;
  reward = 'free delivery';
  value = signal('76%');
  totalPrice = 2800;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
