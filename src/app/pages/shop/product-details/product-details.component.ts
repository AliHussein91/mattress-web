import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../shared/components';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserReviewCardComponent } from '../components';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ICart, IMedia, IRate, ISize, Product } from '@app/shared/types';
import { ActionsUtilties } from '@app/shared/util';
import { HttpClient } from '@angular/common/http';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogService, LogType } from '@app/shared/services/log.service';
import { Store } from '@ngrx/store';
import { cartActions } from '@app/core/state/cart/actons';
import Swal from 'sweetalert2';
import { SwalModalService } from '@app/shared/services';
import { AuthService } from '@app/pages/auth/services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    ProductCardComponent,
    TranslateModule,
    UserReviewCardComponent,
    AccordionModule,
    ImageModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent
  extends ActionsUtilties
  implements OnInit, OnDestroy
{
  activeTab: number | null = null;
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  #http = inject(HttpClient);
  #store = inject(Store);
  logService = inject(LogService);
  router = inject(Router);
  swalModalService = inject(SwalModalService);
  translateService = inject(TranslateService);
  authService = inject(AuthService);
  product: Product = new Product();
  sizeList: ISize[] = [];
  busyLoadingProductDetails: boolean = false;
  busyLoadingChangeFavorite: boolean = false;
  busyLoadingSubmitingReview: boolean = false;
  busyLoadingAddTOCart: boolean = false;
  timer: any;
  duration: any;
  rateObj = {
    comment: '',
    rate: 0,
  };
  rateHoverFlag: number = 0;
  productImages: IMedia[] = [];
  rates: IRate[] = [];

  ngOnInit(): void {
    this.getProductDetails();
  }

  async getProductDetails() {
    this.busyLoadingProductDetails = true;
    await this.productService
      .getProductDetails(this.route.snapshot.params['id'])
      .subscribe({
        next: (value: any) => {
          const { offer, sizes, rates, ...res } = value;
          if (rates && rates.data) {
            this.rates = rates.data;
          }
          this.product = res;
          if (res.images && res.images.data)
            this.productImages = res.images.data.slice(0, 2);
          if (sizes && sizes.data)
            this.sizeList = sizes.data.map((size: ISize) => {
              size.quantity = 0;
              return size;
            });
          if (offer && offer.data) {
            this.timer = setInterval(() => {
              this.showRemaining(offer.data.end_date);
            }, 1000);
          }
        },
        error: (err) => {
          console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
        },
        complete: () => {
          this.busyLoadingProductDetails = false;
        },
      });
  }
  showRemaining(end: any) {
    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
    let now = new Date();
    // @ts-ignore
    let distance = new Date(end) - now;
    if (distance < 0) {
      clearInterval(this.timer);
      // document.getElementById("countdown").innerHTML = "EXPIRED!";

      return;
    }
    let days = Math.floor(distance / _day);
    let hours = Math.floor((distance % _day) / _hour);
    let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);
    this.duration = {
      days,
      hours,
      minutes,
      seconds,
    };
  }
  changeFavorite() {
    if (this.busyLoadingChangeFavorite) return;
    this.busyLoadingChangeFavorite = true;
    this.#http
      .post(
        this.getAction(
          this.product,
          this.product.is_favourite
            ? 'un_favourite_product'
            : 'favourite_product',
        ).endpoint_url,
        {},
      )
      .subscribe({
        next: (value: any) => {
          this.swalModalService.Notifier(value.meta.message);
          this.product.is_favourite = !this.product.is_favourite;
        },
        error: (err) => {
          console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
        },
        complete: () => {
          this.busyLoadingChangeFavorite = false;
        },
      });
  }
  addTOCart() {
    const selectedSize = this.sizeList.filter(
      (size: ISize) => size.quantity > 0,
    );
    if (!selectedSize.length) return;
    this.busyLoadingAddTOCart = true;
    this.#http
      .post(this.getAction(this.product, 'add_product_to_cart').endpoint_url, {
        data: {
          type: 'user',
          id: 'null',
          attributes: {
            sizes: selectedSize.map(
              ({ id, quantity, productSizeCountries }: ISize) => {
                return {
                  product_size_id: id,
                  product_size_country_price_id: productSizeCountries.data.id,
                  quantity,
                };
              },
            ),
          },
        },
      })
      .subscribe({
        next: (value) => {
          this.swalModalService.Notifier(
            this.translateService.instant('addedToCart'),
          );
          console.log(
            '🚀 ~ ProductCardComponent ~ this.http.post ~ value',
            value,
          );
          this.#store.dispatch(
            cartActions.loaded({
              cart: value as ICart,
            }),
          );
        },
        error: (err) => {
          console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
        },
        complete: () => {
          this.busyLoadingAddTOCart = false;
        },
      });
  }

  rateProduct() {
    if (this.rateObj.rate == 0 || this.rateObj.comment == '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: this.translateService.instant('pleaseRateAndComment'),
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    this.busyLoadingSubmitingReview = true;
    this.productService.rateProduct(this.product.id!, this.rateObj).subscribe({
      next: (value: any) => {
        this.rateObj = {
          comment: '',
          rate: 0,
        };
        this.swalModalService.Notifier(value.meta.message);
        this.getProductDetails();
      },
      error: (err) => {
        this.busyLoadingSubmitingReview = false;
        if (err.error && err.error.message) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
      },
      complete: () => {
        this.busyLoadingSubmitingReview = false;
      },
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
