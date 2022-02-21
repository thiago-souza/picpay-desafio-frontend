import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    return this.checkAuthentication();
  }
  canLoad(): boolean {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
    const loggedIn = this.authService.isLoggedIn();

    if (loggedIn) {
      this.router.navigate(['/payments']);
    }

    return loggedIn;
  }
}
