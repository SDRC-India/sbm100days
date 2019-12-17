import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ThematicDashboardComponent } from './thematic-dashboard/thematic-dashboard.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { RemoveArrayPipe } from './filters/remove-array.pipe';

@NgModule({
  declarations: [ThematicDashboardComponent, LineChartComponent, RemoveArrayPipe],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
