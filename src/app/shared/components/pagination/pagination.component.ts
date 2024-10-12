import { LocalizeService } from './../../services/localize.service';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Pagination } from '@app/shared/types';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [TranslateModule, PaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Output() activetedPageNumber = new EventEmitter<number>();
  @Input() pagination: Pagination = new Pagination();


  localizeService = inject(LocalizeService)
  @Input()  appendTo!: any
  active: number = 1;
  locale: string = `${this.localizeService.lang()}-AE`
  onPageChange(pageNumber: number) {
    this.active = pageNumber;
    this.activetedPageNumber.emit(pageNumber);
  }
}
