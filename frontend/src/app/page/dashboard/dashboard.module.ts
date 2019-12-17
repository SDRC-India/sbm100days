import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexViewComponent } from './index-view/index-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { routing } from './dashboard.routing';
import { DashboardService } from './services/dashboard.service';
import { ThematicMapComponent } from './thematic-map/thematic-map.component';
import { TrendChartComponent } from './trend-chart/trend-chart.component';
import { HorizontalBarChartComponent } from './horizontal-bar-chart/horizontal-bar-chart.component';
import {TooltipModule} from 'ng2-tooltip-directive';


@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  declarations: [IndexViewComponent, ThematicMapComponent, TrendChartComponent, HorizontalBarChartComponent],
  providers: [DashboardService],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class DashboardModule { }
