import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { UserReviewCardComponent } from '../components';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ISize, Product } from '@app/shared/types';
import { ActionsUtilties, FormatterSingleton } from '@app/shared/util';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    ProductCardComponent,
    TranslateModule,
    UserReviewCardComponent,
    AccordionModule,
    ToastModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [MessageService]
})
export class ProductDetailsComponent
  extends ActionsUtilties
  implements OnInit, OnDestroy
{
  activeTab: number | null = null;
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  http = inject(HttpClient);
  messageService = inject(MessageService);
  product: Product = new Product();
  sizeList: ISize[] = [];
  busyLoadingProductDetails: boolean = false;
  busyLoadingChangeFavorite: boolean = false;
  busyLoadingAddTOCart: boolean = false;
  formatter = FormatterSingleton.getInstance();
  timer: any;
  duration: any;
  ngOnInit(): void {
    this.getProductDetails();
  }

  async getProductDetails() {
    this.busyLoadingProductDetails = true;
    await this.productService
      .getProductDetails(this.route.snapshot.params['id'])
      .subscribe({
        next: async (value) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
          console.log(
            '🚀 ~ ProductDetailsComponent ~ awaitthis.productService.getProductDetails ~ value:',
            value,
          );
          const { offer, sizes, ...res } =
            await this.formatter.formatData(value);
          this.product = res;
          if (sizes && sizes.data)
            this.sizeList = sizes.data.map((size: ISize) => {
              size.quantity = 0;
              return size;
            });
          console.log(
            '🚀 ~ ProductDetailsComponent ~ next: ~ this.sizeList:',
            this.sizeList,
          );
          if (offer && offer.data) {
            this.timer = setInterval(() => {
              this.showRemaining(offer.data.end_date);
            }, 1000);
          }
          console.log(
            '🚀 ~ ProductDetailsComponent ~ this.productService.getProductDetails ~ this.product:',
            res,
          );
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
    this.http
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
        next: (value) => {
          console.log(
            '🚀 ~ ProductCardComponent ~ this.http.post ~ value',
            value,
          );
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
    const selectedSize = this.sizeList.filter((size:ISize) => size.quantity > 0);
    if (!selectedSize.length) return;
    this.busyLoadingAddTOCart = true;
    this.http
      .post(this.getAction(this.product, 'add_product_to_cart').endpoint_url, {
        data: {
          type: 'user',
          id: 'null',
          attributes: {
            sizes: selectedSize.map(
              ({ id, quantity, productSizeCountries }:ISize) => {
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
          console.log(
            '🚀 ~ ProductCardComponent ~ this.http.post ~ value',
            value,
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
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
