import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { UserReviewCardComponent } from '../components';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '@app/shared/types';
import { Formatter } from "sarala-json-api-data-formatter";

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
  
  ngOnInit(): void {
    this.getProductDetails();
  }

  async getProductDetails() {
     this.busyLoadingProductDetails = true;
    await this.productService.getProductDetails(this.route.snapshot.params['id']).subscribe({
        next: (value) => {
          const formatter:any = new Formatter();
          this.product = value;
          console.log("🚀 ~ ProductDetailsComponent ~ this.productService.getProductDetails ~ this.product:", value)
           
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
