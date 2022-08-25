import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasChartComponent } from './canvas-chart/canvas-chart.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CanvasChartLiveComponent } from './canvas-chart-live/canvas-chart-live.component';
import { CanvasChartSingleComponent } from './canvas-chart-single/canvas-chart-single.component';
import { StartPageComponent } from './start-page/start-page.component';
import { HomeComponent } from './home/home.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    CanvasChartComponent,
    CanvasJSChart,
    CanvasChartLiveComponent,
    CanvasChartSingleComponent,
    StartPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
