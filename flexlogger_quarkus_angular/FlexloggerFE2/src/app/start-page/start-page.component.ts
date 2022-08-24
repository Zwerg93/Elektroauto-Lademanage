import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  dateBegin1: any;
  timeBegin1: any;
  dateEnd1: any;
  timeEnd1: any;
  dateBegin2: any;
  timeBegin2: any;
  dateEnd2: any;
  timeEnd2: any;
  dateBegin3: any;
  timeBegin3: any;
  dateEnd3: any;
  timeEnd3: any;
  filepath3: any;
  dataName3: any|undefined;
  showField3: Boolean = false;
  dataName4: any|undefined;


  constructor(private http: HttpService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  routeToAll() {
    this.router.navigate(['all/' + this.dateBegin1 + '/' + this.timeBegin1 + '/' +this.dateEnd1 + '/' + this.timeEnd1], {relativeTo: this.route});
  }

  routeToOne() {
    this.router.navigate(['one'], {relativeTo: this.route});
  }

  routeToLive() {
    this.router.navigate(['live/' + this.dataName4], {relativeTo: this.route});
  }

  generateCSV() {
    if(this.dataName3 == undefined){
      this.http.createCSV(this.dateBegin3, this.dateEnd3, this.timeBegin3, this.timeEnd3, this.filepath3 + "/monitor.csv").subscribe(value => {}, error => console.log(error))
    } else {
      this.http.createCSVByName(this.dateBegin3, this.dateEnd3, this.timeBegin3, this.timeEnd3, this.filepath3 + "/monitor.csv", this.dataName3).subscribe(value => {}, error => console.log(error))
    }
  }

  showNameField(event: any) {
    if ( event.target.checked ) {
      this.showField3 = true;
    } else {
      this.showField3 = false;
    }
  }



}
