import { Component } from '@angular/core';
import {HttpService} from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flexloggerFE2';
  csvLines: String[] = [];


  constructor(private http: HttpService){

  }

  loadCSV(){
    this.http.getCSV().subscribe(value => {
      this.csvLines = value;
      console.log(value);
    }, error => console.log(error))
  }
}
