import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Payment } from 'app/shared/interfaces/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient,) {}

  list(page = 1, limit = 5, sort = 'date', order = 'asc') {
    const url = `${environment.baseURL}/tasks?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    return this.http.get<Payment[]>(url, {observe: 'response'});
  }

  show(id: number) {
    return this.http.get(`${environment.baseURL}/tasks${id}`);
  }

  create(dto: Payment) {
    return this.http.post(`${environment.baseURL}/tasks`, dto);
  }

  update(dto: Payment) {
    return this.http.put(`${environment.baseURL}/tasks/${dto.id}`, dto);
  }

  delete(dto: Payment) {
    return this.http.delete(`${environment.baseURL}/tasks/${dto.id}`);
  }

  listByUser(filter: string, page = 1, limit = 5, sort = 'date', order = 'asc') {
    console.log(filter)
    const url = `${environment.baseURL}/tasks?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&name_like=${filter}`;
    return this.http.get<Payment[]>(url, {observe: 'response'});
  }
}
