import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Order } from '../../../shared/types/order';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEg from "@angular/common/locales/ar";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TranslateModule, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  constructor(private _translateService: TranslateService) {
    registerLocaleData(localeEg, 'ar')
  }

  locale!: string;


  ngOnInit() {
    this.locale = this._translateService.currentLang;
    // don't forget to unsubscribe!
    this._translateService.onLangChange
      .subscribe((langChangeEvent: LangChangeEvent) => {
        this.locale = langChangeEvent.lang;
      })
  }
  
  @Input() orders: Order[] = [{
    orderNo: 15484,
    date: new Date(),
    status: 'Delivered',
  },
  {
    orderNo: 15484,
    date: new Date(),
    status: 'Out for devliery',
  },
  {
    orderNo: 15484,
    date: new Date(),
    status: 'Canceled',
  },
  {
    orderNo: 15484,
    date: new Date(),
    status: 'Delivered',
  },
  {
    orderNo: 15484,
    date: new Date(),
    status: 'Canceled',
  }]
}
