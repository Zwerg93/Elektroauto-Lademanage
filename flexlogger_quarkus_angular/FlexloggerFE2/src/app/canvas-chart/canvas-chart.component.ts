import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {LogEntry} from "../model/LogEntry";
import {of, timer} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-canvas-chart',
  templateUrl: './canvas-chart.component.html',
  styleUrls: ['./canvas-chart.component.css']
})
export class CanvasChartComponent implements OnInit {

  dateBegin: any;
  timeBegin: any;
  dateEnd: any;
  timeEnd: any;
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


    //files: { data: { color: string; dataPoints: { x: Date; y: number }[]; type: string }[]; axisY: { title: string; suffix: string; valueFormatString: string }; title: { text: string }; animationEnabled: boolean } = [];

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {
    // Daten werden aus Datenbank geladen
    this.onload();
    // Nach 1 Sekunde werden die anderen Methoden aufgerufen, um zu verhindern, dass die Daten nicht vollständig geladen haben
    timer(1000).subscribe(x => {
      // getFiles() gibt die Liste zurück
      this.getFiles().subscribe(file => {
        this.logLines = file;
        console.log(this.logLines);
        if(this.logLines.length != 0){
          this.getListOfDatapointNames();
          this.changeData(this.logLines[0].dpId);
          this.setChartOptions();
          this.showChart = true;
          //this.getData();
          this.setTimerForNewData();
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
    this.dateBegin = this.route.snapshot.params['dateBegin'];
    this.timeBegin = this.route.snapshot.params['timeBegin'];
    this.dateEnd = this.route.snapshot.params['dateEnd'];
    this.timeEnd = this.route.snapshot.params['timeEnd'];
    this.http.getLogEntries(this.dateBegin, this.timeBegin, this.dateEnd,this.timeEnd).subscribe(value => {
      this.logLines = value;
    }, error => console.log(error));
  }

  /*
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
  */

  // Fügt neue Datenpunkte in Datenarray ein
  setTimerForNewData() {
    this.interval = timer(50, 50).subscribe(x => {
      this.dynamicCount += 1;
      this.setChartOptions();

      // Überprüfung wenn Datenpunkt undefined is, da in dem Fall Fehlermeldung auftreten würde
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
    this.dynamicLogLines = [];
    for (let logLine of this.logLines) {
      if (logLine.dpId == filterString) {
        this.dynamicLogLines.push(logLine);
      }
    }
    this.setChartOptions();
    this.chartOptions.data[0].dataPoints = [ {x: new Date(this.dynamicLogLines[this.dynamicCount].timeStamp), y: parseInt(this.dynamicLogLines[this.dynamicCount].value)}];
  }

  // Erstellt Buttons mit den Namen darauf
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
    // Timer stoppen, damit keine weiteren Daten in Array geschrieben werden, obwohl man sich nicht mehr auf Seite befindet
    if(this.interval != undefined) {
      this.interval.unsubscribe();
    }
    this.router.navigate([''], {relativeTo: this.route});
  }

}
