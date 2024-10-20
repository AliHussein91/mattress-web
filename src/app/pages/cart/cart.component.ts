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
import { Store } from '@ngrx/store';
import { cartActions } from '@app/core/state/cart/actons';
import { CartService } from './services/cart.service';

type ProductListType = CartProduct & { chaneQuntity: boolean };
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
export class CartComponent extends ActionsUtilties implements OnInit {
  protected cartFacade = inject(CartFacade);
  protected http = inject(HttpClient);
  #swal = inject(SwalModalService);
  #translate = inject(TranslateService);
  #store = inject(Store);
  #cartService = inject(CartService);
  cart: ICart = {} as ICart;
  cloneProductList: CartProduct[] = [];
  busyDeletingProduct: boolean = false;
  busyloadingCart: boolean = false;
  busyUpdateProductQuntity: boolean = false;
  busyApplyCoupon: boolean = false;
  currentUpdatedProductInedex: number = -1;
  code: string = '';

  ngOnInit(): void {
    // this.subscription = this.cartFacade.cart$.subscribe((res) => {
    //   this.cart  = {...res} as any
    //   const {cartProducts} = {...res} as any
    //   console.log("🚀 ~ this.subscription=this.cartFacade.cart$.subscribe ~ res.cartProducts:", cartProducts.data)
    //   this.cartProducts = [...cartProducts.data];
    //   console.log('🚀 ~ HeaderComponent ~ ngOnInit ~ this.cart:', this.cart);
    // });
    this.getCart();
  }

  getCart() {
    this.busyloadingCart = true;
    this.#cartService.getCart().subscribe({
      next: async (value: ICart) => {
        this.cart = { ...value } as any;
        const { cartProducts } = { ...value } as any;
        this.cloneProductList = cartProducts.data.map((item: CartProduct) => ({
          ...item,
        }));
      },
      error: (err: any) => {
        console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
      },
      complete: () => {
        this.busyloadingCart = false;
      },
    });
  }

  amount = 2500;
  reward = 'free delivery';
  value = signal('76%');
  totalPrice = 2800;

  deleteProduct(product: CartProduct) {
    this.#swal
      .Confirmation(
        this.#translate.instant('areYouSure'),
        this.#translate.instant('deleteProduct'),
      )
      .then((res) => {
        this.busyDeletingProduct = true;
        this.http
          .delete(
            this.getAction(product, 'delete_product_from_cart').endpoint_url,
            {},
          )
          .subscribe({
            next: (value) => {
              console.log('🚀 ~ .then ~ value:', value);
              this.#store.dispatch(
                cartActions.loaded({
                  cart: value as ICart,
                }),
              );
              this.cart = value as ICart;
              const { cartProducts } = { ...value } as any;
              this.cloneProductList = cartProducts.data.map((item: CartProduct) => ({
                ...item,
              }));
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
  updateProductAmount(product: CartProduct, index: number) {
    this.busyUpdateProductQuntity = true;
    this.currentUpdatedProductInedex = index;
    this.http
      .post(
        this.getAction(product, 'update_product_amount_in_cart').endpoint_url,
        {
          data: {
            type: 'user',
            id: 'null',
            attributes: {
              quantity: product.quantity,
            },
          },
        },
      )
      .subscribe({
        next: (value) => {
          console.log('🚀 ~ .then ~ value:', value);
          this.cloneProductList[index].quantity = product.quantity;
          this.#store.dispatch(cartActions.removed());
          this.#store.dispatch(cartActions.load());
        },
        error: (err) => {
          console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
          product.quantity = this.cloneProductList[index].quantity;
        },
        complete: () => {
          this.busyUpdateProductQuntity = false;
          this.currentUpdatedProductInedex = -1;
        },
      });
  }

  applyCode() {
    this.busyApplyCoupon = true;
    this.#cartService
      .applyPromoCode({
        code: this.code,
        cart_id: this.cart.id,
      })
      .subscribe({
        next: (value: ICart) => {
          console.log(
            '🚀 ~ ProductDetailsComponent ~ awaitthis.productService.getProductDetails ~ value:',
            value,
          );
        },
        error: (err: any) => {
          console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
        },
        complete: () => {
          this.busyApplyCoupon = false;
        },
      });
  }
}
