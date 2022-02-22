import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Payment } from 'app/shared/interfaces/payment.interface';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent implements OnInit {
  @Input() payments: Payment[] = [];

  @Output() onSortBy = new EventEmitter<string>();
  @Output() onFilter = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<Payment>();
  @Output() onEdit = new EventEmitter<Payment>();
  
  filter = '';

  constructor() { }

  ngOnInit(): void {
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
