import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-canvas-chart-single',
  templateUrl: './canvas-chart-single.component.html',
  styleUrls: ['./canvas-chart-single.component.css']
})
export class CanvasChartSingleComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

}
