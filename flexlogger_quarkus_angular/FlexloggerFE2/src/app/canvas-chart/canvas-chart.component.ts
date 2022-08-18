import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";
import {LogEntry} from "../model/LogEntry";

@Component({
  selector: 'app-canvas-chart',
  templateUrl: './canvas-chart.component.html',
  styleUrls: ['./canvas-chart.component.css']
})
export class CanvasChartComponent implements OnInit {

  logLines: LogEntry[] = [];


  constructor(private http: HttpService){ }

  loadLogEntries(){
    this.http.getLogEntries().subscribe(value => {
      this.logLines = value;
      console.log(this.logLines[0].dpId);
    }, error => console.log(error));
    this.printIt();
  }

  ngOnInit(): void {
    this.loadLogEntries();
  }

  printIt(){
    this.logLines[0].dpId;
  }

  chartOptions = {
    animationEnabled: true,
    title:{
      text: "this.logLines[0].dpId",
    },
    axisY: {
      title: "Units Sold",
      valueFormatString: "#0,,.",
      suffix: "M"
    },
    data: [{
      type: "splineArea",
      color: "rgba(54,158,173,.7)",
      dataPoints: [
        {x: new Date(2004, 0), y: 787}
      ]
    }]
  }
}
