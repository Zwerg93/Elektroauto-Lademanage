import { Component } from '@angular/core';
import {HttpService} from "./service/http.service";
import {LogEntry} from "./model/LogEntry";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flexloggerFE2';
  logLines: LogEntry[] = [];


  constructor(private http: HttpService){

  }

  loadLogEntries(){
    this.http.getLogEntries().subscribe(value => {
      this.logLines = value;
      console.log(value);
    }, error => console.log(error))
  }
}
