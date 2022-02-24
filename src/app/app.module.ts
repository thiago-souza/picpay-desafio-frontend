import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { CurrencyMaskModule } from "ng2-currency-mask"; 
import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProfileComponent } from './profile/profile.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [	
    AppComponent, LoginComponent, ListComponent, FormPaymentComponent, ProfileComponent,
   ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {path: '',  component: LoginComponent},
      {path: 'list', component: ListComponent}, 
    ]),
    FontAwesomeModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    NgxLoadingModule.forRoot({}),
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
