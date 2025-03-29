import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from '../../../shared/components';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { ProductService } from '../services/product.service';
import {
  IBrand,
  ICategory,
  IPrice,
  IQualityLevel,
  IRate,
  Pagination,
  Product,
} from '@app/shared/types';
import { ProductListFilter } from '../models';
import { FormatterSingleton } from '@app/shared/util';
import { LookupService } from '@app/shared/services/lookup.service';
import { Country } from '@app/core/modal';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { AuthService } from '@app/pages/auth/services/auth.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    TranslateModule,
    ProductCardComponent,
    SidebarModule,
    AccordionModule,
    CheckboxModule,
    FormsModule,
    RadioButtonModule,
    CommonModule,
    SkeletonModule,
    PaginationComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  sidebarVisible: boolean = false;
  activeTab: number | null = null;
  productService = inject(ProductService);
  lookupService = inject(LookupService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  products: Product[] = [];
  pagination: Pagination = {} as Pagination;
  filter = new ProductListFilter();
  busyLoadingProductsList: boolean = false;
  busyLoadingLookup: boolean = false;
  brands: IBrand[] = [];
  categories: ICategory[] = [];
  qualityLevels: IQualityLevel[] = [];
  prices: IPrice[] = [];
  rates: IRate[] = [];
  countries: Country[] = [];
  showFilter: boolean = true;
  brandCategories: ICategory[] = [];
  categoryQualityLevels: IQualityLevel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filter = new ProductListFilter();
      this.filter.per_page = 9;
      this.filter.page = 1;
      this.showFilter = true;

      if (params['quality_level_id']) {
        this.filter.quality_level_id = params['quality_level_id'];
      }
      if (params['search']) {
        this.filter.search_key = params['search'];
      }
      if (params['brand_id']) {
        this.showFilter = false;
        this.filter.brand_id = params['brand_id'];
        this.getCategoriesByBrandId(params['brand_id']);
      }
      if (params['category_id']) {
        this.showFilter = false;
        this.filter.category_id = params['category_id'];
        this.getQualityLevelsByCategoryId(
          this.route.snapshot.queryParams['category_id'],
        );
      }
      this.getProductList();
    });

    this.getProductList();
    this.showFilter && this.getLookup();
  }
  resetFilter() {
    this.filter = new ProductListFilter();
    console.log(
      '🚀 ~ ProductListComponent ~ resetFilter ~ filter:',
      this.filter,
    );
    this.getProductList();
  }

  clearSearch() {
    const queryParams = { search: '' };
    this.filter.search_key = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge', // Use 'merge' to merge with existing query params
    });
  }

  getQualityLevelsByCategoryId(categoryId: string) {
    this.productService.getQualityLevelsByCategoryId(categoryId).subscribe({
      next: ({ data }: any) => {
        this.categoryQualityLevels = data;
      },
      error: (err) => {
        console.log('🚀 ~ ProductListComponent ~ error ~ err:', err);
      },
      complete: () => {},
    });
  }

  getCategoriesByBrandId(brandId: string) {
    this.productService.getCategoriesByBrandId(brandId).subscribe({
      next: ({ data }: any) => {
        this.brandCategories = data;
      },
      error: (err) => {
        console.log('🚀 ~ ProductListComponent ~ error ~ err:', err);
      },
      complete: () => {},
    });
  }

  getProductList() {
    this.busyLoadingProductsList = true;
    this.productService.getProductList(this.filter).subscribe({
      next: async ({ data, meta }: any) => {
        this.products = data;
        this.pagination = meta.pagination;
      },
      error: (err) => {
        console.log('🚀 ~ ProductListComponent ~ error ~ err:', err);
      },
      complete: () => {
        this.busyLoadingProductsList = false;
      },
    });
  }
  getLookup() {
    this.busyLoadingLookup = true;
    this.lookupService
      .getLookup('countries,brands,categories,qualityLevels,price,rate')
      .subscribe({
        next: ({ data }: any) => {
          const {
            countries,
            brands,
            categories,
            qualityLevels,
            price,
            rate,
            ...res
          } = data[0];
          this.countries = countries.data;
          this.brands = brands.data;
          this.categories = categories.data;
          this.qualityLevels = qualityLevels.data;
          this.prices = price.data;
          this.rates = rate.data;
        },
        error: (err) => {
          console.log('🚀 ~ ProductListComponent ~ error ~ err:', err);
        },
        complete: () => {
          this.busyLoadingLookup = false;
        },
      });
  }
  isFilterChanged() {
    return Object.values(this.filter).some(
      (value) => value !== null && value !== undefined,
    );
  }
}
