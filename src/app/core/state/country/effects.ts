import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, switchMap, tap } from 'rxjs/operators'; 
import { Country } from '@app/core/modal';
import { countryListActions } from './actons';
import { END_Points } from '@app/core/http/global/global-config';

@Injectable()
export class CountryEffects {
  private url = END_Points.countries.countryList;

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
      ofType(countryListActions.load),
      switchMap(() => this.#http.get<{ data:Country[] }>(this.url)),
      map(({ data,...res }) => {
          console.log("🚀 ~ CountryEffects ~ content:", res)
        return countryListActions.loaded({
            	countryList: data,
        	})
      })
    )
  );
}
