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
      <button type="button" (click)="test()">Test</button>

    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  response: string = '';
  constructor(private loginService: LoginService){}
  test() {
    this.loginService.test();
  }
  registration(name: string, password: string){
    console.log(1);
    this.loginService.registerUser(name, password)
      .subscribe({
        next:(data: any) => {
          console.log(3);
          console.log(data);
          this.response=data;
        },
        error: error => console.log(error)
      });
  }
  // registrationByMe(name: string, password: string){
  //   console.log("me");
  //   this.loginService.registerUserByMe(name, password)
  //     .subscribe({
  //       next:(data: any) => {
  //         console.log("me_2");
  //         console.log(data);
  //         this.response=data;
  //       },
  //       error: error => console.log(error)
  //     });
  // }
  login(name: string, password: string) {
    console.log("login : " + name + " " + password);
  }
}
