import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  postRequest(name: string, password: string, action: string) {
    let prefix: string;
    const user = {name: name, password: password};
    if (action == "login") {
      prefix = "/login_user";
    } else {
      prefix = "/register_user";
    }
    this.http.post(this.url + prefix, {data: user}, {responseType: 'json'})
      .subscribe({
        next:(data: any) => {
          console.log(data);
          console.log(data.token);
          sessionStorage.setItem("token", data.token);
        },
        error: error => console.log(error)
      });
  }
}
