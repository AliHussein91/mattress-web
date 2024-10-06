import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { UserReviewCardComponent } from '../components';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '@app/shared/types';
import { FormatterSingleton } from '@app/shared/util';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    ProductCardComponent,
    TranslateModule,
    UserReviewCardComponent,
    AccordionModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  activeTab:number|null = null;
  route = inject(ActivatedRoute)
  productService = inject(ProductService)
  product: Product = new Product();
  busyLoadingProductDetails:boolean = false;
  formatter = FormatterSingleton.getInstance();

  ngOnInit(): void {
    this.getProductDetails();
  }

  async getProductDetails() {
     this.busyLoadingProductDetails = true;
    await this.productService.getProductDetails(this.route.snapshot.params['id']).subscribe({
        next: async (value) => {
          console.log("🚀 ~ ProductDetailsComponent ~ awaitthis.productService.getProductDetails ~ value:", value)
          const {...res} = await this.formatter.formatData(value);
          // this.product = value;
          console.log("🚀 ~ ProductDetailsComponent ~ this.productService.getProductDetails ~ this.product:", res)
           
         },
        error: (err) => {
          console.log('🚀 ~ ProductCardComponent ~ this.http.post ~ err:', err);
        },
        complete: () => {
          this.busyLoadingProductDetails = false;
        },
      });
  }



}
