import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "./table.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient, private tableService: TableService, private router: Router) {}
  async loginRequest(name: string, password: string, action: string) {
    let prefix: string;
    const user = {name: name, password: password};
    if (action == "login") {
      prefix = "/login_user";
    } else {
      prefix = "/register_user";
    }
    this.http.post(this.url + prefix, {data: user}, {responseType: 'json'})
      .subscribe({
        next:async (data: any) => {
          console.log(data);
          console.log(data.token);
          sessionStorage.setItem('token', data.token);
          let new_result = await this.tableService.getAllResults();
          sessionStorage.setItem('results', JSON.stringify(new_result));
          await this.router.navigate(['home']);
        },
        error: error => console.log(error)
      });
  }

  logoutRequest() {
    let prefix: string = "/logout_user";
    let token = sessionStorage.getItem('token')!;
    this.http.post(this.url + prefix, {data: token}, {responseType: 'json'})
      .subscribe({
        next:(data: any) => {
          console.log(data);
          console.log(data.token);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('results', '[]')
          this.router.navigate(['login']);
        },
        error: error => console.log(error)
      });
  }
}
