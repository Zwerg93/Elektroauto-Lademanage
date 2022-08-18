import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogEntry} from "../model/LogEntry";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = "http://localhost:8081/";

  constructor(private http: HttpClient) { }

  public getLogEntries(): Observable<LogEntry[]>{
    return this.http.get<LogEntry[]>(this.url + "/logEntry");
  }

}
