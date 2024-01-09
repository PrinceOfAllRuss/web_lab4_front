import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  async postRequest(x: string, y: string, r: string, method: string) {
    let prefix: string = '/check_result';
    let body = {x: x, y: y, r: r, method: method, token: sessionStorage.getItem('token')};
    console.log(body);
    return this.http.post(this.url + prefix, {data: body}, {responseType: 'json'});
  }

  async postRequestFetch(x: string, y: string, r: string, method: string) {
    let prefix: string = '/check_result';
    let body = {x: x, y: y, r: r, method: method, token: sessionStorage.getItem('token')};
    // let fd = new FormData();
    // fd.append('x', x);
    // fd.append('y', y);
    // fd.append('r', r);
    // fd.append('method', method);
    // fd.append('token', sessionStorage.getItem('token')!);
    try {
      const response = await fetch(this.url + prefix, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      // const result = await response;
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
