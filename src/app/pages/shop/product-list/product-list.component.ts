import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from '../../../shared/components';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { ProductService } from '../services/product.service';
import { Pagination, Product } from '@app/shared/types';
import { ProductListFilter } from '../models';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TranslateModule,ProductCardComponent,SidebarModule,AccordionModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  sidebarVisible:boolean = false;
  activeTab:number|null = null;
  productService = inject(ProductService)
   products: Product[] = []
   pagination:Pagination = {} as Pagination;
   filter = new ProductListFilter();

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.productService.getProductList(this.filter).subscribe(({data,meta}) => {
      this.products = data;
      console.log("🚀 ~ ProductListComponent ~ this.productService.getProductList ~ this.products:", this.products)
      this.pagination = meta.pagination;
      // console.log("🚀 ~ ProductListComponent ~ this.productService.getProductList ~ res:", res)
      // return this.products = res.data
    	
    })
  }

}
