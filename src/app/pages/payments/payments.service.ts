import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Payment } from 'app/shared/interfaces/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient,) {}

  list() {
    return this.http.get(`${environment.baseURL}/tasks`);
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
}
