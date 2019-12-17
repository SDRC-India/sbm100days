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
var TableModule = /** @class */ (function () {
    function TableModule() {
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
    return TableModule;
}());
export { TableModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2RyYy10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7OztnQkFFL0MsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLGVBQWU7cUJBRWhCO29CQUNELFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUMsWUFBWSxDQUFDO29CQUUzRCxTQUFTLEVBQUUsRUFBRTtvQkFDYixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQztpQkFDeEQ7O3NCQXZCRDs7U0F3QmEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hQYWdpbmF0aW9uTW9kdWxlLCBQYWdpbmF0ZVBpcGUgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOZzJTZWFyY2hQaXBlTW9kdWxlfSBmcm9tICduZzItc2VhcmNoLWZpbHRlcic7IFxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZWFyY2hQaXBlUGlwZSB9IGZyb20gJy4vc2VhcmNoLXBpcGUucGlwZSc7XG5pbXBvcnQgeyBQREZFeHBvcnRNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1wZGYtZXhwb3J0JztcbmltcG9ydCB7IFNvcnRQaXBlUGlwZSB9IGZyb20gJy4vc29ydC1waXBlLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5neFBhZ2luYXRpb25Nb2R1bGUsXG4gICAgTmcyU2VhcmNoUGlwZU1vZHVsZSxcbiAgICBQREZFeHBvcnRNb2R1bGVcbiAgXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RhYmxlQ29tcG9uZW50LCBTZWFyY2hQaXBlUGlwZSxTb3J0UGlwZVBpcGVdLFxuXG4gIHByb3ZpZGVyczogW10sXG4gIGV4cG9ydHM6IFtUYWJsZUNvbXBvbmVudCwgU2VhcmNoUGlwZVBpcGUsIFNvcnRQaXBlUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVNb2R1bGUge1xuICAvLyBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIG5nTW9kdWxlOiBUYWJsZU1vZHVsZSxcbiAgLy8gICAgIHByb3ZpZGVyczogW1xuICAvLyAgICAgICBUYWJsZVNlcnZpY2UsXG4gIC8vICAgICAgIHsgcHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWcgfVxuICAvLyAgICAgXVxuICAvLyAgIH07XG4gIC8vIH1cbn1cbiJdfQ==