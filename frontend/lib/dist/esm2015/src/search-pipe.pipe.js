/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class SearchPipePipe {
    /**
     * @param {?} tableData
     * @param {?} searchText
     * @return {?}
     */
    transform(tableData, searchText) {
        if (!tableData)
            return [];
        if (!searchText)
            return tableData;
        searchText = searchText.toLowerCase();
        return tableData.filter(details => {
            /** @type {?} */
            let values = [];
            for (let i = Object.values(details).length - 1; i >= 0; i--) {
                /** @type {?} */
                const element = Object.values(details)[i];
                if (typeof element != 'object') {
                    values.push(element);
                }
            }
            return JSON.stringify(values).toLowerCase().includes(searchText);
        });
    }
}
SearchPipePipe.decorators = [
    { type: Pipe, args: [{
                name: 'searchPipe'
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBpcGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NkcmMtdGFibGUvIiwic291cmNlcyI6WyJzcmMvc2VhcmNoLXBpcGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFLcEQsTUFBTTs7Ozs7O0lBRUosU0FBUyxDQUFDLFNBQWdCLEVBQUUsVUFBa0I7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFOztZQUdoQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7Z0JBQzFELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFBLENBQUM7b0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7aUJBQ3JCO2FBQ0Y7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEUsQ0FBQyxDQUFDO0tBQ0o7OztZQXJCRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFlBQVk7YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NlYXJjaFBpcGUnXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFBpcGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgdHJhbnNmb3JtKHRhYmxlRGF0YTogYW55W10sIHNlYXJjaFRleHQ6IHN0cmluZyk6IGFueVtdIHtcbiAgICBpZiAoIXRhYmxlRGF0YSkgcmV0dXJuIFtdO1xuICAgIGlmICghc2VhcmNoVGV4dCkgcmV0dXJuIHRhYmxlRGF0YTtcbiAgICBzZWFyY2hUZXh0ID0gc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiB0YWJsZURhdGEuZmlsdGVyKGRldGFpbHMgPT4ge1xuICAgICAvLyByZXR1cm4gZGV0YWlscy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQpO1xuICAgICAgLy9sZXQgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyghbm9TZWFyY2guaW5jbHVkZXMoZGV0YWlscykpO1xuICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IE9iamVjdC52YWx1ZXMoZGV0YWlscykubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBPYmplY3QudmFsdWVzKGRldGFpbHMpW2ldO1xuICAgICAgICBpZih0eXBlb2YgZWxlbWVudCAhPSAnb2JqZWN0Jyl7XG4gICAgICAgICAgdmFsdWVzLnB1c2goZWxlbWVudClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlcykudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KTtcbiAgICB9KTtcbiAgfVxufVxuXG4iXX0=