import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Order } from '../../../shared/types/order';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TranslateModule, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
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
