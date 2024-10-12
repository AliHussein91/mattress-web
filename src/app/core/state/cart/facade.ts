import { inject, Injectable } from '@angular/core';
import { Country } from '@app/core/modal';
import { Store } from '@ngrx/store';
 import { Observable } from 'rxjs';
   import { map } from 'rxjs/operators';
import { fromCountries } from './selectors';
import { countryListActions } from './actons';

function deepClone<T>(source$: Observable<T>): Observable<T> {
  return source$.pipe(map((data) => structuredClone(data)));
}

@Injectable({ providedIn: 'root' })
export class CountryListFacade {
  #isLoaded = false;
  #store = inject(Store);

  get countylist$(): Observable<Country[]> {
    this.#assertLoaded();
    return this.#store.select(fromCountries.selectAll);
  }

//   byId(id: number): Observable<Customer> {
//     this.#assertLoaded();

//     return this.#store
//       .select(fromCustomers.selectById(id))
//       .pipe(filterDefined, deepClone);
//   }

  #assertLoaded() {
    if (!this.#isLoaded) {
      this.#store.dispatch(countryListActions.load());
      this.#isLoaded = true;
    }
  }

//   remove(id: number) {
//     this.#store.dispatch(customersActions.remove({ id }));
//   }

//   update(customer: Customer) {
//     this.#store.dispatch(customersActions.update({ customer }));
//   }

//   add(customer: Customer) {
//     this.#store.dispatch(customersActions.add({ customer }));
//   }

removedAll() {
      this.#store.dispatch(countryListActions.removed());
    }

}
