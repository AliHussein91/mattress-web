import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { END_Points } from '@app/core/http/global/global-config';
import { ICart } from '@app/shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  #api = END_Points.user;
  #http = inject(HttpClient);

  getCart(): Observable<ICart> {
    return this.#http.get<ICart>(this.#api.getCart);
  }

  applyPromoCode(body:{}): Observable<any> {
    return this.#http.post<any>(this.#api.applyPromoCode, {
      data: {
        type: 'apply_promocode',
        id: null,
        attributes: body,
      },
    });
  }
}
