import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  registerUser(name: string, password: string) {
    const prefix: string = "/register_user"
    const user = {name: name, password: password};
    return this.http.post(this.url + prefix, {data: user}, {responseType: 'text'});
  }

  // registerUserByMe(name: string, password: string) {
  //   const prefix: string = "/register_user_by_me"
  //   const user = {name: name, password: password};
  //   return this.http.post(this.url + prefix, {data: user}, {responseType: 'text'});
  // }
  test() {
    console.log("test");
    this.http.get('http://localhost:8080/test', {responseType: 'text'}).subscribe((data: any) => {
      console.log('!');
      console.log(data);
      console.log("test end");
    })
  }
}
