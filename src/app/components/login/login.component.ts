import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  template: `
    <div>
      <h1>Филатов Фёдор Романович P3222 66347</h1>

      <label for="name">Name: </label>
      <input type="text" id="name" name="name" [(ngModel)]="name"/>
      <br/>

      <label for="password">Password: </label>
      <input type="text" id="password" name="password" [(ngModel)]="password"/>
      <br/>

      <button type="button" (click)="login(name, password)">Login</button>
      <br/>

      <button type="button" (click)="registration(name,  password)">Registration</button>
      <br/>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  name: string = "";
  password: string = "";
  constructor(private loginService: LoginService){}
  registration(name: string, password: string){
    this.loginService.postRequest(name, password, "registration");
  }
  login(name: string, password: string) {
    this.loginService.postRequest(name, password, "login");
  }
}
