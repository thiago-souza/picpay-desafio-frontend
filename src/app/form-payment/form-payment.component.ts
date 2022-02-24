import { Component, OnInit, Input } from '@angular/core'; 
import { FormBuilder, Validators } from '@angular/forms'; 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';  
import * as moment from 'moment'; 

import { ListService as PaymentService } from '../service/list/list.service';
import { Payment } from './form-payment';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  providers: [PaymentService],
  styleUrls: ['./form-payment.component.scss']
})

export class FormPaymentComponent implements OnInit {

  @Input() title;
  @Input() content;
  payment = null; 
  mode = '';

  faCheckCircle = faCheckCircle;

  formPayment = this.fb.group({
    name: ['', [Validators.required]],
    username: [''],
    date: ['', [Validators.required]], 
    value: ['', [Validators.required]], 
    title: ['', [Validators.required]],   
    id: [''],
    image: [''],
    isPayed: [''],
  });

  loadingSubmit: Boolean = false;  

  constructor(
      private fb: FormBuilder, 
      private paymentService : PaymentService,
      public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {  
    if(this.payment?.id) { 
      this.formPayment.controls.id.setValue(this.payment.id);
      this.formPayment.controls.name.setValue(this.payment.name);
      this.formPayment.controls.username.setValue(this.payment.username);
      this.formPayment.controls.title.setValue(this.payment.title); 
      this.formPayment.controls.date.setValue(moment(this.payment.date).format('DD-MM-YYYY'));
      this.formPayment.controls.value.setValue(this.payment.value);
      this.formPayment.controls.isPayed.setValue(this.payment.isPayed);
      this.formPayment.controls.image.setValue(this.payment.image); 
    }
  }

  getContent(name: any) {   
    if(this.formPayment.get(name).value){
      return 'field-content'
    } 
    return 'field-empty'
  } 

  onSubmit() {  
    // The server will generate the id for this new hero
    this.loadingSubmit = true 
    if (this.formPayment.valid) { 
        moment.locale('pt-br'); 
        let date = this.formPayment.get('date').value;
        let newDate = moment(date, "DDMMYYYY").format('YYYY-MM-DD');  
        this.formPayment.controls.date.setValue(newDate);
        if (!this.formPayment.get('id')) {
          //cadastrar 
          this.addPayment();
        } else {
          this.updatePayment();
        }
    }
  }
  
  addPayment () {
    this.loadingSubmit = true 
    const newPayment: Payment = this.formPayment.value as Payment; 
    newPayment.username = this.formPayment.get('name').value; 
      this.paymentService
        .addPayment(newPayment)
        .subscribe(payment => { 
            setTimeout(()=>{   
              this.content = "Dados cadastrados com sucesso!" 
            }, 3000);  
        });  
      setTimeout(()=>{   
        this.loadingSubmit = false
      }, 3000); 
  }

  updatePayment () {
    this.loadingSubmit = true  
    const newPayment: Payment = this.formPayment.value as Payment;  
    const id = Number(this.formPayment.get('id').value); 
    this.paymentService
      .updatePayment(id, newPayment)
      .subscribe(payment => { 
          setTimeout(()=>{   
            this.content = "Dados editado com sucesso!" 
            this.loadingSubmit = false
          }, 3000);  
      });
    setTimeout(()=>{   
      this.loadingSubmit = false
    }, 3000); 
  }

  delete () { 
    this.loadingSubmit = true
    const id = Number(this.formPayment.get('id').value);
    this.paymentService
      .deletePayment(id)
      .subscribe(payment => { 
          setTimeout(()=>{   
            this.content = "Dados excluídos com sucesso!" 
          }, 3000);  
      });  
    setTimeout(()=>{   
      this.loadingSubmit = false
    }, 3000); 
  }

  formateDate (date: Date): string { 
    moment.locale('pt-br'); 
    return moment(date).format("DD/MM/YYYY"); 
  }
  
  formatValue (value: number): string { 
    return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value); 
  }

}
