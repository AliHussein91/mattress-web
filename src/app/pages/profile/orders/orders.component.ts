import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Order } from '../../../shared/types/order';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEg from '@angular/common/locales/ar';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ProfileService } from '@app/shared/services/profile.service';
import { ActionsUtilties, FormatterSingleton } from '@app/shared/util';
import { Pagination } from '@app/shared/types';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { IAction } from '@app/shared/types/action';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    TranslateModule,
    DatePipe,
    PaginationComponent,
    NgClass,
    NgIf,
    SkeletonModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent
  extends ActionsUtilties
  implements OnInit, OnDestroy
{
  translateService = inject(TranslateService);
  profileService = inject(ProfileService);
  #router = inject(Router);
  formatter = FormatterSingleton.getInstance();
  locale!: string;
  isLoading: boolean = false;
  isDisplayingDetails: boolean = false;
  userOrders: Order[] = [];
  selectedOrder!: Order;
  pagination: Pagination = {} as Pagination;
  filter = {
    page: 1,
  };
  ngOnInit() {
    registerLocaleData(localeEg, 'ar');
    this.locale = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe(
      (langChangeEvent: LangChangeEvent) => {
        this.locale = langChangeEvent.lang;
      },
    );
    this.getUserOrders();
  }

  getUserOrders() {
    this.isLoading = true;
    // Fetching orders data from server
    this.profileService.getOrders(this.filter).subscribe({
      next: async (orders) => {
        const { data, meta } = await this.formatter.formatData(orders);
        this.userOrders = data;
        console.log(
          '🚀 ~ OrdersComponent ~ next: ~ this.userOrders:',
          this.userOrders,
        );
        this.pagination = meta.pagination;
        console.log(
          '🚀 ~ OrdersComponent ~ next: ~ meta.pagination:',
          meta.pagination,
        );
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  displayOrderDetails(orderId: string) {
    this.isDisplayingDetails = true;
    this.selectedOrder = this.userOrders.filter(
      (order) => order.id == orderId,
    )[0];
    console.table(this.selectedOrder);
  }

  ngOnDestroy(): void {
    this.isDisplayingDetails = false;
  }
  navigateToCompletePayment(action: IAction) {
    // Logic to navigate to the complete payment page
    this.#router.navigateByUrl(
      `/payment/card?paymentUrl=${action.endpoint_url}`,
    );
  }
}
