import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '../auth/auth.module';
import { PagesModule } from 'app/pages/pages.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    PagesModule
  ],
  exports: [
    AuthModule,
    PagesModule
  ]
})
export class CoreModule { }
