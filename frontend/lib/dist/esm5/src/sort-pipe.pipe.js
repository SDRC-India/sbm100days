/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var SortPipePipe = /** @class */ (function () {
    function SortPipePipe() {
    }
    /**
     * @param {?} rowData
     * @param {?} args
     * @return {?}
     */
    SortPipePipe.prototype.transform = /**
     * @param {?} rowData
     * @param {?} args
     * @return {?}
     */
    function (rowData, args) {
        if (rowData != undefined && rowData != null) {
            return rowData.sort(function (a, b) {
                /** @type {?} */
                var rowdataA = parseInt(a[args.property]);
                /** @type {?} */
                var rowdataB = parseInt(b[args.property]);
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
    };
    ;
    SortPipePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'sortPipe'
                },] }
    ];
    return SortPipePipe;
}());
export { SortPipePipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1waXBlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZHJjLXRhYmxlLyIsInNvdXJjZXMiOlsic3JjL3NvcnQtcGlwZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBT3BELGdDQUFTOzs7OztJQUFULFVBQVUsT0FBYyxFQUFFLElBQVM7UUFDL0IsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDOztnQkFDaEMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBQzFDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNuQyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztxQkFDOUI7b0JBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQ3pDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztxQkFDN0I7b0JBQ0QsSUFBSSxDQUFBLENBQUM7d0JBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDWjtpQkFDSjtnQkFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUMzQyxFQUFFLENBQUEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUEsQ0FBQzt3QkFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7cUJBQzlCO29CQUNELElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUEsQ0FBQzt3QkFDekIsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO3FCQUM3QjtvQkFDRCxJQUFJLENBQUEsQ0FBQzt3QkFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUNaO2lCQUNKO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUFBLENBQUM7O2dCQWpDSCxJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLFVBQVU7aUJBQ2pCOzt1QkFKRDs7U0FLYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzb3J0UGlwZSdcbn0pXG5leHBvcnQgY2xhc3MgU29ydFBpcGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbnRyYW5zZm9ybShyb3dEYXRhOiBhbnlbXSwgYXJnczogYW55KTogYW55IHtcbiAgICBpZiAocm93RGF0YSAhPSB1bmRlZmluZWQgJiYgcm93RGF0YSAhPSBudWxsKXtcbiAgICAgcmV0dXJuIHJvd0RhdGEuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICAgIGxldCByb3dkYXRhQSA9IHBhcnNlSW50KGFbYXJncy5wcm9wZXJ0eV0pO1xuICAgICAgbGV0IHJvd2RhdGFCID0gcGFyc2VJbnQoYlthcmdzLnByb3BlcnR5XSk7XG4gICAgICAgIGlmKGlzTmFOKHJvd2RhdGFBKSAmJiBpc05hTihyb3dkYXRhQikpe1xuICAgICAgICAgICAgaWYoYVthcmdzLnByb3BlcnR5XSA8IGJbYXJncy5wcm9wZXJ0eV0pe1xuICAgICAgICAgICAgICAgIHJldHVybiAtMSAqIGFyZ3MuZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhW2FyZ3MucHJvcGVydHldID4gYlthcmdzLnByb3BlcnR5XSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgKiBhcmdzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIGlmKCFpc05hTihyb3dkYXRhQSkgJiYgIWlzTmFOKHJvd2RhdGFCKSl7XG4gICAgICAgICAgICBpZihyb3dkYXRhQSA8IHJvd2RhdGFCKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTEgKiBhcmdzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocm93ZGF0YUEgPiByb3dkYXRhQil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgKiBhcmdzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==