import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { END_Points } from '@app/core/http/global/global-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private readonly api = END_Points.lookup;
  private readonly http = inject(HttpClient);
constructor() { }

getLookup(filters?: string): Observable<any> {
  return this.http.get<any>(this.api.lookup, {
    params: {
      ...(filters && {
        include: filters,
      }), 
    },
  });
}

}
