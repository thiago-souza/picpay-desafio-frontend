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
  
  filter = '';

  constructor() { }

  ngOnInit(): void {
  }

  sortBy(field: string) {
    this.onSortBy.emit(field);
  }

  filterBy() {
    this.onFilter.emit(this.filter)
  }
 
}
