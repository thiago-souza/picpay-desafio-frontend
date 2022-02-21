import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User } from 'app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.user = this.getUser();
  }

  login(email: string, password: string) {
    const url = `${environment.baseURL}/account?email=${email}&password=${password}`

    return this.http.get<User[]>(url).pipe(
      tap(data => data && data.length && this.setUser(data))
    )
  }

  logout() {
    this.user = null;
    localStorage.clear();
    
    this.handleLogin();
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  getUser(): User {
    const data = localStorage.getItem('user');

    if (!data) { return null; }

    const user = JSON.parse(atob(data))

    return user;
  }

  private setUser(data: User[]) {
    this.user = data[0];

    this.saveUserInStorage();
  }

  private saveUserInStorage() {
    const user = JSON.stringify(this.user);

    localStorage.setItem('user', btoa(user))
  }

  private handleLogin() {
    this.router.navigate(['/login'])
  }
}