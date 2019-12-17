import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { ResourcesGuidelinesComponent } from './resources-guidelines/resources-guidelines.component';
import { routing } from './cms.routing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { ContentSectionComponent } from './content-section/content-section.component';
import { DataService } from './services/data.service';
import { RemoveTableColumPipe } from './pipes/remove-table-colum.pipe';
import {DragulaModule, DragulaDirective, dragula, DragulaService} from 'ng2-dragula';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule,
    NgxPaginationModule,
    MyDatePickerModule,
  ],
  declarations: [LeftSideBarComponent, ResourcesGuidelinesComponent, ContentSectionComponent, RemoveTableColumPipe, SafeHtmlPipe],
  providers: [ApiService, DataService, DragulaService]
})
export class CmsModule { }
