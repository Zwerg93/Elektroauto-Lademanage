import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogEntry} from "../model/LogEntry";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = "http://localhost:8081/logEntry";

  constructor(private http: HttpClient) { }

  public getLogEntries(): Observable<LogEntry[]>{
    return this.http.get<LogEntry[]>(this.url);
  }

  public getLogEntriesByName(name: string): Observable<LogEntry[]>{
    return this.http.get<LogEntry[]>(this.url + "/name/" + name);
  }

  public createCSV(startDate: string, endDate: string, startTime: string, endTime: string, filename: string){
    return this.http.get<LogEntry[]>(this.url + "/csv/" + startDate + "/" + endDate + "/" + startTime+ "/" + endTime + "/" + filename);
  }



}
