/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class SortPipePipe {
    /**
     * @param {?} rowData
     * @param {?} args
     * @return {?}
     */
    transform(rowData, args) {
        if (rowData != undefined && rowData != null) {
            return rowData.sort(function (a, b) {
                /** @type {?} */
                let rowdataA = parseInt(a[args.property]);
                /** @type {?} */
                let rowdataB = parseInt(b[args.property]);
                if (isNaN(rowdataA) && isNaN(rowdataB)) {
                    if (a[args.property] < b[args.property]) {
                        return -1 * args.direction;
                    }
                    else if (a[args.property] > b[args.property]) {
                        return 1 * args.direction;
                    }
                    else {
                        return 0;
                    }
                }
                else if (!isNaN(rowdataA) && !isNaN(rowdataB)) {
                    if (rowdataA < rowdataB) {
                        return -1 * args.direction;
                    }
                    else if (rowdataA > rowdataB) {
                        return 1 * args.direction;
                    }
                    else {
                        return 0;
                    }
                }
            });
        }
    }
    ;
}
SortPipePipe.decorators = [
    { type: Pipe, args: [{
                name: 'sortPipe'
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1waXBlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZHJjLXRhYmxlLyIsInNvdXJjZXMiOlsic3JjL3NvcnQtcGlwZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNOzs7Ozs7SUFFTixTQUFTLENBQUMsT0FBYyxFQUFFLElBQVM7UUFDL0IsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDOztnQkFDaEMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBQzFDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNuQyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztxQkFDOUI7b0JBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQ3pDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztxQkFDN0I7b0JBQ0QsSUFBSSxDQUFBLENBQUM7d0JBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDWjtpQkFDSjtnQkFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUMzQyxFQUFFLENBQUEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUEsQ0FBQzt3QkFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7cUJBQzlCO29CQUNELElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUEsQ0FBQzt3QkFDekIsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO3FCQUM3QjtvQkFDRCxJQUFJLENBQUEsQ0FBQzt3QkFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUNaO2lCQUNKO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUFBLENBQUM7OztZQWpDSCxJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7YUFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NvcnRQaXBlJ1xufSlcbmV4cG9ydCBjbGFzcyBTb3J0UGlwZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxudHJhbnNmb3JtKHJvd0RhdGE6IGFueVtdLCBhcmdzOiBhbnkpOiBhbnkge1xuICAgIGlmIChyb3dEYXRhICE9IHVuZGVmaW5lZCAmJiByb3dEYXRhICE9IG51bGwpe1xuICAgICByZXR1cm4gcm93RGF0YS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgbGV0IHJvd2RhdGFBID0gcGFyc2VJbnQoYVthcmdzLnByb3BlcnR5XSk7XG4gICAgICBsZXQgcm93ZGF0YUIgPSBwYXJzZUludChiW2FyZ3MucHJvcGVydHldKTtcbiAgICAgICAgaWYoaXNOYU4ocm93ZGF0YUEpICYmIGlzTmFOKHJvd2RhdGFCKSl7XG4gICAgICAgICAgICBpZihhW2FyZ3MucHJvcGVydHldIDwgYlthcmdzLnByb3BlcnR5XSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xICogYXJncy5kaXJlY3Rpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFbYXJncy5wcm9wZXJ0eV0gPiBiW2FyZ3MucHJvcGVydHldKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAqIGFyZ3MuZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYoIWlzTmFOKHJvd2RhdGFBKSAmJiAhaXNOYU4ocm93ZGF0YUIpKXtcbiAgICAgICAgICAgIGlmKHJvd2RhdGFBIDwgcm93ZGF0YUIpe1xuICAgICAgICAgICAgICAgIHJldHVybiAtMSAqIGFyZ3MuZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihyb3dkYXRhQSA+IHJvd2RhdGFCKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAqIGFyZ3MuZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19