import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  postRequest(x: string, y: string, r: string) {
    let prefix: string = '/check_result';
    let body = {x: x, y: y, r: r, token: sessionStorage.getItem("token")};
    console.log(body);
    this.http.post(this.url + prefix, {data: body}, {responseType: 'json'})
      .subscribe({
        next:(data: any) => {
          console.log(data);
          console.log(data.token);
        },
        error: error => console.log(error)
      });
  }
}
