import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '@app/shared/types';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [TranslateModule, PaginatorModule,CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Output() activetedPageNumber = new EventEmitter<number>();
  @Input() pagination: Pagination = new Pagination();
  activePageNumber: number = 1; 
  onPageChange(pageNumber: number) {
    this.activePageNumber = pageNumber;
    this.activetedPageNumber.emit(this.activePageNumber);
  }
  counter() {
    return new Array(this.pagination.total_pages);
}
}
