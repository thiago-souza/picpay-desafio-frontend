import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaginationPageChangeEvent } from 'app/shared/interfaces/pagination.interface';
import { Payment } from 'app/shared/interfaces/payment.interface';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent implements OnInit {
  @Input() payments: Payment[] = [];
  @Input() totalItems: number;
  @Input() limit: number;
  @Input() page: number;

  @Output() onSortBy = new EventEmitter<string>();
  @Output() onFilter = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<Payment>();
  @Output() onEdit = new EventEmitter<Payment>();
  @Output() onChangePage = new EventEmitter<PaginationPageChangeEvent>();
  
  filter = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  pageChanged(event: PaginationPageChangeEvent) {
    this.onChangePage.emit(event);
  }

  edit(payment: Payment): void {
    this.onEdit.emit(payment);
  }

  remove(payment: Payment): void {
    this.onRemove.emit(payment);
  }

  sortBy(field: string): void {
    this.onSortBy.emit(field);
  }

  filterBy(): void {
    this.onFilter.emit(this.filter)
  }
 
}
