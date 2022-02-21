import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/auth/auth.service';
import { User } from 'app/shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User = null;
  showMenu = false;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    this._authService.logout();
  }

}