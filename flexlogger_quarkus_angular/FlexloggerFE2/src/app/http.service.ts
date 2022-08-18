import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = "http://localhost:8081/";

  constructor(private http: HttpClient) { }

  public getCSV(): Observable<String[]>{
    return this.http.get<String[]>(this.url + "/csv");
  }

}
