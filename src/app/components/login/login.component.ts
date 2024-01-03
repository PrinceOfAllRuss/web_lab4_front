import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  template: `
    <div>
      <h1>Филатов Фёдор Романович P3222 66347</h1>
      <form [formGroup]="form" (submit)="submitApplication()">
        <label for="name">Name: </label>
        <input type="text" id="name" formControlName="name"/>
        <br/>
        <label for="password">Password: </label>
        <input type="text" id="password" formControlName="password"/>
        <br/>
        <button type="submit">Login</button>
        <br/>
      </form>
      <button type="button" (click)="getString()">
        Test
      </button>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });
  loginService: LoginService = inject(LoginService);
  testInfo: String = '';
  constructor() {
    console.log("1");
    this.loginService.getTestInfo().then(testInfo => {
      console.log("3");
      this.testInfo = testInfo;
    });
  }
  getString() {
    console.log(this.testInfo);
    return this.testInfo;
  }
  submitApplication() {
    this.loginService.submitApplication(
      this.form.value.name ?? '',
      this.form.value.password ?? '',
    );
  }
}
