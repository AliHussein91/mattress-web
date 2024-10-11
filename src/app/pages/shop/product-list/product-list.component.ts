import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from '../../../shared/components';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { ProductService } from '../services/product.service';
import { IBrand, ICategory, IPrice, IQualityLevel, IRate, Pagination, Product } from '@app/shared/types';
import { ProductListFilter } from '../models';
import { FormatterSingleton } from '@app/shared/util';
import { LookupService } from '@app/shared/services/lookup.service';
import { Country } from '@app/core/modal';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TranslateModule,ProductCardComponent,SidebarModule,AccordionModule,CheckboxModule,FormsModule,RadioButtonModule,CommonModule,SkeletonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  sidebarVisible:boolean = false;
  activeTab:number|null = null;
  productService = inject(ProductService)
  lookupService = inject(LookupService)
  route = inject(ActivatedRoute)
   products: Product[] = []
   pagination:Pagination = {} as Pagination;
   filter = new ProductListFilter();
   busyLoadingProductsList:boolean = false;
   busyLoadingLookup:boolean = false;
   formatter = FormatterSingleton.getInstance();
   brands: IBrand[] = [];
   categories: ICategory[] = [];
   qualityLevels: IQualityLevel[] = [];
   prices: IPrice[] = [];
   rates: IRate[] = [];
   countries: Country[] = [];
   showFilter:boolean = true;
   brandCategories: ICategory[] = [];
   categoryQualityLevels: IQualityLevel[] = [];

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['quality_level_id']){
      this.filter.quality_level_id = this.route.snapshot.queryParams['quality_level_id'];
    }
    if(this.route.snapshot.queryParams['brand_id']){
      this.showFilter = false;
      this.filter.brand_id = this.route.snapshot.queryParams['brand_id'];
      this.getCategoriesByBrandId(this.route.snapshot.queryParams['brand_id']);
    }
    if(this.route.snapshot.queryParams['category_id']){
      this.showFilter = false;
      this.filter.category_id = this.route.snapshot.queryParams['category_id'];
      this.getQualityLevelsByCategoryId(this.route.snapshot.queryParams['category_id']);
    }
    this.getProductList();
    this.showFilter && this.getLookup();
  }
  resetFilter(){
    this.filter = new ProductListFilter();
    console.log("🚀 ~ ProductListComponent ~ resetFilter ~ filter:", this.filter)
    this.getProductList();
  }

  getQualityLevelsByCategoryId(categoryId:string){
    this.productService.getQualityLevelsByCategoryId(categoryId).subscribe({
      next:async(value) => {
        const {data} = await this.formatter.formatData(value);
        this.categoryQualityLevels = data;
        console.log("🚀 ~ ProductListComponent ~ next:async ~ res:", data)
      },
      error:(err)=> {
        console.log("🚀 ~ ProductListComponent ~ error ~ err:", err)
      },
      complete:()=> {
      }
    })
  }

  getCategoriesByBrandId(brandId:string){
    this.productService.getCategoriesByBrandId(brandId).subscribe({
      next:async(value) => {
        const {data} = await this.formatter.formatData(value);
        this.brandCategories = data;
        console.log("🚀 ~ ProductListComponent ~ next:async ~ res:", data)
      },
      error:(err)=> {
        console.log("🚀 ~ ProductListComponent ~ error ~ err:", err)
      },
      complete:()=> {
      }
    })
  }

  getProductList(){
    this.busyLoadingProductsList = true;
    this.productService.getProductList(this.filter).subscribe({
      next:async(value) => {
        const {data , meta} = await this.formatter.formatData(value);
        console.log("🚀 ~ ProductListComponent ~ next:async ~ res:", data)
        this.products = data;
        this.pagination = meta.pagination;
      },
      error:(err)=> {
        console.log("🚀 ~ ProductListComponent ~ error ~ err:", err)
      },
      complete:()=> {
        this.busyLoadingProductsList = false;
      }
    })
  }
  getLookup(){
    this.busyLoadingLookup = true;
    this.lookupService.getLookup('countries,brands,categories,qualityLevels,price,rate').subscribe({
      next:async(value) => {
        const {data} = await this.formatter.formatData(value); 
        console.table(data)
        const {countries,brands,categories,qualityLevels,price,rate,...res} = data[0];
         this.countries = countries.data;
         this.brands = brands.data;
        this.categories = categories.data;
        this.qualityLevels = qualityLevels.data;
        this.prices = price.data; 
        this.rates = rate.data;
          
      },
      error:(err)=> {
        console.log("🚀 ~ ProductListComponent ~ error ~ err:", err)
      },
      complete:()=> {
    this.busyLoadingLookup = false;
      }
    })
  }
  isFilterChanged(){
    return Object.values(this.filter).some(value => value !== null && value !== undefined);
  }

}
