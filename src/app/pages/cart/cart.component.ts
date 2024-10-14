import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NumberRestricDirective } from '../../shared/directives/numbers-only.directive';
import { CartFacade } from '@app/core/state/cart/facade';
import { CartProduct, ICart, Product } from '@app/shared/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActionsUtilties } from '@app/shared/util';
import { HttpClient } from '@angular/common/http';
import { SwalModalService } from '@app/shared/services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    NumberRestricDirective,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent
  extends ActionsUtilties
  implements OnInit, OnDestroy
{
  protected cartFacade = inject(CartFacade);
  protected http = inject(HttpClient);
  #swal = inject(SwalModalService);
  #translate = inject(TranslateService);
  protected cart: ICart = {} as ICart;
  private subscription: Subscription = new Subscription();
  busyDeletingProduct: boolean = false;

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

  deleteProduct(product: CartProduct) {
    this.#swal.Confirmation(this.#translate.instant('areYouSure'),this.#translate.instant('deleteProduct')).then((res) => {
      this.busyDeletingProduct = true;
      this.http
        .post(
          this.getAction(product, 'delete_product_from_cart').endpoint_url,
          {},
        )
        .subscribe({
          next: (value) => {
            console.log(
              '🚀 ~ ProductCardComponent ~ this.http.post ~ value',
              value,
            );
          },
          error: (err) => {
            console.log(
              '🚀 ~ ProductCardComponent ~ this.http.post ~ err:',
              err,
            );
          },
          complete: () => {
            this.busyDeletingProduct = false;
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
