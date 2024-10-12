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

  getCategories(country_id:number): Observable<any> {
    return this.http.get(this.api.categories,{
      params:{
        country_id:country_id.toString()
      }
    });
  }

  getHomePageData(country_id:number,include:string): Observable<any> {
    return this.http.get(this.api.homePageData,{
      params:{
        country_id:country_id.toString(),
        include,
      }
    });
  }

  getQualityLevel(country_id:number): Observable<any> {
    return this.http.get(this.api.qualityLevel,{
      params:{
        country_id:country_id.toString()
      }
    });
  }
}
