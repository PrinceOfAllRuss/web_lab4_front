import { Injectable } from '@angular/core';
import {TableService} from "./table.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080';
  constructor(private router: Router) {}
  async loginRequest(name: string, password: string, action: string) {
    let msg: string = '';
    let prefix: string;
    const user = {name: name, password: password, browser: window.navigator.userAgent};
    if (action == "login") {
      prefix = "/login_user";
    } else {
      prefix = "/register_user";
    }
    try {
      const response = await fetch(this.url + prefix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log("Success:", result);
      localStorage.setItem('token', result.token);
      if (!result.condition) {
        msg = result.msg;
      }
      await this.router.navigate(['home']);
    } catch (error) {
      console.error("Error:", error);
    }
    return msg;
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
