import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Order } from '../../../shared/types/order';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEg from "@angular/common/locales/ar";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { ProfileService } from '@app/shared/services/profile.service';
import { FormatterSingleton } from '@app/shared/util';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TranslateModule, DatePipe, PaginationComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  translateService = inject(TranslateService)
  profileService = inject(ProfileService)
  formatter = FormatterSingleton.getInstance()
  locale!: string;
  isLoading: boolean = false
  isDisplayingDetails: boolean = false
  userOrders: Order[] = []
  selectedOrder!: Order


  ngOnInit() {
    registerLocaleData(localeEg, 'ar')
    this.locale = this.translateService.currentLang;
    this.translateService.onLangChange
      .subscribe((langChangeEvent: LangChangeEvent) => {
        this.locale = langChangeEvent.lang;
      })
      this.getUserOrders()
  }

  getUserOrders() {
    this.isLoading = true
    // Fetching orders data from server
    this.profileService.getOrders().subscribe({
      next: async orders => {
        const { data, meta } = await this.formatter.formatData(orders);
        console.log(data, meta.pagination);
        this.userOrders = data
      },
      error: error => {
        console.log(error);
      },
      complete: () => { this.isLoading = false }
    })
  }

  displayOrderDetails(orderId: string){
    this.isDisplayingDetails = true
    this.selectedOrder = this.userOrders.filter(order => order.id == orderId)[0]
  }

  ngOnDestroy(): void {
    this.isDisplayingDetails = false
  }
}
