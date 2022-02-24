import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';

import { Login } from '../../login/login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json', 
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {    
  private readonly BASE_URL = 'http://localhost:3000/account/';
  constructor(private http: HttpClient) {} 

  private login : Login = null
   
  getAccount(email: string, password: string): Observable<Login[]> {
    email = email.trim(); 
    password = password.trim();   
    let params = `?email=${email}&password=${password}`;  
    const user = this.http.get<Login[]>(this.BASE_URL + params) 
      .pipe(
        catchError(this.handleError)
      ); 
     
    user.subscribe(login => {
        this.login = login[0]
        this.login.date = String(new Date()); 
        localStorage['local@user'] = JSON.stringify(this.login);
    });
    
    return user
  }

  logoutAccount (): void{
    localStorage['local@user'] = [];
  }

  getAccountValid(): Boolean {
    let userLocal = localStorage['local@user'];  
  	userLocal = userLocal ?  JSON.parse(userLocal) : [];  
    if(userLocal && userLocal.date){  
      let dateLogin = new Date(userLocal.date) 
      const diffDate = moment()
        .diff(moment(dateLogin));
      const tempDate = moment.duration(diffDate);
      const minutos = Math.floor(tempDate.asMinutes()); 
      if (minutos > 30) {
        return false
      } else {
        return true
      }
    }  
    return false
  }

  handleError(errorResponse: Response) {  
    console.log(errorResponse.statusText);  
    return Observable.throw(errorResponse.json.prototype.error || "Server error");  
  } 
}
