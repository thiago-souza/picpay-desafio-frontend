import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { PaymentsService } from './payments.service';
import { Payment } from 'app/shared/interfaces/payment.interface';

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
  loading = false;
  submitted = false;

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
  }

  closeModalNewPayment(): void {
    this.newPaymentModalRef.hide();
    this.newPaymentForm.reset();
    this.submitted = false;
  }
 
  openModalNewPayment(template: TemplateRef<any>, payment = this.payment): void {
    this.payment = payment;
    this.initForm();
    this.newPaymentModalRef = this._modalService.show(template, { class: 'modal-lg' });
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
      const { id, user, value, date, title } = this.payment;

      this.newPaymentForm.patchValue({ id, user, value, date, title });
    }
  }

  private createForm(): void {
    this.newPaymentForm = this._fb.group({
      id: this._fb.control(null, []),
      user: this._fb.control(null, [Validators.required]),
      value: this._fb.control(null, [Validators.required]),
      date: this._fb.control(null, [Validators.required]),
      title: this._fb.control(null, [])
    });
  }

  private createPayment() {
    const dto: Payment = this.newPaymentForm.value;

    this._service.create(dto).subscribe(() => {
      this.loading = false;
      this.closeModalNewPayment();
    }, (err) => {
      this.loading = false;
      this.submitted = false;
      console.error(err);
    })
  }

  private updatePayment() {}

}
