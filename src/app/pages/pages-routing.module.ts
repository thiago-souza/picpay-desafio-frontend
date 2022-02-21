import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedOutGuard } from 'app/auth/guards/logged-out.guard';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {path: '', redirectTo: 'payments', pathMatch: 'full'},
  {path: 'payments', component: PaymentsComponent, canLoad: [LoggedOutGuard], canActivate: [LoggedOutGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
