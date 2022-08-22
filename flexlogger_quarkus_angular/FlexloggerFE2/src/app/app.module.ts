import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HighchartsChartModule} from "highcharts-angular";
import { CanvasChartComponent } from './canvas-chart/canvas-chart.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    CanvasChartComponent,
    CanvasJSChart
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
