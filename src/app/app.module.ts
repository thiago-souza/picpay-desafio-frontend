import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { TasksModule } from './tasks/tasks.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AvatarModule } from 'ngx-avatar';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import * as moment from 'moment';


registerLocaleData(localePt);

// inicializando o Moment.js

moment.locale('pt-br');
moment.updateLocale('pt-br', {
  monthsShort : [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ]
}); // no locale instalado pela biblioteca, os meses estão com letras minúsculas

@NgModule({
  declarations: [	
    AppComponent,
   ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    AvatarModule,

    LoginModule,
    TasksModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
