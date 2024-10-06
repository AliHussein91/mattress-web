import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@app/shared/types';
import { ActionsUtilties } from '@app/shared/util';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent extends ActionsUtilties {
  @Input() product: Product = new Product();
  http = inject(HttpClient);
  router = inject(Router);
  busyLoadingChangeFavorite = false;
  stripHTMLTags(str?: string): string {
    console.log('🚀 ~ ProductCardComponent ~ stripHTMLTags ~ str:', str);
    try {
      if (!str) return '';
      return str.replace(/<[^>]*>/g, '');
    } catch (error) {
      console.log('🚀 ~ ProductCardComponent ~ stripHTMLTags ~ error:', error);
      return '';
    }
  }

  changeFavorite() {
    if (this.busyLoadingChangeFavorite) return;
    this.busyLoadingChangeFavorite = true;
    this.http
      .post(this.getAction(this.product, 
        this.product.is_favourite?'un_favourite_product':'favourite_product').endpoint_url, {})
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

  navigateTOProductDetails() {
    this.router.navigateByUrl(`/products/${this.product.id}`);
  }

  
}
