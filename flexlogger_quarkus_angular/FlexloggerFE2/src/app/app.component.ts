import { Component } from '@angular/core';
import {HttpService} from "./service/http.service";
import {LogEntry} from "./model/LogEntry";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flexloggerFE2';



  constructor(){

  }



}
