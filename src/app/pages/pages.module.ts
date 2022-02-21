import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    ProfileComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
