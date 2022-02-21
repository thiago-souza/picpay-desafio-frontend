import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/auth/auth.service';
import { User } from 'app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = null;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

}
