import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Result} from "../classes/result";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  async getAllResultsFetch() {
    let prefix: string = '/get_results';
    return fetch(this.url + prefix)
      .then((response) => response.json())
      .then((data) => data as Result[]);
  }
  // getAllResults() {
  //   let prefix: string = '/get_results';
  //   this.http.get(this.url + prefix, {responseType: 'text'})
  //     .subscribe({
  //       next:(data: any) => {
  //         console.log(data);
  //         sessionStorage.setItem('results', data);
  //       },
  //       error: error => console.log(error)
  //     });
  // }

  getRequestOne() {
    let prefix: string = '/test_1';
    this.http.get(this.url + prefix, {responseType: 'text'})
      .subscribe({
        next:(data: any) => {
          console.log(data);
        },
        error: error => console.log(error)
      });
  }
}
