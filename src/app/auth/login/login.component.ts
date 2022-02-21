import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription, timer } from 'rxjs';

import { AuthService } from '../auth.service';
import { User } from 'app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user = new User(null, null);
  erroLogin = false;
  loading = false;
  submitted = false;
  fieldsFocused = { email: false, password: false };

  subscriptions: Subscription[] = [];

  constructor(
    private _router: Router,
    private _service: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(!this.subscriptions) { return;}

    this.subscriptions.forEach(sub => sub && sub.unsubscribe());
  }

  isFocused(fieldName: string): boolean {
    return this.fieldsFocused[fieldName] === true;
  }

  onSubmit(event: Event, form: NgForm): void {
    event.preventDefault();

    this.submitted = true;
    this.erroLogin = false;
    
    console.log(form)
    if (form.invalid) { return; }

    this.loading = true;

    this.subscriptions.push(
      this._service.login(this.user.email, this.user.password).subscribe(
        (data) => {
          if (!data || !data.length) {
            return this.handleError();
          }

          this.loading = false;
          this._router.navigate(['/payments'])
        },
        (err) => {
          this.handleError();
          console.error(err);
        }
      )
    );
  }

  private handleError(): void {
    this.erroLogin = true;
    this.loading = false;

    this.hiddenError();
  }

  private hiddenError(): void {
    this.subscriptions.push(
      timer(3000).subscribe(() => this.erroLogin = false)
    );
  }
}
