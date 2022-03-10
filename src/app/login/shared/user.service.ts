import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly JWT_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJsb2NhbGhvc3Q6MzAwMCIsIlVzZXJuYW1lIjoidXN1YXJpb0BnbWFpbC5jb20iLCJleHAiOjE2NDY4NDI3OTcsImlhdCI6MTY0Njg0Mjc5N30.UOTGdZcXDw90wCsnHuxkNFPiU1faZebvBb3CinjaB14';

  constructor( private http: HttpClient ) { }

  login(email: string, password: string): Observable<User> {
    let params = new HttpParams().appendAll({email, password});
    return this.http.get<User[]>(environment.apiURL + 'account/', {params}).pipe(
      map(users => {
        if (users.length == 0)
          throw throwError('E-mail/senha inválidos');
        this.storeJWTToken();
        return users[0];
    }));
  }

  private storeJWTToken() {
    localStorage.setItem('ACCESS_TOKEN', this.JWT_TOKEN);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
