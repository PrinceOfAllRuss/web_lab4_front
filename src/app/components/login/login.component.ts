import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { LoginService } from '../../services/login.service';
import {Router} from "@angular/router";

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
      <p #errorName id="error_name" class="error"></p>

      <label for="password">Password: </label>
      <input type="password" id="password" name="password" [(ngModel)]="password"/>
      <p #errorPassword id="error_password" class="error"></p>

      <label for="secret">Secret: </label>
      <input type="text" id="secret" name="secret" [(ngModel)]="secret">
      <p #errorSecret id="error_secret" class="error"></p>

      <button type="button" class="button" (click)="login()">Login</button>
      <br/>
      <button type="button" class="button" (click)="registration()">Registration</button>
    </div>
    <div>
      <p #errorFromServer id="server_msg" class="error"></p>
      <p #msgFromServer id="server_msg"></p>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  name: string = "Fedor";
  password: string = "12345678";
  secret: string = "";
  @ViewChild("errorName", {static: false}) errorName!: ElementRef;
  @ViewChild("errorPassword", {static: false}) errorPassword!: ElementRef;
  @ViewChild("errorSecret", {static: false}) errorSecret!: ElementRef;
  @ViewChild("errorFromServer", {static: false}) errorFromServer!: ElementRef;
  @ViewChild("msgFromServer", {static: false}) msgFromServer!: ElementRef;
  constructor(private loginService: LoginService, private router: Router){
    if (localStorage.getItem('token') == undefined || localStorage.getItem('token') == '') {
      localStorage.setItem('token', '');
      console.log(1);
    } else {
      this.router.navigate(['home']);
      console.log(2);
    }
  }
  async ngAfterViewInit() {
    // localStorage.setItem('token', '');
  }

  async registration() {
    if (this.checkDataForRegistration()) {
      this.errorName.nativeElement.innerHTML = '';
      this.errorPassword.nativeElement.innerHTML = '';
      this.errorSecret.nativeElement.innerHTML = '';
      let result: {msg: string, condition: boolean} = await this.loginService
        .registrationRequest(this.name, this.password);
      if (!result.condition) {
        this.errorFromServer.nativeElement.innerHTML = result.msg;
      } else {
        this.msgFromServer.nativeElement.innerHTML = 'Your Authentication Code: ' + result.msg;
      }
    }
  }
  async login() {
    if (this.checkDataForLogin()) {
      this.errorName.nativeElement.innerHTML = '';
      this.errorPassword.nativeElement.innerHTML = '';
      this.errorSecret.nativeElement.innerHTML = '';
      let result: {msg: string, condition: boolean} = await this.loginService
        .loginRequestTwo(this.name, this.password, this.secret);
      if (result.condition) {
        await this.router.navigate(['home']);
      } else {
        this.errorSecret.nativeElement.innerHTML = result.msg;
      }
    }
  }
  checkDataForRegistration(): boolean {
    let condition = true;
    if (this.name == '') {
      this.errorName.nativeElement.innerHTML = 'Write name';
      condition = false;
    } else {
      this.errorName.nativeElement.innerHTML = '';
    }
    if (this.password == '') {
      this.errorPassword.nativeElement.innerHTML = 'Write password';
      condition = false;
    } else {
      this.errorPassword.nativeElement.innerHTML = '';
    }
    if (this.password.length < 8) {
      this.errorPassword.nativeElement.innerHTML = 'The minimum password length must be greater than 7';
      condition = false;
    } else {
      this.errorPassword.nativeElement.innerHTML = '';
    }
    return condition;
  }
  checkDataForLogin(): boolean {
    let condition = this.checkDataForRegistration();
    if (this.secret == '') {
      this.errorSecret.nativeElement.innerHTML = 'Write secret';
      condition = false;
    } else {
      this.errorSecret.nativeElement.innerHTML = '';
    }
    return condition;
  }
}
