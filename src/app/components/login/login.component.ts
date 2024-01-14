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

      <button type="button" class="button" (click)="login()">Login</button>
      <br/>
      <button type="button" class="button" (click)="registration()">Registration</button>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  name: string = "Fedor";
  password: string = "1234";
  @ViewChild("errorName", {static: false}) errorName!: ElementRef;
  @ViewChild("errorPassword", {static: false}) errorPassword!: ElementRef;
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
    if (this.checkData()) {
      this.errorName.nativeElement.innerHTML = '';
      this.errorPassword.nativeElement.innerHTML = '';
      this.errorName.nativeElement.innerHTML = await this.loginService
        .loginRequest(this.name, this.password, "registration");
    }
  }
  login() {
    if (this.checkData()) {
      this.errorName.nativeElement.innerHTML = '';
      this.errorPassword.nativeElement.innerHTML = '';
      this.loginService.loginRequest(this.name, this.password, 'login');
    }
  }
  checkData(): boolean {
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
    return condition;
  }
}
