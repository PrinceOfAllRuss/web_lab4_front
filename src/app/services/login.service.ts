import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginComponent} from "../components/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080/registration/register_user';
  constructor(private http: HttpClient) {}
  registerUser(name: string, password: string) {
    const body = {name: name, password: password}
    return this.http.post(this.url, body);
  }
  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }
  async getTestInfo(): Promise<String> {
    console.log("2");
    const data = await fetch(this.url);
    console.log("2.1");
    return await data.text() ?? {};
  }

  submitApplication(name: string, password: string) {
    console.log(
      `Homes application received: name: ${name}, password: ${password}.`
    );
  }
}
