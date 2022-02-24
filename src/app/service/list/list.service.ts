import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { List } from '../../list/list';
import { Payment } from '../../form-payment/form-payment';
  
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json', 
  })
};

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly BASE_URL = 'http://localhost:3000/tasks/';
  constructor(private http: HttpClient) {}  

  /** buscar a lista de dados */
  getListTask(
    page: number, 
    limit: number, 
    search: string,
    sort: string,
    order: boolean,
  ): Observable<HttpResponse<List[]>> {   
    let params = `?_page=${page}&_limit=${limit}`; 
    if (search !== '') { 
      params += `&q=${search}`
    } 

    if (sort !== '') { 
      params += `&_sort=${sort}&_order=${order ? 'asc' : 'desc'}`
    }  
    return this.http.get<List[]>(this.BASE_URL + params, {observe: 'response'}) 
      .pipe(
        catchError(this.handleError)
      );
  }

  /**get payment */
  getPayment(id: number): Observable<Payment> {
    if (id === null) { 
      return ;
    } 
    let params = `?id=${id}` 
    return this.http.get<Payment>(this.BASE_URL + params) 
      .pipe(
        catchError(this.handleError)
      );
  } 

  /** add novo pagamento */
  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.BASE_URL, payment, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }   

  /** update pagamento */
  updatePayment(id: number, payment: Payment): Observable<Payment> { 
    let params = id; 
    return this.http.put<Payment>(this.BASE_URL + params, payment, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** deletar */
  deletePayment(id: number): Observable<unknown> {
    let params = id;
    return this.http.delete(this.BASE_URL + params, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(errorResponse: Response) {  
    console.log(errorResponse.statusText);  
    return Observable.throw(errorResponse.json.prototype.error || "Server error");  
  } 
}
