import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import {
  ProductCardComponent,
  ProductInfoComponent,
} from '../../shared/components';
import { FeaturesComponent } from './components/features/features.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { Country } from '@app/core/modal';
import { CountryListFacade } from '@app/core/state/country/facade';
import { HomePageService } from './services/home-page.service';
import { Banner, IBrand, Product } from '@app/shared/types';
import { IOffer } from '@app/shared/types/offer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface IHomePageData {
  description: any;
  id: string;
  image: string;
  name: string;
  type: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    CarouselModule,
    ProductCardComponent,
    FeaturesComponent,
    ProductInfoComponent,
    CarouselComponent,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  responsiveOptions: any[] | undefined;
  products: any[] = [];
  protected countryList: Country[] = [];
  protected facade = inject(CountryListFacade);
  protected homePageService = inject(HomePageService);
  protected router = inject(Router);
  protected busyLoadingHomePage: boolean = false;
  protected banners: Banner[] = [];
  protected brands: IHomePageData[] = [];
  protected categories: IHomePageData[] = [];
  protected offer: IOffer = {} as IOffer;
  protected productList: Product[] = [];
  protected quality_levels: { id: string; name: string }[] = [];
  protected topThreeProducts: Product[] = [];

  ngOnInit() {
    this.facade.countylist$.subscribe((data) => {
      this.countryList = data;
    });
    this.getHomePageData();
  }

  getHomePageData() {
    this.busyLoadingHomePage = true;
    this.homePageService
      .getHomePageData(
        'promoCode,banners,brands,quality_levels,most_soled_products.brand,most_soled_products.actions,categories,offer.products',
      )
      .subscribe({
        next: async (data) => {
          const {
            banners,
            brands,
            categories,
            offer,
            most_soled_products,
            quality_levels,
          } = data;
          banners && (this.banners = banners.data);
          brands && (this.brands = brands.data);
          categories && (this.categories = categories.data);
          offer && (this.offer = offer.data);
          most_soled_products &&
            (this.productList = [...most_soled_products.data]);
          most_soled_products &&
            (this.topThreeProducts = [
              ...(most_soled_products.data as Product[]).splice(0, 3),
            ]);
          quality_levels && (this.quality_levels = quality_levels.data);
        },
        error: (err) => {
          console.log('🚀 ~ ProductListComponent ~ error ~ err:', err);
        },
        complete: () => {
          this.busyLoadingHomePage = false;
        },
      });
  }

  navigateToSop(id: string, type: string) {
    switch (type) {
      case 'brand':
        this.router.navigateByUrl(`/products?brand_id=${id}`);
        break;
      case 'category':
        this.router.navigateByUrl(`/products?category_id=${id}`);
        break;
      case 'qualityLevel':
        this.router.navigateByUrl(`/products?quality_level_id=${id}`);
        break;
    }
  }
  navigateTOProducts() {
    this.router.navigateByUrl(`/products`);
  }
}
