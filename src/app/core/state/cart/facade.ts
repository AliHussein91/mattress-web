import { inject, Injectable } from '@angular/core';
import { Country } from '@app/core/modal';
import { Store } from '@ngrx/store';
 import { Observable } from 'rxjs';
   import { map } from 'rxjs/operators';
import { CartSelectors } from './selectors';
import { cartActions } from './actons';
import { ICart } from '@app/shared/types';

function deepClone<T>(source$: Observable<T>): Observable<T> {
  return source$.pipe(map((data) => structuredClone(data)));
}

@Injectable({ providedIn: 'root' })
export class CartFacade {
  #isLoaded = false;
  #store = inject(Store);

  get cart$(): Observable<ICart> {
    this.#assertLoaded();
    return this.#store.select(CartSelectors.selectAll);
  }

//   byId(id: number): Observable<Customer> {
//     this.#assertLoaded();

//     return this.#store
//       .select(fromCustomers.selectById(id))
//       .pipe(filterDefined, deepClone);
//   }

  #assertLoaded() {
    if (!this.#isLoaded) {
      this.#store.dispatch(cartActions.load());
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
      this.#store.dispatch(cartActions.removed());
    }

}
