import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {LogEntry} from "../model/LogEntry";
import {ActivatedRoute, Router} from "@angular/router";
import {of, timer, Timestamp} from "rxjs";

@Component({
  selector: 'app-canvas-chart-live',
  templateUrl: './canvas-chart-live.component.html',
  styleUrls: ['./canvas-chart-live.component.css']
})
export class CanvasChartLiveComponent implements OnInit {

  name: any;
  logLines: LogEntry[] = [];
  dataList: any = [];
  dynamicCount: number = 0;
  dynamicLogLines: LogEntry[] = [];
  listOfDatapointNames: string[] = [];
  showChart: Boolean = false;
  chart: any;
  error: any;
  errorMessage: string = "";
  interval: any;
  interval2: any;



  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {
    // Daten werden aus Datenbank geladen
    this.onload();
    // Nach 1 Sekunde werden die anderen Methoden aufgerufen, um zu verhindern, dass die Daten nicht vollständig geladen haben
    timer(1000).subscribe(x => {
      // getFiles() gibt die Liste zurück
      this.getFiles().subscribe(file => {
        this.logLines = file;
        if(this.logLines.length != 0){
          this.dynamicCount = 0;
          this.dynamicLogLines = [];
          this.changeData(this.logLines[0].dpId);
          this.setChartOptions();
          this.showChart = true;
          //this.getData();
          this.setTimerForNewData();
          this.loadDynamicData();
        } else {
          this.errorMessage = "Zu Ihrem ausgewählten Zeitpunkt wurden keine Daten gefunden.";
          this.error = true;
        }

      })
    })
  }

  ngOnInit(): void {
  }

  // Daten werden aus Datenkbank geladen
  onload() {
    this.name = this.route.snapshot.params['name'];
    this.http.getCurrentLogEntry(this.name).subscribe(value => {
      this.logLines = value;
    }, error => console.log(error));
  }


  loadDynamicData() {
    this.interval2 = timer(0, 30000).subscribe(x => {
      console.log("ohaaaaa")
      this.onload();

      timer(30000).subscribe(x => {
        this.getFiles().subscribe(file => {
          this.logLines = file;
          this.logLines.reverse();
          this.changeData(this.logLines[0].dpId);
          console.log(this.logLines);
          this.setChartOptions();
          this.setTimerForNewData();
        })
      })
    })
  }


  // Fügt neue Datenpunkte in Datenarray ein
  setTimerForNewData() {
    this.interval = timer(50, 50).subscribe(x => {
      this.dynamicCount += 1;
      this.setChartOptions();

      if(this.dynamicLogLines[this.dynamicCount] != undefined){
        this.chartOptions.title.text = this.dynamicLogLines[this.dynamicCount].dpId;
        this.chartOptions.data[0].dataPoints.push({
          x: new Date(this.dynamicLogLines[this.dynamicCount].timeStamp),
          y: parseFloat(this.dynamicLogLines[this.dynamicCount].value)
        });
      }
    })

  }

  // wird Anfangs initialisiert und wenn Button gedrückt wird, wird nochmal aufgerufen, um neue Daten einzufügen
  changeData(filterString: String) {
    this.dynamicCount = 0;
    this.dynamicLogLines = this.dynamicLogLines;
    this.logLines.reverse();
    for (let logLine of this.logLines) {
      if (logLine.dpId == filterString) {
        this.dynamicLogLines.push(logLine);
      }
    }
    this.setChartOptions();
    this.chartOptions.data[0].dataPoints = [ {x: new Date(this.dynamicLogLines[this.dynamicCount].timeStamp), y: parseInt(this.dynamicLogLines[this.dynamicCount].value)}];
  }


  // returnt this.logLines
  getFiles() {
    return of(this.logLines);
  }

  // setzt die Chart Options
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


  // setzt die Chart Options neu mit dynamischen Daten
  setChartOptions() {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: this.dynamicLogLines[0].dpId,
      },
      axisY: {
        title: "Value",
        suffix: " " + this.dynamicLogLines[0].unit
      },

      data: [{
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        dataPoints: this.chartOptions.data[0].dataPoints
      }]
    }
  }

  // route to Homepage
  routeToHome() {
    if(this.interval != undefined) {
      this.interval.unsubscribe();
      this.interval2.unsubscribe();
    }
    this.router.navigate([''], {relativeTo: this.route});
  }

}


