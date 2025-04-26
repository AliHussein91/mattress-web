import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { END_Points } from '@app/core/http/global/global-config';
import { map, Observable } from 'rxjs';
import { ProductListFilter } from '../models';
import {
  APIResponse,
  ICategory,
  IQualityLevel,
  Product,
} from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly api = END_Points.product;
  private readonly categoryAPI = END_Points.categories;
  private readonly userAPI = END_Points.profile;
  private readonly http = inject(HttpClient);

  constructor() {}

  getProductList(
    filter: ProductListFilter,
  ): Observable<APIResponse<Product[]>> {
    return this.http
      .get<APIResponse<Product[]>>(this.api.list, {
        params: {
          page: filter.page.toString(),
          per_page: filter.per_page.toString(),
          ...(filter.country_id && {
            country_id: filter.country_id.toString(),
          }),
          ...(filter.brand_id && { brand_id: filter.brand_id.toString() }),
          ...(filter.category_id && {
            category_id: filter.category_id.toString(),
          }),
          ...(filter.quality_level_id && {
            quality_level_id: filter.quality_level_id.toString(),
          }),
          ...(filter.offer && { offer: filter.offer.toString() }),
          ...(filter.search_key && { search_key: filter.search_key }),
        },
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
      );
  }

  getProductDetails(id: string): Observable<Product> {
    return this.http.get<Product>(this.api.getDetails(id), {
      params: {
        // country_id: localStorage.getItem('selectedCountryId')?? '1' ,
      },
    });
  }

  getCategoriesByBrandId(id: string): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      this.categoryAPI.getCategoriesByBrandId(id),
    );
  }
  getQualityLevelsByCategoryId(id: string): Observable<IQualityLevel[]> {
    return this.http.get<IQualityLevel[]>(
      this.categoryAPI.getQualityLevelsByCategoryId(id),
    );
  }
  rateProduct(productId: string, body: {}): Observable<IQualityLevel[]> {
    return this.http.post<IQualityLevel[]>(
      this.userAPI.rateProduct(productId),
      {
        data: {
          type: 'user_rate',
          id: null,
          attributes: body,
        },
      },
    );
  }
}
