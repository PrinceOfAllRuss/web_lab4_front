import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Result} from "../classes/result";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  async getAllResults() {
    let prefix: string = '/get_results';
    let response = await fetch(this.url + prefix);
    let data: any = await response.json();
    return data as Result[];
  }
}
