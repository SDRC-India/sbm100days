/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var SearchPipePipe = /** @class */ (function () {
    function SearchPipePipe() {
    }
    /**
     * @param {?} tableData
     * @param {?} searchText
     * @return {?}
     */
    SearchPipePipe.prototype.transform = /**
     * @param {?} tableData
     * @param {?} searchText
     * @return {?}
     */
    function (tableData, searchText) {
        if (!tableData)
            return [];
        if (!searchText)
            return tableData;
        searchText = searchText.toLowerCase();
        return tableData.filter(function (details) {
            /** @type {?} */
            var values = [];
            for (var i = Object.values(details).length - 1; i >= 0; i--) {
                /** @type {?} */
                var element = Object.values(details)[i];
                if (typeof element != 'object') {
                    values.push(element);
                }
            }
            return JSON.stringify(values).toLowerCase().includes(searchText);
        });
    };
    SearchPipePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'searchPipe'
                },] }
    ];
    return SearchPipePipe;
}());
export { SearchPipePipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBpcGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NkcmMtdGFibGUvIiwic291cmNlcyI6WyJzcmMvc2VhcmNoLXBpcGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztJQU9sRCxrQ0FBUzs7Ozs7SUFBVCxVQUFVLFNBQWdCLEVBQUUsVUFBa0I7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTzs7WUFHN0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7O2dCQUMxRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxFQUFFLENBQUEsQ0FBQyxPQUFPLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2lCQUNyQjthQUNGO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xFLENBQUMsQ0FBQztLQUNKOztnQkFyQkYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQjs7eUJBSkQ7O1NBS2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnc2VhcmNoUGlwZSdcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUGlwZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICB0cmFuc2Zvcm0odGFibGVEYXRhOiBhbnlbXSwgc2VhcmNoVGV4dDogc3RyaW5nKTogYW55W10ge1xuICAgIGlmICghdGFibGVEYXRhKSByZXR1cm4gW107XG4gICAgaWYgKCFzZWFyY2hUZXh0KSByZXR1cm4gdGFibGVEYXRhO1xuICAgIHNlYXJjaFRleHQgPSBzZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHRhYmxlRGF0YS5maWx0ZXIoZGV0YWlscyA9PiB7XG4gICAgIC8vIHJldHVybiBkZXRhaWxzLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dCk7XG4gICAgICAvL2xldCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKCFub1NlYXJjaC5pbmNsdWRlcyhkZXRhaWxzKSk7XG4gICAgICBsZXQgdmFsdWVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gT2JqZWN0LnZhbHVlcyhkZXRhaWxzKS5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IE9iamVjdC52YWx1ZXMoZGV0YWlscylbaV07XG4gICAgICAgIGlmKHR5cGVvZiBlbGVtZW50ICE9ICdvYmplY3QnKXtcbiAgICAgICAgICB2YWx1ZXMucHVzaChlbGVtZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWVzKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQpO1xuICAgIH0pO1xuICB9XG59XG5cbiJdfQ==