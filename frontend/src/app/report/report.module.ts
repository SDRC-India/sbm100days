import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from './services/report.service';
import { AreaFilterPipe } from './filters/area-filter.pipe';
import { RemoveArrayPipe } from './filters/remove-array.pipe';
import { FrequencyFilterPipe } from './filters/frequency-filter.pipe';
import { RangeFilterPipe } from './filters/range-filter.pipe';
import { RangeValidatorDirective } from './directive/range-validator.directive';
import { TableModule } from 'lib/public_api';
//import { TableModule } from 'sdrc-table';

@NgModule({
  declarations: [
    ReportComponent,
    AreaFilterPipe,
    RemoveArrayPipe,
    FrequencyFilterPipe,
    RangeFilterPipe,
    RangeValidatorDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ReportRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TableModule
  ],
  providers: [ ReportService]
})
export class ReportModule { }
