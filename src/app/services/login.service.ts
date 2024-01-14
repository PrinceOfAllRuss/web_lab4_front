import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080';
  constructor(private router: Router) {}
  async postRequest(data: object, prefix: string) {
    let result_obj: { msg:string, condition:boolean } = {msg: '', condition: false};
    try {
      const response = await fetch(this.url + prefix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success:", result);
      localStorage.setItem('token', result.token);
      result_obj.msg = result.msg;
      result_obj.condition = result.condition;
    } catch (error) {
      console.error("Error:", error);
    }
    return result_obj;
  }
  async registrationRequest(name: string, password: string) {
    let prefix: string = '/register_user';
    const user = {name: name, password: password, browser: window.navigator.userAgent};
    return await this.postRequest(user, prefix);
  }
  async loginRequestTwo(name: string, password: string, secret: string) {
    let prefix: string = '/login_user';
    console.log(secret);
    const user = {name: name, password: password,
      secret: secret, browser: window.navigator.userAgent};
    let result: { msg: string, condition: boolean } = await this.postRequest(user, prefix);
    return result;
  }
  async logoutRequest() {
    let prefix: string = "/logout_user";
    let token = localStorage.getItem('token')!;
    let body = {token: token, browser: window.navigator.userAgent};
    try {
      const response = await fetch(this.url + prefix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      console.log("Success:", result);
      localStorage.setItem('token', result.token);
      await this.router.navigate(['login']);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
