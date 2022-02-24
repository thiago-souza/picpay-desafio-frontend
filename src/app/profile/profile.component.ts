import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Login } from '../login/login';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  dataUser: Login = null;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      const user = JSON.parse(localStorage['local@user']); 
      this.dataUser = user;
  } 
}
