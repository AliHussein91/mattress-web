import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { END_Points } from '@app/core/http/global/global-config';
import { Observable } from 'rxjs';
import { ProductListFilter } from '../models';
import { APIResponse, ICategory, IQualityLevel, Product } from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly api = END_Points.product;
  private readonly categoryAPI = END_Points.categories;
  private readonly http = inject(HttpClient);

  constructor() {}

  getProductList(filters: ProductListFilter): Observable<APIResponse<Product[]>> {
    return this.http.get<APIResponse<Product[]>>(this.api.list, {
      params: {
        ...(filters.country_id && {
          country_id: filters.country_id.toString(),
        }),
        ...(filters.brand_id && { brand_id: filters.brand_id.toString() }),
        ...(filters.category_id && {
          category_id: filters.category_id.toString(),
        }),
        ...(filters.quality_level_id && {
          quality_level_id: filters.quality_level_id.toString(),
        }),
        ...(filters.offer && { offer: filters.offer.toString() }),
      },
    });
  }

  getProductDetails(id:string): Observable< Product> {
    return this.http.get<Product>(this.api.getDetails(id));
  }

  getCategoriesByBrandId(id:string): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoryAPI.getCategoriesByBrandId(id));
  }
  getQualityLevelsByCategoryId(id:string): Observable<IQualityLevel[]> {
    return this.http.get<IQualityLevel[]>(this.categoryAPI.getQualityLevelsByCategoryId(id));
  }
}
