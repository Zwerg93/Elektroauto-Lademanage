import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
  dateBegin: any;
  timeBegin: any;
  dateEnd: any;
  timeEnd: any;
  filename: any;
  constructor(private http: HttpService) { }

  ngOnInit(): void {

  }

  generateCSV() {
    console.log("clicked")
    this.http.createCSV(this.dateBegin, this.dateEnd, this.timeBegin, this.timeEnd, this.filename).subscribe(value => {}, error => console.log(error))
  }
}
