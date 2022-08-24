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
  filepath: any;
  showField: Boolean = false;
  dataName: any|undefined;

  constructor(private http: HttpService) { }

  ngOnInit(): void {

  }

  generateCSV() {
    console.log("clicked")
    if(this.dataName == undefined){
      this.http.createCSV(this.dateBegin, this.dateEnd, this.timeBegin, this.timeEnd, this.filepath).subscribe(value => {}, error => console.log(error))
    } else {
      this.http.createCSVByName(this.dateBegin, this.dateEnd, this.timeBegin, this.timeEnd, this.filepath, this.dataName).subscribe(value => {}, error => console.log(error))
    }

  }

  showNameField() {
    this.showField = true;
  }
}
