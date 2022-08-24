import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";
import {LogEntry} from "../model/LogEntry";
import {ActivatedRoute} from "@angular/router";
import {of, timer, Timestamp} from "rxjs";

@Component({
  selector: 'app-canvas-chart-live',
  templateUrl: './canvas-chart-live.component.html',
  styleUrls: ['./canvas-chart-live.component.css']
})
export class CanvasChartLiveComponent implements OnInit {

  name: any;
  logLine: any;
  chart: any;
  showChart: Boolean = false;
  timestamp: any;

  constructor(private http: HttpService, private route: ActivatedRoute) {
    this.name = this.route.snapshot.params['name'];
    this.onload();

    timer(1000).subscribe(x => {
      this.getFiles().subscribe(file => {
        this.logLine = file;
        this.filterLogLines();
        this.setChartOptions();
        this.showChart = true;
        this.setTimerForNewData();
      })
    })
  }

  ngOnInit(): void {

  }

  setTimerForNewData(){
    timer(200, 200).subscribe(x => {
      this.onload();
      if(this.timestamp != this.logLine.timestamp){
        this.timestamp = this.logLine.timestamp;
        this.setChartOptions();
        console.table(this.logLine.dpId);
        this.chartOptions.data[0].dataPoints.push({
          x: new Date(this.logLine.timeStamp),
          y: parseFloat(this.logLine.value)
        });
      }

    })
  }

  filterLogLines() {
    this.setChartOptions();
    this.chartOptions.data[0].dataPoints = [ {x: new Date(this.logLine.timeStamp), y: parseInt(this.logLine.value)}];
  }

  getFiles() {
    return of(this.logLine);
  }

  onload() {
    this.http.getCurrentLogEntry(this.name).subscribe(value => {
      this.logLine = value;
      console.log(this.logLine.timestamp)
    }, error => console.log(error));
  }


  chartOptions = {
    animationEnabled: true,
    title: {
      text: "DATA IS LOADING . . .",
    },
    axisY: {
      title: "Value",
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



  setChartOptions() {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: this.logLine.dpId,
      },
      axisY: {
        title: "Value",
        suffix: this.logLine.unit
      },

      data: [{
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        dataPoints: this.chartOptions.data[0].dataPoints
      }]
    }
  }


}

