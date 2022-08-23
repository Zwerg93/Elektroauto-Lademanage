import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {LogEntry} from "../model/LogEntry";
import {of, timer} from "rxjs";

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
  showChart: Boolean = false;
  chart: any;
  //files: { data: { color: string; dataPoints: { x: Date; y: number }[]; type: string }[]; axisY: { title: string; suffix: string; valueFormatString: string }; title: { text: string }; animationEnabled: boolean } = [];

  constructor(private http: HttpService) {
    this.onload();

    timer(1000).subscribe(x => {
      //this.getPlaylists()
      this.getFiles().subscribe(file => {
        this.logLines = file;
        this.getListOfDatapointNames();
        this.filterLogLines("REAL173");
        this.setChartOptions();
        this.showChart = true;
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
      this.getFiles().subscribe(file => {
        this.logLines = file;
        this.setChartOptions();
        this.setTimerForNewData();
      })
    })
  }

  setTimerForNewData() {
    timer(200, 1000).subscribe(x => {
      this.dynamicCount += 1;
      this.setChartOptions();

      // var length = chart.options.data[0].dataPoints.length;


      this.chartOptions.title.text = "New DataPoint Added at the end";
      console.log("test add new DP")
      console.log(this.dynamicLogLines[this.dynamicCount].timeStamp)
      this.chartOptions.data[0].dataPoints.push({
        x: new Date(this.dynamicLogLines[this.dynamicCount].timeStamp),
        y: parseInt(this.dynamicLogLines[this.dynamicCount].value)
      });
      console.log( this.chartOptions.data[0].dataPoints);

    })

  }


  filterLogLines(filterString: String) {
    this.dynamicCount = 0;
    this.dynamicLogLines = [];
    for (let logLine of this.logLines) {
      if (logLine.dpId == filterString) {
        this.dynamicLogLines.push(logLine);
      }
    }
    this.setChartOptions();
    this.chartOptions.data[0].dataPoints = [ {x: new Date(this.dynamicLogLines[this.dynamicCount].timeStamp), y: 0}];

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
        suffix: this.dynamicLogLines[0].unit
      },

      data: [{
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        dataPoints: this.chartOptions.data[0].dataPoints
      }]
    }
  }


}
