/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { SearchPipePipe } from './search-pipe.pipe';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { SortPipePipe } from './sort-pipe.pipe';
export class TableModule {
}
TableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    NgxPaginationModule,
                    Ng2SearchPipeModule,
                    PDFExportModule
                ],
                declarations: [TableComponent, SearchPipePipe, SortPipePipe],
                providers: [],
                exports: [TableComponent, SearchPipePipe, SortPipePipe]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2RyYy10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBZ0JoRCxNQUFNOzs7WUFkTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsZUFBZTtpQkFFaEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBQyxZQUFZLENBQUM7Z0JBRTNELFNBQVMsRUFBRSxFQUFFO2dCQUNiLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDO2FBQ3hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IE5neFBhZ2luYXRpb25Nb2R1bGUsIFBhZ2luYXRlUGlwZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IE5nMlNlYXJjaFBpcGVNb2R1bGV9IGZyb20gJ25nMi1zZWFyY2gtZmlsdGVyJzsgXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNlYXJjaFBpcGVQaXBlIH0gZnJvbSAnLi9zZWFyY2gtcGlwZS5waXBlJztcbmltcG9ydCB7IFBERkV4cG9ydE1vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLXBkZi1leHBvcnQnO1xuaW1wb3J0IHsgU29ydFBpcGVQaXBlIH0gZnJvbSAnLi9zb3J0LXBpcGUucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcbiAgICBOZzJTZWFyY2hQaXBlTW9kdWxlLFxuICAgIFBERkV4cG9ydE1vZHVsZVxuICBcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVGFibGVDb21wb25lbnQsIFNlYXJjaFBpcGVQaXBlLFNvcnRQaXBlUGlwZV0sXG5cbiAgcHJvdmlkZXJzOiBbXSxcbiAgZXhwb3J0czogW1RhYmxlQ29tcG9uZW50LCBTZWFyY2hQaXBlUGlwZSwgU29ydFBpcGVQaXBlXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZU1vZHVsZSB7XG4gIC8vIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgbmdNb2R1bGU6IFRhYmxlTW9kdWxlLFxuICAvLyAgICAgcHJvdmlkZXJzOiBbXG4gIC8vICAgICAgIFRhYmxlU2VydmljZSxcbiAgLy8gICAgICAgeyBwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZyB9XG4gIC8vICAgICBdXG4gIC8vICAgfTtcbiAgLy8gfVxufVxuIl19