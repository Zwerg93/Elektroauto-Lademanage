import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {LogEntry} from "../model/LogEntry";
import {delay, of, timer} from "rxjs";
import {fakeAsync, waitForAsync} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-canvas-chart',
  templateUrl: './canvas-chart.component.html',
  styleUrls: ['./canvas-chart.component.css']
})
export class CanvasChartComponent implements OnInit {

  logLines: LogEntry[] = [];
  //files: { data: { color: string; dataPoints: { x: Date; y: number }[]; type: string }[]; axisY: { title: string; suffix: string; valueFormatString: string }; title: { text: string }; animationEnabled: boolean } = [];

  constructor(private http: HttpService) {
    this.onload();

    timer(1000).subscribe(x => {
      //this.getPlaylists()
      this.getFiles().subscribe(file =>{
        this.logLines = file;
        this.printIt();
        this.setChartOptions();
      })
    })
  }

  ngOnInit(): void {
  }

  onload() {
    this.http.getLogEntries().subscribe(value => {
      this.logLines = value;
      if (this.logLines) {

      }
      console.log(this.logLines[0].value);

    }, error => console.log(error));
  }

  printIt(){
    console.log(this.logLines[0].dpId);
  }


  getFiles(){
    return of(this.logLines);
  }

  chartOptions = {
    animationEnabled: true,
    title: {
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
        {x: new Date(0), y: 0}
      ]
    }]
  }

  setChartOptions(){
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: this.logLines[0].dpId,
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
          {x: new Date(this.logLines[0].timeStamp), y: parseInt(this.logLines[0].value)},
          {x: new Date(this.logLines[1].timeStamp), y: parseInt(this.logLines[1].value)},
          {x: new Date(this.logLines[2].timeStamp), y: parseInt(this.logLines[2].value)},
          {x: new Date(this.logLines[3].timeStamp), y: parseInt(this.logLines[3].value)},
          {x: new Date(this.logLines[4].timeStamp), y: parseInt(this.logLines[4].value)},
          {x: new Date(this.logLines[5].timeStamp), y: parseInt(this.logLines[5].value)},
          {x: new Date(this.logLines[6].timeStamp), y: parseInt(this.logLines[6].value)},
          {x: new Date(this.logLines[7].timeStamp), y: parseInt(this.logLines[7].value)},
          {x: new Date(this.logLines[8].timeStamp), y: parseInt(this.logLines[8].value)},
          {x: new Date(this.logLines[9].timeStamp), y: parseInt(this.logLines[9].value)},
          {x: new Date(this.logLines[10].timeStamp), y: parseInt(this.logLines[10].value)},
          {x: new Date(this.logLines[11].timeStamp), y: parseInt(this.logLines[11].value)},
          {x: new Date(this.logLines[12].timeStamp), y: parseInt(this.logLines[12].value)},
          {x: new Date(this.logLines[13].timeStamp), y: parseInt(this.logLines[13].value)},
          {x: new Date(this.logLines[14].timeStamp), y: parseInt(this.logLines[14].value)},
          {x: new Date(this.logLines[15].timeStamp), y: parseInt(this.logLines[15].value)},
          {x: new Date(this.logLines[16].timeStamp), y: parseInt(this.logLines[16].value)}
        ]
      }]
    }
  }



}


{



}
