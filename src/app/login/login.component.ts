import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = null;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }


  login() {
    if (this.form.invalid)
      return;

    this.authService.login(this.form.controls.email.value, this.form.controls.password.value).subscribe(response => {
      this.router.navigate(['tasks'])
    }, error => {
      console.log(error)
    });
  }

}