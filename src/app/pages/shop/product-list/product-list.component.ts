import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCardComponent } from '../../../shared/components';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TranslateModule,ProductCardComponent,SidebarModule,AccordionModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  sidebarVisible:boolean = false;
  activeTab:number|null = null;

}
