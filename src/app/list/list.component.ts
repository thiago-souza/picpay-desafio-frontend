import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';   
import { FormPaymentComponent } from '../form-payment/form-payment.component';
import { ProfileComponent } from '../profile/profile.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; 
import * as moment from 'moment';
 
import { List } from './list';
import { ListService } from '../service/list/list.service';

import { LoginService } from '../service/login/login.service';

import { Payment } from '../form-payment/form-payment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  _listTasks: List[] = [];
  payment: Payment = null;
  page: number = 1;
  limit: number = 5;
  totalCount: number = 0; 
  search: string = '';
  sort: string = '';
  order: boolean = true; 

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions; 

  constructor(
    private listService: ListService, 
    private loginService: LoginService, 
    private modalService: NgbModal, 
    private router: Router) {
    this.modalOptions = {   
      size: 'lg',
    }
  }

  ngOnInit(): void {  
    if (this.loginService.getAccountValid()) {
      this.listTasks()
    } else {
      this.router.navigate(["/"]);
    } 
  } 

  sortList(nameSort: string, newOrder: boolean): void {
    if (nameSort === this.sort) {
      this.order = !newOrder
    } 
    this.sort = nameSort; 
    this.listTasks();
  }

  searchInput(event: any): void {
    this.search = event;
    this.listTasks();
  }

  pageChanged(event: any): void {
      this.page = event;
      this.listTasks()
  }

  limitChanged(event: any): void {
    this.limit = event; 
    // para manter na mesma pagina com o novo limit
    //verificar se com o novo limit a pagina existe 
    //se nao mudar a page para a ultima
    let totalPages = this.totalCount / this.limit 
    if (totalPages < this.page) { 
      this.page = totalPages
    }
    this.listTasks()
  }

  listTasks(): void {
    this.listService
    .getListTask(this.page, this.limit, this.search, this.sort, this.order)
    .subscribe((resp) => { 
        this.totalCount = Number(resp.headers.get('x-total-count'));
        this._listTasks = resp.body
      }
    );   
  }  
  
  logout(): void { 
    this.loginService.logoutAccount();
    this.router.navigate(["/"]);
  } 
  
  //open a modal do profile
  openProfile() {
    const modalRef = this.modalService.open(ProfileComponent, { size: 'lg'}); 
  } 

  //open a modal de cadastrar
  open() {
    const modalRef = this.modalService.open(FormPaymentComponent, { size: 'lg'});
    modalRef.componentInstance.title = 'Adicionar Pagamento'; 
  }  

  //get dados e open a modal de editar
  edit(id: string): void {  
    let searchId = Number(id) 
    if (searchId !== null && searchId > 1) { 
      this.listService
      .getPayment(searchId)
      .subscribe((resp) => {   
          if (resp) {
            this.payment = resp[0]
            const modalRef = this.modalService.open(FormPaymentComponent, { size: 'lg'});
            modalRef.componentInstance.title = 'Editar pagamento'; 
            modalRef.componentInstance.payment = this.payment;
            modalRef.componentInstance.mode = 'edit';
          } else {
            console.log('erroooo')
          }  
        }
      );
    }  
  }

  //get dados e open a modal de deletar
  delete(id: string): void {
    let searchId = Number(id) 
    if (searchId !== null && searchId > 1) { 
      this.listService
      .getPayment(searchId)
      .subscribe((resp) => {   
          if (resp) {
            this.payment = resp[0]
            const modalRef = this.modalService.open(FormPaymentComponent, { size: 'md'});
            modalRef.componentInstance.title = 'Excluir Pagamento'; 
            modalRef.componentInstance.payment = this.payment;
            modalRef.componentInstance.mode = 'delete';
          } else {
            console.log('erroooo')
          }  
        }
      );
    }  
  }

  formatDate (date: Date): string {
    if (date) {
      moment.locale('pt-br');
      return moment(date).format("DD MMM YYYY"); 
    }
  }

  formatTime (date: Date): string {
    if (date) {
      moment.locale('pt-br');
      return moment(date).format('hh:mm A'); 
    }
  } 
  formatValue (value: number): string { 
    return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value); 
  }
}
