import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, Validators } from '@angular/forms';  
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { Router } from '@angular/router'; 

import { Login } from './login';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService],
  styleUrls: ['./login.component.scss']
})  
export class LoginComponent implements OnInit { 
  login: Login[] = [];
  passw: Boolean = false;

  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',  Validators.required], 
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private fb: FormBuilder,  
    private loginService : LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.getAccountValid()) {
      this.router.navigate(["/list"]);
    } 
  }  

  onSubmit() {    
    if (this.formLogin.valid) {
      this.loginService 
        .getAccount(this.formLogin.get('email').value, this.formLogin.get('password').value)
        .subscribe(login => {  
            if(login[0]) {
              //redirect 
              this.router.navigate(["/list"]);
            }
        });  
    } 
  } 
 
  seePassword(): void { 
    this.passw = !this.passw
  }

  getContent(name: any) {   
    if(this.formLogin.get(name).value){
      return 'field-content'
    } 
    return 'field-empty'
  } 
  
  getErrors(errors: any) {
    console.log('erors', errors)
  }

  onBlurEvent(event: any){
    console.log(event.target.value);
  }
} 
