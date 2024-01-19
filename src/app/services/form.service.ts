import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  url: string = 'http://localhost:8080';
  constructor() {}
  async postRequest(x: string, y: string, r: string, method: string) {
    let prefix: string = '/check_result';
    let result: {msg: string, condition: boolean, token: string} = {msg: '', condition: true, token: ''};
    let body = {x: x, y: y, r: r, method: method,
      token: localStorage.getItem('token'), browser: window.navigator.userAgent};
    try {
      const response = await fetch(this.url + prefix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
    return result;
  }
}
