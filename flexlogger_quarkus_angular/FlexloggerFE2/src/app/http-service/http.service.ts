import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LogEntry} from "../model/LogEntry";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = "http://localhost:8081/logEntry";

  constructor(private http: HttpClient) { }

  public getLogEntries(startDate: string, startTime: string, endDate: string, endTime: string): Observable<LogEntry[]>{
    return this.http.get<LogEntry[]>(this.url + "/all/" + startDate + "/" + startTime + "/" + endDate+ "/" + endTime);
  }

  public getLogEntriesByName(name: string, startDate: string, startTime: string, endDate: string, endTime: string): Observable<LogEntry[]>{
    return this.http.get<LogEntry[]>(this.url + "/name/" + name + "/" + startDate + "/" + endDate + "/" + startTime+ "/" + endTime);
  }

  public getCurrentLogEntry(name: string): Observable<LogEntry[]>{
    return this.http.get<LogEntry[]>(this.url + "/currentName/" + name);
  }

  public createCSV(startDate: string, endDate: string, startTime: string, endTime: string, filename: string){
    return this.http.get<LogEntry[]>(this.url + "/csv/" + startDate + "/" + endDate + "/" + startTime + "/" + endTime + "/" + filename + "/all");
  }

  public createCSVByName(startDate: string, endDate: string, startTime: string, endTime: string, filename: string, name: string){
    return this.http.get<LogEntry[]>(this.url + "/csv/" + startDate + "/" + endDate + "/" + startTime+ "/" + endTime + "/" + filename + "/" + name);
  }

  public downloadCSV(){
    return this.http.get(this.url + "/download/", { responseType: 'text' });
  }






}
