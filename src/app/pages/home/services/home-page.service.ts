import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { END_Points } from '@app/core/http/global/global-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  private readonly api = END_Points.home;
  private readonly http = inject(HttpClient);

  constructor() {}

  getCategories(): Observable<any> {
    return this.http.get(this.api.categories);
  }

  getHomePageData(include:string): Observable<any> {
    return this.http.get(this.api.homePageData,{
      params:{
        include,
      }
    });
  }

  getQualityLevel(): Observable<any> {
    return this.http.get(this.api.qualityLevel);
  }

  getStaticContent(): Observable<any> {
    return this.http.get(this.api.staticContent,{
      params:{
        include: 'headerCategories,contacts,headerPromoCode'
      }
    });
  }
}
