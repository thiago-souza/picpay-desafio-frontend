import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return this.checkAuthentication();
  }
  canLoad(): boolean {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
    const loggedIn = this.authService.isLoggedIn();

    if (!loggedIn) {
      this.authService.handleLogin();
    }

    return loggedIn;
  }
}
