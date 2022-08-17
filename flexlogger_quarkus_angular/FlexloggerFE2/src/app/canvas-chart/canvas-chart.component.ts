import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-canvas-chart',
  templateUrl: './canvas-chart.component.html',
  styleUrls: ['./canvas-chart.component.css']
})
export class CanvasChartComponent implements OnInit {

  csvLines: String[] = [];

  constructor(private http: HttpService){ }

  loadCSV(){
    this.http.getCSV().subscribe(value => {
      this.csvLines = value;
      console.log(value);
    }, error => console.log(error))
  }

  ngOnInit(): void {
    this.loadCSV();
  }


  chartOptions = {
    animationEnabled: true,
    title:{
      text: "Music Album Sales by Year"
    },
    axisY: {
      title: "Units Sold",
      valueFormatString: "#0,,.",
      suffix: "M"
    },
    data: [{
      type: "splineArea",
      color: "rgba(54,158,173,.7)",
      xValueFormatString: "YYYY",
      dataPoints: [
        {
            }
      ]
    }]
  }
}
