import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedOutGuard } from 'app/auth/guards/logged-out.guard';
import { PagesComponent } from './pages.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: PagesComponent, canLoad: [LoggedOutGuard], canActivate: [LoggedOutGuard], children: [
    {path: '', redirectTo: 'payments', pathMatch: 'full'},
    {path: 'payments', component: PaymentsComponent},
    {path: 'profile', component: ProfileComponent}
  ]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
