import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {LogEntry} from "../model/LogEntry";
import {delay, of, timer} from "rxjs";
import {fakeAsync, waitForAsync} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {Data} from "@angular/router";

@Component({
  selector: 'app-canvas-chart',
  templateUrl: './canvas-chart.component.html',
  styleUrls: ['./canvas-chart.component.css']
})
export class CanvasChartComponent implements OnInit {

  logLines: LogEntry[] = [];
  dataList: any = [];
  dynamicCount: number = 0;
  dynamicLogLines: LogEntry[] = [];
  listOfDatapointNames: string[] = [];

  //files: { data: { color: string; dataPoints: { x: Date; y: number }[]; type: string }[]; axisY: { title: string; suffix: string; valueFormatString: string }; title: { text: string }; animationEnabled: boolean } = [];

  constructor(private http: HttpService) {
    this.onload();

    timer(10000).subscribe(x => {
      //this.getPlaylists()
      this.getFiles().subscribe(file => {
        this.logLines = file;
        this.getListOfDatapointNames();
        this.filterLogLines("REAL173");
        this.setChartOptions();
        //this.getData();
        this.setTimerForNewData();
      })
    })
  }

  ngOnInit(): void {
  }

  onload() {
    this.http.getLogEntries().subscribe(value => {
      this.logLines = value;
    }, error => console.log(error));
  }

  loadDynamicData() {
    this.onload();

    timer(10000).subscribe(x => {
      //this.getPlaylists()
      this.getFiles().subscribe(file => {
        this.logLines = file;
        this.setChartOptions();
        //this.getData();
        this.setTimerForNewData();
      })
    })
  }

  setTimerForNewData() {
    timer(1000, 1000).subscribe(x => {
      this.dynamicCount += 1;
      this.setChartOptions();
    })
    /*
    timer(30000,30000).subscribe(x => {
      this.loadDynamicData();
    })*/
  }


  filterLogLines(filterString: String) {
    this.dynamicLogLines = [];
    for (let logLine of this.logLines) {
      if (logLine.dpId == filterString) {
        this.dynamicLogLines.push(logLine);
      }
    }
  }

  getListOfDatapointNames() {
    let nameInList = false;
    this.listOfDatapointNames = [];
    for (let logLine of this.logLines) {

      if (this.listOfDatapointNames.length == 0) {
        this.listOfDatapointNames.push(logLine.dpId);
      } else {
        for (let logLineElement of this.listOfDatapointNames) {
          if (logLineElement === logLine.dpId) {
            nameInList = true;
          }
        }
        if (nameInList == false) {
          this.listOfDatapointNames.push(logLine.dpId);
        }
      }
      nameInList = false;
    }
    console.log(this.listOfDatapointNames);
  }


  getFiles() {
    return of(this.logLines);
  }

  chartOptions = {
    animationEnabled: true,
    title: {
      text: "DATA IS LOADING . . .",
    },
    axisY: {
      title: "Value",
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

  setChartOptions() {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: this.dynamicLogLines[0].dpId,
      },
      axisY: {
        title: "Value",
        valueFormatString: "#0,,.",
        suffix: this.dynamicLogLines[0].unit
      },
      data: [{
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        dataPoints: [
          {
            x: new Date(this.dynamicLogLines[this.dynamicCount].timeStamp),
            y: parseInt(this.dynamicLogLines[this.dynamicCount].value)
          },
          {
            x: new Date(this.dynamicLogLines[this.dynamicCount + 1].timeStamp),
            y: parseInt(this.dynamicLogLines[this.dynamicCount + 1].value)
          },
          {
            x: new Date(this.dynamicLogLines[this.dynamicCount + 2].timeStamp),
            y: parseInt(this.dynamicLogLines[this.dynamicCount + 2].value)
          },
          {
            x: new Date(this.dynamicLogLines[this.dynamicCount + 3].timeStamp),
            y: parseInt(this.dynamicLogLines[this.dynamicCount + 3].value)
          },
          {
            x: new Date(this.dynamicLogLines[this.dynamicCount + 4].timeStamp),
            y: parseInt(this.dynamicLogLines[this.dynamicCount + 4].value)
          },
          {
            x: new Date(this.dynamicLogLines[this.dynamicCount + 5].timeStamp),
            y: parseInt(this.dynamicLogLines[this.dynamicCount + 5].value)
          },
          {
            x: new Date(this.dynamicLogLines[this.dynamicCount + 6].timeStamp),
            y: parseInt(this.dynamicLogLines[this.dynamicCount + 7].value)
          },
        ]
      }]
    }
  }


}
