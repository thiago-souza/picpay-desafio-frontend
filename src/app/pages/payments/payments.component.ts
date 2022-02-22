import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { PaymentsService } from './payments.service';
import { Payment } from 'app/shared/interfaces/payment.interface';
import { PaginationPageChangeEvent } from 'app/shared/interfaces/pagination.interface';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  newPaymentModalRef?: BsModalRef;
  removePaymentModalRef?: BsModalRef;
  bsConfig?: Partial<BsDatepickerConfig> = { containerClass: 'theme-orange' }

  newPaymentForm: FormGroup;
  payment: Payment = null;
  payments: Payment[] = [];
  loading = false;
  submitted = false;
  totalItems = 0;
  limit = 5;
  page = 1;
  sort = '';
  filter = '';


  constructor(
    private _modalService: BsModalService,
    private _localeService: BsLocaleService,
    private _fb: FormBuilder,
    private _service: PaymentsService
  ) {
    this._localeService.use('pt-br');
    this.createForm();
  }

  ngOnInit(): void {
    this.initForm();
    this.getPayments();
  }

  closeModalNewPayment(): void {
    this.newPaymentModalRef.hide();
    this.newPaymentForm.reset();
    this.submitted = false;
    this.payment = null;
  }

  closeModalRemovePayment(): void {
    this.removePaymentModalRef.hide();
    this.payment = null;
  }
 
  openModalNewPayment(template: TemplateRef<any>, payment = this.payment): void {
    this.payment = payment;
    this.initForm();
    this.newPaymentModalRef = this._modalService.show(template, { class: 'modal-lg' });
  }

  openModalRemovePayment(template: TemplateRef<any>, payment = this.payment): void {
    this.payment = payment;
    this.removePaymentModalRef = this._modalService.show(template);
  }

  changePage(event: PaginationPageChangeEvent) {
    this.limit = event.itemsPerPage;
    this.page = event.page;
    this.getPayments();
  }

  sortBy(field: string): void {
    this.sort = field;
    this.getPayments();
  }

  filterBy(filter: string): void {
    this.filter = filter;
    if (!filter) {
      this.getPayments();
    } else {
      this.getPaymentsFiltered();
    }
  }

  savePayment(event: Event): void {
    event.preventDefault();  
    this.submitted = true;

    if (!this.formIsValid()) { return; }

    this.loading = true;

    if (!this.payment) {
      this.createPayment();
    } else {
      this.updatePayment();
    }
  }

  hasError(name: string): boolean {
    return this.newPaymentForm.get(name).invalid && (this.newPaymentForm.get(name).dirty 
    || this.newPaymentForm.get(name).touched);
  }

  hasErrorAndSubmittedForm(name: string): boolean {
    return this.newPaymentForm.get(name).invalid && this.submitted;
  }

  private formIsValid(): boolean {
    return this.newPaymentForm.valid;
  }

  private initForm(): void {
    if (this.payment) {
      const { id, name, value, date, title } = this.payment;

      this.newPaymentForm.patchValue({ id, name, value, date, title });
    }
  }

  private createForm(): void {
    this.newPaymentForm = this._fb.group({
      id: this._fb.control(null, []),
      name: this._fb.control(null, [Validators.required]),
      value: this._fb.control(null, [Validators.required]),
      date: this._fb.control(null, [Validators.required]),
      title: this._fb.control(null, [])
    });
  }

  private getPayments(): void {
    this._service.list(this.page, this.limit, this.sort).subscribe((res) => {
      const { body, headers } = res;
      this.payments = body;
      this.totalItems = Number(headers.get('X-Total-Count'));
    })
  }

  private getPaymentsFiltered(): void {
    this._service.listByUser(this.filter, this.page, this.limit, this.sort).subscribe((res) => {
      const { body, headers } = res;
      this.payments = body;
      this.totalItems = Number(headers.get('X-Total-Count'));
    })
  }

  private createPayment(): void {
    const dto: Payment = this.newPaymentForm.value;

    this._service.create(dto).subscribe(() => {
      this.loading = false;
      this.closeModalNewPayment();
      this.getPayments();
    }, (err) => {
      this.loading = false;
      this.submitted = false;
      console.error(err);
    })
  }

  private updatePayment(): void {
    const dto: Payment = this.newPaymentForm.value;

    this._service.update(dto).subscribe(() => {
      this.loading = false;
      this.closeModalNewPayment();
      this.getPayments();
    }, (err) => {
      this.loading = false;
      this.submitted = false;
      console.error(err);
    })
  }

  deletePayment(event: Event): void {
    event.preventDefault(); 

    this.loading = true;
    this._service.delete(this.payment).subscribe(() => {
      this.loading = false;
      this.closeModalRemovePayment();
      this.getPayments();
    },  (err) => {
      this.loading = false;
      this.submitted = false;
      console.error(err);
    })
  }

}
