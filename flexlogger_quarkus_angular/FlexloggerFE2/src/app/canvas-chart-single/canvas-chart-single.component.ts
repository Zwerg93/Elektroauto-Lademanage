import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {of, timer} from "rxjs";
import {LogEntry} from "../model/LogEntry";

@Component({
  selector: 'app-canvas-chart-single',
  templateUrl: './canvas-chart-single.component.html',
  styleUrls: ['./canvas-chart-single.component.css']
})
export class CanvasChartSingleComponent implements OnInit {

  dateBegin: any;
  timeBegin: any;
  dateEnd: any;
  timeEnd: any;
  logLines: LogEntry[] = [];
  dynamicCount: number = 0;
  dynamicLogLines: LogEntry[] = [];
  showChart: Boolean = false;
  chart: any;
  error: any;
  errorMessage: string = "";
  interval: any;


  //files: { data: { color: string; dataPoints: { x: Date; y: number }[]; type: string }[]; axisY: { title: string; suffix: string; valueFormatString: string }; title: { text: string }; animationEnabled: boolean } = [];

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {
    // Daten werden aus Datenbank geladen
    this.onload();
    // Nach 1 Sekunde werden die anderen Methoden aufgerufen, um zu verhindern, dass die Daten nicht vollständig geladen haben
    timer(1000).subscribe(x => {
      // getFiles() gibt die Liste zurück
      this.getFiles().subscribe(file => {
        this.logLines = file;
        if(this.logLines.length != 0){
          this.changeData(this.logLines[0].dpId);
          this.setChartOptions();
          this.showChart = true;
          //this.getData();
          this.setTimerForNewData();
        } else {
          this.errorMessage = "Zu Ihrem ausgewählten Datennamen bzw. Zeitpunkt wurden keine Daten gefunden.";
          this.error = true;
        }
      })
    })
  }

  ngOnInit(): void {
  }

  // Daten werden aus Datenkbank geladen
  onload() {
    this.dateBegin = this.route.snapshot.params['dateBegin'];
    this.timeBegin = this.route.snapshot.params['timeBegin'];
    this.dateEnd = this.route.snapshot.params['dateEnd'];
    this.timeEnd = this.route.snapshot.params['timeEnd'];
    this.http.getLogEntries(this.dateBegin, this.timeBegin, this.dateEnd,this.timeEnd).subscribe(value => {
      this.logLines = value;
    }, error => console.log(error));
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

  // wird Anfangs initialisiert
  changeData(filterString: String) {
    this.dynamicCount = 0;
    this.dynamicLogLines = [];
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
        suffix: this.dynamicLogLines[0].unit
      },

      data: [{
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        dataPoints: this.chartOptions.data[0].dataPoints
      }]
    }
  }

  routeToHome() {
    if(this.interval != undefined) {
      this.interval.unsubscribe();
    }
    this.router.navigate([''], {relativeTo: this.route});
  }


}
