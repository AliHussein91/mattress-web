import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, switchMap, tap } from 'rxjs/operators'; 
import { Country } from '@app/core/modal';
import { cartActions } from './actons';
import { END_Points } from '@app/core/http/global/global-config';
import { ICart } from '@app/shared/types';

@Injectable()
export class cartEffects {
  private url = END_Points.user.getCart;

  #actions$ = inject(Actions);
  #store = inject(Store);
  #http = inject(HttpClient);
  #router = inject(Router);

//   add$ = createEffect(() =>
//     this.#actions$.pipe(
//       ofType(customersActions.add),
//       concatMap(({ customer }) =>
//         this.#http.post<Country>(this.url, customer)
//       ),
//       map((customer) => customersActions.added({ customer })),
//       tap(() => this.#router.navigateByUrl('/customer'))
//     )
//   );

//   update$ = createEffect(() =>
//     this.#actions$.pipe(
//       ofType(customersActions.update),
//       concatMap(({ customer }) => this.#http.put<Country>(this.url, customer)),
//       map((customer) => customersActions.updated({ customer })),
//       tap(() => this.#router.navigateByUrl('/customer'))
//     )
//   );

//   remove$ = createEffect(() => {
//     return this.#actions$.pipe(
//       ofType(customersActions.remove),
//       concatMap(({ id }) => this.#http.delete<void>(`${this.url}/${id}`)),
//       map(() => customersActions.removed()),
//       tap(() => this.#router.navigateByUrl('/customer'))
//     );
//   });

  load$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(cartActions.load),
      switchMap(() => this.#http.get<ICart>(this.url)),
      map((res:ICart) => { 
         return cartActions.loaded({
              cart:res
        	})
      })
    )
  );
}
