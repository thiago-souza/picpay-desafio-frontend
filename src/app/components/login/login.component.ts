import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  API_URL = "http://localhost:3000/"
  hide = true
  loginForm!:FormGroup
  imgManSrc = 'assets/man-doing-online-payment.svg'
  imgLogoSrc = 'assets/Logo.svg'

  constructor(
    private formBuilder:FormBuilder, 
    private _http:HttpClient, 
    private route:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  logIn(){
    this._http.get<any>(this.API_URL + "account").subscribe(response => {
      const user = response.find((res:any) => {
        console.log('res.email', res.email === this.loginForm.value.email && res.password === this.loginForm.value.password)
        return res.email === this.loginForm.value.email && res.password === this.loginForm.value.password
      })
      if(user){
        this.loginForm.reset()
        this.route.navigate(['home'])
      } else {
        alert('Email ou senhas estão incorretos')
      }
    },(err: any) =>{
      alert('Falha ao tentar se conectar')
    })
  }

  getErrorMessage() {
    if (this.loginForm.invalid) {
      return 'Entre com um valor valido';
    }
  }

}
