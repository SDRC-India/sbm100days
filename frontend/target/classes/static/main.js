(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./lib/public_api.ts":
/*!***************************!*\
  !*** ./lib/public_api.ts ***!
  \***************************/
/*! exports provided: TableComponent, SortPipePipe, SearchPipePipe, TableModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_table_table_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/table/table.component */ "./lib/src/table/table.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableComponent", function() { return _src_table_table_component__WEBPACK_IMPORTED_MODULE_0__["TableComponent"]; });

/* harmony import */ var _src_sort_pipe_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/sort-pipe.pipe */ "./lib/src/sort-pipe.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortPipePipe", function() { return _src_sort_pipe_pipe__WEBPACK_IMPORTED_MODULE_1__["SortPipePipe"]; });

/* harmony import */ var _src_search_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/search-pipe.pipe */ "./lib/src/search-pipe.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchPipePipe", function() { return _src_search_pipe_pipe__WEBPACK_IMPORTED_MODULE_2__["SearchPipePipe"]; });

/* harmony import */ var _src_table_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/table.module */ "./lib/src/table.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableModule", function() { return _src_table_module__WEBPACK_IMPORTED_MODULE_3__["TableModule"]; });







/***/ }),

/***/ "./lib/src/search-pipe.pipe.ts":
/*!*************************************!*\
  !*** ./lib/src/search-pipe.pipe.ts ***!
  \*************************************/
/*! exports provided: SearchPipePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPipePipe", function() { return SearchPipePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SearchPipePipe = /** @class */ (function () {
    function SearchPipePipe() {
    }
    SearchPipePipe.prototype.transform = function (tableData, searchText) {
        if (!tableData)
            return [];
        if (!searchText)
            return tableData;
        searchText = searchText.toLowerCase();
        return tableData.filter(function (details) {
            // return details.toLowerCase().includes(searchText);
            //let values = Object.values(!noSearch.includes(details));
            var values = [];
            for (var i = Object.values(details).length - 1; i >= 0; i--) {
                var element = Object.values(details)[i];
                if (typeof element != 'object') {
                    values.push(element);
                }
            }
            return JSON.stringify(values).toLowerCase().includes(searchText);
        });
    };
    SearchPipePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'searchPipe'
        })
    ], SearchPipePipe);
    return SearchPipePipe;
}());



/***/ }),

/***/ "./lib/src/sort-pipe.pipe.ts":
/*!***********************************!*\
  !*** ./lib/src/sort-pipe.pipe.ts ***!
  \***********************************/
/*! exports provided: SortPipePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortPipePipe", function() { return SortPipePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SortPipePipe = /** @class */ (function () {
    function SortPipePipe() {
    }
    SortPipePipe.prototype.transform = function (rowData, args) {
        if (rowData != undefined && rowData != null) {
            var total = rowData.pop();
            var sortedData = rowData.sort(function (a, b) {
                var rowdataA = parseInt(a[args.property]);
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
            sortedData.push(total);
            return sortedData;
        }
    };
    ;
    SortPipePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'sortPipe'
        })
    ], SortPipePipe);
    return SortPipePipe;
}());



/***/ }),

/***/ "./lib/src/table.module.ts":
/*!*********************************!*\
  !*** ./lib/src/table.module.ts ***!
  \*********************************/
/*! exports provided: TableModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableModule", function() { return TableModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _table_table_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./table/table.component */ "./lib/src/table/table.component.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _search_pipe_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search-pipe.pipe */ "./lib/src/search-pipe.pipe.ts");
/* harmony import */ var _progress_kendo_angular_pdf_export__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @progress/kendo-angular-pdf-export */ "./node_modules/@progress/kendo-angular-pdf-export/dist/es/index.js");
/* harmony import */ var _sort_pipe_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sort-pipe.pipe */ "./lib/src/sort-pipe.pipe.ts");










var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_5__["Ng2SearchPipeModule"],
                _progress_kendo_angular_pdf_export__WEBPACK_IMPORTED_MODULE_8__["PDFExportModule"]
            ],
            declarations: [_table_table_component__WEBPACK_IMPORTED_MODULE_3__["TableComponent"], _search_pipe_pipe__WEBPACK_IMPORTED_MODULE_7__["SearchPipePipe"], _sort_pipe_pipe__WEBPACK_IMPORTED_MODULE_9__["SortPipePipe"]],
            providers: [],
            exports: [_table_table_component__WEBPACK_IMPORTED_MODULE_3__["TableComponent"], _search_pipe_pipe__WEBPACK_IMPORTED_MODULE_7__["SearchPipePipe"], _sort_pipe_pipe__WEBPACK_IMPORTED_MODULE_9__["SortPipePipe"]]
        })
    ], TableModule);
    return TableModule;
}());



/***/ }),

/***/ "./lib/src/table/table.component.html":
/*!********************************************!*\
  !*** ./lib/src/table/table.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n    <div class=\"row\">           \n\n      <div class=\"col-md-12\">\n        <div class=\"text-right\" [hidden]=\"rowData && !rowData.length\">\n        <!-- <div class=\"col-md-3\">\n          <div class=\"form-group\">\n              <button class=\"btn btn-submit\" [disabled]=\"tableService.disableDeleteBtn\">Delete All</button>\n          </div>\n        </div> -->\n        <div *ngIf=\"searchBox\" class=\"table-btn search\">\n          <div class=\"form-group\">\n            <input class=\"form-control\" type=\"text\" id=\"myInput\" [(ngModel)]=\"searchFilter\" placeholder=\"..search\">\n          </div>\n      </div>\n        <div *ngIf=\"downloadPdf\" class=\"table-btn\">\n          <button class=\"btn btn-pdf btn-submit\" (click)=\"createPdf(pdf, 'table-fixed-container'+id)\"><span><i class=\"fa fa-download\" style=\"font-size:15px;\"\n                aria-hidden=\"true\"></i></span>&nbsp;download pdf</button>\n        </div>\n        <div *ngIf=\"downloadExcel\" class=\"table-btn\">\n          <button class=\"btn btn-excel btn-submit\" (click)=\"tableToExcel(id)\"><span><i class=\"fa fa-file-excel-o\"\n                style=\"font-size:15px;\" aria-hidden=\"true\"></i></span>&nbsp;download excel</button>\n        </div>\n        <div *ngIf=\"downloadPdfByServer\" class=\"table-btn\">\n          <button class=\"btn btn-pdf btn-submit\" (click)=\"downloadPdfByServerClicked(id, rowData)\"><span><i class=\"fa fa-download\" style=\"font-size:15px;\"\n                aria-hidden=\"true\"></i></span>&nbsp;download pdf</button>\n        </div>\n        <div *ngIf=\"downloadExcelByServer\" class=\"table-btn\">\n          <button class=\"btn btn-excel btn-submit\" (click)=\"downloadExcelByServerClicked(id, rowData)\"><span><i class=\"fa fa-file-excel-o\"\n                style=\"font-size:15px;\" aria-hidden=\"true\"></i></span>&nbsp;download excel</button>\n        </div>\n        \n      </div>\n    </div>\n\n    <div class=\"col-md-12\">\n    <div class=\"parent-tabl-container\">\n    <kendo-pdf-export #pdf paperSize=\"A2\" margin=\"2cm\" [repeatHeaders]=\"true\"  [scale]=\"0.6\">\n    <div class=\"filled-form view-form\" id=\"{{'table-fixed-container'+id}}\" (scroll)=\"fixTableHeader($event)\" style=\"overflow: auto;\">                 \n      \n      <!-- Header fixed table section -->\n\n      <div  *ngIf=\"headerFixed\" id=\"{{'header-fixed'+id}}\" class=\" header-fixed\"> \n                <div id=\"{{id+'fixedcontainer'}}\" class=\"fixedcontainer\">\n                  <!-- <th><input type=\"checkbox\" [(ngModel)]=\"tableService.checkStatus\" (click)=\"tableService.selectAllCheckBoxes(rowData, !tableService.checkStatus)\">&nbsp; Select All </th> -->\n                  <div class=\"th\" *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\">{{col}} \n                    <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                        'fa-sort-asc': (col == columns && !isDesc), \n                        'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                    </i>\n                  </div>\n                </div>\n            </div>\n            <!-- <table *ngIf=\"headerFixed\" id=\"{{'header-fixed'+id}}\" class=\"table table-striped table-bordered header-fixed\">\n              <thead>\n                  <tr>\n                    <th *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\" class=\"th\">{{col}}\n                      <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                          'fa-sort-asc': (col == columns && !isDesc), \n                          'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                      </i>\n                    </th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr [ngClass]=\"rowDetails.cssClass ? rowDetails.cssClass:''\" *ngFor=\"let rowDetails of rowData | searchPipe: searchFilter | sortPipe: {property: columns, direction: direction} | paginate: { itemsPerPage: itemsPerPage, currentPage: p } let i = index;\">\n                    <td *ngFor=\"let col of columnData\">\n                      <div *ngIf=\"getType(rowDetails[col]) != 'object'\">{{rowDetails[col]}}</div>\n                      <div *ngIf=\"getType(rowDetails[col]) == 'object'\" style=\"display: inline-flex;\">\n                        <div *ngFor=\"let colDetails of rowDetails[col]\">\n                            <div [ngSwitch]=\"colDetails.controlType\" class=\"col-md-9 input-holder\">\n                              <button *ngSwitchCase=\"'button'\"  class=\"{{colDetails.class}}\" type=\"{{colDetails.type}}\" (click)=\"actionClicked(colDetails.class, rowDetails)\"><i *ngIf=\"colDetails.icon\" class=\"fa\" [ngClass]=\"colDetails.icon\"></i>{{colDetails.value}}</button>\n                                \n                                <input *ngSwitchCase=\"'textbox'\" name=\"{{colDetails.name}}\" [type]=\"colDetails.type\" [(ngModel)]=\"colDetails.value\" class=\"form-control\">\n    \n                            </div>\n                        </div>\n                      </div>\n                    </td>\n                  </tr>   \n                </tbody>\n                </table> -->\n\n         <!-- main table -->\n          <table class=\"table table-striped table-bordered\" id=\"{{id}}\">\n            <thead>\n              <tr>\n                <!-- <th><input type=\"checkbox\" [(ngModel)]=\"tableService.checkStatus\" (click)=\"tableService.selectAllCheckBoxes(rowData, !tableService.checkStatus)\">&nbsp; Select All </th> -->\n                <th *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\">{{col}}\n                  <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                      'fa-sort-asc': (col == columns && !isDesc), \n                      'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                  </i>\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let rowDetails of rowData | searchPipe: searchFilter | sortPipe: {property: columns, direction: direction} | paginate: { itemsPerPage: itemsPerPage, currentPage: p, id:id } let i = index;\">\n                <!-- <td><input type=\"checkbox\" [(ngModel)]=\"rowDetails.isChecked\" (change)=\"tableService.singleCheckBoxClicked(tableService.rowData)\"></td> -->\n                <td *ngFor=\"let col of columnData\">\n                  <div *ngIf=\"getType(rowDetails[col]) != 'object'\">{{rowDetails[col]}}</div>\n                  <div *ngIf=\"getType(rowDetails[col]) == 'object'\" style=\"display: inline-flex;\">\n                    <div *ngFor=\"let colDetails of rowDetails[col]\">\n                        <div [ngSwitch]=\"colDetails.controlType\" class=\"col-md-9 input-holder\">\n                          <button *ngSwitchCase=\"'button'\"  class=\"{{colDetails.class}}\" type=\"{{colDetails.type}}\" (click)=\"actionClicked(colDetails.class, rowDetails)\"><i *ngIf=\"colDetails.icon\" class=\"fa\" [ngClass]=\"colDetails.icon\"></i>{{colDetails.value}}</button>\n                            \n                            <input *ngSwitchCase=\"'textbox'\" name=\"{{colDetails.name}}\" [type]=\"colDetails.type\" [(ngModel)]=\"colDetails.value\" class=\"form-control\">\n\n                            <!-- <input *ngSwitchCase=\"'checkbox'\" name=\"{{colDetails.name}}\" type=\"{{colDetails.type}}\">                                    -->\n                        </div>\n                    </div>\n                  </div>\n                </td>\n              </tr>   \n            </tbody>\n          </table>   \n        \n        </div>\n        </kendo-pdf-export>\n        <br/>\n        <div  *ngIf=\"(rowData && !rowData.length) || (rowData && rowData.length && (rowData | searchPipe: searchFilter).length==0)\" class=\"col-md-12 text-center search-area\">No Data Found.</div>\n        <div *ngIf=\"isPaginate && rowData && rowData.length\">\n          <pagination-controls (pageChange)=\"p = $event;\" id=\"{{id}}\" class=\"pagination-view\"></pagination-controls>\n        </div>\n      </div>\n     </div>\n    </div>\n"

/***/ }),

/***/ "./lib/src/table/table.component.scss":
/*!********************************************!*\
  !*** ./lib/src/table/table.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header-fixed {\n  position: absolute;\n  display: none;\n  z-index: 1;\n  overflow: hidden;\n  margin-right: 15px;\n  background-color: #234a7c; }\n\n.header-fixed .th.ng-star-inserted {\n  height: 100%;\n  float: left;\n  background-color: #234a7c;\n  color: #FFF;\n  border-left: 1px solid #FFF;\n  text-align: center;\n  vertical-align: middle;\n  font-weight: bold;\n  padding-top: .75rem;\n  display: inline; }\n\n.parent-tabl-container {\n  position: relative; }\n\ntable thead {\n  background-color: #187080;\n  color: #FFF; }\n\ntd {\n  text-align: center; }\n\ntable thead th {\n  vertical-align: middle;\n  text-align: center; }\n\n.pagination-view {\n  float: right; }\n\n#myInput {\n  width: 100%;\n  border-radius: 0;\n  font-size: 16px;\n  padding: 7px 20px 12px 30px;\n  font-style: inherit;\n  border: 1px solid #ddd;\n  margin-bottom: 12px;\n  box-shadow: 0px 0px 2px 0px; }\n\n.table-btn.search .form-group {\n  position: relative; }\n\n.table-btn.search .form-group:before {\n  position: absolute;\n  font-family: 'FontAwesome';\n  top: 5px;\n  left: 7px;\n  color: #9c9c9c;\n  content: \"\\f002\"; }\n\n.search-area {\n  font-style: italic;\n  margin-top: 30px;\n  margin-bottom: 30px;\n  font-size: 30px; }\n\ninput[type=\"text\"] {\n  font-style: italic; }\n\n.table-btn .btn-excel, .table-btn .btn-pdf {\n  margin-bottom: 16px;\n  background-color: #357080;\n  color: #FFF;\n  border-radius: 0; }\n\n.btn-excel:focus, .btn-excel:active {\n  outline: none !important;\n  border: none !important; }\n\n.fa-sorting {\n  cursor: pointer; }\n\n.table-btn {\n  display: inline-block;\n  float: right;\n  margin: 0 5px; }\n\n.fixedcontainer {\n  position: absolute;\n  top: 0;\n  z-index: 9999; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zcmMvdGFibGUvRDpcXHNibV8xMDBfdWlfZGV2XFxzYm0xMDAvbGliXFxzcmNcXHRhYmxlXFx0YWJsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFrQjtFQUNsQixjQUFZO0VBQ1osV0FBVTtFQUNWLGlCQUFnQjtFQUNoQixtQkFBa0I7RUFDbEIsMEJBQWtDLEVBR3JDOztBQUNEO0VBQ0ksYUFBWTtFQUNaLFlBQVc7RUFDWCwwQkFBeUI7RUFDekIsWUFBVztFQUNYLDRCQUEyQjtFQUMzQixtQkFBa0I7RUFDbEIsdUJBQXNCO0VBQ3RCLGtCQUFpQjtFQUNqQixvQkFBbUI7RUFDbkIsZ0JBQWUsRUFDbEI7O0FBQ0Q7RUFDSSxtQkFBa0IsRUFDckI7O0FBRUQ7RUFDSSwwQkFBeUI7RUFDekIsWUFBVyxFQUNkOztBQUNEO0VBQ0ksbUJBQWtCLEVBQ3JCOztBQUNEO0VBQ0ksdUJBQXNCO0VBQ3RCLG1CQUFrQixFQUNyQjs7QUFDRDtFQUVJLGFBQVcsRUFDZDs7QUFDRDtFQUNJLFlBQVc7RUFDWCxpQkFBZ0I7RUFDaEIsZ0JBQWU7RUFDZiw0QkFBMkI7RUFDM0Isb0JBQW1CO0VBQ25CLHVCQUFzQjtFQUN0QixvQkFBbUI7RUFDbkIsNEJBQTJCLEVBQzlCOztBQUNEO0VBQ0ksbUJBQWtCLEVBQ3JCOztBQUNEO0VBQ0ksbUJBQWtCO0VBQ2xCLDJCQUEwQjtFQUMxQixTQUFRO0VBQ1IsVUFBUztFQUNULGVBQWM7RUFDZCxpQkFBZ0IsRUFDakI7O0FBRUg7RUFFSSxtQkFBa0I7RUFDbEIsaUJBQWdCO0VBQ2hCLG9CQUFtQjtFQUNuQixnQkFBZSxFQUNsQjs7QUFDRDtFQUVJLG1CQUFpQixFQUNwQjs7QUFDRDtFQUNJLG9CQUFtQjtFQUNuQiwwQkFBeUI7RUFDekIsWUFBVztFQUNYLGlCQUFnQixFQUNuQjs7QUFDRDtFQUNJLHlCQUF3QjtFQUN4Qix3QkFBdUIsRUFDMUI7O0FBQ0Q7RUFDSSxnQkFBZSxFQUNsQjs7QUFDRDtFQUNJLHNCQUFxQjtFQUNyQixhQUFZO0VBQ1osY0FBYSxFQUVoQjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixPQUFNO0VBQ04sY0FBYSxFQUNoQiIsImZpbGUiOiJsaWIvc3JjL3RhYmxlL3RhYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlci1maXhlZCB7IFxyXG4gICAgcG9zaXRpb246IGFic29sdXRlOyBcclxuICAgIGRpc3BsYXk6bm9uZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM1LCA3NCwgMTI0KTtcclxuICAgIFxyXG4gICAgLy8gd2lkdGg6IGF1dG87XHJcbn1cclxuLmhlYWRlci1maXhlZCAudGgubmctc3Rhci1pbnNlcnRlZCB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMzRhN2M7XHJcbiAgICBjb2xvcjogI0ZGRjtcclxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0ZGRjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHBhZGRpbmctdG9wOiAuNzVyZW07XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbn1cclxuLnBhcmVudC10YWJsLWNvbnRhaW5lcntcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxudGFibGUgdGhlYWR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTg3MDgwO1xyXG4gICAgY29sb3I6ICNGRkY7XHJcbn1cclxudGR7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxudGFibGUgdGhlYWQgdGh7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5wYWdpbmF0aW9uLXZpZXdcclxue1xyXG4gICAgZmxvYXQ6cmlnaHQ7XHJcbn1cclxuI215SW5wdXQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgZm9udC1zaXplOiAxNnB4OyBcclxuICAgIHBhZGRpbmc6IDdweCAyMHB4IDEycHggMzBweDtcclxuICAgIGZvbnQtc3R5bGU6IGluaGVyaXQ7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMnB4IDBweDtcclxufVxyXG4udGFibGUtYnRuLnNlYXJjaCAuZm9ybS1ncm91cHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4udGFibGUtYnRuLnNlYXJjaCAuZm9ybS1ncm91cDpiZWZvcmUge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgZm9udC1mYW1pbHk6ICdGb250QXdlc29tZSc7XHJcbiAgICB0b3A6IDVweDtcclxuICAgIGxlZnQ6IDdweDtcclxuICAgIGNvbG9yOiAjOWM5YzljO1xyXG4gICAgY29udGVudDogXCJcXGYwMDJcIjtcclxuICB9XHJcblxyXG4uc2VhcmNoLWFyZWFcclxue1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbn1cclxuaW5wdXRbdHlwZT1cInRleHRcIl0gXHJcbntcclxuICAgIGZvbnQtc3R5bGU6aXRhbGljO1xyXG59XHJcbi50YWJsZS1idG4gLmJ0bi1leGNlbCwgLnRhYmxlLWJ0biAuYnRuLXBkZntcclxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzU3MDgwO1xyXG4gICAgY29sb3I6ICNGRkY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwO1xyXG59XHJcbi5idG4tZXhjZWw6Zm9jdXMsIC5idG4tZXhjZWw6YWN0aXZle1xyXG4gICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7XHJcbn1cclxuLmZhLXNvcnRpbmd7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLnRhYmxlLWJ0biB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBtYXJnaW46IDAgNXB4O1xyXG4gICAgLy8gbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG4uZml4ZWRjb250YWluZXJ7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICB6LWluZGV4OiA5OTk5O1xyXG59Il19 */"

/***/ }),

/***/ "./lib/src/table/table.component.ts":
/*!******************************************!*\
  !*** ./lib/src/table/table.component.ts ***!
  \******************************************/
/*! exports provided: TableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableComponent", function() { return TableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var save_as__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! save-as */ "./node_modules/save-as/lib/index.js");
/* harmony import */ var save_as__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(save_as__WEBPACK_IMPORTED_MODULE_2__);



var TableComponent = /** @class */ (function () {
    function TableComponent() {
        this.fixTableConfig = {};
        this.checkStatus = false;
        this.disableDeleteBtn = true;
        this.p = 1;
        //keys for paginate and itemsPerpage from table-paginate.directive
        this.isPaginate = false;
        //isHeaderFixed from table-headerfix.directive
        this.headerFixed = false;
        //searchBox from table-searchBox.directive.ts
        this.searchBox = false;
        //download Pdf and Excel table-downloadPdf.directive and table-downloadExcel.directive
        this.downloadPdf = false;
        this.downloadExcel = false;
        //download pdf and excel by server side
        this.downloadPdfByServer = false;
        this.downloadExcelByServer = false;
        this.onActionButtonClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDownloadPdfByServerClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDownloadExcelByServerClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    TableComponent.prototype.ngOnInit = function () { };
    TableComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.rowData && !this.isPaginate)
            this.itemsPerPage = this.rowData.length;
        setTimeout(function () {
            if (_this.headerFixed)
                _this.setDuplicateFixedTable();
            if (_this.maxTableHeight) {
                $('#table-fixed-container' + _this.id).css("max-height", _this.maxTableHeight);
            }
        });
    };
    TableComponent.prototype.appendHttp = function (link) {
        if (!link.startsWith('http')) {
            return 'http://' + link;
        }
        else {
            return link;
        }
    };
    TableComponent.prototype.sort = function (property) {
        this.isDesc = !this.isDesc; //change the direction    
        this.columns = property;
        this.direction = this.isDesc ? 1 : -1;
    };
    ;
    TableComponent.prototype.setDuplicateFixedTable = function () {
        var _this = this;
        // $("#header-fixed").html("");
        this.fixTableConfig.headerHeight = $("#" + this.id + " > thead").height();
        this.fixTableConfig.width = $('#' + this.id).closest(".parent-tabl-container").width();
        // this.fixTableConfig.header = $("#org-full-data > thead").clone();
        // this.fixTableConfig.body = $("#org-full-data > tbody").clone();
        // this.fixTableConfig.fixedHeader = $("#header-fixed").append(this.fixTableConfig.header);
        // this.fixTableConfig.table = $("#header-fixed").append(this.fixTableConfig.body);
        $("#header-fixed" + this.id).height(this.fixTableConfig.headerHeight);
        $('#' + this.id + 'fixedcontainer').height(this.fixTableConfig.headerHeight);
        // if($("#"+this.id).parent()[0].scrollWidth == $("#"+this.id).parent()[0].clientWidth){
        if ($(window).width() <= 768) {
            $("#header-fixed" + this.id).width(this.fixTableConfig.width);
        }
        else {
            $("#header-fixed" + this.id).width(this.fixTableConfig.width - 16);
        }
        // }
        $('#' + this.id + 'fixedcontainer').width($("#" + this.id).parent()[0].scrollWidth);
        setTimeout(function () {
            // if($("#"+this.id).parent()[0].scrollWidth == $("#"+this.id).parent()[0].clientWidth){
            var tempThis = _this;
            $("#header-fixed" + _this.id + " .th").each(function (index) {
                $(this).width($($("#" + tempThis.id + " th")[index]).width() + 25);
            });
            // }
        }, 3000);
    };
    TableComponent.prototype.fixTableHeader = function (event) {
        var offset = $(event.target).scrollTop();
        $("#header-fixed" + this.id).scrollLeft($(event.target).scrollLeft());
        if (offset >= this.fixTableConfig.headerHeight) {
            $("#header-fixed" + this.id).css("display", "block");
        }
        else if (offset < this.fixTableConfig.headerHeight) {
            $("#header-fixed" + this.id).hide();
        }
    };
    TableComponent.prototype.tableToExcel = function (id) {
        var _this = this;
        // console.log(table);
        var itemsPerPage = this.itemsPerPage;
        this.itemsPerPage = this.rowData.length;
        // setTimeout(()=>{
        //   let uri = 'data:application/vnd.ms-excel;base64,'
        //     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        //     , base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) }
        //     , format = function(s,c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        //   if (!table.nodeType) table = document.getElementById(table)
        //    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        //    window.location.href = uri + base64(format(template, ctx))
        //    setTimeout(()=>{
        //     this.itemsPerPage = itemsPerPage;
        //    },1000)
        // }, 200)
        setTimeout(function () {
            var htmls = "";
            var uri = 'data:application/vnd.ms-excel;base64,';
            var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
            var base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)));
            };
            var format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                });
            };
            var tab_text = "<table border='2px'>";
            var textRange;
            var j = 0;
            var tab = document.getElementById(id); // id of table
            for (j = 0; j < tab['rows'].length; j++) {
                if (j == 0)
                    tab_text = tab_text + "<tr style='background-color: #00837F; color: #FFF; font-weight: bold' valign='top'>" + tab['rows'][j].innerHTML + "</tr>";
                else
                    tab_text = tab_text + "<tr valign='top'>" + tab['rows'][j].innerHTML + "</tr>";
                //tab_text=tab_text+"</tr>";
            }
            tab_text = tab_text + "</table>";
            tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
            tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
            tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
            var ctx = {
                worksheet: 'Worksheet',
                table: tab_text
            };
            save_as__WEBPACK_IMPORTED_MODULE_2___default()(new Blob([tab_text], { type: "application/vnd.ms-excel" }), _this.excelName + ".xls");
            setTimeout(function () {
                _this.itemsPerPage = itemsPerPage;
            }, 500);
        }, 200);
    };
    TableComponent.prototype.getType = function (x) {
        return typeof x;
    };
    TableComponent.prototype.createPdf = function (target, containerId) {
        var _this = this;
        var tempHeight = $("kendo-pdf-export").find("#" + containerId).css("max-height");
        var itemsPerPage = this.itemsPerPage;
        var sorting = this.sorting;
        this.itemsPerPage = this.rowData.length;
        this.sorting = false;
        $("kendo-pdf-export").find("#" + containerId).scrollTop(0);
        setTimeout(function () {
            $("kendo-pdf-export").find("#" + containerId).css("max-height", "none");
            target.saveAs(_this.pdfName + ".pdf");
            setTimeout(function () {
                _this.itemsPerPage = itemsPerPage;
                _this.sorting = sorting;
                $("kendo-pdf-export").find("#" + containerId).css("max-height", tempHeight);
            }, 1000);
        }, 200);
    };
    TableComponent.prototype.actionClicked = function (btnClass, rowObj) {
        var emittedData = { target: btnClass, rowObj: rowObj };
        this.onActionButtonClicked.emit(emittedData);
    };
    TableComponent.prototype.downloadPdfByServerClicked = function (tableId, tableData) {
        var emittedData = { table: tableId, tableData: tableData };
        this.onDownloadPdfByServerClicked.emit(emittedData);
    };
    TableComponent.prototype.downloadExcelByServerClicked = function (tableId, tableData) {
        var emittedData = { table: tableId, tableData: tableData };
        this.onDownloadExcelByServerClicked.emit(emittedData);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TableComponent.prototype, "id", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], TableComponent.prototype, "rowData", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], TableComponent.prototype, "columnData", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TableComponent.prototype, "maxTableHeight", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TableComponent.prototype, "sorting", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], TableComponent.prototype, "sortExcludeColumn", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TableComponent.prototype, "isPaginate", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], TableComponent.prototype, "itemsPerPage", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TableComponent.prototype, "headerFixed", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TableComponent.prototype, "searchBox", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TableComponent.prototype, "downloadPdf", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TableComponent.prototype, "pdfName", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TableComponent.prototype, "downloadExcel", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TableComponent.prototype, "excelName", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TableComponent.prototype, "downloadPdfByServer", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TableComponent.prototype, "downloadExcelByServer", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], TableComponent.prototype, "onActionButtonClicked", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], TableComponent.prototype, "onDownloadPdfByServerClicked", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], TableComponent.prototype, "onDownloadExcelByServerClicked", void 0);
    TableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'sdrc-table',
            template: __webpack_require__(/*! ./table.component.html */ "./lib/src/table/table.component.html"),
            styles: [__webpack_require__(/*! ./table.component.scss */ "./lib/src/table/table.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TableComponent);
    return TableComponent;
}());



/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./dashboard/dashboard.module": [
		"./src/app/dashboard/dashboard.module.ts"
	],
	"./report/report.module": [
		"./src/app/report/report.module.ts"
	],
	"./static/static.module": [
		"./src/app/static/static.module.ts"
	],
	"./user-management/user-management.module": [
		"./src/app/user-management/user-management.module.ts"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _exception404_exception404_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./exception404/exception404.component */ "./src/app/exception404/exception404.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _guard_loggedin_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./guard/loggedin.guard */ "./src/app/guard/loggedin.guard.ts");







var routes = [
    {
        path: '',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
        pathMatch: 'full'
    }, {
        path: 'login',
        pathMatch: 'full',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
        canActivate: [_guard_loggedin_guard__WEBPACK_IMPORTED_MODULE_6__["LoggedinGuard"]]
    },
    {
        path: 'error',
        component: _exception404_exception404_component__WEBPACK_IMPORTED_MODULE_4__["Exception404Component"],
        pathMatch: 'full'
    },
    {
        path: 'exception',
        component: _exception404_exception404_component__WEBPACK_IMPORTED_MODULE_4__["Exception404Component"],
        pathMatch: 'full'
    },
    {
        path: 'user',
        loadChildren: './user-management/user-management.module#UserManagementModule',
    },
    {
        path: 'reportModule',
        loadChildren: './report/report.module#ReportModule',
    },
    {
        path: 'DashboardModule',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
    },
    {
        path: 'static',
        loadChildren: './static/static.module#StaticModule',
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<ngx-spinner\n  bdColor=\"rgba(51,51,51,0.8)\"\n  size=\"medium\"\n  color=\"#fff\"\n  type=\"ball-scale-multiple\">\n <!-- <p style=\"font-size: 20px; color: white; position: fixed; left: 0; right: 0; top: 0;bottom: 0; transform: translate(-35px, -25px);\">Loading...</p> -->\n</ngx-spinner>\n<div style=\"position: relative;\" class=\"main-content\" id=\"bodyMain\">\n    <router-outlet></router-outlet>\n</div>\n<app-footer></app-footer>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        $(".main-content").css("min-height", $(window).height() - 240);
    };
    AppComponent.prototype.ngOnInit = function () {
        /** start of header fix on scroll down **/
        $(window).scroll(function () {
            // console.log($(window).scrollTop())
            if ($(window).scrollTop() > 149 && $(window).width() < 2000) {
                $('#header').addClass('navbar-fixed');
                $(".left-list").addClass('left-side-scroll');
            }
            if ($(window).scrollTop() < 149 && $(window).width() < 2000) {
                $('#header').removeClass('navbar-fixed');
                $(".left-list").removeClass('left-side-scroll');
            }
        });
        /** end of header fix on scroll down **/
        this.router.events.subscribe(function (evt) {
            if (!(evt instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"])) {
                return;
            }
            window.scrollTo(0, 0);
        });
    };
    AppComponent.prototype.ngAfterViewChecked = function () {
        if ($(window).width() <= 992) {
            $(".collapse").removeClass("show");
            $(".navbar-nav .nav-item").not('.dropdown').click(function () {
                $(".collapse").removeClass("show");
            });
        }
        $(".main-content").css("min-height", $(window).height() - 240);
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _fragments_header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fragments/header/header.component */ "./src/app/fragments/header/header.component.ts");
/* harmony import */ var _fragments_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fragments/footer/footer.component */ "./src/app/fragments/footer/footer.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _service_xhr_interceptor_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./service/xhr-interceptor.service */ "./src/app/service/xhr-interceptor.service.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.service */ "./src/app/app.service.ts");
/* harmony import */ var _service_user_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./service/user/user.service */ "./src/app/service/user/user.service.ts");
/* harmony import */ var _guard_auth_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./guard/auth.guard */ "./src/app/guard/auth.guard.ts");
/* harmony import */ var _service_session_check_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./service/session-check.service */ "./src/app/service/session-check.service.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _exception404_exception404_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./exception404/exception404.component */ "./src/app/exception404/exception404.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _service_static_home_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./service/static-home.service */ "./src/app/service/static-home.service.ts");
/* harmony import */ var _user_management_user_management_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./user-management/user-management.module */ "./src/app/user-management/user-management.module.ts");
/* harmony import */ var _report_report_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./report/report.module */ "./src/app/report/report.module.ts");
/* harmony import */ var _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./dashboard/dashboard.module */ "./src/app/dashboard/dashboard.module.ts");
/* harmony import */ var _static_static_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./static/static.module */ "./src/app/static/static.module.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _guard_role_guard_guard__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./guard/role-guard.guard */ "./src/app/guard/role-guard.guard.ts");
/* harmony import */ var _guard_loggedin_guard__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./guard/loggedin.guard */ "./src/app/guard/loggedin.guard.ts");



























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _fragments_header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"],
                _fragments_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__["FooterComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_13__["HomeComponent"],
                _exception404_exception404_component__WEBPACK_IMPORTED_MODULE_14__["Exception404Component"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_22__["LoginComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_23__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_23__["ReactiveFormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatFormFieldModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _user_management_user_management_module__WEBPACK_IMPORTED_MODULE_18__["UserManagementModule"],
                _report_report_module__WEBPACK_IMPORTED_MODULE_19__["ReportModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_16__["MatInputModule"],
                _report_report_module__WEBPACK_IMPORTED_MODULE_19__["ReportModule"],
                _static_static_module__WEBPACK_IMPORTED_MODULE_21__["StaticModule"],
                _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_20__["DashboardModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_23__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_23__["ReactiveFormsModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_24__["NgxSpinnerModule"]
            ],
            providers: [{ provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"], useClass: _service_xhr_interceptor_service__WEBPACK_IMPORTED_MODULE_8__["XhrInterceptorService"], multi: true }, _app_service__WEBPACK_IMPORTED_MODULE_9__["AppService"], _service_user_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"], _guard_auth_guard__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"], _guard_role_guard_guard__WEBPACK_IMPORTED_MODULE_25__["RoleGuardGuard"], _guard_loggedin_guard__WEBPACK_IMPORTED_MODULE_26__["LoggedinGuard"], _service_session_check_service__WEBPACK_IMPORTED_MODULE_12__["SessionCheckService"], _service_xhr_interceptor_service__WEBPACK_IMPORTED_MODULE_8__["XhrInterceptorService"], _service_static_home_service__WEBPACK_IMPORTED_MODULE_17__["StaticHomeService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.service.ts":
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-cookies */ "./node_modules/ng2-cookies/index.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_cookies__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./src/app/constants.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");









var AppService = /** @class */ (function () {
    function AppService(http, router, spinner) {
        this.http = http;
        this.router = router;
        this.spinner = spinner;
        this.authenticated = false;
        this.logoutSuccess = false;
        this.isValid = true;
        console.log(ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].get('access_token'));
        // this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
    }
    AppService.prototype.authenticate = function (credentials, callback) {
        var _this = this;
        this.spinner.show();
        this.isValid = false;
        this.callServer(credentials).subscribe(function (response) {
            _this._data = response; //store the token
            ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].set('access_token', _this._data.access_token);
            ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].set('refresh_token', _this._data.refresh_token);
            var httpOptions = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                    'Authorization': 'Bearer ' + _this._data.access_token,
                    'Content-type': 'application/json'
                })
            };
            _this.spinner.hide();
            _this.http.get(_constants__WEBPACK_IMPORTED_MODULE_7__["Constants"].HOME_URL + 'oauth/user', httpOptions).subscribe(function (user) {
                ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].set('user_details', JSON.stringify(user));
                _this.router.navigateByUrl('/');
                _this.isValid = true;
            });
        }, function (error) {
            if (error == "User is disabled")
                _this.validationMsg = "Given username has been disabled. Please contact your admin";
            else if (error == "Invalid Credentials !" || error == "Bad credentials")
                _this.validationMsg = "Wrong username/password entered";
            setTimeout(function () {
                _this.validationMsg = "";
            }, 3000);
            _this.spinner.hide();
            _this.isValid = true;
        });
    };
    AppService.prototype.callServer = function (userDetails) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            })
        };
        var URL = _constants__WEBPACK_IMPORTED_MODULE_7__["Constants"].HOME_URL + 'oauth/token';
        var params = new URLSearchParams();
        params.append('username', userDetails.username);
        params.append('password', userDetails.password);
        params.append('grant_type', 'password');
        params.append('client_id', 'web');
        return this.http.post(URL, params.toString(), httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError));
    };
    AppService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error.error_description));
        }
        // return an observable with a user-facing error message
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["throwError"])(
        //'Something bad happened; please try again later.');     
        error.error.error_description);
    };
    ;
    AppService.prototype.checkLoggedIn = function () {
        if (!ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].check('access_token')) {
            return false;
        }
        else {
            return true;
        }
    };
    //handles nav-links which are going to be shown 
    AppService.prototype.checkUserAuthorization = function (expectedRoles) {
        if (ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].check('user_details')) {
            var token = JSON.parse(ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].get('user_details'));
        }
        var flag = false;
        if (token !== undefined) {
            if (this.checkLoggedIn()) {
                expectedRoles.forEach(function (expectedRole) {
                    for (var i = 0; i < token.authorities.length; i++) {
                        if (token.authorities[i] == expectedRole) {
                            flag = true;
                        }
                    }
                });
            }
        }
        return flag;
    };
    AppService.prototype.logout = function () {
        var _this = this;
        this.deleteCookies();
        this.router.navigateByUrl('/');
        this.logoutSuccess = true;
        setTimeout(function () {
            _this.logoutSuccess = false;
        }, 2000);
    };
    AppService.prototype.deleteCookies = function () {
        ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].deleteAll();
    };
    AppService.prototype.getUserDetails = function () {
        if (this.checkLoggedIn())
            return JSON.parse(ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].get('user_details'));
        else
            return {};
    };
    AppService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"]])
    ], AppService);
    return AppService;
}());



/***/ }),

/***/ "./src/app/constants.ts":
/*!******************************!*\
  !*** ./src/app/constants.ts ***!
  \******************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "HOME_URL", {
        get: function () { return "/sbm100/"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "CMS_URL", {
        get: function () { return "cms/"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Constants, "CONTACT_URL", {
        get: function () { return "contact/"; },
        enumerable: true,
        configurable: true
    });
    ;
    return Constants;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _thematic_dashboard_thematic_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./thematic-dashboard/thematic-dashboard.component */ "./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.ts");




var routes = [
    {
        path: 'dashboard/index-view',
        component: _thematic_dashboard_thematic_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["ThematicDashboardComponent"],
        pathMatch: 'full'
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.module.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/dashboard/dashboard-routing.module.ts");
/* harmony import */ var _thematic_dashboard_thematic_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./thematic-dashboard/thematic-dashboard.component */ "./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.ts");
/* harmony import */ var _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./line-chart/line-chart.component */ "./src/app/dashboard/line-chart/line-chart.component.ts");
/* harmony import */ var _filters_remove_array_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./filters/remove-array.pipe */ "./src/app/dashboard/filters/remove-array.pipe.ts");









var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_thematic_dashboard_thematic_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["ThematicDashboardComponent"], _line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_6__["LineChartComponent"], _filters_remove_array_pipe__WEBPACK_IMPORTED_MODULE_7__["RemoveArrayPipe"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_4__["DashboardRoutingModule"]
            ],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NO_ERRORS_SCHEMA"]]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/dashboard/filters/remove-array.pipe.ts":
/*!********************************************************!*\
  !*** ./src/app/dashboard/filters/remove-array.pipe.ts ***!
  \********************************************************/
/*! exports provided: RemoveArrayPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveArrayPipe", function() { return RemoveArrayPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var RemoveArrayPipe = /** @class */ (function () {
    function RemoveArrayPipe() {
    }
    RemoveArrayPipe.prototype.transform = function (items, filter) {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(function (item) { return item.title.indexOf(filter.title) !== -1; });
    };
    RemoveArrayPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'removeArray',
            pure: false
        })
    ], RemoveArrayPipe);
    return RemoveArrayPipe;
}());



/***/ }),

/***/ "./src/app/dashboard/line-chart/line-chart.component.html":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/line-chart/line-chart.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"line-chart\" #linechart></div>"

/***/ }),

/***/ "./src/app/dashboard/line-chart/line-chart.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/line-chart/line-chart.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line-chart {\n  margin-top: -30px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2xpbmUtY2hhcnQvRDpcXHNibV8xMDBfdWlfZGV2XFxzYm0xMDAvc3JjXFxhcHBcXGRhc2hib2FyZFxcbGluZS1jaGFydFxcbGluZS1jaGFydC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFpQixFQUNwQiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9saW5lLWNoYXJ0L2xpbmUtY2hhcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGluZS1jaGFydHtcclxuICAgIG1hcmdpbi10b3A6IC0zMHB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/dashboard/line-chart/line-chart.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/dashboard/line-chart/line-chart.component.ts ***!
  \**************************************************************/
/*! exports provided: LineChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartComponent", function() { return LineChartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");



var LineChartComponent = /** @class */ (function () {
    function LineChartComponent() {
    }
    LineChartComponent.prototype.ngOnInit = function () {
        if (this.data) {
            this.createChart(this.data);
        }
    };
    LineChartComponent.prototype.ngOnChanges = function (changes) {
        if (this.data && changes.data.previousValue) {
            this.createChart(this.data);
        }
    };
    LineChartComponent.prototype.createChart = function (data) {
        var el = this.chartContainer.nativeElement;
        d3__WEBPACK_IMPORTED_MODULE_2__["select"](el).selectAll("*").remove();
        var margin = {
            top: 20,
            right: 15,
            bottom: 60,
            left: 50
        }, width = 380;
        if (el.clientWidth > 565)
            var height = 220 - margin.top - margin.bottom;
        else
            var height = 180 - margin.top - margin.bottom;
        var x = d3__WEBPACK_IMPORTED_MODULE_2__["scaleBand"]().range([0, width], 1.0);
        var y = d3__WEBPACK_IMPORTED_MODULE_2__["scaleLinear"]().rangeRound([height, 0]);
        var xAxis = d3__WEBPACK_IMPORTED_MODULE_2__["axisBottom"]().scale(x).ticks(5);
        var yAxis = d3__WEBPACK_IMPORTED_MODULE_2__["axisLeft"]().scale(y)
            .ticks(5);
        var dataNest = d3__WEBPACK_IMPORTED_MODULE_2__["nest"]().key(function (d) {
            return d.key;
        }).entries(data);
        var lineFunctionCardinal = d3__WEBPACK_IMPORTED_MODULE_2__["line"]()
            .defined(function (d) { return d && d.value != null; })
            .x(function (d) {
            return x(d.date) + width / data.length * dataNest.length / 2;
        }).y(function (d) {
            return y(d.value);
        }).curve(d3__WEBPACK_IMPORTED_MODULE_2__["curveCardinal"]);
        y.domain([0, 100]);
        // Adds the svg canvas
        var svg = d3__WEBPACK_IMPORTED_MODULE_2__["select"](el).append("svg").attr("id", "trendsvg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom + 200)
            .append("g").attr("transform", "translate(" + margin.left + ","
            + (margin.top + 50) + ")").style("fill", "#fff");
        x.domain(data.map(function (d) {
            return d.date;
        }));
        y.domain([0, d3__WEBPACK_IMPORTED_MODULE_2__["max"](data, function (d) {
                return d.value;
            })]);
        var color = d3__WEBPACK_IMPORTED_MODULE_2__["scaleOrdinal"]().range(["#1a9641"]);
        svg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis).append("text").attr("x", width).attr("y", "65").attr("dx", ".71em")
            .text("Time Period").style({ "fill": "#fff", "text-align": "right", "text-anchor": "end",
            "font-weight": "bold",
            "letter-spacing": "1px"
        });
        d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"](".x.axis .tick text").attr("dx", "-3em").attr("dy", "0").attr("transform", function (d) {
            return "rotate(-50)";
        }).style({ "text-anchor": "end", "font-size": "11px", "font-weight": "normal" });
        svg.selectAll("text");
        svg.append("g").attr("class", "y axis").call(yAxis)
            .append("text").attr("transform", "rotate(-90)").attr("y", -50).attr("x", -height / 2).attr("dy", ".51em").text("Value")
            .style({ "text-anchor": "middle", "fill": "#fff",
            "font-weight": "bold",
            "letter-spacing": "1px"
        });
        // adding multiple lines in Line chart
        for (var index = 0; index < dataNest.length; index++) {
            var series = svg.append("g").attr("class", "series tag" + dataNest[index].key.split(" ")[0]).attr("id", "tag" + dataNest[index].key.split(" ")[0]);
            var path = svg.selectAll(".series#tag" + dataNest[index].key.split(" ")[0])
                .append("path")
                .attr("class", "line tag" + dataNest[index].key.split(" ")[0])
                .attr("id", "tag" + dataNest[index].key.split(" ")[0])
                .attr("d", function (d) {
                //if(dataNest[index].key == "CL")
                return lineFunctionCardinal(dataNest[index].values);
                //else
                //return lineFunctionStep(dataNest[index].values);
            }).style("stroke", function (d) {
                return color(dataNest[index].key);
            }).style("stroke-width", "2px").style("fill", "none").style("cursor", function (d) {
                //  if(dataNest[index].key == "P-Average")
                //    return "pointer";
                //  else
                return "default";
            }).on("mouseover", function (d) {
                if ($(this).attr("id") == "tagP-Average")
                    showPopover.call(this, dataNest[3].values[0]);
            }).on("mouseout", function (d) {
                removePopovers();
            });
            ;
            svg.selectAll(".series#tag" + dataNest[index].key.split(" ")[0]).select(".point").data(function () {
                return dataNest[index].values;
            }).enter().append("circle").attr("id", "tag" + dataNest[index].key.split(" ")[0]).attr("class", function (d) {
                //  if(d.key != "CL" || d.pdsas == "")
                //    return "point tag"+ dataNest[index].key.split(" ")[0]
                //  else
                //    return "point pdsaAvailable tag"+ dataNest[index].key.split(" ")[0]
                return dataNest[index].key.split(" ")[0];
            }).attr("cx", function (d) {
                return x(d.date) + width / data.length * dataNest.length / 2;
            }).attr("cy", function (d) {
                return y(d.value);
            }).attr("r", function (d) {
                if (d.value != null && d.key == "CL")
                    return "3px";
                else
                    return "3px";
            }).style("fill", function (d) {
                //if(d.key != "CL" || d.pdsas == "")
                return color(dataNest[index].key);
                //  else
                //    return "#FFC107";
            }).style("stroke", "none").style("stroke-width", "2px").style("cursor", "pointer").on("mouseover", function (d) {
                // d3.select(this).moveToFront();
                showPopover.call(this, d);
            }).on("mouseout", function (d) {
                removePopovers();
            });
        }
        svg.append("text").attr("x", width / 2) // author
            .attr("y", height + 90).attr("dy", ".3em")
            .text("Time Period")
            .style({
            "fill": "rgb(66, 142, 173)",
            "font-weight": "bold",
            "text-anchor": "middle",
            "font-size": "13px"
        });
        function removePopovers() {
            $('.popover').each(function () {
                $(this).remove();
            });
        }
        function showPopover(d) {
            $(this).popover({
                title: '',
                placement: 'top',
                container: 'body',
                trigger: 'manual',
                html: true,
                animation: false,
                content: function () {
                    return "Time Period: <span class='navy-text'>" + d.date
                        + "</span><br/>" + "Data Value: <span class='navy-text'>"
                        + d.value + "</span><br/>" + "Area Name: <span class='navy-text'>"
                        + d.name + "</span>";
                }
            });
            $(this).popover('show');
        }
        d3__WEBPACK_IMPORTED_MODULE_2__["selection"].prototype.moveToFront = function () {
            return this.each(function () {
                this.parentNode.appendChild(this);
            });
        };
        d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"](".domain, .y.axis .tick line").style({ "fill": "none", "stroke": "#000" });
        d3__WEBPACK_IMPORTED_MODULE_2__["selectAll"]("circle.point").moveToFront();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('linechart'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], LineChartComponent.prototype, "chartContainer", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LineChartComponent.prototype, "data", void 0);
    LineChartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-line-chart',
            template: __webpack_require__(/*! ./line-chart.component.html */ "./src/app/dashboard/line-chart/line-chart.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./line-chart.component.scss */ "./src/app/dashboard/line-chart/line-chart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LineChartComponent);
    return LineChartComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/services/dashboard.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/dashboard/services/dashboard.service.ts ***!
  \*********************************************************/
/*! exports provided: DashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardService", function() { return DashboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");




var DashboardService = /** @class */ (function () {
    function DashboardService(httpClient) {
        this.httpClient = httpClient;
    }
    DashboardService.prototype.getThematicMapData = function (areaId, tabKey) {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + 'dailyIndicatorList?parentIdCode=' + areaId + '&iusid=' + tabKey);
    };
    DashboardService.prototype.getThematicMapLegends = function () {
        return this.httpClient.get('assets/json/thematicMapData.json');
    };
    DashboardService.prototype.getTabList = function (areaId) {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + 'quickStartData?areaId=' + areaId);
    };
    DashboardService.prototype.getChartDetails = function (areaId, tabKey) {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + 'dailyTrendList?parentIdCode=' + areaId + '&iusid=' + tabKey);
    };
    DashboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DashboardService);
    return DashboardService;
}());



/***/ }),

/***/ "./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n<div class=\"row\">\n    <div class=\"col-md-3 page-heading\">\n        <h4>Dashboard</h4>\n    </div>\n    <div class=\"col-md-9 page-heading\"> \n      <p class=\"float-right\">As on date {{myDate | date:'dd-MM-yyyy'}} </p>\n    </div>\n</div>\n<div class=\"row\">  \n   <div class=\"col-md-3\">\n    <section class=\"list-selection\">\n        <ul class=\"tabs-left\" *ngIf=\"tabKeys\">          \n            <li  [ngClass]=\"i==mapNameData-1? 'selected': ''\" *ngFor=\"let opt of tabKeys | removeArray : 'noOfSwachhagrahi'; let i = index;\" value=\"{{opt.key}}\" >\n              <a data-toggle=\"tab\" aria-expanded=\"false\" (click)=\"selectTabs(opt)\">\n                  <div class=\"text-center\">\n                        <h2><strong>{{thematicDropDownList[opt]}}<span *ngIf=\"opt=='coverage' || opt=='geoTagging'\">%</span></strong></h2>\n                        <h6>{{opt}}</h6>\n                  </div>\n              </a>\n            </li>          \n        </ul>\n    </section>\n   </div>\n\n   <div class=\"col-md-6\">     \n     <div style=\"display: inline-flex;\">\n       <button class=\"back-btn\" aria-hidden=\"true\" type=\"button\" *ngIf=\"sideAreaName!='Odisha'\" (click)=\"backToMap()\">Back</button>\n       <span><h6>{{sideAreaName}}</h6></span>\n     </div>\n    <section class=\"map-view\">\n     <div id=\"map\">\n      <div class=\"map_popover\"><div id=\"map_popover_content\" class=\"map_popover_content\"></div></div>\n      <div *ngIf=\"thematicData\" [mapData]=\"mapData\"></div>\n     </div>\n    </section>\n   </div>\n\n   <div class=\"col-md-3\">\n     <div class=\"text-right area-content\">\n       <div>{{indicatorName}}</div>\n       <h6><span>{{sideAreaName}}-</span>{{indicatorValue}}<span *ngIf=\"indicatorName=='coverage' || indicatorName=='geoTagging'\">%</span></h6>\n     </div>\n     <div class=\"direction\">\n        <img class=\"img-responsive\" src=\"assets/images/north_arrow_new.png\">\n      </div>  \n  </div>\n  \n  <div class=\"trend-chart\" *ngIf=\"lineChartVisible\">\n      <button class=\"close trend-close\" aria-hidden=\"true\" type=\"button\" (click)=\"closeViz()\" style=\"color:#fff;\">\n          <i class=\"fa fa-window-close\" aria-hidden=\"true\"></i>\n      </button>\n      <div class=\"row\" style=\"padding: 10px; color: #fff;\">\n        <div class=\"col-md-4\">{{areaName}}</div>\n        <div class=\"col-md-7\"><span class=\"float-right\">{{indicatorName}}:{{indicatorValue}}<span *ngIf=\"indicatorName=='coverage' || indicatorName=='geoTagging'\">%</span></span>\n        </div>\n      </div>\n      <div class=\"col-md-12\" style=\"border-bottom: 1px solid #fff;\"></div>\n      <app-line-chart *ngIf=\"lineChartData\" [data]=\"lineChartData\"></app-line-chart>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n  <section id=\"legendsection\" class=\"legends\">\n    <h6 class=\"legend-heading\">LEGEND</h6>\n    <ul *ngIf=\"thematicData\">\n      <li *ngFor =\"let legend of legendData.legends\" class=\"legend_list\">\n       <div class=\"{{legend.value}} legnedblock\"> </div>    \n       <span\tclass=\"legend_key\">{{legend.keyValue}}</span>                                          \n      </li> \n    </ul>  \n  </section> \n </div>\n</div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".legends {\n  float: right;\n  display: inline-flex;\n  margin-right: 2%;\n  margin-top: -30px; }\n\n.legends ul li {\n  list-style-type: none;\n  display: inline-flex; }\n\n.legends .legnedblock {\n  height: 20px;\n  width: 20px;\n  float: right; }\n\n.legends .legend_key {\n  padding-left: 15px;\n  padding-right: 15px; }\n\n.legends ul {\n  margin-left: -20px; }\n\n.direction {\n  bottom: 50px;\n  margin-right: 15%;\n  position: absolute;\n  right: 0; }\n\n.map_popover {\n  background: #f9f9f9;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  color: #727272;\n  display: none;\n  font: italic 14px Georgia;\n  left: 0;\n  opacity: 0.6;\n  padding: 10px 20px;\n  position: absolute;\n  text-align: center;\n  top: 0;\n  z-index: 1000; }\n\n.fourthslices {\n  fill: #1a9641;\n  background-color: #1a9641; }\n\n.thirdslices {\n  fill: #a6d96a;\n  background-color: #a6d96a; }\n\n.secondslices {\n  fill: #fdae61;\n  background-color: #fdae61; }\n\n.firstslices {\n  fill: #d7191c;\n  background-color: #d7191c; }\n\n.fifthslices {\n  fill: #a6a6a6;\n  background-color: #a6a6a6; }\n\n.tabs-left {\n  list-style-type: none; }\n\n.tabs-left li {\n  margin-bottom: 15px;\n  padding: 15px;\n  background-color: #ddd; }\n\n.tabs-left li.selected {\n  background-color: #f7a707; }\n\n.tabs-left > li a, .tabs-left > li.active > a, .tabs-left > li > a:hover, .tabs-left > li.active > a:hover, .tabs-left > li.active > a:focus {\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-bottom-color: transparent;\n  padding: 0;\n  outline: none; }\n\n.trend-chart {\n  background: #383838;\n  height: 300px;\n  margin-right: 13%;\n  margin-top: 30px;\n  position: absolute;\n  right: 0;\n  padding: 5px; }\n\n.trend-close {\n  padding: 10px;\n  position: absolute;\n  right: 0; }\n\n.page-heading {\n  padding: 20px 15px 30px 60px;\n  color: #1f4a7c; }\n\n.page-heading p {\n  font-weight: 500;\n  margin-right: 5%; }\n\n.area-content {\n  padding-right: 15%; }\n\n.back-btn {\n  background: #1f4a7c;\n  border: #1f4a7c;\n  color: #fff;\n  cursor: pointer;\n  padding: 3px 10px 3px 10px;\n  margin-right: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL3RoZW1hdGljLWRhc2hib2FyZC9EOlxcc2JtXzEwMF91aV9kZXZcXHNibTEwMC9zcmNcXGFwcFxcZGFzaGJvYXJkXFx0aGVtYXRpYy1kYXNoYm9hcmRcXHRoZW1hdGljLWRhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQVk7RUFDWixxQkFBb0I7RUFDcEIsaUJBQWdCO0VBQ2hCLGtCQUFpQixFQUNwQjs7QUFDRDtFQUNJLHNCQUFxQjtFQUNyQixxQkFBb0IsRUFDdkI7O0FBQ0Q7RUFDSSxhQUFZO0VBQ1osWUFBVztFQUNYLGFBQVksRUFDZjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixvQkFDSixFQUFDOztBQUNEO0VBQ0ksbUJBQWtCLEVBQ3JCOztBQUNEO0VBQ0ksYUFBWTtFQUNaLGtCQUFpQjtFQUNqQixtQkFBa0I7RUFDbEIsU0FBUSxFQUNYOztBQUNEO0VBQ0ksb0JBQW1CO0VBQ25CLG1CQUFrQjtFQUNsQix1QkFBc0I7RUFDdEIsZUFBYztFQUNkLGNBQWE7RUFDYiwwQkFBeUI7RUFDekIsUUFBTztFQUNQLGFBQVk7RUFDWixtQkFBa0I7RUFDbEIsbUJBQWtCO0VBQ2xCLG1CQUFrQjtFQUNsQixPQUFNO0VBQ04sY0FBYSxFQUNoQjs7QUFDRDtFQUNJLGNBQWE7RUFDYiwwQkFBeUIsRUFDNUI7O0FBQ0Q7RUFDSSxjQUFhO0VBQ2IsMEJBQXlCLEVBQzVCOztBQUNEO0VBQ0ksY0FBYTtFQUNiLDBCQUF5QixFQUM1Qjs7QUFDRDtFQUNJLGNBQWE7RUFDYiwwQkFBeUIsRUFDNUI7O0FBQ0Q7RUFDSSxjQUFhO0VBQ2IsMEJBQXlCLEVBQzVCOztBQUNEO0VBQ0ksc0JBQXFCLEVBRXhCOztBQUNEO0VBQ0ksb0JBQW1CO0VBQ25CLGNBQWE7RUFDYix1QkFBc0IsRUFDekI7O0FBQ0Q7RUFDSSwwQkFBeUIsRUFDNUI7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixhQUFZO0VBQ1osaUNBQWdDO0VBQ2hDLFdBQVU7RUFDVixjQUFhLEVBQ2hCOztBQUNEO0VBQ0ksb0JBQW1CO0VBQ25CLGNBQWE7RUFDYixrQkFBaUI7RUFDakIsaUJBQWdCO0VBQ2hCLG1CQUFrQjtFQUNsQixTQUFRO0VBQ1IsYUFBWSxFQUNmOztBQUNEO0VBQ0ksY0FBYTtFQUNiLG1CQUFrQjtFQUNsQixTQUFRLEVBQ1g7O0FBQ0Q7RUFDSSw2QkFBNEI7RUFDNUIsZUFBYyxFQUNqQjs7QUFDRDtFQUNJLGlCQUFnQjtFQUNoQixpQkFBZ0IsRUFDbkI7O0FBQ0Q7RUFDSSxtQkFBa0IsRUFDckI7O0FBQ0Q7RUFDSSxvQkFBbUI7RUFDbkIsZ0JBQWU7RUFDZixZQUFXO0VBQ1gsZ0JBQWU7RUFDZiwyQkFBMEI7RUFDMUIsbUJBQWtCLEVBQ3JCIiwiZmlsZSI6InNyYy9hcHAvZGFzaGJvYXJkL3RoZW1hdGljLWRhc2hib2FyZC90aGVtYXRpYy1kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGVnZW5kcyB7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIG1hcmdpbi1yaWdodDogMiU7XHJcbiAgICBtYXJnaW4tdG9wOiAtMzBweDtcclxufVxyXG4ubGVnZW5kcyB1bCBsaSB7XHJcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxufVxyXG4ubGVnZW5kcyAubGVnbmVkYmxvY2sge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuLmxlZ2VuZHMgLmxlZ2VuZF9rZXkge1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTVweFxyXG59XHJcbi5sZWdlbmRzIHVse1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xyXG59XHJcbi5kaXJlY3Rpb257XHJcbiAgICBib3R0b206IDUwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDE1JTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAwOyAgIFxyXG59XHJcbi5tYXBfcG9wb3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGNvbG9yOiAjNzI3MjcyO1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIGZvbnQ6IGl0YWxpYyAxNHB4IEdlb3JnaWE7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgb3BhY2l0eTogMC42O1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgei1pbmRleDogMTAwMDtcclxufVxyXG4uZm91cnRoc2xpY2VzIHtcclxuICAgIGZpbGw6ICMxYTk2NDE7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWE5NjQxO1xyXG59XHJcbi50aGlyZHNsaWNlcyAge1xyXG4gICAgZmlsbDogI2E2ZDk2YTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhNmQ5NmE7XHJcbn1cclxuLnNlY29uZHNsaWNlcyB7XHJcbiAgICBmaWxsOiAjZmRhZTYxO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkYWU2MTtcclxufVxyXG4uZmlyc3RzbGljZXMge1xyXG4gICAgZmlsbDogI2Q3MTkxYztcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzE5MWM7XHJcbn1cclxuLmZpZnRoc2xpY2Vze1xyXG4gICAgZmlsbDogI2E2YTZhNjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhNmE2YTY7XHJcbn1cclxuLnRhYnMtbGVmdHtcclxuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICAgIC8vIHBhZGRpbmc6IDA7XHJcbn1cclxuLnRhYnMtbGVmdCBsaSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XHJcbn1cclxuLnRhYnMtbGVmdCBsaS5zZWxlY3RlZHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2E3MDc7XHJcbn1cclxuLnRhYnMtbGVmdCA+IGxpIGEsIC50YWJzLWxlZnQgPiBsaS5hY3RpdmUgPiBhLCAudGFicy1sZWZ0ID4gbGkgPiBhOmhvdmVyLCAudGFicy1sZWZ0ID4gbGkuYWN0aXZlID4gYTpob3ZlciwgLnRhYnMtbGVmdCA+IGxpLmFjdGl2ZSA+IGE6Zm9jdXMge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbn1cclxuLnRyZW5kLWNoYXJ0e1xyXG4gICAgYmFja2dyb3VuZDogIzM4MzgzODtcclxuICAgIGhlaWdodDogMzAwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEzJTtcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICByaWdodDogMDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxufVxyXG4udHJlbmQtY2xvc2V7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgcmlnaHQ6IDA7XHJcbn1cclxuLnBhZ2UtaGVhZGluZ3tcclxuICAgIHBhZGRpbmc6IDIwcHggMTVweCAzMHB4IDYwcHg7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxufVxyXG4ucGFnZS1oZWFkaW5nIHB7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1JTtcclxufVxyXG4uYXJlYS1jb250ZW50e1xyXG4gICAgcGFkZGluZy1yaWdodDogMTUlO1xyXG59IFxyXG4uYmFjay1idG57XHJcbiAgICBiYWNrZ3JvdW5kOiAjMWY0YTdjO1xyXG4gICAgYm9yZGVyOiAjMWY0YTdjO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBwYWRkaW5nOiAzcHggMTBweCAzcHggMTBweDsgIFxyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.ts ***!
  \******************************************************************************/
/*! exports provided: ThematicDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThematicDashboardComponent", function() { return ThematicDashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3v4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3v4 */ "./node_modules/d3v4/build/d3.js");
/* harmony import */ var d3v4__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(d3v4__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var topojson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! topojson */ "./node_modules/topojson/index.js");
/* harmony import */ var _services_dashboard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/dashboard.service */ "./src/app/dashboard/services/dashboard.service.ts");





var ThematicDashboardComponent = /** @class */ (function () {
    function ThematicDashboardComponent(hostRef, dashboardService) {
        this.hostRef = hostRef;
        this.dashboardService = dashboardService;
        this.clicks = 0;
        this.myDate = new Date();
        this.lineChartVisible = false;
        this.sideAreaName = 'Odisha';
        this.isBackBtnClicked = false;
        this.dashboardServices = dashboardService;
    }
    ThematicDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.areaId = 'IND021';
        this.dashboardService.getThematicMapLegends().subscribe(function (legendData) {
            _this.legendData = legendData;
        });
        setTimeout(function () {
            _this.tabListData(_this.areaId, '');
            setTimeout(function () {
                _this.mapLoad(_this.areaId, _this.mapNameData, 'odisha_map.json');
            }, 100);
        }, 200);
    };
    ThematicDashboardComponent.prototype.tabListData = function (areaId, tabKey) {
        var _this = this;
        this.dashboardService.getTabList(areaId).subscribe(function (lists) {
            var tabData = lists;
            _this.thematicDropDownList = tabData['QuickStart'];
            _this.tabKeys = Object.keys(_this.thematicDropDownList);
            for (var i = 0; i < _this.tabKeys.length; i++) {
                if (tabKey == undefined || tabKey == null || _this.tabKeys[i] == "coverage") {
                    _this.mapNameData = 1;
                    _this.indicatorName = _this.tabKeys[i];
                    _this.indicatorValue = _this.thematicDropDownList[_this.tabKeys[i]];
                }
            }
        });
    };
    ThematicDashboardComponent.prototype.mapLoad = function (areaId, mapValue, primary_url) {
        var _this = this;
        if (mapValue) {
            this.dashboardService.getThematicMapData(areaId, mapValue).subscribe(function (data) {
                _this.thematicData = data;
                _this.thematicKeys = Object.keys(_this.thematicData);
                _this.mapData = _this.thematicData.dataCollection;
                _this.lineChartVisible = false;
                setTimeout(function () {
                    _this.drawMap(primary_url);
                }, 200);
            });
        }
    };
    ThematicDashboardComponent.prototype.selectTabs = function (selectedOption) {
        this.indicatorName = selectedOption;
        this.indicatorValue = this.thematicDropDownList[selectedOption];
        if (selectedOption == "coverage") {
            this.mapNameData = 1;
        }
        else if (selectedOption == "geoTagging") {
            this.mapNameData = 2;
        }
        else if (selectedOption == "odfDeclaredVillage") {
            this.mapNameData = 3;
        }
        if (this.areaId !== 'IND021' && this.isBackBtnClicked == false) {
            this.mapLoad(this.areaId, this.mapNameData, this.primary_url);
        }
        else {
            this.mapLoad(this.areaId, this.mapNameData, 'odisha_map.json');
        }
    };
    ThematicDashboardComponent.prototype.drawMap = function (url) {
        var _this = this;
        d3v4__WEBPACK_IMPORTED_MODULE_2__["select"]('#map svg').remove();
        this.ngContentId = '_ngcontent-' + this.hostRef.nativeElement.attributes[0].name.substr(8);
        this.width = 800;
        //this.width = $(this.hostRef.nativeElement).parent().width() - 50;
        this.height = 400;
        this.projection = d3v4__WEBPACK_IMPORTED_MODULE_2__["geoMercator"]();
        this.path = d3v4__WEBPACK_IMPORTED_MODULE_2__["geoPath"]()
            .projection(this.projection)
            .pointRadius(2);
        this.svg = d3v4__WEBPACK_IMPORTED_MODULE_2__["select"]("#map").append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
        this.g = this.svg.append("g");
        d3v4__WEBPACK_IMPORTED_MODULE_2__["json"]("assets/geomaps/" + url, function (error, data) {
            var boundary = _this.centerZoom(data);
            var subunits = _this.drawSubUnits(data);
            _this.colorSubunits(subunits);
        });
    };
    ThematicDashboardComponent.prototype.centerZoom = function (data) {
        var o = topojson__WEBPACK_IMPORTED_MODULE_3__["mesh"](data, data.objects.layer1, function (a, b) {
            return a === b;
        });
        this.projection
            .scale(1)
            .translate([0, 0]);
        var b = this.path.bounds(o), s = 1 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height), t = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];
        var p = this.projection
            .scale(s)
            .translate(t);
        return o;
    };
    ThematicDashboardComponent.prototype.drawSubUnits = function (data) {
        var subunits = this.g.selectAll(".subunit")
            .data(topojson__WEBPACK_IMPORTED_MODULE_3__["feature"](data, data.objects.layer1).features)
            .enter().append("path")
            .attr("class", "subunit")
            .attr("d", this.path)
            .style("stroke", "#fff")
            .style("stroke-width", "1px").attr(this.ngContentId, "");
        return subunits;
    };
    ThematicDashboardComponent.prototype.colorSubunits = function (subunits) {
        var _this = this;
        subunits
            .attr("class", function (d, i) {
            var selectedArea = _this.mapData[d.properties.ID_];
            if (selectedArea)
                return selectedArea.cssClass;
            else
                return "fifthslices";
        })
            .style("opacity", ".7")
            .on("mouseout", function (d) { return _this.onmouseout(); })
            .on("mousemove", function (d) { return _this.onmousemove(d); })
            .on("mousedown", function (d) { return _this.clickHandler(d); })
            .on("mouseover", function (d) { return _this.onover(d); });
    };
    ThematicDashboardComponent.prototype.onover = function (d) {
        var rank, datavalue;
        var selectedArea = this.mapData[d.properties.ID_];
        if (selectedArea) {
            rank = selectedArea.rank;
            datavalue = selectedArea.value;
        }
        else {
            rank = "Not Available";
            datavalue = "Not Available";
        }
        d3v4__WEBPACK_IMPORTED_MODULE_2__["select"](".map_popover_content").html("<strong>Area Name:</strong><span>" + d.properties.NAME1_ + "</span>"
            + "<br><strong>Value:</strong> <span>" + datavalue + "</span>");
        d3v4__WEBPACK_IMPORTED_MODULE_2__["select"](".map_popover").style("display", "block");
    };
    ThematicDashboardComponent.prototype.onmousemove = function (d) {
        d3v4__WEBPACK_IMPORTED_MODULE_2__["select"](".map_popover")
            .style("display", "block")
            .style("left", (d3v4__WEBPACK_IMPORTED_MODULE_2__["event"].pageX) - 300 + "px")
            .style("top", (d3v4__WEBPACK_IMPORTED_MODULE_2__["event"].pageY - 280) + "px")
            .style("opacity", "1");
    };
    ThematicDashboardComponent.prototype.onmouseout = function () {
        d3v4__WEBPACK_IMPORTED_MODULE_2__["select"](".map_popover").style("display", "none");
    };
    ThematicDashboardComponent.prototype.clickHandler = function (d) {
        var _this = this;
        this.clicks++;
        var timer;
        if (this.clicks === 1) {
            timer = setTimeout(function () {
                _this.clicked(d); // perform single-click action
                _this.clicks = 0; // after action performed, reset counter
            }, 200);
        }
        else {
            clearTimeout(timer); // prevent single-click action
            this.drilldown(d); // perform double-click action
            this.clicks = 0; // after action performed, reset counter
        }
    };
    ThematicDashboardComponent.prototype.clicked = function (d) {
        var _this = this;
        this.areaName = d.properties.NAME1_;
        var areaClickId = d.properties.ID_;
        this.dashboardService.getChartDetails(areaClickId, this.mapNameData).subscribe(function (data) {
            _this.lineChartData = data;
            if (data != null || data != undefined) {
                _this.lineChartVisible = true;
            }
        });
    };
    ThematicDashboardComponent.prototype.drilldown = function (d) {
        if (d.properties.NAME1_) {
            d3v4__WEBPACK_IMPORTED_MODULE_2__["select"](".map_popover").style("display", "none");
            this.areaId = d.properties.ID_;
            this.areaName = d.properties.NAME1_;
            this.sideAreaName = d.properties.NAME1_;
            this.primary_url = this.areaName + ".json";
            this.lineChartVisible = false;
            this.mapLoad(this.areaId, this.mapNameData, this.primary_url);
            this.tabListData(this.areaId, this.mapNameData);
        }
    };
    ThematicDashboardComponent.prototype.closeViz = function () {
        this.lineChartVisible = false;
    };
    ThematicDashboardComponent.prototype.backToMap = function () {
        this.isBackBtnClicked = true;
        this.areaId = 'IND021';
        this.mapLoad(this.areaId, this.mapNameData, 'odisha_map.json');
        this.tabListData(this.areaId, this.mapNameData);
        this.sideAreaName = 'Odisha';
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ThematicDashboardComponent.prototype, "width", void 0);
    ThematicDashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-thematic-dashboard',
            template: __webpack_require__(/*! ./thematic-dashboard.component.html */ "./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./thematic-dashboard.component.scss */ "./src/app/dashboard/thematic-dashboard/thematic-dashboard.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _services_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["DashboardService"]])
    ], ThematicDashboardComponent);
    return ThematicDashboardComponent;
}());



/***/ }),

/***/ "./src/app/exception404/exception404.component.html":
/*!**********************************************************!*\
  !*** ./src/app/exception404/exception404.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper row2\">\n  <div id=\"container\" class=\"clear\">\n    <!-- ####################################################################################################### -->\n    <!-- ####################################################################################################### -->\n    <!-- ####################################################################################################### -->\n    <!-- ####################################################################################################### -->\n    <section id=\"fof\" class=\"clear\">\n      <!-- ####################################################################################################### -->\n      <div class=\"hgroup clear\">\n        <h1>404</h1>\n        <h2>Error ! <span>Page Not Found</span></h2>\n      </div>\n      <p>May be you are not authorized to view this page</p>\n      <p><a href=\"javascript:history.go(-1)\">&laquo; Go Back</a> / <a href=\"\">Go Home &raquo;</a></p>\n      <!-- ####################################################################################################### -->\n    </section>\n    <!-- ####################################################################################################### -->\n    <!-- ####################################################################################################### -->\n    <!-- ####################################################################################################### -->\n    <!-- ####################################################################################################### -->\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/exception404/exception404.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/exception404/exception404.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\r\nHTML 5 Template Name: \r\nFile: 404 - 19 CSS\r\nAuthor: OS Templates\r\nAuthor URI: http://www.os-templates.com/\r\nLicence: <a href=\"http://www.os-templates.com/template-terms\">Website Template Licence</a>\r\n*/\n#fof {\n  display: block;\n  width: 100%;\n  padding: 150px 0;\n  line-height: 1.6em;\n  text-align: center; }\n#fof .hgroup {\n  display: block;\n  width: 80%;\n  margin: 0 auto;\n  padding: 0; }\n#fof .hgroup h1, #fof .hgroup h2 {\n  margin: 0 0 0 40px;\n  padding: 0;\n  display: inline-block;\n  text-transform: uppercase; }\n#fof .hgroup h1 {\n  margin-top: -90px;\n  font-size: 200px; }\n#fof .hgroup h2 {\n  font-size: 60px; }\n#fof .hgroup h2 span {\n  display: block;\n  font-size: 30px; }\n#fof p {\n  margin: 25px 0 0 0;\n  padding: 0;\n  font-size: 16px; }\n#fof p:first-child {\n  margin-top: 0; }\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZXhjZXB0aW9uNDA0L0Q6XFxzYm1fMTAwX3VpX2Rldlxcc2JtMTAwL3NyY1xcYXBwXFxleGNlcHRpb240MDRcXGV4Y2VwdGlvbjQwNC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0VBTUU7QUFFRjtFQUFLLGVBQWE7RUFBRSxZQUFVO0VBQUUsaUJBQWU7RUFBRSxtQkFBaUI7RUFBRSxtQkFBaUIsRUFBRztBQUN4RjtFQUFhLGVBQWE7RUFBRSxXQUFTO0VBQUUsZUFBYTtFQUFFLFdBQVMsRUFBRztBQUNsRTtFQUFpQyxtQkFBaUI7RUFBRSxXQUFTO0VBQUUsc0JBQXFCO0VBQUUsMEJBQXdCLEVBQUc7QUFDakg7RUFBZ0Isa0JBQWdCO0VBQUUsaUJBQWUsRUFBRztBQUNwRDtFQUFnQixnQkFBYyxFQUFHO0FBQ2pDO0VBQXFCLGVBQWE7RUFBRSxnQkFBYyxFQUFHO0FBQ3JEO0VBQU8sbUJBQWlCO0VBQUUsV0FBUztFQUFFLGdCQUFjLEVBQUc7QUFDdEQ7RUFBbUIsY0FBWSxFQUFHIiwiZmlsZSI6InNyYy9hcHAvZXhjZXB0aW9uNDA0L2V4Y2VwdGlvbjQwNC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbkhUTUwgNSBUZW1wbGF0ZSBOYW1lOiBcclxuRmlsZTogNDA0IC0gMTkgQ1NTXHJcbkF1dGhvcjogT1MgVGVtcGxhdGVzXHJcbkF1dGhvciBVUkk6IGh0dHA6Ly93d3cub3MtdGVtcGxhdGVzLmNvbS9cclxuTGljZW5jZTogPGEgaHJlZj1cImh0dHA6Ly93d3cub3MtdGVtcGxhdGVzLmNvbS90ZW1wbGF0ZS10ZXJtc1wiPldlYnNpdGUgVGVtcGxhdGUgTGljZW5jZTwvYT5cclxuKi9cclxuXHJcbiNmb2Z7ZGlzcGxheTpibG9jazsgd2lkdGg6MTAwJTsgcGFkZGluZzoxNTBweCAwOyBsaW5lLWhlaWdodDoxLjZlbTsgdGV4dC1hbGlnbjpjZW50ZXI7fVxyXG4jZm9mIC5oZ3JvdXB7ZGlzcGxheTpibG9jazsgd2lkdGg6ODAlOyBtYXJnaW46MCBhdXRvOyBwYWRkaW5nOjA7fVxyXG4jZm9mIC5oZ3JvdXAgaDEsICNmb2YgLmhncm91cCBoMnttYXJnaW46MCAwIDAgNDBweDsgcGFkZGluZzowOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTt9XHJcbiNmb2YgLmhncm91cCBoMXttYXJnaW4tdG9wOi05MHB4OyBmb250LXNpemU6MjAwcHg7fVxyXG4jZm9mIC5oZ3JvdXAgaDJ7Zm9udC1zaXplOjYwcHg7fVxyXG4jZm9mIC5oZ3JvdXAgaDIgc3BhbntkaXNwbGF5OmJsb2NrOyBmb250LXNpemU6MzBweDt9XHJcbiNmb2YgcHttYXJnaW46MjVweCAwIDAgMDsgcGFkZGluZzowOyBmb250LXNpemU6MTZweDt9XHJcbiNmb2YgcDpmaXJzdC1jaGlsZHttYXJnaW4tdG9wOjA7fSJdfQ== */"

/***/ }),

/***/ "./src/app/exception404/exception404.component.ts":
/*!********************************************************!*\
  !*** ./src/app/exception404/exception404.component.ts ***!
  \********************************************************/
/*! exports provided: Exception404Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Exception404Component", function() { return Exception404Component; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var Exception404Component = /** @class */ (function () {
    function Exception404Component() {
    }
    Exception404Component.prototype.ngOnInit = function () {
    };
    Exception404Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-exception404',
            template: __webpack_require__(/*! ./exception404.component.html */ "./src/app/exception404/exception404.component.html"),
            styles: [__webpack_require__(/*! ./exception404.component.scss */ "./src/app/exception404/exception404.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Exception404Component);
    return Exception404Component;
}());



/***/ }),

/***/ "./src/app/fragments/footer/footer.component.css":
/*!*******************************************************!*\
  !*** ./src/app/fragments/footer/footer.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "footer#foot {\r\n    background-color: #1f4a7c;\r\n    padding: 10px 0 0 0;\r\n    position: absolute;\r\n    width: 100%;\r\n    font-size: 13px;\r\n    margin-top: 0;\r\n   }\r\nfooter#foot * {\r\n    color: #FFF;\r\n}\r\n/* .footer {\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 100%;\r\n    height: 60px;\r\n    line-height: 60px;\r\n    background-color: #f5f5f5;\r\n} */\r\na.text_deco_none span {\r\n    color: orange !important;\r\n}\r\n/* .footer-links{\r\n    display: inline-block;\r\n    list-style-type: none;\r\n    float: right;   \r\n    margin: 0; \r\n    padding: 0;\r\n}\r\n.footer-links li{\r\n    display: inline-block;\r\n}\r\n.footer-all-links{\r\n    padding: 0;\r\n    margin: 0;\r\n} */\r\n/* footer p{    \r\n    margin-top: 7px;\r\n} */\r\n.copy-right{\r\n    float: left;\r\n}\r\n.main-content{\r\n    min-height: 450px !important;\r\n}\r\n.footer-all-links{\r\n    display: inline-block;\r\n}\r\n.footer-links{\r\n    display: inline-flex;\r\n    list-style-type: none;\r\n    font-size: 11px;\r\n}\r\n.footer-img{\r\n    width: 50px;\r\n    margin-top: -30px;\r\n}\r\n.department {\r\n    padding-left: 20px;\r\n    display: inline-block;\r\n    \r\n}\r\n.address, .department{\r\n    font-size: 11px;\r\n   \r\n}\r\n.address{\r\n    padding-left: 70px;\r\n   \r\n}\r\n.email-address{\r\n    font-size: 11px;\r\n    padding-left: 70px;\r\n    line-height: 0px;\r\n}\r\nul.social-links {\r\n    display: inline-block;\r\n    padding: 0;\r\n}\r\n.social-links li{\r\n    display: inline-block;\r\n    list-style-type: none;\r\n    padding-left: 15px;\r\n\r\n}\r\n.social-all-links label{\r\n    padding-left: 20px;\r\n    font-size: 11px;\r\n}\r\nul.footer-links {\r\n    margin-top: 12px;\r\n}\r\n.text-right {\r\n    text-align: right!important;\r\n    margin-top: 16px;\r\n}\r\n@media only screen and (max-width: 1024px){\r\n    .footer-img {\r\n        width: 50px;\r\n        margin-top: -33px !important;\r\n    }\r\n    .department{\r\n        display: inline-block;\r\n        padding: 0;\r\n    }\r\n}\r\n@media only screen and (max-width: 991px){\r\n    .footer-img {\r\n        width: 40px;\r\n        margin-top: -33px !important;\r\n    }\r\n    .department{\r\n        display: inline-block;\r\n        padding: 0;\r\n    }\r\n    .nav-link {\r\n        display: block;\r\n        padding: 3px 10px;\r\n    }\r\n    .social-links li {\r\n        padding-left: 9px;\r\n    }\r\n}\r\n@media  (max-width: 768px){\r\n    .footer-links{\r\n        display: -webkit-inline-box;\r\n        padding-right: 70px;\r\n    }\r\n    .footer-img {\r\n        width: 36px;\r\n    }\r\n    .department{\r\n        font-size: 8px;\r\n    }\r\n    .footer-links {\r\n        font-size: 9px;\r\n    }\r\n    .social-all-links label {\r\n        font-size: 9px;\r\n    }\r\n    .social-links li{\r\n        padding-left: 1px;\r\n    }\r\n}\r\n@media only screen and (max-width: 608px){\r\n    .copy-right p{\r\n        text-align: center;\r\n    }\r\n    .footer-links{\r\n        padding-right: 87px;\r\n    }\r\n    .copy-right {\r\n        text-align: center;\r\n    }\r\n    .footer-all-links {\r\n        text-align: center !important;\r\n    }\r\n    ul.footer-links {\r\n        padding-right: 0 !important;\r\n    }\r\n    .social.text-right {\r\n        text-align: center !important;\r\n    }\r\n    .social-links li {\r\n        padding-left: 8px;\r\n    }\r\n\r\n}\r\n@media only screen and (max-width: 560px){\r\n    .footer-links{\r\n        padding-right: 70px;\r\n    }\r\n}\r\n@media only screen and (max-width: 480px){\r\n    .footer-links{\r\n        padding-right: 9px;\r\n    }\r\n   \r\n}\r\n@media only screen and (max-width: 360px){\r\n    .footer-all-links {\r\n        font-size: 8px;\r\n        padding: 0 !important;\r\n    }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJhZ21lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkO0FBQ0o7SUFDSSxZQUFZO0NBQ2Y7QUFDRDs7Ozs7OztJQU9JO0FBQ0o7SUFDSSx5QkFBeUI7Q0FDNUI7QUFDRDs7Ozs7Ozs7Ozs7OztJQWFJO0FBQ0o7O0lBRUk7QUFDSjtJQUNJLFlBQVk7Q0FDZjtBQUNEO0lBQ0ksNkJBQTZCO0NBQ2hDO0FBRUQ7SUFDSSxzQkFBc0I7Q0FDekI7QUFDRDtJQUNJLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIsZ0JBQWdCO0NBQ25CO0FBQ0Q7SUFDSSxZQUFZO0lBQ1osa0JBQWtCO0NBQ3JCO0FBQ0Q7SUFDSSxtQkFBbUI7SUFDbkIsc0JBQXNCOztDQUV6QjtBQUNEO0lBQ0ksZ0JBQWdCOztDQUVuQjtBQUNEO0lBQ0ksbUJBQW1COztDQUV0QjtBQUVEO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixpQkFBaUI7Q0FDcEI7QUFDRDtJQUNJLHNCQUFzQjtJQUN0QixXQUFXO0NBQ2Q7QUFDRDtJQUNJLHNCQUFzQjtJQUN0QixzQkFBc0I7SUFDdEIsbUJBQW1COztDQUV0QjtBQUNEO0lBQ0ksbUJBQW1CO0lBQ25CLGdCQUFnQjtDQUNuQjtBQUNEO0lBQ0ksaUJBQWlCO0NBQ3BCO0FBQ0Q7SUFDSSw0QkFBNEI7SUFDNUIsaUJBQWlCO0NBQ3BCO0FBQ0Q7SUFDSTtRQUNJLFlBQVk7UUFDWiw2QkFBNkI7S0FDaEM7SUFDRDtRQUNJLHNCQUFzQjtRQUN0QixXQUFXO0tBQ2Q7Q0FDSjtBQUNEO0lBQ0k7UUFDSSxZQUFZO1FBQ1osNkJBQTZCO0tBQ2hDO0lBQ0Q7UUFDSSxzQkFBc0I7UUFDdEIsV0FBVztLQUNkO0lBQ0Q7UUFDSSxlQUFlO1FBQ2Ysa0JBQWtCO0tBQ3JCO0lBQ0Q7UUFDSSxrQkFBa0I7S0FDckI7Q0FDSjtBQUVEO0lBQ0k7UUFDSSw0QkFBNEI7UUFDNUIsb0JBQW9CO0tBQ3ZCO0lBQ0Q7UUFDSSxZQUFZO0tBQ2Y7SUFDRDtRQUNJLGVBQWU7S0FDbEI7SUFDRDtRQUNJLGVBQWU7S0FDbEI7SUFDRDtRQUNJLGVBQWU7S0FDbEI7SUFDRDtRQUNJLGtCQUFrQjtLQUNyQjtDQUNKO0FBQ0Q7SUFDSTtRQUNJLG1CQUFtQjtLQUN0QjtJQUNEO1FBQ0ksb0JBQW9CO0tBQ3ZCO0lBQ0Q7UUFDSSxtQkFBbUI7S0FDdEI7SUFDRDtRQUNJLDhCQUE4QjtLQUNqQztJQUNEO1FBQ0ksNEJBQTRCO0tBQy9CO0lBQ0Q7UUFDSSw4QkFBOEI7S0FDakM7SUFDRDtRQUNJLGtCQUFrQjtLQUNyQjs7Q0FFSjtBQUNEO0lBQ0k7UUFDSSxvQkFBb0I7S0FDdkI7Q0FDSjtBQUNEO0lBQ0k7UUFDSSxtQkFBbUI7S0FDdEI7O0NBRUo7QUFDRDtJQUNJO1FBQ0ksZUFBZTtRQUNmLHNCQUFzQjtLQUN6QjtDQUNKIiwiZmlsZSI6InNyYy9hcHAvZnJhZ21lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImZvb3RlciNmb290IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxZjRhN2M7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDAgMCAwO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAwO1xyXG4gICB9XHJcbmZvb3RlciNmb290ICoge1xyXG4gICAgY29sb3I6ICNGRkY7XHJcbn1cclxuLyogLmZvb3RlciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogNjBweDtcclxuICAgIGxpbmUtaGVpZ2h0OiA2MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxufSAqL1xyXG5hLnRleHRfZGVjb19ub25lIHNwYW4ge1xyXG4gICAgY29sb3I6IG9yYW5nZSAhaW1wb3J0YW50O1xyXG59XHJcbi8qIC5mb290ZXItbGlua3N7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICBmbG9hdDogcmlnaHQ7ICAgXHJcbiAgICBtYXJnaW46IDA7IFxyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG4uZm9vdGVyLWxpbmtzIGxpe1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcbi5mb290ZXItYWxsLWxpbmtze1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxufSAqL1xyXG4vKiBmb290ZXIgcHsgICAgXHJcbiAgICBtYXJnaW4tdG9wOiA3cHg7XHJcbn0gKi9cclxuLmNvcHktcmlnaHR7XHJcbiAgICBmbG9hdDogbGVmdDtcclxufVxyXG4ubWFpbi1jb250ZW50e1xyXG4gICAgbWluLWhlaWdodDogNDUwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmZvb3Rlci1hbGwtbGlua3N7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuLmZvb3Rlci1saW5rc3tcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG59XHJcbi5mb290ZXItaW1ne1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAtMzBweDtcclxufVxyXG4uZGVwYXJ0bWVudCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBcclxufVxyXG4uYWRkcmVzcywgLmRlcGFydG1lbnR7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgIFxyXG59XHJcbi5hZGRyZXNze1xyXG4gICAgcGFkZGluZy1sZWZ0OiA3MHB4O1xyXG4gICBcclxufVxyXG5cclxuLmVtYWlsLWFkZHJlc3N7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDcwcHg7XHJcbiAgICBsaW5lLWhlaWdodDogMHB4O1xyXG59XHJcbnVsLnNvY2lhbC1saW5rcyB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcbi5zb2NpYWwtbGlua3MgbGl7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcblxyXG59XHJcbi5zb2NpYWwtYWxsLWxpbmtzIGxhYmVse1xyXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG59XHJcbnVsLmZvb3Rlci1saW5rcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xyXG59XHJcbi50ZXh0LXJpZ2h0IHtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0IWltcG9ydGFudDtcclxuICAgIG1hcmdpbi10b3A6IDE2cHg7XHJcbn1cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpe1xyXG4gICAgLmZvb3Rlci1pbWcge1xyXG4gICAgICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IC0zM3B4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuZGVwYXJ0bWVudHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgcGFkZGluZzogMDtcclxuICAgIH1cclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MXB4KXtcclxuICAgIC5mb290ZXItaW1nIHtcclxuICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICBtYXJnaW4tdG9wOiAtMzNweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmRlcGFydG1lbnR7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICB9XHJcbiAgICAubmF2LWxpbmsge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIHBhZGRpbmc6IDNweCAxMHB4O1xyXG4gICAgfVxyXG4gICAgLnNvY2lhbC1saW5rcyBsaSB7XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA5cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSAgKG1heC13aWR0aDogNzY4cHgpe1xyXG4gICAgLmZvb3Rlci1saW5rc3tcclxuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWlubGluZS1ib3g7XHJcbiAgICAgICAgcGFkZGluZy1yaWdodDogNzBweDtcclxuICAgIH1cclxuICAgIC5mb290ZXItaW1nIHtcclxuICAgICAgICB3aWR0aDogMzZweDtcclxuICAgIH1cclxuICAgIC5kZXBhcnRtZW50e1xyXG4gICAgICAgIGZvbnQtc2l6ZTogOHB4O1xyXG4gICAgfVxyXG4gICAgLmZvb3Rlci1saW5rcyB7XHJcbiAgICAgICAgZm9udC1zaXplOiA5cHg7XHJcbiAgICB9XHJcbiAgICAuc29jaWFsLWFsbC1saW5rcyBsYWJlbCB7XHJcbiAgICAgICAgZm9udC1zaXplOiA5cHg7XHJcbiAgICB9XHJcbiAgICAuc29jaWFsLWxpbmtzIGxpe1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMXB4O1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjA4cHgpe1xyXG4gICAgLmNvcHktcmlnaHQgcHtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICAuZm9vdGVyLWxpbmtze1xyXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDg3cHg7XHJcbiAgICB9XHJcbiAgICAuY29weS1yaWdodCB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgLmZvb3Rlci1hbGwtbGlua3Mge1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgdWwuZm9vdGVyLWxpbmtzIHtcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuc29jaWFsLnRleHQtcmlnaHQge1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLnNvY2lhbC1saW5rcyBsaSB7XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA4cHg7XHJcbiAgICB9XHJcblxyXG59XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTYwcHgpe1xyXG4gICAgLmZvb3Rlci1saW5rc3tcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiA3MHB4O1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpe1xyXG4gICAgLmZvb3Rlci1saW5rc3tcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiA5cHg7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzYwcHgpe1xyXG4gICAgLmZvb3Rlci1hbGwtbGlua3Mge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogOHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxuICAgIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/fragments/footer/footer.component.html":
/*!********************************************************!*\
  !*** ./src/app/fragments/footer/footer.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer id=\"foot\" class=\"footer\">\r\n\t<div class=\"container-fluid\">\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"col-md-4 copy-right\">\r\n\t\t\t\t<img class=\"footer-img\" src=\"./assets/images/logos/logo1.png\" alt=\"footerimage\">\r\n\t\t\t\t<p class=\"department\">Panchayati Raj & Drinking Water Department,<br>\r\n\t\t\t\t\tSecretariet, Sachibalaya Marg, Bhubaneswar-751001<br>\r\n\t\t\t\t\tE-Mail- oswsm@rediffmail.com\r\n\t\t\t\t</p>\r\n\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-md-5 footer-all-links text-left\">\r\n\t\t\t\t<ul class=\"footer-links\">\r\n\t\t\t\t\t<li class=\"nav-item\" [ngClass]=\"{'active': router.url=='/terms-of-use'}\">\r\n\t\t\t\t\t\t<a class=\"nav-link\" routerLink=\"/terms-of-use\" href=\"/terms-of-use\">Terms of Use</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li class=\"nav-item\" [ngClass]=\"{'active': router.url=='/privacy-policy'}\">\r\n\t\t\t\t\t\t<a class=\"nav-link\" routerLink=\"/privacy-policy\">Privacy Policy</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li class=\"nav-item\" [ngClass]=\"{'active': router.url=='/disclaimer'}\">\r\n\t\t\t\t\t\t<a class=\"nav-link\" routerLink=\"/disclaimer\" >Disclaimer</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li class=\"nav-item\" [ngClass]=\"{'active': router.url=='/sitemap'}\">\r\n\t\t\t\t\t\t<a class=\"nav-link\" routerLink=\"/sitemap\" >Sitemap</a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-md-3 social-all-links \">\r\n\t\t\t\t<div class=\"social text-right\">\r\n\t\t\t\t\t<label class=\"screenReader\">Connect with us :</label>\r\n\t\t\t\t\t<ul class=\"social-links\">\r\n\t\t\t\t\t\t<li><a target=\"_blank\" href=\"https://www.facebook.com/sbmgodisha/\"><img src=\"./assets/images/facebook.png\"\r\n\t\t\t\t\t\t\t\t alt=\"facebook sbm\"></a></li>\r\n\t\t\t\t\t\t<li><a target=\"_blank\" href=\"https://twitter.com/sbmodisha\"><img src=\"./assets/images/twitter.png\"\r\n\t\t\t\t\t\t\t\t alt=\"twitter sbm\"></a></li>\r\n\t\t\t\t\t\t<li><a target=\"_blank\" href=\"https://goo.gl/Mg99Gz\"><img src=\"./assets/images/ytube.png\"\r\n\t\t\t\t\t\t\t\t alt=\"ytube sbm\"></a></li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t</div>\r\n</footer>\r\n"

/***/ }),

/***/ "./src/app/fragments/footer/footer.component.ts":
/*!******************************************************!*\
  !*** ./src/app/fragments/footer/footer.component.ts ***!
  \******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var FooterComponent = /** @class */ (function () {
    function FooterComponent(router) {
        this.router = router;
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/fragments/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/fragments/footer/footer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/fragments/header/header.component.css":
/*!*******************************************************!*\
  !*** ./src/app/fragments/header/header.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n/* $primary-color: #1f4a7c; */\r\n\r\n.lang-options { border-left: 1px solid #c5c5c5; }\r\n\r\n.setting-option {\r\n    display: inline-flex;\r\n}\r\n\r\n.setting-icon {\r\n    list-style: none;\r\n    padding: 6px 0 8px 0 !important;;\r\n}\r\n\r\n.setting-menu-icon {\r\n    padding-left: 0;\r\n    margin-bottom: 0;\r\n}\r\n\r\n.setting-icon:hover {\r\n    background-color: #c5c5c57a !important;\r\n}\r\n\r\n.setting-menu{\r\n    background-color: #ffffff !important;\r\n    border-radius: 0 !important;\r\n    top: 7px;\r\n    overflow: unset;\r\n    border: none;\r\n    top: 14px !important;\r\n    margin-left: -175%;\r\n}\r\n\r\nheader{\r\n    background: #1f4a7c;\r\n}\r\n\r\n.logo-text{\r\n    \r\n    padding: 11px;\r\n    display: inline-block;\r\n    height: 89px;\r\n}\r\n\r\n.logo-text h2{\r\n    color: #1f4a7c;\r\n    font-size: 29px;\r\n    font-weight: 500;\r\n}\r\n\r\n.logo-text p{\r\n    font-weight: 500;\r\n}\r\n\r\n.logo-block{\r\n    padding-top: 8px;\r\n    padding-bottom: 8px;\r\n}\r\n\r\n.navbar-fixed {\r\n    top: 0;\r\n    z-index: 100;\r\n    position: fixed;\r\n    width: 100%;\r\n}\r\n\r\n.background {\r\n      background: #9e9e9e47;\r\n  }\r\n\r\n.region-header .block {\r\n    float: right;\r\n    line-height: 10px;\r\n    padding: 0;\r\n}\r\n\r\n.lang-details {\r\n    list-style-type: none ;\r\n    display: inline-flex;\r\n    margin-bottom: 0 ;\r\n}\r\n\r\na.login {\r\n    color: #000;\r\n    display: inline-block;\r\n    float: left;\r\n    line-height: 30px;\r\n    padding: 0 10px 0 25px;\r\n    margin-left: 0px;\r\n    width: 100%;\r\n}\r\n\r\na.english {\r\n    color: #000;\r\n    display: inline-block;\r\n    float: left;\r\n    line-height: 30px;\r\n    padding: 0 10px 0 10px;\r\n    border-right: 1px solid #C5C5C5;\r\n    margin-left: 0px;\r\n    cursor: pointer;\r\n}\r\n\r\na.language-link {\r\n    color: #000;\r\n    display: inline-block;\r\n    float: left;\r\n    line-height: 30px;\r\n    padding: 0 10px 0 11px;;\r\n    margin-left: 0px;\r\n    border-right: 1px solid #C5C5C5;\r\n}\r\n\r\n.setting-icon-link {\r\n    padding: 0 10px 0 10px;\r\n    color: #333; \r\n}\r\n\r\n/* new header css */\r\n\r\n.all-logo {\r\n    list-style: none;\r\n    display: inline-flex;\r\n    padding: 0;\r\n    margin: 8px 0 0 0;\r\n}\r\n\r\n.user-block {\r\n    float: right;\r\n}\r\n\r\n.logo-design {\r\n    padding: 0 20px 0 15px;;\r\n}\r\n\r\n.govt-logo{\r\n    width: 80px;\r\n}\r\n\r\n.sbm-logo{\r\n    width: 98px;\r\n}\r\n\r\nimg.cm-logo {\r\n    width: 90px;\r\n    margin-top: 9px;\r\n    margin-right: 10px;\r\n}\r\n\r\n.heading-name{\r\n    margin-top: 22px;\r\n    /* padding: 9px; */\r\n}\r\n\r\n.heading-title{\r\n    font-weight: bold;\r\n    color: #1f497b;\r\n    font-size: 30px;\r\n}\r\n\r\n.left-container .col-md-7{\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n}\r\n\r\n.heading-name h2{\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n    line-height: 2px;\r\n}\r\n\r\n.welcome-user {\r\n    margin-top: 15px;\r\n    cursor: default;\r\n}\r\n\r\n.logged-user {\r\n    color: #1f4a7c;\r\n    font-size: 13px;\r\n    float: right;\r\n}\r\n\r\n.welcome-msg {\r\n    float: right;\r\n    cursor: default;\r\n}\r\n\r\n.top_link_icon {\r\n    margin-top: 5px;\r\n    text-align: center;\r\n}\r\n\r\n.round_icon > span {\r\n    font-size: 14px !important;\r\n    font-weight: bold;\r\n    color: #1f4a7c;\r\n    left: 7px;\r\n}\r\n\r\n.icon-text {\r\n    position: relative;\r\n    bottom: -3px;\r\n}\r\n\r\n.login-section {\r\n    margin-top: 9px;\r\n}\r\n\r\n.fa-user:before {\r\n    content: \"\\f007\";\r\n}\r\n\r\n.round_icon i {\r\n    width: 55px;\r\n    height: 55px;\r\n    border-radius: 50%;\r\n    padding: 11px 0px 0px 0px;\r\n    border: 2px solid #cecece;\r\n    font-size: 28px !important;\r\n    color: #949393;\r\n    box-shadow: 0px 0px 0px 8px rgba(68,68,68,0.08);\r\n    transition: box-shadow .5s;\r\n    transition-timing-function: linear;\r\n}\r\n\r\n.round_icon i:hover {\r\n    box-shadow: 0px 0px 0px 8px rgba(176,173,176,1);\r\n}\r\n\r\n.language-block .block {\r\n    float: left;\r\n    line-height: 10px;\r\n    padding: 0;\r\n}\r\n\r\n.language-lists {\r\n    list-style-type: none;\r\n    display: inline-flex;\r\n    margin-bottom: 0;\r\n    padding-left: 13px;\r\n}\r\n\r\n.gov-logo-section {\r\n    display: inline-flex;\r\n}\r\n\r\nli.nav-item .dropdown-menu a {\r\n    font-size: 14px;\r\n}\r\n\r\n.fa-user {\r\n    padding-right: 5px;\r\n}\r\n\r\na.english:hover, a.language-link:hover, a.login:focus, a.english:focus, a.language-link:focus  {\r\n    background-color: #c5c5c57a;\r\n}\r\n\r\na.login:hover{\r\n    color: #1f497b;\r\n    font-weight: bold;\r\n\r\n}\r\n\r\n.triangle-up {\r\n\twidth: 0;\r\n\theight: 0;\r\n\tborder-left: 7px solid transparent;\r\n    border-right: 7px solid transparent;\r\n    border-bottom: 8px solid #1f497b;\r\n    float: right;\r\n    margin-top: -9px;\r\n    margin-left: 20px;\r\n    float: left;\r\n}\r\n\r\n.triangle-up-setting {\r\n    width: 0;\r\n\theight: 0;\r\n\tborder-left: 7px solid transparent;\r\n    border-right: 7px solid transparent;\r\n    border-bottom: 8px solid #1f4a7c;\r\n    float: right;\r\n    margin-top: -8px;\r\n    margin-right: 20px;\r\n    float: right;\r\n}\r\n\r\n.arrow {\r\n    overflow: unset !important;\r\n}\r\n\r\n.top-text-icon {\r\n    width: 16px;\r\n}\r\n\r\n.text-size-icon {\r\n    border-right: 1px solid #C5C5C5;\r\n}\r\n\r\n.fa-user, .fa-key, .fa-sign-out{\r\nmargin: 0 3px 0 -10px;\r\n}\r\n\r\n.fa-user:hover, .fa-key:hover, .fa-sign-out:hover{\r\n    font-weight: bold;\r\n    color: #1f497b;\r\n    font-style: inherit;\r\n    }\r\n\r\na.english, a.language-link, a.login {\r\n    font-size: 13px;\r\n}\r\n\r\n.sub-heading {\r\n    color: #1f497b;\r\n}\r\n\r\n.padding-left-zero {\r\n    padding-left: 0;\r\n}\r\n\r\n.padding-right-zero {\r\n    padding-right: 0;\r\n}\r\n\r\n.head-info-left{\r\n    margin-left: -68px;\r\n}\r\n\r\n.right-logo{\r\n    text-align: right;\r\n}\r\n\r\n.head-info{\r\n    float:left;\r\n    display: inline-block;\r\n}\r\n\r\n.right-logos{\r\n    margin-right: 30px;\r\n}\r\n\r\n.right-sec{\r\n    padding: 53px 0 0 0;\r\n    \r\n}\r\n\r\n.cm_name {\r\n    font-size: 15px;\r\n    color: black;\r\n    font-weight: 400;\r\n}\r\n\r\n.cm_designation {\r\n    font-size: 11px;\r\n    color: black;\r\n    font-weight: 400;\r\n    line-height: 9px;\r\n}\r\n\r\n.navbar{\r\n    background: #1f4a7c !important;\r\n    width: 100%;\r\n    padding: 0;\r\n}\r\n\r\n.navbar-nav{\r\n    padding-left: 30px;\r\n}\r\n\r\n.navbar.navbar-light .breadcrumb .nav-item .nav-link, .navbar.navbar-light .navbar-nav .nav-item .nav-link {\r\n    color: #f0f0f0;\r\n    \r\n}\r\n\r\n.navbar.navbar-light .navbar-nav .nav-item .nav-link:hover {\r\n    color: #000;  \r\n}\r\n\r\nli.nav-item {\r\n    padding: 0px 10px 0px 10px;\r\n    font-size: 15px;\r\n}\r\n\r\n.navbar .dropdown-menu a {\r\n    font-size: 0.9375rem;\r\n    font-weight: 300;\r\n    padding: 5px 0 5px 6px;\r\n    color: #fff !important;\r\n    border-bottom: 1px solid #fff;\r\n}\r\n\r\n.dropdown-toggle::after {\r\n    margin-left: 7px;\r\n}\r\n\r\nli.nav-item:hover {\r\n    background: #f7a707;\r\n    cursor: pointer !important;\r\n}\r\n\r\n.navbar.navbar-light .navbar-toggler {\r\n    color: #000;\r\n    margin: 5px 0px 5px 30px;\r\n    border-radius: 0;\r\n}\r\n\r\n.dropdown-menu .dropdown-item:last-child {\r\n    border-bottom: none !important;\r\n}\r\n\r\n.head-info ul{\r\n    list-style: none;\r\n    display: inline-flex;\r\n    padding: 0;\r\n}\r\n\r\na:hover {\r\n    text-decoration: none;\r\n}\r\n\r\n.welcome-name{\r\n    color: white;\r\n    text-align: right;\r\n}\r\n\r\n/* media query */\r\n\r\n@media(max-width: 1024px){\r\n    .govt-logo {\r\n        width: 50px;\r\n        margin-top: 10px;\r\n    }\r\n    .sbm-logo{\r\n        width: 80px;\r\n        margin-top: 6px;\r\n    }\r\n    .heading-title {\r\n        font-size: 22px;\r\n    }\r\n    img.cm-logo {\r\n        width: 75px;\r\n    }\r\n    a.english {\r\n        padding: 0 4px 0 3px;\r\n    }\r\n    li.nav-item {\r\n        padding: 0 0 0 2px;\r\n        font-size: 14px;\r\n    }\r\n    .dropdown-toggle::after {\r\n        margin-left: 3px;\r\n    }\r\n    .setting-menu {\r\n        margin-left: -207%;\r\n    }\r\n    .round_icon i {\r\n        width: 45px;\r\n        height: 45px;\r\n        border-radius: 50%;\r\n        padding: 9px 0px 0px 0px;\r\n        border: 2px solid #cecece;\r\n        font-size: 24px !important;\r\n    }\r\n    .logo-design {\r\n        padding: 0 15px 0 14px;\r\n    }\r\n    .round_icon > span {\r\n        left: 8px !important;\r\n    }\r\n    .round-icon-logout > span {\r\n        left: 0 !important;\r\n    }\r\n    .right-sec {\r\n        padding: 40px 0 0 0;\r\n    }\r\n   \r\n}\r\n\r\n@media (max-width: 991px){\r\n    .setting-menu {\r\n        margin-left: -234%;\r\n    }\r\n    button.navbar-toggler {\r\n        background-color: white;\r\n        margin-left: 40px;\r\n    }\r\n    .logo-design {\r\n        padding: 0 12px 0 14px;\r\n    }\r\n    .heading-title {\r\n        font-size: 20px;\r\n    }\r\n    .dropdown-menu.arrow.show {\r\n        background: #f0f0f0;\r\n    }\r\n    .triangle-up {\r\n        border-bottom: 8px solid #f0f0f0;\r\n        margin-top: -8px;\r\n    }\r\n    .navbar .dropdown-menu a {\r\n        font-weight: 400;\r\n        color: #1f4a7c !important;\r\n        border-bottom: 1px solid #1f4a7c;\r\n    }\r\n    .navbar-nav .dropdown-menu {\r\n        position: static !important;\r\n        float: left;\r\n    }\r\n    li.nav-item:hover {\r\n        background: #f7a707;\r\n        cursor: pointer !important;\r\n    }\r\n \r\n     a.english, a.language-link, a.login {\r\n        font-size: 12px;\r\n     }\r\n     .navbar.navbar-light .navbar-toggler-icon {\r\n        cursor: pointer;\r\n        height: 23px;\r\n        width: 22px;\r\n    }\r\n  .nav-item.dropdown.show .dropdown-menu {\r\n      -webkit-transform: translate3d(6px, 1px, 0px);\r\n              transform: translate3d(6px, 1px, 0px);\r\n    }\r\n  .navbar-nav {\r\n    margin-bottom: 46px;\r\n  }\r\n    .top-menu {\r\n        padding: 0;\r\n    }\r\n    .navbar-toggler {\r\n        padding: 0 5px 0 5px;\r\n    }\r\n}\r\n\r\n/* @media only screen and (max-width: 991px){\r\n    .slider-img {\r\n        padding: 0 15px 36px 0;\r\n        border-radius: 3px;\r\n    }\r\n  \r\n    .read-more-btn{\r\n        padding: 4px;\r\n    }\r\n    .quick-rnd {\r\n        margin: 5% 0 7% 5%;\r\n    }\r\n    .notification-block-lst{\r\n        height: 424px;\r\n    }\r\n    .socialpnl {\r\n        margin-left: 88px;\r\n    }\r\n  \r\n} */\r\n\r\n@media(max-width: 768px){\r\n    .lang-details {\r\n        list-style-type: none;\r\n        display: -webkit-box;\r\n        margin-bottom: 0;\r\n        padding-right: 15px;\r\n    }\r\n    .heading-title {\r\n        font-size: 18px;\r\n        margin-left: 28px;\r\n    }\r\n    .heading-name h2 {\r\n        font-size: 10px;\r\n        margin-left: 28px;\r\n    }\r\n    .logo-design{\r\n        padding: 0 7px 0 5px;\r\n    }\r\n    .round_icon i {\r\n        width: 38px;\r\n        height: 38px;\r\n        border-radius: 50%;\r\n        padding: 7px 0px 0px 0px;\r\n        border: 2px solid #cecece;\r\n        font-size: 20px !important;\r\n    }\r\n    .logged-user {\r\n        color: #1f4a7c;\r\n        font-size: 13px;\r\n    }\r\n    .welcome-user {\r\n        margin-top: 9px;\r\n    }\r\n    p {\r\n        font-size: 12px;\r\n    }\r\n    a.english {\r\n        padding: 0 5px 0 2px;\r\n    }\r\n    a.english, a.language-link, a.login {\r\n        font-size: 8px;\r\n    }\r\n    .setting-icon-link{\r\n        padding: 0 3px 0 0px;\r\n    }\r\n    .setting-menu{\r\n        margin-left: -120px;\r\n    }\r\n    .round_icon > span {\r\n        left: 1px !important;\r\n    }\r\n    .icon-text{\r\n        bottom: -1px;\r\n    }\r\n    .icons-tab-view {\r\n      padding-right: 0; \r\n    }\r\n    .cm_name {\r\n        font-size: 12px;\r\n        color: black;\r\n        font-weight: 400;\r\n    }\r\n    .cm_designation {\r\n        font-size: 8px;\r\n        color: black;\r\n        font-weight: 400;\r\n    }\r\n    img.cm-logo {\r\n        width: 73px;\r\n    }\r\n\r\n}\r\n\r\n/* @media (max-width: 767px){\r\n    marquee {\r\n        overflow: initial;\r\n        overflow-y: hidden;\r\n        white-space: nowrap !important;\r\n    }\r\n   \r\n} */\r\n\r\n/* @media(max-width: 767px){\r\n    .gov-logo-section{\r\n        padding: 0;\r\n    }\r\n    .gov-logo-section .padding-left-zero, .gov-logo-section .padding-right-zero{\r\n        padding: 0;\r\n    }\r\n    .left-logo-bbbp{\r\n        width: 100%;\r\n       \r\n    }\r\n    .right-logo-bbbp {\r\n        width: 100%;\r\n        margin-top: 15px;\r\n    }\r\n    .navbar-toggler i.fa.fa-bars:before{\r\n        color: black;\r\n    }\r\n    .right-logo-bbbp1 {\r\n        width: 100%;\r\n        margin-top: 21px;\r\n    }\r\n    .head-info-left{\r\n        margin-left: 0px;\r\n    }\r\n    .infocus-each-block-dist {\r\n        max-width: 100%;\r\n    }\r\n} */\r\n\r\n@media(max-width: 608px){\r\n    .left-container{\r\n        display: inline-flex;\r\n        width: 44%;\r\n    }\r\n    .lang-width-tab-view { \r\n        width: 25%;\r\n        padding-left: 0;\r\n    }\r\n   \r\n    .top-menu { width: 75% }\r\n    .head-info{\r\n        width: 79%;\r\n        display: block;\r\n    }\r\n    .heading-title{\r\n        font-size: 13px;\r\n        margin-top: 0;\r\n        margin-left: 0;\r\n    }\r\n    .heading-name h2{\r\n        margin-left: 0;\r\n    }\r\n    \r\n    .right-logo { width: 56%; }\r\n    p {\r\n        font-size: 11px;\r\n    }\r\n    .triangle-up {\r\n        border-bottom: 8px solid #fefcf1;\r\n    }\r\n    .logged-user {\r\n        color: #1f4a7c;\r\n        font-size: 13px;\r\n        white-space: nowrap;\r\n        width: 100px;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n    }  \r\n    .icons-tab-view {\r\n        width: 50%;\r\n        margin: -73px 0px 0 400px;\r\n    }\r\n    .round_icon i {\r\n        width: 32px;\r\n        height: 32px;\r\n        border-radius: 50%;\r\n        padding: 7px 0px 0px 0px;\r\n        border: 2px solid #cecece;\r\n        font-size: 15px !important;\r\n    }\r\n    .right-logos {\r\n        margin-right: 10px;\r\n    }\r\n    .right-sec{\r\n        padding-top: 60px;\r\n        width: 50%;\r\n        left: 60px;\r\n    }\r\n    .right-cm-img{\r\n        width: 50%;\r\n    }\r\n    .heading-name{\r\n        padding-left: 25px !important;\r\n        margin-top: -15px;\r\n    }\r\n    img.cm-logo {\r\n        margin-top: 26px;\r\n    }\r\n\r\n}\r\n\r\n/* @media(max-width: 575px){\r\n    .gov-logo-section > div{\r\n        width: 100%;\r\n    }\r\n    .gov-logo-section .padding-right-zero{\r\n        padding-right: 10px;\r\n    }\r\n    .gov-logo-section .padding-left-zero{\r\n        padding-left: 10px;\r\n        text-align: left;\r\n    }\r\n    .right-logo-bbbp,.right-logo-bbbp1{\r\n        max-width: 60px;\r\n    }\r\n    .gov-logo-section{\r\n        padding-bottom: 10px;\r\n    }\r\n} */\r\n\r\n@media(max-width: 560px){\r\n    .left-container{\r\n        width: 47%;\r\n    }\r\n    .icons-tab-view {\r\n        width: 50%;\r\n        margin: -73px 0px 0 357px;\r\n    }\r\n    .right-logo {\r\n        width: 53%;\r\n    }\r\n    .heading-title {\r\n        font-size: 12px;\r\n    }\r\n    .right-sec{\r\n        left: 57px;\r\n    }\r\n}\r\n\r\n@media(max-width: 480px){\r\n    .lang-details {\r\n        padding-left: 0 !important;\r\n        margin-left: -20px !important;\r\n    }\r\n    a.english {\r\n        padding: 0 2px 0 5px !important;\r\n    }\r\n    .heading-title{\r\n        font-size: 10px;\r\n    }\r\n    .heading-name h2 {\r\n        font-size: 8px;\r\n    }\r\n    .right-sec {\r\n        padding-top: 52px;\r\n    }\r\n    p{\r\n        font-size: 9px;\r\n    }\r\n \r\n    .info-mobile-view {\r\n        margin-left: 15px;\r\n    }\r\n    .icons-tab-view {\r\n        width: 50%;\r\n        margin: -71px 0px 0 314px;\r\n    }\r\n    .welcome-msg {\r\n        font-size: 13px;\r\n    }\r\n    .logged-user {\r\n        font-size: 9px;\r\n        width: 65px;\r\n    }\r\n    .cm_name{\r\n        font-size: 10px;\r\n        color: black;\r\n        font-weight: 400;\r\n    }\r\n    .cm_designation{\r\n        font-size: 7px;\r\n        color: black;\r\n        font-weight: 400;\r\n    }\r\n    .right-sec {\r\n        left: 23px;\r\n        padding-top: 63px;\r\n    }\r\n \r\n}\r\n\r\n@media(max-width: 360px){\r\n    .heading-name {\r\n        padding: 0;\r\n    }\r\n    .heading-title {\r\n        font-size: 13px;\r\n    }\r\n    .heading-name h2 {\r\n        font-size: 7px;\r\n    }\r\n    .right-sec {\r\n        padding-top: 70px;\r\n        left: 9px;\r\n    }\r\n\r\n}\r\n\r\nli.nav-item.dropdown.active {\r\n    background-color: #000;\r\n}\r\n\r\nli.nav-item.dropdown.active a:hover {\r\n    color: #FFF !important;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZnJhZ21lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsOEJBQThCOztBQUU5QixnQkFBZ0IsK0JBQStCLEVBQUU7O0FBRWpEO0lBQ0kscUJBQXFCO0NBQ3hCOztBQUNEO0lBQ0ksaUJBQWlCO0lBQ2pCLGdDQUFnQztDQUNuQzs7QUFDRDtJQUNJLGdCQUFnQjtJQUNoQixpQkFBaUI7Q0FDcEI7O0FBRUQ7SUFDSSx1Q0FBdUM7Q0FDMUM7O0FBR0Q7SUFDSSxxQ0FBcUM7SUFDckMsNEJBQTRCO0lBQzVCLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHFCQUFxQjtJQUNyQixtQkFBbUI7Q0FDdEI7O0FBR0Q7SUFDSSxvQkFBb0I7Q0FDdkI7O0FBRUQ7O0lBRUksY0FBYztJQUNkLHNCQUFzQjtJQUN0QixhQUFhO0NBQ2hCOztBQUNEO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixpQkFBaUI7Q0FDcEI7O0FBQ0Q7SUFDSSxpQkFBaUI7Q0FDcEI7O0FBRUQ7SUFDSSxpQkFBaUI7SUFDakIsb0JBQW9CO0NBQ3ZCOztBQUVEO0lBQ0ksT0FBTztJQUNQLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsWUFBWTtDQUNmOztBQUVEO01BQ00sc0JBQXNCO0dBQ3pCOztBQUVIO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixXQUFXO0NBQ2Q7O0FBQ0Q7SUFDSSx1QkFBdUI7SUFDdkIscUJBQXFCO0lBQ3JCLGtCQUFrQjtDQUNyQjs7QUFFRDtJQUNJLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLFlBQVk7Q0FDZjs7QUFFRDtJQUNJLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsZ0NBQWdDO0lBQ2hDLGlCQUFpQjtJQUNqQixnQkFBZ0I7Q0FDbkI7O0FBQ0Q7SUFDSSxZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixnQ0FBZ0M7Q0FDbkM7O0FBQ0Q7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtDQUNmOztBQUVELG9CQUFvQjs7QUFDcEI7SUFDSSxpQkFBaUI7SUFDakIscUJBQXFCO0lBQ3JCLFdBQVc7SUFDWCxrQkFBa0I7Q0FDckI7O0FBQ0Q7SUFDSSxhQUFhO0NBQ2hCOztBQUNEO0lBQ0ksdUJBQXVCO0NBQzFCOztBQUNEO0lBQ0ksWUFBWTtDQUNmOztBQUNEO0lBQ0ksWUFBWTtDQUNmOztBQUNEO0lBQ0ksWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixtQkFBbUI7Q0FDdEI7O0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIsbUJBQW1CO0NBQ3RCOztBQUNEO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixnQkFBZ0I7Q0FDbkI7O0FBQ0Q7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0NBQ3BCOztBQUNEO0lBQ0ksZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixpQkFBaUI7Q0FDcEI7O0FBRUQ7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0NBQ25COztBQUNEO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixhQUFhO0NBQ2hCOztBQUNEO0lBQ0ksYUFBYTtJQUNiLGdCQUFnQjtDQUNuQjs7QUFDRDtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7Q0FDdEI7O0FBQ0Q7SUFDSSwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixVQUFVO0NBQ2I7O0FBQ0Q7SUFDSSxtQkFBbUI7SUFDbkIsYUFBYTtDQUNoQjs7QUFDRDtJQUNJLGdCQUFnQjtDQUNuQjs7QUFDRDtJQUNJLGlCQUFpQjtDQUNwQjs7QUFDRDtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDBCQUEwQjtJQUMxQiwwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLGVBQWU7SUFDZixnREFBZ0Q7SUFDaEQsMkJBQTJCO0lBQzNCLG1DQUFtQztDQUN0Qzs7QUFDRDtJQUNJLGdEQUFnRDtDQUNuRDs7QUFFRDtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsV0FBVztDQUNkOztBQUVEO0lBQ0ksc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsbUJBQW1CO0NBQ3RCOztBQUVEO0lBQ0kscUJBQXFCO0NBQ3hCOztBQUVEO0lBQ0ksZ0JBQWdCO0NBQ25COztBQUNEO0lBQ0ksbUJBQW1CO0NBQ3RCOztBQUVEO0lBQ0ksNEJBQTRCO0NBQy9COztBQUNEO0lBQ0ksZUFBZTtJQUNmLGtCQUFrQjs7Q0FFckI7O0FBQ0Q7Q0FDQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLG1DQUFtQztJQUNoQyxvQ0FBb0M7SUFDcEMsaUNBQWlDO0lBQ2pDLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLFlBQVk7Q0FDZjs7QUFDRDtJQUNJLFNBQVM7Q0FDWixVQUFVO0NBQ1YsbUNBQW1DO0lBQ2hDLG9DQUFvQztJQUNwQyxpQ0FBaUM7SUFDakMsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsYUFBYTtDQUNoQjs7QUFDRDtJQUNJLDJCQUEyQjtDQUM5Qjs7QUFDRDtJQUNJLFlBQVk7Q0FDZjs7QUFDRDtJQUNJLGdDQUFnQztDQUNuQzs7QUFDRDtBQUNBLHNCQUFzQjtDQUNyQjs7QUFDRDtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2Ysb0JBQW9CO0tBQ25COztBQUVMO0lBQ0ksZ0JBQWdCO0NBQ25COztBQUVEO0lBQ0ksZUFBZTtDQUNsQjs7QUFDRDtJQUNJLGdCQUFnQjtDQUNuQjs7QUFDRDtJQUNJLGlCQUFpQjtDQUNwQjs7QUFFRDtJQUNJLG1CQUFtQjtDQUN0Qjs7QUFFRDtJQUNJLGtCQUFrQjtDQUNyQjs7QUFDRDtJQUNJLFdBQVc7SUFDWCxzQkFBc0I7Q0FDekI7O0FBRUQ7SUFDSSxtQkFBbUI7Q0FDdEI7O0FBQ0Q7SUFDSSxvQkFBb0I7O0NBRXZCOztBQUNEO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixpQkFBaUI7Q0FDcEI7O0FBQ0Q7SUFDSSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixpQkFBaUI7Q0FDcEI7O0FBQ0Q7SUFDSSwrQkFBK0I7SUFDL0IsWUFBWTtJQUNaLFdBQVc7Q0FDZDs7QUFDRDtJQUNJLG1CQUFtQjtDQUN0Qjs7QUFDRDtJQUNJLGVBQWU7O0NBRWxCOztBQUNEO0lBQ0ksWUFBWTtDQUNmOztBQUNEO0lBQ0ksMkJBQTJCO0lBQzNCLGdCQUFnQjtDQUNuQjs7QUFDRDtJQUNJLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2Qiw4QkFBOEI7Q0FDakM7O0FBQ0Q7SUFDSSxpQkFBaUI7Q0FDcEI7O0FBRUQ7SUFDSSxvQkFBb0I7SUFDcEIsMkJBQTJCO0NBQzlCOztBQUNEO0lBQ0ksWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixpQkFBaUI7Q0FDcEI7O0FBRUQ7SUFDSSwrQkFBK0I7Q0FDbEM7O0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIscUJBQXFCO0lBQ3JCLFdBQVc7Q0FDZDs7QUFDRDtJQUNJLHNCQUFzQjtDQUN6Qjs7QUFDRDtJQUNJLGFBQWE7SUFDYixrQkFBa0I7Q0FDckI7O0FBRU8saUJBQWlCOztBQUV6QjtJQUNJO1FBQ0ksWUFBWTtRQUNaLGlCQUFpQjtLQUNwQjtJQUNEO1FBQ0ksWUFBWTtRQUNaLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksZ0JBQWdCO0tBQ25CO0lBQ0Q7UUFDSSxZQUFZO0tBQ2Y7SUFDRDtRQUNJLHFCQUFxQjtLQUN4QjtJQUNEO1FBQ0ksbUJBQW1CO1FBQ25CLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksaUJBQWlCO0tBQ3BCO0lBQ0Q7UUFDSSxtQkFBbUI7S0FDdEI7SUFDRDtRQUNJLFlBQVk7UUFDWixhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsMkJBQTJCO0tBQzlCO0lBQ0Q7UUFDSSx1QkFBdUI7S0FDMUI7SUFDRDtRQUNJLHFCQUFxQjtLQUN4QjtJQUNEO1FBQ0ksbUJBQW1CO0tBQ3RCO0lBQ0Q7UUFDSSxvQkFBb0I7S0FDdkI7O0NBRUo7O0FBRUQ7SUFDSTtRQUNJLG1CQUFtQjtLQUN0QjtJQUNEO1FBQ0ksd0JBQXdCO1FBQ3hCLGtCQUFrQjtLQUNyQjtJQUNEO1FBQ0ksdUJBQXVCO0tBQzFCO0lBQ0Q7UUFDSSxnQkFBZ0I7S0FDbkI7SUFDRDtRQUNJLG9CQUFvQjtLQUN2QjtJQUNEO1FBQ0ksaUNBQWlDO1FBQ2pDLGlCQUFpQjtLQUNwQjtJQUNEO1FBQ0ksaUJBQWlCO1FBQ2pCLDBCQUEwQjtRQUMxQixpQ0FBaUM7S0FDcEM7SUFDRDtRQUNJLDRCQUE0QjtRQUM1QixZQUFZO0tBQ2Y7SUFDRDtRQUNJLG9CQUFvQjtRQUNwQiwyQkFBMkI7S0FDOUI7O0tBRUE7UUFDRyxnQkFBZ0I7TUFDbEI7S0FDRDtRQUNHLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsWUFBWTtLQUNmO0VBQ0g7TUFDSSw4Q0FBc0M7Y0FBdEMsc0NBQXNDO0tBQ3ZDO0VBQ0g7SUFDRSxvQkFBb0I7R0FDckI7SUFDQztRQUNJLFdBQVc7S0FDZDtJQUNEO1FBQ0kscUJBQXFCO0tBQ3hCO0NBQ0o7O0FBQ0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQkE7O0FBRUo7SUFDSTtRQUNJLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtLQUN2QjtJQUNEO1FBQ0ksZ0JBQWdCO1FBQ2hCLGtCQUFrQjtLQUNyQjtJQUNEO1FBQ0ksZ0JBQWdCO1FBQ2hCLGtCQUFrQjtLQUNyQjtJQUNEO1FBQ0kscUJBQXFCO0tBQ3hCO0lBQ0Q7UUFDSSxZQUFZO1FBQ1osYUFBYTtRQUNiLG1CQUFtQjtRQUNuQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDJCQUEyQjtLQUM5QjtJQUNEO1FBQ0ksZUFBZTtRQUNmLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksZ0JBQWdCO0tBQ25CO0lBQ0Q7UUFDSSxnQkFBZ0I7S0FDbkI7SUFDRDtRQUNJLHFCQUFxQjtLQUN4QjtJQUNEO1FBQ0ksZUFBZTtLQUNsQjtJQUNEO1FBQ0kscUJBQXFCO0tBQ3hCO0lBQ0Q7UUFDSSxvQkFBb0I7S0FDdkI7SUFDRDtRQUNJLHFCQUFxQjtLQUN4QjtJQUNEO1FBQ0ksYUFBYTtLQUNoQjtJQUNEO01BQ0UsaUJBQWlCO0tBQ2xCO0lBQ0Q7UUFDSSxnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLGlCQUFpQjtLQUNwQjtJQUNEO1FBQ0ksZUFBZTtRQUNmLGFBQWE7UUFDYixpQkFBaUI7S0FDcEI7SUFDRDtRQUNJLFlBQVk7S0FDZjs7Q0FFSjs7QUFFRDs7Ozs7OztJQU9JOztBQUdKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNEJJOztBQUVIO0lBQ0c7UUFDSSxxQkFBcUI7UUFDckIsV0FBVztLQUNkO0lBQ0Q7UUFDSSxXQUFXO1FBQ1gsZ0JBQWdCO0tBQ25COztJQUVELFlBQVksVUFBVSxFQUFFO0lBQ3hCO1FBQ0ksV0FBVztRQUNYLGVBQWU7S0FDbEI7SUFDRDtRQUNJLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsZUFBZTtLQUNsQjtJQUNEO1FBQ0ksZUFBZTtLQUNsQjs7SUFFRCxjQUFjLFdBQVcsRUFBRTtJQUMzQjtRQUNJLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksaUNBQWlDO0tBQ3BDO0lBQ0Q7UUFDSSxlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQixhQUFhO1FBQ2IsaUJBQWlCO1FBQ2pCLHdCQUF3QjtLQUMzQjtJQUNEO1FBQ0ksV0FBVztRQUNYLDBCQUEwQjtLQUM3QjtJQUNEO1FBQ0ksWUFBWTtRQUNaLGFBQWE7UUFDYixtQkFBbUI7UUFDbkIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQiwyQkFBMkI7S0FDOUI7SUFDRDtRQUNJLG1CQUFtQjtLQUN0QjtJQUNEO1FBQ0ksa0JBQWtCO1FBQ2xCLFdBQVc7UUFDWCxXQUFXO0tBQ2Q7SUFDRDtRQUNJLFdBQVc7S0FDZDtJQUNEO1FBQ0ksOEJBQThCO1FBQzlCLGtCQUFrQjtLQUNyQjtJQUNEO1FBQ0ksaUJBQWlCO0tBQ3BCOztDQUVKOztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCSTs7QUFDSjtJQUNJO1FBQ0ksV0FBVztLQUNkO0lBQ0Q7UUFDSSxXQUFXO1FBQ1gsMEJBQTBCO0tBQzdCO0lBQ0Q7UUFDSSxXQUFXO0tBQ2Q7SUFDRDtRQUNJLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksV0FBVztLQUNkO0NBQ0o7O0FBRUQ7SUFDSTtRQUNJLDJCQUEyQjtRQUMzQiw4QkFBOEI7S0FDakM7SUFDRDtRQUNJLGdDQUFnQztLQUNuQztJQUNEO1FBQ0ksZ0JBQWdCO0tBQ25CO0lBQ0Q7UUFDSSxlQUFlO0tBQ2xCO0lBQ0Q7UUFDSSxrQkFBa0I7S0FDckI7SUFDRDtRQUNJLGVBQWU7S0FDbEI7O0lBRUQ7UUFDSSxrQkFBa0I7S0FDckI7SUFDRDtRQUNJLFdBQVc7UUFDWCwwQkFBMEI7S0FDN0I7SUFDRDtRQUNJLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksZUFBZTtRQUNmLFlBQVk7S0FDZjtJQUNEO1FBQ0ksZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixpQkFBaUI7S0FDcEI7SUFDRDtRQUNJLGVBQWU7UUFDZixhQUFhO1FBQ2IsaUJBQWlCO0tBQ3BCO0lBQ0Q7UUFDSSxXQUFXO1FBQ1gsa0JBQWtCO0tBQ3JCOztDQUVKOztBQUNEO0lBQ0k7UUFDSSxXQUFXO0tBQ2Q7SUFDRDtRQUNJLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksZUFBZTtLQUNsQjtJQUNEO1FBQ0ksa0JBQWtCO1FBQ2xCLFVBQVU7S0FDYjs7Q0FFSjs7QUFDRDtJQUNJLHVCQUF1QjtDQUMxQjs7QUFDRDtJQUNJLHVCQUF1QjtDQUMxQiIsImZpbGUiOiJzcmMvYXBwL2ZyYWdtZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyogJHByaW1hcnktY29sb3I6ICMxZjRhN2M7ICovXHJcblxyXG4ubGFuZy1vcHRpb25zIHsgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYzVjNWM1OyB9XHJcblxyXG4uc2V0dGluZy1vcHRpb24ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbn1cclxuLnNldHRpbmctaWNvbiB7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgcGFkZGluZzogNnB4IDAgOHB4IDAgIWltcG9ydGFudDs7XHJcbn1cclxuLnNldHRpbmctbWVudS1pY29uIHtcclxuICAgIHBhZGRpbmctbGVmdDogMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbn1cclxuXHJcbi5zZXR0aW5nLWljb246aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2M1YzVjNTdhICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcblxyXG4uc2V0dGluZy1tZW51e1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMCAhaW1wb3J0YW50O1xyXG4gICAgdG9wOiA3cHg7XHJcbiAgICBvdmVyZmxvdzogdW5zZXQ7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICB0b3A6IDE0cHggIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMTc1JTtcclxufVxyXG5cclxuXHJcbmhlYWRlcntcclxuICAgIGJhY2tncm91bmQ6ICMxZjRhN2M7XHJcbn1cclxuXHJcbi5sb2dvLXRleHR7XHJcbiAgICBcclxuICAgIHBhZGRpbmc6IDExcHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBoZWlnaHQ6IDg5cHg7XHJcbn1cclxuLmxvZ28tdGV4dCBoMntcclxuICAgIGNvbG9yOiAjMWY0YTdjO1xyXG4gICAgZm9udC1zaXplOiAyOXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG4ubG9nby10ZXh0IHB7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG4ubG9nby1ibG9ja3tcclxuICAgIHBhZGRpbmctdG9wOiA4cHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4ubmF2YmFyLWZpeGVkIHtcclxuICAgIHRvcDogMDtcclxuICAgIHotaW5kZXg6IDEwMDtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uYmFja2dyb3VuZCB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICM5ZTllOWU0NztcclxuICB9XHJcblxyXG4ucmVnaW9uLWhlYWRlciAuYmxvY2sge1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgbGluZS1oZWlnaHQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcbi5sYW5nLWRldGFpbHMge1xyXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lIDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMCA7XHJcbn1cclxuXHJcbmEubG9naW4ge1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG4gICAgcGFkZGluZzogMCAxMHB4IDAgMjVweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuYS5lbmdsaXNoIHtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBsaW5lLWhlaWdodDogMzBweDtcclxuICAgIHBhZGRpbmc6IDAgMTBweCAwIDEwcHg7XHJcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQzVDNUM1O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDBweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5hLmxhbmd1YWdlLWxpbmsge1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG4gICAgcGFkZGluZzogMCAxMHB4IDAgMTFweDs7XHJcbiAgICBtYXJnaW4tbGVmdDogMHB4O1xyXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0M1QzVDNTtcclxufVxyXG4uc2V0dGluZy1pY29uLWxpbmsge1xyXG4gICAgcGFkZGluZzogMCAxMHB4IDAgMTBweDtcclxuICAgIGNvbG9yOiAjMzMzOyBcclxufVxyXG5cclxuLyogbmV3IGhlYWRlciBjc3MgKi9cclxuLmFsbC1sb2dvIHtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBtYXJnaW46IDhweCAwIDAgMDtcclxufVxyXG4udXNlci1ibG9jayB7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuLmxvZ28tZGVzaWduIHtcclxuICAgIHBhZGRpbmc6IDAgMjBweCAwIDE1cHg7O1xyXG59XHJcbi5nb3Z0LWxvZ297XHJcbiAgICB3aWR0aDogODBweDtcclxufVxyXG4uc2JtLWxvZ297XHJcbiAgICB3aWR0aDogOThweDtcclxufVxyXG5pbWcuY20tbG9nbyB7XHJcbiAgICB3aWR0aDogOTBweDtcclxuICAgIG1hcmdpbi10b3A6IDlweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG4uaGVhZGluZy1uYW1le1xyXG4gICAgbWFyZ2luLXRvcDogMjJweDtcclxuICAgIC8qIHBhZGRpbmc6IDlweDsgKi9cclxufVxyXG4uaGVhZGluZy10aXRsZXtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgY29sb3I6ICMxZjQ5N2I7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbn1cclxuLmxlZnQtY29udGFpbmVyIC5jb2wtbWQtN3tcclxuICAgIHBhZGRpbmctbGVmdDogMDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbn1cclxuLmhlYWRpbmctbmFtZSBoMntcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgbGluZS1oZWlnaHQ6IDJweDtcclxufVxyXG5cclxuLndlbGNvbWUtdXNlciB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xyXG59XHJcbi5sb2dnZWQtdXNlciB7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGZsb2F0OiByaWdodDtcclxufVxyXG4ud2VsY29tZS1tc2cge1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xyXG59XHJcbi50b3BfbGlua19pY29uIHtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4ucm91bmRfaWNvbiA+IHNwYW4ge1xyXG4gICAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiAjMWY0YTdjO1xyXG4gICAgbGVmdDogN3B4O1xyXG59XHJcbi5pY29uLXRleHQge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm90dG9tOiAtM3B4O1xyXG59XHJcbi5sb2dpbi1zZWN0aW9uIHtcclxuICAgIG1hcmdpbi10b3A6IDlweDtcclxufVxyXG4uZmEtdXNlcjpiZWZvcmUge1xyXG4gICAgY29udGVudDogXCJcXGYwMDdcIjtcclxufVxyXG4ucm91bmRfaWNvbiBpIHtcclxuICAgIHdpZHRoOiA1NXB4O1xyXG4gICAgaGVpZ2h0OiA1NXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgcGFkZGluZzogMTFweCAwcHggMHB4IDBweDtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICBmb250LXNpemU6IDI4cHggIWltcG9ydGFudDtcclxuICAgIGNvbG9yOiAjOTQ5MzkzO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCAwcHggOHB4IHJnYmEoNjgsNjgsNjgsMC4wOCk7XHJcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC41cztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XHJcbn1cclxuLnJvdW5kX2ljb24gaTpob3ZlciB7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDBweCA4cHggcmdiYSgxNzYsMTczLDE3NiwxKTtcclxufVxyXG5cclxuLmxhbmd1YWdlLWJsb2NrIC5ibG9jayB7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxMHB4O1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG5cclxuLmxhbmd1YWdlLWxpc3RzIHtcclxuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcclxuICAgIHBhZGRpbmctbGVmdDogMTNweDtcclxufVxyXG5cclxuLmdvdi1sb2dvLXNlY3Rpb24ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbn1cclxuXHJcbmxpLm5hdi1pdGVtIC5kcm9wZG93bi1tZW51IGEge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcbi5mYS11c2VyIHtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcclxufVxyXG5cclxuYS5lbmdsaXNoOmhvdmVyLCBhLmxhbmd1YWdlLWxpbms6aG92ZXIsIGEubG9naW46Zm9jdXMsIGEuZW5nbGlzaDpmb2N1cywgYS5sYW5ndWFnZS1saW5rOmZvY3VzICB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzVjNWM1N2E7XHJcbn1cclxuYS5sb2dpbjpob3ZlcntcclxuICAgIGNvbG9yOiAjMWY0OTdiO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcblxyXG59XHJcbi50cmlhbmdsZS11cCB7XHJcblx0d2lkdGg6IDA7XHJcblx0aGVpZ2h0OiAwO1xyXG5cdGJvcmRlci1sZWZ0OiA3cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICBib3JkZXItcmlnaHQ6IDdweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCAjMWY0OTdiO1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgbWFyZ2luLXRvcDogLTlweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuLnRyaWFuZ2xlLXVwLXNldHRpbmcge1xyXG4gICAgd2lkdGg6IDA7XHJcblx0aGVpZ2h0OiAwO1xyXG5cdGJvcmRlci1sZWZ0OiA3cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICBib3JkZXItcmlnaHQ6IDdweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCAjMWY0YTdjO1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgbWFyZ2luLXRvcDogLThweDtcclxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcclxuICAgIGZsb2F0OiByaWdodDtcclxufVxyXG4uYXJyb3cge1xyXG4gICAgb3ZlcmZsb3c6IHVuc2V0ICFpbXBvcnRhbnQ7XHJcbn1cclxuLnRvcC10ZXh0LWljb24ge1xyXG4gICAgd2lkdGg6IDE2cHg7XHJcbn1cclxuLnRleHQtc2l6ZS1pY29uIHtcclxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDNUM1QzU7XHJcbn1cclxuLmZhLXVzZXIsIC5mYS1rZXksIC5mYS1zaWduLW91dHtcclxubWFyZ2luOiAwIDNweCAwIC0xMHB4O1xyXG59XHJcbi5mYS11c2VyOmhvdmVyLCAuZmEta2V5OmhvdmVyLCAuZmEtc2lnbi1vdXQ6aG92ZXJ7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiAjMWY0OTdiO1xyXG4gICAgZm9udC1zdHlsZTogaW5oZXJpdDtcclxuICAgIH1cclxuXHJcbmEuZW5nbGlzaCwgYS5sYW5ndWFnZS1saW5rLCBhLmxvZ2luIHtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG5cclxuLnN1Yi1oZWFkaW5nIHtcclxuICAgIGNvbG9yOiAjMWY0OTdiO1xyXG59XHJcbi5wYWRkaW5nLWxlZnQtemVybyB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbn1cclxuLnBhZGRpbmctcmlnaHQtemVybyB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG59XHJcblxyXG4uaGVhZC1pbmZvLWxlZnR7XHJcbiAgICBtYXJnaW4tbGVmdDogLTY4cHg7XHJcbn1cclxuXHJcbi5yaWdodC1sb2dve1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuLmhlYWQtaW5mb3tcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5yaWdodC1sb2dvc3tcclxuICAgIG1hcmdpbi1yaWdodDogMzBweDtcclxufVxyXG4ucmlnaHQtc2Vje1xyXG4gICAgcGFkZGluZzogNTNweCAwIDAgMDtcclxuICAgIFxyXG59XHJcbi5jbV9uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbn1cclxuLmNtX2Rlc2lnbmF0aW9uIHtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBsaW5lLWhlaWdodDogOXB4O1xyXG59XHJcbi5uYXZiYXJ7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMWY0YTdjICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDA7XHJcbn1cclxuLm5hdmJhci1uYXZ7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbn1cclxuLm5hdmJhci5uYXZiYXItbGlnaHQgLmJyZWFkY3J1bWIgLm5hdi1pdGVtIC5uYXYtbGluaywgLm5hdmJhci5uYXZiYXItbGlnaHQgLm5hdmJhci1uYXYgLm5hdi1pdGVtIC5uYXYtbGluayB7XHJcbiAgICBjb2xvcjogI2YwZjBmMDtcclxuICAgIFxyXG59XHJcbi5uYXZiYXIubmF2YmFyLWxpZ2h0IC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWxpbms6aG92ZXIge1xyXG4gICAgY29sb3I6ICMwMDA7ICBcclxufVxyXG5saS5uYXYtaXRlbSB7XHJcbiAgICBwYWRkaW5nOiAwcHggMTBweCAwcHggMTBweDtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4ubmF2YmFyIC5kcm9wZG93bi1tZW51IGEge1xyXG4gICAgZm9udC1zaXplOiAwLjkzNzVyZW07XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgcGFkZGluZzogNXB4IDAgNXB4IDZweDtcclxuICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZjtcclxufVxyXG4uZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XHJcbiAgICBtYXJnaW4tbGVmdDogN3B4O1xyXG59XHJcblxyXG5saS5uYXYtaXRlbTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjdhNzA3O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyICFpbXBvcnRhbnQ7XHJcbn1cclxuLm5hdmJhci5uYXZiYXItbGlnaHQgLm5hdmJhci10b2dnbGVyIHtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgbWFyZ2luOiA1cHggMHB4IDVweCAzMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMDtcclxufVxyXG5cclxuLmRyb3Bkb3duLW1lbnUgLmRyb3Bkb3duLWl0ZW06bGFzdC1jaGlsZCB7XHJcbiAgICBib3JkZXItYm90dG9tOiBub25lICFpbXBvcnRhbnQ7XHJcbn1cclxuLmhlYWQtaW5mbyB1bHtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbn1cclxuYTpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuLndlbGNvbWUtbmFtZXtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG59XHJcblxyXG4gICAgICAgIC8qIG1lZGlhIHF1ZXJ5ICovXHJcblxyXG5AbWVkaWEobWF4LXdpZHRoOiAxMDI0cHgpe1xyXG4gICAgLmdvdnQtbG9nbyB7XHJcbiAgICAgICAgd2lkdGg6IDUwcHg7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIH1cclxuICAgIC5zYm0tbG9nb3tcclxuICAgICAgICB3aWR0aDogODBweDtcclxuICAgICAgICBtYXJnaW4tdG9wOiA2cHg7XHJcbiAgICB9XHJcbiAgICAuaGVhZGluZy10aXRsZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgfVxyXG4gICAgaW1nLmNtLWxvZ28ge1xyXG4gICAgICAgIHdpZHRoOiA3NXB4O1xyXG4gICAgfVxyXG4gICAgYS5lbmdsaXNoIHtcclxuICAgICAgICBwYWRkaW5nOiAwIDRweCAwIDNweDtcclxuICAgIH1cclxuICAgIGxpLm5hdi1pdGVtIHtcclxuICAgICAgICBwYWRkaW5nOiAwIDAgMCAycHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG4gICAgLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAzcHg7XHJcbiAgICB9XHJcbiAgICAuc2V0dGluZy1tZW51IHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTIwNyU7XHJcbiAgICB9XHJcbiAgICAucm91bmRfaWNvbiBpIHtcclxuICAgICAgICB3aWR0aDogNDVweDtcclxuICAgICAgICBoZWlnaHQ6IDQ1cHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDlweCAwcHggMHB4IDBweDtcclxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjRweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmxvZ28tZGVzaWduIHtcclxuICAgICAgICBwYWRkaW5nOiAwIDE1cHggMCAxNHB4O1xyXG4gICAgfVxyXG4gICAgLnJvdW5kX2ljb24gPiBzcGFuIHtcclxuICAgICAgICBsZWZ0OiA4cHggIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5yb3VuZC1pY29uLWxvZ291dCA+IHNwYW4ge1xyXG4gICAgICAgIGxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5yaWdodC1zZWMge1xyXG4gICAgICAgIHBhZGRpbmc6IDQwcHggMCAwIDA7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogOTkxcHgpe1xyXG4gICAgLnNldHRpbmctbWVudSB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC0yMzQlO1xyXG4gICAgfVxyXG4gICAgYnV0dG9uLm5hdmJhci10b2dnbGVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNDBweDtcclxuICAgIH1cclxuICAgIC5sb2dvLWRlc2lnbiB7XHJcbiAgICAgICAgcGFkZGluZzogMCAxMnB4IDAgMTRweDtcclxuICAgIH1cclxuICAgIC5oZWFkaW5nLXRpdGxlIHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAuZHJvcGRvd24tbWVudS5hcnJvdy5zaG93IHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xyXG4gICAgfVxyXG4gICAgLnRyaWFuZ2xlLXVwIHtcclxuICAgICAgICBib3JkZXItYm90dG9tOiA4cHggc29saWQgI2YwZjBmMDtcclxuICAgICAgICBtYXJnaW4tdG9wOiAtOHB4O1xyXG4gICAgfVxyXG4gICAgLm5hdmJhciAuZHJvcGRvd24tbWVudSBhIHtcclxuICAgICAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgICAgIGNvbG9yOiAjMWY0YTdjICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxZjRhN2M7XHJcbiAgICB9XHJcbiAgICAubmF2YmFyLW5hdiAuZHJvcGRvd24tbWVudSB7XHJcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50O1xyXG4gICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgfVxyXG4gICAgbGkubmF2LWl0ZW06aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICNmN2E3MDc7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiBcclxuICAgICBhLmVuZ2xpc2gsIGEubGFuZ3VhZ2UtbGluaywgYS5sb2dpbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgIH1cclxuICAgICAubmF2YmFyLm5hdmJhci1saWdodCAubmF2YmFyLXRvZ2dsZXItaWNvbiB7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIGhlaWdodDogMjNweDtcclxuICAgICAgICB3aWR0aDogMjJweDtcclxuICAgIH1cclxuICAubmF2LWl0ZW0uZHJvcGRvd24uc2hvdyAuZHJvcGRvd24tbWVudSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoNnB4LCAxcHgsIDBweCk7XHJcbiAgICB9XHJcbiAgLm5hdmJhci1uYXYge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNDZweDtcclxuICB9XHJcbiAgICAudG9wLW1lbnUge1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICB9XHJcbiAgICAubmF2YmFyLXRvZ2dsZXIge1xyXG4gICAgICAgIHBhZGRpbmc6IDAgNXB4IDAgNXB4O1xyXG4gICAgfVxyXG59IFxyXG4gICAgLyogQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTFweCl7XHJcbiAgICAuc2xpZGVyLWltZyB7XHJcbiAgICAgICAgcGFkZGluZzogMCAxNXB4IDM2cHggMDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAucmVhZC1tb3JlLWJ0bntcclxuICAgICAgICBwYWRkaW5nOiA0cHg7XHJcbiAgICB9XHJcbiAgICAucXVpY2stcm5kIHtcclxuICAgICAgICBtYXJnaW46IDUlIDAgNyUgNSU7XHJcbiAgICB9XHJcbiAgICAubm90aWZpY2F0aW9uLWJsb2NrLWxzdHtcclxuICAgICAgICBoZWlnaHQ6IDQyNHB4O1xyXG4gICAgfVxyXG4gICAgLnNvY2lhbHBubCB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDg4cHg7XHJcbiAgICB9XHJcbiAgXHJcbn0gKi9cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6IDc2OHB4KXtcclxuICAgIC5sYW5nLWRldGFpbHMge1xyXG4gICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDE1cHg7XHJcbiAgICB9XHJcbiAgICAuaGVhZGluZy10aXRsZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyOHB4O1xyXG4gICAgfVxyXG4gICAgLmhlYWRpbmctbmFtZSBoMiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyOHB4O1xyXG4gICAgfVxyXG4gICAgLmxvZ28tZGVzaWdue1xyXG4gICAgICAgIHBhZGRpbmc6IDAgN3B4IDAgNXB4O1xyXG4gICAgfVxyXG4gICAgLnJvdW5kX2ljb24gaSB7XHJcbiAgICAgICAgd2lkdGg6IDM4cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAzOHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICBwYWRkaW5nOiA3cHggMHB4IDBweCAwcHg7XHJcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICBmb250LXNpemU6IDIwcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5sb2dnZWQtdXNlciB7XHJcbiAgICAgICAgY29sb3I6ICMxZjRhN2M7XHJcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgfVxyXG4gICAgLndlbGNvbWUtdXNlciB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogOXB4O1xyXG4gICAgfVxyXG4gICAgcCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgfVxyXG4gICAgYS5lbmdsaXNoIHtcclxuICAgICAgICBwYWRkaW5nOiAwIDVweCAwIDJweDtcclxuICAgIH1cclxuICAgIGEuZW5nbGlzaCwgYS5sYW5ndWFnZS1saW5rLCBhLmxvZ2luIHtcclxuICAgICAgICBmb250LXNpemU6IDhweDtcclxuICAgIH1cclxuICAgIC5zZXR0aW5nLWljb24tbGlua3tcclxuICAgICAgICBwYWRkaW5nOiAwIDNweCAwIDBweDtcclxuICAgIH1cclxuICAgIC5zZXR0aW5nLW1lbnV7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC0xMjBweDtcclxuICAgIH1cclxuICAgIC5yb3VuZF9pY29uID4gc3BhbiB7XHJcbiAgICAgICAgbGVmdDogMXB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuaWNvbi10ZXh0e1xyXG4gICAgICAgIGJvdHRvbTogLTFweDtcclxuICAgIH1cclxuICAgIC5pY29ucy10YWItdmlldyB7XHJcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7IFxyXG4gICAgfVxyXG4gICAgLmNtX25hbWUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIH1cclxuICAgIC5jbV9kZXNpZ25hdGlvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiA4cHg7XHJcbiAgICAgICAgY29sb3I6IGJsYWNrO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICB9XHJcbiAgICBpbWcuY20tbG9nbyB7XHJcbiAgICAgICAgd2lkdGg6IDczcHg7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKiBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpe1xyXG4gICAgbWFycXVlZSB7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGluaXRpYWw7XHJcbiAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXAgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgXHJcbn0gKi9cclxuXHJcblxyXG4vKiBAbWVkaWEobWF4LXdpZHRoOiA3NjdweCl7XHJcbiAgICAuZ292LWxvZ28tc2VjdGlvbntcclxuICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgfVxyXG4gICAgLmdvdi1sb2dvLXNlY3Rpb24gLnBhZGRpbmctbGVmdC16ZXJvLCAuZ292LWxvZ28tc2VjdGlvbiAucGFkZGluZy1yaWdodC16ZXJve1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICB9XHJcbiAgICAubGVmdC1sb2dvLWJiYnB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIC5yaWdodC1sb2dvLWJiYnAge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICB9XHJcbiAgICAubmF2YmFyLXRvZ2dsZXIgaS5mYS5mYS1iYXJzOmJlZm9yZXtcclxuICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB9XHJcbiAgICAucmlnaHQtbG9nby1iYmJwMSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMjFweDtcclxuICAgIH1cclxuICAgIC5oZWFkLWluZm8tbGVmdHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMHB4O1xyXG4gICAgfVxyXG4gICAgLmluZm9jdXMtZWFjaC1ibG9jay1kaXN0IHtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbn0gKi9cclxuXHJcbiBAbWVkaWEobWF4LXdpZHRoOiA2MDhweCl7XHJcbiAgICAubGVmdC1jb250YWluZXJ7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgICAgd2lkdGg6IDQ0JTtcclxuICAgIH1cclxuICAgIC5sYW5nLXdpZHRoLXRhYi12aWV3IHsgXHJcbiAgICAgICAgd2lkdGg6IDI1JTtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLnRvcC1tZW51IHsgd2lkdGg6IDc1JSB9XHJcbiAgICAuaGVhZC1pbmZve1xyXG4gICAgICAgIHdpZHRoOiA3OSU7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbiAgICAuaGVhZGluZy10aXRsZXtcclxuICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgIH1cclxuICAgIC5oZWFkaW5nLW5hbWUgaDJ7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5yaWdodC1sb2dvIHsgd2lkdGg6IDU2JTsgfVxyXG4gICAgcCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgfVxyXG4gICAgLnRyaWFuZ2xlLXVwIHtcclxuICAgICAgICBib3JkZXItYm90dG9tOiA4cHggc29saWQgI2ZlZmNmMTtcclxuICAgIH1cclxuICAgIC5sb2dnZWQtdXNlciB7XHJcbiAgICAgICAgY29sb3I6ICMxZjRhN2M7XHJcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICB9ICBcclxuICAgIC5pY29ucy10YWItdmlldyB7XHJcbiAgICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgICBtYXJnaW46IC03M3B4IDBweCAwIDQwMHB4O1xyXG4gICAgfVxyXG4gICAgLnJvdW5kX2ljb24gaSB7XHJcbiAgICAgICAgd2lkdGg6IDMycHg7XHJcbiAgICAgICAgaGVpZ2h0OiAzMnB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICBwYWRkaW5nOiA3cHggMHB4IDBweCAwcHg7XHJcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICBmb250LXNpemU6IDE1cHggIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5yaWdodC1sb2dvcyB7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLnJpZ2h0LXNlY3tcclxuICAgICAgICBwYWRkaW5nLXRvcDogNjBweDtcclxuICAgICAgICB3aWR0aDogNTAlO1xyXG4gICAgICAgIGxlZnQ6IDYwcHg7XHJcbiAgICB9XHJcbiAgICAucmlnaHQtY20taW1ne1xyXG4gICAgICAgIHdpZHRoOiA1MCU7XHJcbiAgICB9XHJcbiAgICAuaGVhZGluZy1uYW1le1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMjVweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IC0xNXB4O1xyXG4gICAgfVxyXG4gICAgaW1nLmNtLWxvZ28ge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDI2cHg7XHJcbiAgICB9XHJcblxyXG59XHJcbi8qIEBtZWRpYShtYXgtd2lkdGg6IDU3NXB4KXtcclxuICAgIC5nb3YtbG9nby1zZWN0aW9uID4gZGl2e1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmdvdi1sb2dvLXNlY3Rpb24gLnBhZGRpbmctcmlnaHQtemVyb3tcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLmdvdi1sb2dvLXNlY3Rpb24gLnBhZGRpbmctbGVmdC16ZXJve1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgfVxyXG4gICAgLnJpZ2h0LWxvZ28tYmJicCwucmlnaHQtbG9nby1iYmJwMXtcclxuICAgICAgICBtYXgtd2lkdGg6IDYwcHg7XHJcbiAgICB9XHJcbiAgICAuZ292LWxvZ28tc2VjdGlvbntcclxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICAgIH1cclxufSAqL1xyXG5AbWVkaWEobWF4LXdpZHRoOiA1NjBweCl7XHJcbiAgICAubGVmdC1jb250YWluZXJ7XHJcbiAgICAgICAgd2lkdGg6IDQ3JTtcclxuICAgIH1cclxuICAgIC5pY29ucy10YWItdmlldyB7XHJcbiAgICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgICBtYXJnaW46IC03M3B4IDBweCAwIDM1N3B4O1xyXG4gICAgfVxyXG4gICAgLnJpZ2h0LWxvZ28ge1xyXG4gICAgICAgIHdpZHRoOiA1MyU7XHJcbiAgICB9XHJcbiAgICAuaGVhZGluZy10aXRsZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgfVxyXG4gICAgLnJpZ2h0LXNlY3tcclxuICAgICAgICBsZWZ0OiA1N3B4O1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEobWF4LXdpZHRoOiA0ODBweCl7XHJcbiAgICAubGFuZy1kZXRhaWxzIHtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTIwcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIGEuZW5nbGlzaCB7XHJcbiAgICAgICAgcGFkZGluZzogMCAycHggMCA1cHggIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5oZWFkaW5nLXRpdGxle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIH1cclxuICAgIC5oZWFkaW5nLW5hbWUgaDIge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogOHB4O1xyXG4gICAgfVxyXG4gICAgLnJpZ2h0LXNlYyB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDUycHg7XHJcbiAgICB9XHJcbiAgICBwe1xyXG4gICAgICAgIGZvbnQtc2l6ZTogOXB4O1xyXG4gICAgfVxyXG4gXHJcbiAgICAuaW5mby1tb2JpbGUtdmlldyB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbiAgICB9XHJcbiAgICAuaWNvbnMtdGFiLXZpZXcge1xyXG4gICAgICAgIHdpZHRoOiA1MCU7XHJcbiAgICAgICAgbWFyZ2luOiAtNzFweCAwcHggMCAzMTRweDtcclxuICAgIH1cclxuICAgIC53ZWxjb21lLW1zZyB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgfVxyXG4gICAgLmxvZ2dlZC11c2VyIHtcclxuICAgICAgICBmb250LXNpemU6IDlweDtcclxuICAgICAgICB3aWR0aDogNjVweDtcclxuICAgIH1cclxuICAgIC5jbV9uYW1le1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIH1cclxuICAgIC5jbV9kZXNpZ25hdGlvbntcclxuICAgICAgICBmb250LXNpemU6IDdweDtcclxuICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIH1cclxuICAgIC5yaWdodC1zZWMge1xyXG4gICAgICAgIGxlZnQ6IDIzcHg7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDYzcHg7XHJcbiAgICB9XHJcbiBcclxufVxyXG5AbWVkaWEobWF4LXdpZHRoOiAzNjBweCl7XHJcbiAgICAuaGVhZGluZy1uYW1lIHtcclxuICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgfVxyXG4gICAgLmhlYWRpbmctdGl0bGUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIH1cclxuICAgIC5oZWFkaW5nLW5hbWUgaDIge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogN3B4O1xyXG4gICAgfVxyXG4gICAgLnJpZ2h0LXNlYyB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDcwcHg7XHJcbiAgICAgICAgbGVmdDogOXB4O1xyXG4gICAgfVxyXG5cclxufVxyXG5saS5uYXYtaXRlbS5kcm9wZG93bi5hY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcclxufVxyXG5saS5uYXYtaXRlbS5kcm9wZG93bi5hY3RpdmUgYTpob3ZlciB7XHJcbiAgICBjb2xvcjogI0ZGRiAhaW1wb3J0YW50O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/fragments/header/header.component.html":
/*!********************************************************!*\
  !*** ./src/app/fragments/header/header.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- header login section start -->\r\n<div class=\"container-fluid background\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-4 lang-width-tab-view\">\r\n                <div class=\"region language-block\">\r\n                    <div id=\"block-common-utils-mygov-login-block\" class=\"block block-common-utils\">\r\n                        <div class=\"content setting-option\">\r\n                            <!-- <ul class=\"language-lists\">\r\n                                <li class=\"lang-options\"><a class=\"english\">ଓଡ଼ିଆ</a></li>\r\n                                <li class=\"lang-options\"><a class=\"english\">English</a></li>\r\n                            </ul> -->\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-8 top-menu\">\r\n                <div class=\"region region-header\">\r\n                    <div id=\"block-common-utils-mygov-login-block\" class=\"block block-common-utils\">\r\n                        <div class=\"content setting-option\">\r\n                            <ul class=\"lang-details\">\r\n                                <li>\r\n                                    <a class=\"english\" (click)=\"setFontSize(20)\" title=\"Increase font size\" href=\"javascript:void(0);\"\r\n                                        role=\"link\">A\r\n                                        <sup>+</sup>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a class=\"english\" (click)=\"setFontSize(14)\" title=\"Normal font size\" href=\"javascript:void(0);\"\r\n                                        role=\"link\">A</a>\r\n                                </li>\r\n                                <li>\r\n                                    <a class=\"english\" (click)=\"setFontSize(12)\" title=\"Decrease font size\" href=\"javascript:void(0);\"\r\n                                        role=\"link\">A\r\n                                        <sup>-</sup>\r\n                                    </a>\r\n                                </li>\r\n                              \r\n                                <!-- <li *ngIf=\"!!app.checkLoggedIn()\">\r\n                                        <a class=\"english\">Welcome &nbsp;<b class=\"logged-user\">{{app.userName}}</b></a>\r\n                                    </li> -->\r\n                            </ul>\r\n\r\n                            <!-- <ul class=\"setting-menu-icon\">\r\n                                    <li class=\"nav-item dropdown setting-icon\" *ngIf=\"!!app.checkLoggedIn()\">\r\n                                        <a class=\"dropdown-toggle setting-icon-link nav-link\" data-toggle=\"dropdown\" href=\"#\">\r\n                                            <i class=\"fa\">&#xf013;</i>\r\n                                        </a>\r\n                                        <div class=\"dropdown-menu setting-menu\">\r\n                                            <div class=\"triangle-up-setting\"></div>\r\n                                            <a class=\"login\" title=\"Login\" *ngIf=\"!!app.checkLoggedIn()\" (click)=\"logout()\">\r\n                                                <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>Logout</a>\r\n                                            <a class=\"login\" title=\"Login\" *ngIf=\"!!app.checkLoggedIn()\" routerLink=\"change-password\">\r\n                                                <i class=\"fa fa-key\" aria-hidden=\"true\"></i>Change Password</a>\r\n                                        </div>\r\n                                    </li>\r\n                                </ul> -->\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- end login section -->\r\n\r\n<!-- logo section start -->\r\n<div class=\"container-fluid logo-background\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-8 left-container\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-3 head-info\">\r\n                    <ul>\r\n                        <li><a href=\"\" target=\"_blank\">\r\n                                <img title=\"\" class=\"govt-logo\" src=\"./assets/images/logos/logo.png\" alt=\"gov-logo\">\r\n\r\n                            </a></li>\r\n                        <li> <a href=\"\" target=\"_blank\">\r\n                                <img title=\"\" class=\"sbm-logo\" id=\"2ndimg\" src=\"./assets/images/logos/sbm1.png\" alt=\"sbm-logo\">\r\n                            </a></li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"col-md-7 head-info heading-name\">\r\n                    <h1 class=\"heading-title\"> Swachha Odisha Sustha Odisha</h1>\r\n                    <h2>Swachh Bharat Mission (Gramin)</h2>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-4 right-logo\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-8 right-sec\">\r\n                    <h5 class=\"cm_name\"> Shri Naveen Patnaik </h5>\r\n                    <h6 class=\"cm_designation\"> Hon'ble Chief Minister, Odisha </h6>\r\n                </div>\r\n                <div class=\"col-md-4 right-cm-img\">\r\n                    <img title=\"\" class=\"cm-logo\" src=\"./assets/images/logos/cm-odisha.png\" alt=\"sbm\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- end logo section -->\r\n\r\n<!-- menu section start -->\r\n<header id=\"header\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"row\">\r\n            <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\r\n                <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\"\r\n                    aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n                    <span class=\"navbar-toggler-icon\"></span>\r\n                </button>\r\n                <div class=\"collapse navbar-collapse\" id=\"navbarNavDropdown\">\r\n                    <ul class=\"navbar-nav\">\r\n                        <li class=\"nav-item dropdown\" [ngClass]=\"{'active': router.url=='/'}\">\r\n                            <a class=\"nav-link\" mdbRippleRadius routerLink=\"\">Home</a>\r\n                        </li>\r\n                        <li class=\"nav-item dropdown\" [ngClass]=\"{'active': router.url=='/about-us'}\">\r\n                            <a class=\"nav-link\" mdbRippleRadius routerLink=\"about-us\">About Us</a>\r\n                        </li>\r\n                        <li class=\"nav-item dropdown\" [ngClass]=\"{'active': router.url=='/documents'}\">\r\n                            <a class=\"nav-link\" mdbRippleRadius routerLink=\"documents\">Documents</a>\r\n                        </li>\r\n                        <li class=\"nav-item dropdown\" [ngClass]=\"{'active': router.url=='/report'}\"  *ngIf=\"app.checkUserAuthorization(['report_HAVING_read'])\">\r\n                            <a class=\"nav-link\" mdbRippleRadius routerLink=\"report\">Report</a>\r\n                        </li>\r\n                        <li class=\"nav-item dropdown\" *ngIf=\"app.checkUserAuthorization(['dashboard_HAVING_write'])\" [ngClass]=\"{'active': router.url=='/dashboard/index-view'}\">\r\n                            <!-- *ngIf=\"app.checkUserAuthorization()\" -->\r\n                            <a class=\"nav-link\" mdbRippleRadius routerLink=\"dashboard/index-view\">Dashboard</a>\r\n                        </li>                         \r\n                        <li class=\"nav-item dropdown\" *ngIf=\"app.checkUserAuthorization(['usermgmt_HAVING_write'])\" [ngClass]=\"{'active': router.url=='/user-management'}\">\r\n                            <!-- *ngIf=\"app.checkUserAuthorization()\" -->\r\n                            <a class=\"nav-link\" mdbRippleRadius routerLink=\"user-management\">User Management</a>\r\n                        </li>\r\n                        <li class=\"nav-item dropdown\" [ngClass]=\"{'active': router.url=='/login'}\" *ngIf=\"!app.checkLoggedIn()\">\r\n                                <a class=\"nav-link\" mdbRippleRadius routerLink=\"login\">Login</a>\r\n                        </li>\r\n                        <li class=\"nav-item dropdown\" *ngIf=\"!!app.checkLoggedIn()\">\r\n                            <a class=\"nav-link\" mdbRippleRadius (click)=\"logout()\">Logout</a>\r\n                    </li>                  \r\n                    </ul>\r\n                    <ul class=\"navbar-nav ml-auto welcomeuser\">\r\n                        <li  class=\"nav-item dropdown \" [hidden]=\"!app.checkLoggedIn()\">\r\n                            <span class=\"nav-link welcome-name\"> Welcome {{app.getUserDetails().user_name}}</span>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </nav>\r\n        </div>\r\n    </div>\r\n</header>\r\n<!-- /.navbar -->\r\n\r\n<!-- end menu section -->"

/***/ }),

/***/ "./src/app/fragments/header/header.component.ts":
/*!******************************************************!*\
  !*** ./src/app/fragments/header/header.component.ts ***!
  \******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");




var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, appService) {
        this.appService = appService;
        this.homeLangDetails = [];
        this.homeLang = [];
        this.multiLang = [];
        this.odia = 'ଓଡ଼ିଆ';
        this.english = 'English';
        this.userManagementLink = { data: { expectedRole: 'NATIONAL' } };
        this.router = router;
        this.app = appService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.setFontSize = function (fontSize) {
        $("#bodyMain *").css("font-size", fontSize + "px");
    };
    HeaderComponent.prototype.switchToLanguage = function (index) {
        // if(index == 0){
        //   this.staticService.selectedLang = 'odia';
        // }
        // else {
        //   this.staticService.selectedLang = 'english';
        // }
        // // if(this.staticService.contentData.viewName == 'Home'){
        //   this.staticService.reinitializeData(this.staticService.contentData);
        // // }
        // // else {
        //   this.staticPageService.reinitializeData(this.staticPageService.contentData);
        // // }
    };
    HeaderComponent.prototype.logout = function () {
        this.appService.logout();
        this.app.userName = "";
    };
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/fragments/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/fragments/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/guard/auth.guard.ts":
/*!*************************************!*\
  !*** ./src/app/guard/auth.guard.ts ***!
  \*************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(app, router) {
        this.app = app;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.app.checkLoggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/guard/loggedin.guard.ts":
/*!*****************************************!*\
  !*** ./src/app/guard/loggedin.guard.ts ***!
  \*****************************************/
/*! exports provided: LoggedinGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoggedinGuard", function() { return LoggedinGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");





var LoggedinGuard = /** @class */ (function () {
    function LoggedinGuard(app, router, _location) {
        this.app = app;
        this.router = router;
        this._location = _location;
    }
    LoggedinGuard.prototype.canActivate = function (next, state) {
        if (!this.app.checkLoggedIn()) {
            return true;
        }
        else {
            this._location.back();
        }
    };
    LoggedinGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"]])
    ], LoggedinGuard);
    return LoggedinGuard;
}());



/***/ }),

/***/ "./src/app/guard/role-guard.guard.ts":
/*!*******************************************!*\
  !*** ./src/app/guard/role-guard.guard.ts ***!
  \*******************************************/
/*! exports provided: RoleGuardGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleGuardGuard", function() { return RoleGuardGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-cookies */ "./node_modules/ng2-cookies/index.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_cookies__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");





var RoleGuardGuard = /** @class */ (function () {
    function RoleGuardGuard(app, router) {
        this.app = app;
        this.router = router;
    }
    RoleGuardGuard.prototype.canActivate = function (next, state) {
        var expectedRoles = next.data.expectedRoles;
        if (this.app.checkLoggedIn()) {
            var token_1 = JSON.parse(ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].get('user_details'));
            var flag_1 = false;
            expectedRoles.forEach(function (expectedRole) {
                for (var i = 0; i < token_1.authorities.length; i++) {
                    if (token_1.authorities[i] == expectedRole) {
                        flag_1 = true;
                    }
                }
            });
            if (!flag_1)
                this.router.navigate(['/exception']);
            return flag_1;
        }
        else {
            this.router.navigate(['/exception']);
            return false;
        }
    };
    RoleGuardGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], RoleGuardGuard);
    return RoleGuardGuard;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* Phase-II css */\r\n\r\n#block-views-featured-task-block-5 {\r\n    position: relative;\r\n    margin-bottom: 0;\r\n    padding: 0;\r\n}\r\n\r\n#block-common-utils-mygov-statistics-block, #block-views-featured-task-block-5 {\r\n    background: #fff;\r\n    border-radius: 3px;\r\n    box-shadow: 0 1px 2px #dbdbdb;\r\n \r\n}\r\n\r\n#block-views-featured-task-block-5:before {\r\n    background: url(//www.mygov.in/sites/all/themes/mygov/front_assets/images/ico-infocus.png) no-repeat;\r\n}\r\n\r\nimg.infocus {\r\n    box-shadow: -1px 0px 5px 5px #ddd;\r\n}\r\n\r\n.carousel-inner {\r\n    position: relative;\r\n    width: 100%;\r\n    overflow: hidden;\r\n}\r\n\r\n.carousel-inner img {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.social-sec{\r\n    border-bottom: 1px solid #d4d4d4;\r\n}\r\n\r\n.socialpnl{\r\n    padding: 8px 12px;\r\n    font-size: 12px;\r\n    margin-left: 173px;\r\n    height: 34px;\r\n    margin-top: 5px;\r\n    background-color: #42c8fb;\r\n    color: white;\r\n}\r\n\r\n#tw-button:hover{\r\n    background: #42c8fb;\r\n    border-color: #42c8fb;\r\n    color: #fff; \r\n}\r\n\r\n#fb-button:hover, #fb-button.active {\r\n    background: #4a78b3;\r\n    border-color: #4a78b3;\r\n    color: #fff;\r\n}\r\n\r\n.quick-rnd{\r\n    width: 200px;\r\n    height: 200px;\r\n    padding: 0;\r\n    margin: 10% auto 7%;\r\n    display: block;\r\n}\r\n\r\n.rnd{\r\n    width: 200px;\r\n    height: 200px;\r\n    border-radius: 50%;\r\n    border: 7px solid white;\r\n    /* opacity: 0.5;\r\n    transition: 2s;\r\n    filter: alpha(opacity=50); */\r\n}\r\n\r\n.rnd:hover{\r\n    opacity: 1.0;\r\n    transition: 2s;\r\n    filter: alpha(opacity=100);\r\n}\r\n\r\n.quick-start-in {\r\n    width: 100%;\r\n    padding: 0 0 10% 0;\r\n    text-align: center;\r\n    border: 0px solid #e7b345 !important;\r\n}\r\n\r\n.count {\r\n    color: white;\r\n    font-size: 40px;\r\n    text-align: center;\r\n    line-height: 24px;\r\n    font-family: 'anton';\r\n    letter-spacing: 5px;\r\n}\r\n\r\n.sub-title {\r\n    color: #212529;\r\n    font-size: 25px;\r\n    text-align: center;\r\n    line-height: 30px;\r\n    font-family: 'anton';\r\n}\r\n\r\n.aboutus-img{\r\n    width: 350px;\r\n    padding: 5px 20px 0 0;\r\n}\r\n\r\n.twitter{\r\n    padding-top: 6px;\r\n    text-align: right;\r\n}\r\n\r\n.twitter-view{\r\n    color: #4a78b3 !important;\r\n    font-size: 11px;\r\n    float: right;\r\n}\r\n\r\n.quick-stats{\r\n    margin-top: 50px;\r\n    background: #88b4d6;\r\n}\r\n\r\n.about-head {\r\n    padding: 10px 0 0 0;\r\n}\r\n\r\n.cm-twitter{\r\n    border-bottom: 1px solid #d4d4d4;\r\n}\r\n\r\n.twitter-title{\r\n    font-size: 21px;\r\n    font-weight: 400;\r\n    color: #1f497b;\r\n    padding-left: 20px;\r\n    padding-top: 5px;\r\n}\r\n\r\n.twitterby{\r\n    font-size: 12px;\r\n    font-weight: 400;\r\n    padding-left: 5px;\r\n}\r\n\r\n#block-common-utils-mygov-statistics-block:before, #block-views-featured-task-block-5:before {\r\n    width: 88px;\r\n    height: 82px;\r\n    position: absolute;\r\n    overflow: hidden;\r\n    left: 50%;\r\n    background: url(//www.mygov.in/sites/all/themes/mygov/front_assets/images/ico-stat.png) no-repeat;\r\n    background-size: 100%;\r\n    content: '';\r\n    margin: -53px 0 0 -51px;\r\n}\r\n\r\n#block-views-featured-task-block-5 > h2 {\r\n    color: #383838;\r\n    font-size: 22px;\r\n    text-align: center;\r\n    font-family: Lato,sans-serif!important;\r\n    font-weight: 300;\r\n    text-transform: uppercase;\r\n    padding: 40px 0 12px;\r\n    border-bottom: 1px solid #ddd;\r\n    box-shadow: 0 0px 10px 0px #ddd;\r\n}\r\n\r\n.view-id-featured_task .views-row {\r\n    border: 1px solid #e0e0e0;\r\n    float: left;\r\n    margin-left: 1.9%;\r\n    width: 22.5%;\r\n    position: relative;\r\n    overflow: hidden;\r\n    margin-bottom: 25px;\r\n    min-height: 366px;\r\n}\r\n\r\n.view-id-featured_task .views-row-gallery {\r\n    border: 1px solid #e0e0e0;\r\n    float: left;\r\n    margin-left: 3.9%;\r\n    width: 43%;\r\n    position: relative;\r\n    overflow: hidden;\r\n    margin-bottom: 25px;\r\n    min-height: 366px;\r\n}\r\n\r\n.talk_featured .talk_image, .discuss_featured .discuss_image, .do_featured .do_image, .group_featured .group_image, .blog_featured .blog_image {\r\n    border-radius: 3px 3px 0 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.view-id-featured_task .group_image, .view-id-featured_task .talk_image, .view-id-featured_task .do_image, .view-id-featured_task .discuss_image, .view-id-featured_task .blog_image {\r\n    padding: 5px;\r\n}\r\n\r\n.view-id-featured_task .group_title, .view-id-featured_task .discuss_title, .view-id-featured_task .do_title, .view-id-featured_task .task_title, .view-id-featured_task .poll_title, .view-id-featured_task .talk_title, .view-id-featured_task .blog_title {\r\n    padding: 15px 15px 10px;\r\n}\r\n\r\n.view-id-featured_task .blog_title a {\r\n    color: #000;\r\n    font-size: 106%;\r\n    font-weight: 600;\r\n}\r\n\r\n.view-id-featured_task .group_desc, .view-id-featured_task .discuss_desc, .view-id-featured_task .do_descr, .view-id-featured_task .poll_des, .view-id-featured_task .talk_desc, .view-id-featured_task .blog_desc {\r\n    padding: 0 15px 15px;\r\n}\r\n\r\nview-id-featured_task .views-row {\r\n    border: 1px solid #e0e0e0;\r\n    float: left;\r\n    margin-left: 1.9%;\r\n    width: 22.5%;\r\n    position: relative;\r\n    overflow: hidden;\r\n    margin-bottom: 25px;\r\n    min-height: 366px;\r\n}\r\n\r\n.gallery-view .views-row {\r\nborder: 1px solid #e0e0e0;\r\n    float: left;\r\n    margin-left: 1.9%;\r\n    width: 22.5%;\r\n    position: relative;\r\n    overflow: hidden;\r\n    margin-bottom: 25px;\r\n}\r\n\r\n.blog_featured:hover, .do_featured:hover {\r\n    background: #ffe9c2;\r\n    box-shadow: 0 0 3px 2px #d4d3d3;\r\n}\r\n\r\n.view-id-featured_task .views-row:hover .blog_featured {\r\n    background: #9e9e9e45;\r\n    min-height: 366px;\r\n}\r\n\r\n.view-id-featured_task .views-row:hover {\r\n    box-shadow: 0 0 3px 2px #d4d3d3;\r\n}\r\n\r\n.view-id-featured_task .views-row:hover .do_featured {\r\n    background: #9e9e9e45;\r\n    min-height: 366px;\r\n}\r\n\r\n.view-id-featured_task .views-row .content_type.task {\r\n    background: url(//www.mygov.in/sites/all/themes/mygov/images/rounded_icons.png) no-repeat scroll center -249px / 33px auto #dc6800;\r\n}\r\n\r\n.view-id-featured_task .group_title a, .view-id-featured_task .discuss_title a, .view-id-featured_task .do_title a, .view-id-featured_task .task_title a, .view-id-featured_task .poll_title a {\r\n    color: #000;\r\n    font-weight: 600;\r\n}\r\n\r\n.gallery-section{\r\n    display: inline-flex;\r\n}\r\n\r\n.photo-gallery-block {\r\n    padding: 0 22px 0 8px;\r\n}\r\n\r\n.vodeo-gallery-block {\r\n    padding: 0 28px 0 0px;\r\n}\r\n\r\n.gallery_title {\r\n    padding: 20px;\r\n    color: #000;\r\n    font-weight: 600;\r\n}\r\n\r\n.blog-content {\r\n    padding: 0 0 3px 16px;\r\n}\r\n\r\n.social-panel {\r\n    margin-top: 50px;\r\n}\r\n\r\n.dist-block {\r\n    padding: 0 14px 0 23px;\r\n}\r\n\r\n.blog-border {\r\n    border: 1px solid #ddd;\r\n    height: 417px;\r\n}\r\n\r\n.blog-border:hover{\r\n    background: #ddd;\r\n}\r\n\r\n.gallery-images {\r\n    padding: 0 4px;\r\n}\r\n\r\n.padding-bottom-cls {\r\n    padding-bottom: 25px;\r\n}\r\n\r\n.slider-img {\r\n    padding: 0 15px 5px 0;\r\n    border-radius: 3px;\r\n}\r\n\r\n.next\r\n{\r\n    float: right;\r\n    font-size: 40px;\r\n    color: #333;\r\n    margin-top: -20%  \r\n}\r\n\r\n.prev {\r\n    float: left;\r\n    font-size: 40px;\r\n    color: #333;\r\n    margin-top: -20%  \r\n}\r\n\r\n.dist-read-more-btn{\r\n    float: right;\r\n    background: #ffffff00;\r\n    border: none;\r\n    box-shadow: none;\r\n    color: #000 !important;\r\n    padding: 6px;\r\n}\r\n\r\n.notification-block-lst\r\n{\r\n    height: 312px;\r\n    overflow: hidden;\r\n    border-bottom: 1px solid #d4d4d4;\r\n}\r\n\r\n.padding-zero {\r\n    padding: 0;\r\n}\r\n\r\n.dist-info-head {\r\n    color: #1f497b;\r\n    font-size: 18px;\r\n    font-weight: bold;\r\n}\r\n\r\n.notification-block li  {\r\n    display: list-item;\r\n    margin-left: 17px;\r\n}\r\n\r\n.dist-innovation-block{\r\n    margin: 14px 16px 0px 0px;\r\n    text-align: justify;\r\n    overflow: hidden;\r\n    position: relative;\r\n    height: 240px;\r\n}\r\n\r\n.read-more-arrow {\r\n    font-size: 24px;\r\n    margin-top: -6px;\r\n    margin-left: 6px;\r\n}\r\n\r\n.footer-wrapper #block-menu-menu-content-menu {\r\n    padding: 50px 31px;\r\n    box-sizing: border-box;\r\n    width: 1180px;\r\n    margin: 0 auto;\r\n    display: inline-block;\r\n}\r\n\r\n.footer-wrapper #block-menu-menu-content-menu .content {\r\n    padding-top: 12px;\r\n}\r\n\r\n.responsive-slider-blog {\r\n  margin: 45px 0 0 0;\r\n}\r\n\r\n.margin-top-footer-logo {\r\n    margin-top: 20px;\r\n}\r\n\r\n.footer-container div, div.com_like_wrap span.flag-abuse-comment, #block-locale-language ul li, #block-views-featured-task-block .txt_orange a, #block-views-featured-task-block-1 .txt_orange a, #block-menu-menu-content-menu ul.menu {\r\n    display: inline-block;\r\n}\r\n\r\n.footer-wrapper #block-menu-menu-content-menu ul li, .footer-wrapper #block-menu-menu-content-menu ul li.poll {\r\n    overflow: visible;\r\n}\r\n\r\n#block-menu-menu-content-menu ul li {\r\n    position: relative;\r\n    display: inline-block;\r\n    font-size: 108%;\r\n    height: auto;\r\n    list-style: outside none none;\r\n    opacity: 0.9;\r\n    overflow: hidden;\r\n    transition: all .2s ease-in-out 0s;\r\n    width: 102px;\r\n    margin: auto 42px auto auto;\r\n    padding: 0;\r\n    float: left;\r\n}\r\n\r\n#block-menu-menu-content-menu ul li a {\r\n    color: #fff;\r\n    display: block;\r\n    height: 18px;\r\n    line-height: normal;\r\n    margin-bottom: 10px;\r\n    overflow: hidden;\r\n    padding-bottom: 10px;\r\n    padding-top: 73px;\r\n    text-align: center;\r\n    font-size: 100%;\r\n}\r\n\r\n#block-menu-menu-content-menu ul li span {\r\n    display: block;\r\n    font-size: 93%;\r\n    font-weight: 400;\r\n    line-height: 16px;\r\n}\r\n\r\n#block-menu-menu-content-menu ul li.do a {\r\n    background: url(//www.mygov.in/sites/all/themes/mygov/images/rounded_icons.png) no-repeat scroll center -433px / 59px auto #dc6800;\r\n}\r\n\r\n.gallery{\r\n    width: 100%;\r\n    height: 50%;\r\n}\r\n\r\n.section-info {\r\n    text-align: center;\r\n}\r\n\r\n.notify-contain ul li a{\r\n    color: black;\r\n}\r\n\r\n.notify-contain ul li a  :hover{\r\n    color: red !important;\r\n}\r\n\r\n.notification-state {\r\n    height: 414px !important;\r\n}\r\n\r\n.height-new {\r\n    height: 450px;\r\n}\r\n\r\n.view-id-featured_task .views-row:hover {\r\n    background: #ddd;\r\n}\r\n\r\n/* new css for home */\r\n\r\n.infocus-image-size {\r\n    width: 235px;\r\n    height: 160px;\r\n    border-radius: 3px;\r\n}\r\n\r\n.initial-contents-of-innerpage {\r\n    display: initial;\r\n}\r\n\r\n.about-content {\r\n    height: 220px;\r\n    background-color: #f7a707;\r\n  \r\n}\r\n\r\n.cm-speech h2{\r\n    text-align: center;\r\n    font-size: 28px;\r\n    font-weight: bold;\r\n    padding-top: 20px;\r\n    color: white;\r\n}\r\n\r\n.cm-speech p{\r\n    font-size: 19px;\r\n    padding: 10px 90px 0 90px;\r\n    text-align: justify;\r\n}\r\n\r\n/* social-content */\r\n\r\n.social-box{\r\n    border: 1px solid #ddd;\r\n    overflow: hidden;\r\n    height: 380px;\r\n    margin-top: 15px;\r\n    margin-bottom: 15px;\r\n   }\r\n\r\n.social-title{\r\n    border-bottom: 1px solid #ddd;\r\n}\r\n\r\n.flip-box {\r\n    background-color: transparent;\r\n    width: 100%;\r\n    height: 100%;\r\n    -webkit-perspective: 1000px;\r\n            perspective: 1000px;\r\n  }\r\n\r\n.flip-box-inner {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\r\n    text-align: center;\r\n    transition: -webkit-transform 0.8s;\r\n    transition: transform 0.8s;\r\n    transition: transform 0.8s, -webkit-transform 0.8s;\r\n    -webkit-transform-style: preserve-3d;\r\n            transform-style: preserve-3d;\r\n  }\r\n\r\n.flip-box:hover .flip-box-inner {\r\n    -webkit-transform: rotateY(180deg);\r\n            transform: rotateY(180deg);\r\n  }\r\n\r\n.flip-box-front, .flip-box-back {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    -webkit-backface-visibility: hidden;\r\n            backface-visibility: hidden;\r\n  }\r\n\r\n.flip-box-front {\r\n    background-color: #6280a4;\r\n  }\r\n\r\n.flip-box-back {\r\n    background-image: -webkit-linear-gradient(top, #1f4a7c 70%, #4589d6 100%);\r\n    color: white;\r\n    -webkit-transform: rotateY(180deg);\r\n            transform: rotateY(180deg);\r\n  }\r\n\r\n.flip-box-back h2{\r\n    font-size: 20px;\r\n    font-weight: bold;\r\n    padding-top: 15px;\r\n    color: white;\r\n  }\r\n\r\n/* .flip-box-back p{\r\n    text-align: justify;\r\n    padding: 0 17px 0 17px;\r\n    letter-spacing: 0px;\r\n    line-height: 20px;\r\n    font-size: 16px;\r\n  } */\r\n\r\n.flip-para1{\r\n    padding: 0px 17px 13px 17px !important;\r\n  }\r\n\r\n.flip-para1 a{\r\n    color: #1f4a7c;\r\n    display: block;\r\n    background-color: white;\r\n    padding: 0 5px;\r\n    width: 75px;\r\n    height: 22px;\r\n  }\r\n\r\n.flip-para1 a:hover{\r\n    color: #fff;\r\n    display: block;\r\n    background-color: #f7a707;\r\n    padding: 0 5px;\r\n    width: 75px;\r\n    height: 22px;\r\n    text-decoration: none;\r\n    \r\n  }\r\n\r\n.flip-box-back p {\r\n    text-align: justify;\r\n    padding: 0px 17px 15px 17px;\r\n    letter-spacing: 0px;\r\n    line-height: 20px;\r\n    font-size: 13px;\r\n}\r\n\r\n.flip-border {\r\n    border: 1px solid;\r\n    margin: 10px;\r\n}\r\n\r\n.head-info-infocus {\r\n    width: 100%;\r\n    margin: 42px 0 10px -6px;\r\n    font-size: 23px;\r\n    color: #1f497b;\r\n    font-weight: bold;\r\n}\r\n\r\n.background-highlight {\r\n    background: #fff;\r\n}\r\n\r\n.infocus-each-block {\r\n    border: 1px solid #ddd;  \r\n    max-width: 100%;\r\n    margin-right: 5px;\r\n}\r\n\r\n.margin-top-infocus-block-2 {\r\n    margin-top: 20px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.display-inline-infocus {\r\n    display: inline-flex;\r\n    margin-top: 50px;\r\n    margin-bottom: 50px;\r\n}\r\n\r\n.infocus-block-title {\r\n    padding: 8px 0 0 18px;\r\n    font-size: 24px;\r\n    color: #1f497b;\r\n    font-weight: bold;\r\n}\r\n\r\n.social-heading{\r\n    border-bottom: 1px solid #ddd;\r\n}\r\n\r\n.infocus-block-initial-contents-block {\r\n    padding: 0 15px 0 12px;\r\n    margin-bottom: 0;\r\n    height: 100px;\r\n    overflow: hidden;\r\n    position: relative;\r\n    text-align: justify;\r\n}\r\n\r\n.block-with-text:before {\r\n    content: '...';\r\n    position: absolute;\r\n    right: 0;\r\n    bottom: 0;\r\n  }\r\n\r\n.block-with-text:after {\r\n    content: '';\r\n    position: absolute;\r\n    right: 0;\r\n    width: 1em;\r\n    height: 1em;\r\n    margin-top: 0.2em;\r\n  }\r\n\r\n.dist-block-read-more-btn {\r\n      margin-top: 78px;\r\n  }\r\n\r\n.read-more-btn {\r\n    float: right;\r\n    background: #ddd0;\r\n    color: #000 !important;\r\n    box-shadow: none;\r\n    padding: 6px;\r\n}\r\n\r\n.read-more-btn:hover {\r\n    background: #1f497b;\r\n    box-shadow: 0 0 3px 2px #d4d3d3;\r\n    color: #fff !important;\r\n}\r\n\r\n.dist-read-more-btn:hover {\r\n    background: #1f497b !important;\r\n    color: #fff !important;\r\n}\r\n\r\n.fa-angle-right{\r\n    font-size: 18px;\r\n    margin: -4px 0px 0 3px;\r\n}\r\n\r\n.notification-block {\r\n    padding-left: 8px;\r\n    margin-bottom: 0;\r\n}\r\n\r\n.image-border {\r\n    border: 1px solid #ddd;\r\n    box-shadow: 0px 5px 5px 3px #ddd;\r\n}\r\n\r\n.infocus-each-block-dist {\r\n    border: 1px solid #ddd;\r\n    padding: 8px;\r\n    max-width: 47.8%;\r\n    margin-right: 20px;\r\n}\r\n\r\n.infocus-each-block-dist:hover {\r\n    background: #ddd;\r\n    box-shadow: 0 0 3px 2px #d4d3d3;\r\n}\r\n\r\n.notice-anchr{\r\n    color: #1f4a7c;\r\n}\r\n\r\n.notice-anchr:hover {\r\n    text-decoration: underline;\r\n    \r\n}\r\n\r\n.sub-sites {\r\n    text-align: center;\r\n    position: relative;\r\n    padding: 10px 15px 0;\r\n}\r\n\r\n.sub-sites li {\r\n    padding: 0 10px;\r\n    border-left: 1px solid #6b6c6f;\r\n    display: inline-block;\r\n    margin-bottom: 10px;\r\n    list-style: none;\r\n}\r\n\r\n.sub-sites li:first-child,\r\n.footer-logo li:first-child {\r\n    border: none;\r\n}\r\n\r\n.sub-sites:after {\r\n    background: rgba(0, 0, 0, 0) linear-gradient(to right, rgba(6, 47, 60, 0.01) 0%, rgba(45, 75, 100, 0.98) 50%, #2c4a63 51%, rgba(6, 47, 60, 0.01) 100%) repeat scroll 0 0;\r\n    content: \"\";\r\n    display: block;\r\n    height: 1px;\r\n    position: absolute;\r\n    right: 0;\r\n    top: 0;\r\n    width: 100%;\r\n}\r\n\r\n.footer-logo {\r\n    padding: 7px 15px 0;\r\n    text-align: center;\r\n}\r\n\r\n.footer-logo li {\r\n    border-left: 1px solid #28282a;\r\n    display: inline-block;\r\n    padding: 0 10px;\r\n    margin-bottom: 7px;\r\n    vertical-align: middle;\r\n    list-style: none;\r\n    box-sizing: border-box;\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n}\r\n\r\n.ad_footer_block {\r\n    width: 94% !important;\r\n}\r\n\r\n.carousel-control-prev {\r\n    left: -56px;\r\n}\r\n\r\n.notification-gap {\r\n    margin-top: -24px;\r\n    margin-bottom: -67px;\r\n}\r\n\r\n.footer-image {\r\n    width: 78% !important;\r\n}\r\n\r\na.notice-anchr {\r\n    color: rgb(19, 31, 206);\r\n    text-decoration: none;\r\n}\r\n\r\na.notice-anchr:hover {\r\n    color: rgb(19, 31, 206);\r\n    text-decoration: underline;\r\n}\r\n\r\n.infocus-image-size{\r\n    width: 100%;\r\n    height: 160px;\r\n}\r\n\r\n.percent{\r\n    color: white;\r\n    font-size: 40px;\r\n    text-align: center;\r\n    line-height: 24px;\r\n    font-family: 'anton';\r\n    letter-spacing: 5px;\r\n}\r\n\r\n@media only screen and (max-width: 1024px){\r\n.dist-block{\r\n    padding: 0 11px 0px 21px;\r\n}\r\n.photo-gallery-home {\r\n    height: 145px !important;\r\n}\r\n.gallery-section.padding-bottom-cls {\r\n    padding: 0 17px 0 7px;\r\n}\r\n.padding-bottom-cls {\r\n    padding: 0 22px 0 0;\r\n}\r\n.footer-wrapper {\r\n    margin-top: 35px !important;\r\n}\r\n.margin-top-footer-logo {\r\n    margin-top: 4px !important;\r\n}\r\n#block-views-featured-task-block-5 h2 {\r\n    color: #383838;\r\n    font-size: 16px !important;\r\n}\r\n#block-common-utils-mygov-statistics-block:before, #block-views-featured-task-block-5:before {\r\n    width: 77px;\r\n    height: 82px;\r\n    margin: -40px 0 0 -42px;\r\n}\r\n.quick-rnd{\r\n    margin: 5% 0 7% 5%;\r\n}\r\n.twitter-view{\r\n    padding-top: 4px;\r\n}\r\n.notification-block-lst{\r\n    height: 378px;\r\n   }\r\n\r\n.socialpnl {\r\n    padding: 5px 12px;\r\n    border: 1px solid #ddd;\r\n    font-size: 12px;\r\n    margin-left: 115px;\r\n    height: 34px;\r\n    margin-top: 5px;\r\n}\r\nimg.img-responsive {\r\n    width: 100%;\r\n}\r\n  .img-responsive{\r\n    display: inline;\r\n    vertical-align: baseline;\r\n  }\r\n  .flip-box-back h2{\r\n    padding-top: 15px;\r\n}\r\n  .flip-box-back p {\r\n    padding: 0 15px 0 15px;\r\n    line-height: 20px;\r\n    font-size: 11px;\r\n}\r\n.flip-para1{\r\n    padding: 0px 17px 12px 17px !important;\r\n  }\r\n.cm-speech p {\r\n    font-size: 17px;\r\n    padding: 10px 60px 0 60px;\r\n    text-align: justify;\r\n}\r\n\r\n}\r\n\r\n@media only screen and (max-width: 991px){\r\n    .slider-img {\r\n        padding: 0 15px 36px 0;\r\n        border-radius: 3px;\r\n    }\r\n    .read-more-btn{\r\n        padding: 4px;\r\n    }\r\n    .quick-rnd {\r\n        margin: 5% 0 7% 5%;\r\n    }\r\n    .notification-block-lst{\r\n        height: 424px;\r\n    }\r\n    .socialpnl {\r\n        margin-left: 88px;\r\n    }\r\n    .about-content{\r\n        height: 222px;\r\n    }\r\n    .cm-speech p {\r\n        padding: 10px 60px 0 60px;\r\n    }\r\n    .flip-box-back p{\r\n        line-height: 18px;\r\n        padding: 0 15px 0 15px;\r\n        font-size: 10px;\r\n    }\r\n\r\n}\r\n\r\n@media only screen and (max-width: 767px){\r\n    .view-id-featured_task .views-row:hover .group_featured, .view-id-featured_task .views-row:hover .discuss_featured, .view-id-featured_task .views-row:hover, .view-id-featured_task .views-row:hover .poll_featured, .view-id-featured_task .views-row:hover .talk_featured, .view-id-featured_task .views-row:hover .blog_featured {\r\n        min-height: 380px;\r\n    }\r\n    .display-inline-infocus {\r\n        display: block;\r\n    }\r\n    .infocus-each-block {\r\n        max-width: 100%;\r\n    }\r\n    }\r\n\r\n@media only screen and (max-width: 767px) and (min-width: 480px){\r\n.front .container {\r\n    width: 100%;\r\n    box-sizing: border-box;\r\n}\r\n.rnd{      \r\n    margin: 5% 0 7% 50% !important;\r\n}\r\n}\r\n\r\n@media only screen and (max-width: 479px){\r\n.view-id-featured_task .views-row:hover .group_featured, .view-id-featured_task .views-row:hover .discuss_featured, .view-id-featured_task .views-row:hover .do_featured, .view-id-featured_task .views-row:hover .poll_featured, .view-id-featured_task .views-row:hover .talk_featured, .view-id-featured_task .views-row:hover .blog_featured {\r\n    min-height: 70px;\r\n}\r\n.view-id-featured_task .views-row .group_image, .view-id-featured_task .views-row .talk_image, .view-id-featured_task .views-row .do_image, .view-id-featured_task .views-row .discuss_image, .view-id-featured_task .views-row .blog_image {\r\n    float: left;\r\n    width: 90px;\r\n    margin-right: -100%;\r\n}\r\n.view-id-featured_task .group_title a, .view-id-featured_task .discuss_title a, .view-id-featured_task .do_title a, .view-id-featured_task .task_title a, .view-id-featured_task .poll_title a, .view-id-featured_task .blog_title a, .view-id-featured_task .talk_title a {\r\n    font-size: 13px !important;\r\n}\r\n.view-id-featured_task .group_title a, .view-id-featured_task .discuss_title a, .view-id-featured_task .do_title a, .view-id-featured_task .task_title a, .view-id-featured_task .poll_title a, .view-id-featured_task .blog_title a, .view-id-featured_task .talk_title a {\r\n    font-size: 13px !important;\r\n}\r\n.view-id-featured_task .group_title, .view-id-featured_task .discuss_title, .view-id-featured_task .do_title, .view-id-featured_task .task_title, .view-id-featured_task .poll_title, .view-id-featured_task .talk_title, .view-id-featured_task .blog_title {\r\n    display: inline-block;\r\n    margin-left: 95px;\r\n    padding: 3px 5px 0 !important;\r\n    max-height: 34px;\r\n    overflow: hidden;\r\n    line-height: 16px;\r\n}\r\n.container {\r\n    position: relative;\r\n    margin: 0 auto;\r\n    padding: 0;\r\n}\r\n}\r\n\r\n@media all and (max-width:640px) {\r\n    .sub-sites li,\r\n    .sub-sites li:first-child {\r\n        padding: 10px;\r\n        border: 1px solid #2c4a63;\r\n    }\r\n    .sub-sites {\r\n        padding: 15px 10px 5px;\r\n    }\r\n}\r\n\r\n@media all and (max-width:567px) {\r\n    .footer-logo {\r\n        overflow: hidden;\r\n        padding: 10px 5px 0;\r\n    }\r\n    .footer-logo li {\r\n        width: 50%;\r\n        border-left: none;\r\n        padding: 0px;\r\n        float: left;\r\n        margin: 10px 0;\r\n    }\r\n    .footer-logo li:nth-child(2n+2) {\r\n        border-left: 1px solid #28282a;\r\n    }\r\n}\r\n\r\n@media only screen and (max-width: 768px){\r\n    .notification-block-lst{\r\n        height: 544px;\r\n    }\r\n    .dist-block-read-more-btn[_ngcontent-c4] {\r\n        margin-top: 26px;\r\n    }\r\n    /* .circle {\r\n        flex: 0 0 34%;\r\n        max-width: 39%;\r\n    }\r\n    .quick-start-in{\r\n        margin: 0 0 0 50%;\r\n    } */\r\n    .quick-rnd{\r\n        margin: 5% 0 7% -12% !important;\r\n    }\r\n    .rnd{\r\n        width: 180px;\r\n        height: 180px;\r\n        border-radius: 50%;\r\n        border: 7px solid white;\r\n    }\r\n    .socialpnl{\r\n        margin-left: 30px;\r\n    }\r\n    .about-content{\r\n        height: auto;\r\n    }\r\n    .social-content .col-md-4 {\r\n        flex: 1 0 64.333333%;\r\n        max-width: 100%;\r\n    }\r\n    img.img-responsive {\r\n        width: auto;\r\n    }\r\n    .socialpnl {\r\n        margin-left: 480px;\r\n    }\r\n    .count {\r\n        font-size: 30px;\r\n    }\r\n    .sub-title {\r\n        font-size: 18px;\r\n    }\r\n    .cm-speech h2 {\r\n        font-size: 22px;\r\n    }\r\n    .cm-speech p {\r\n        padding: 10px 50px 0 50px;\r\n        font-size: 15px;\r\n    }\r\n    .flip-box-back p {\r\n        padding: 15px 45px 15px 45px;\r\n        font-size: 15px;\r\n    }\r\n    .flip-para1 {\r\n        padding: 0px 45px 50px 45px !important;\r\n    }\r\n    .flip-border {\r\n        border: 1px solid;\r\n        margin: 60px;\r\n    }\r\n    .percent {\r\n        font-size: 30px;\r\n    }\r\n    \r\n}\r\n\r\n@media only screen and (max-width: 608px){\r\n    .infocus-each-block{\r\n        padding: 30px !important;\r\n        margin-top: 5px;\r\n    }\r\n    .infocus-each-block-dist {\r\n        max-width: 100%;      \r\n    }\r\n    .footer-image{\r\n        width: 100% !important;\r\n    }\r\n    .wrapper-image{\r\n        width: 25%;\r\n    }\r\n    .sub-sites[_ngcontent-c4] li[_ngcontent-c4], .sub-sites[_ngcontent-c4] li[_ngcontent-c4]:first-child{\r\n        padding: 0%;\r\n    }\r\n    .footer-logo[_ngcontent-c4]{\r\n        padding: 0%;\r\n    }\r\n    .social, .twitter{\r\n        width: 50%;\r\n    }\r\n    .rnd{\r\n        width: 200px;\r\n        height: 200px;\r\n        margin: 5% 0 7% 30% !important;\r\n        border-radius: 50%;\r\n        border: 7px solid white;\r\n    }\r\n    /* .circle {\r\n        flex: 0 0 34%;\r\n        max-width: 39%;\r\n    }\r\n    .quick-start-in{\r\n        margin: 0 0 0 50%;\r\n    } */\r\n    .about-content {\r\n        background-color: #f7a707;\r\n        margin: 0 0 40px 0;\r\n    }\r\n    .socialpnl {\r\n        margin-left: 330px;\r\n    }\r\n    .count {\r\n        line-height: 52px;\r\n    }\r\n    .flip-border {\r\n        border: 1px solid;\r\n        margin: 30px;\r\n    }\r\n    .quick-rnd {\r\n        margin: 5% 0 7% -9% !important;\r\n    }\r\n\r\n    \r\n}\r\n\r\n@media only screen and (max-width: 560px){\r\n    .head-title{\r\n        font-size: 15px !important;\r\n    }\r\n    .left-logo-bbbp{\r\n        width: 50% !important;\r\n    }\r\n    .footer-wrapper {\r\n        margin-top: 35px !important;\r\n       \r\n    }\r\n    /* .circle {\r\n        flex: 0 0 100%;\r\n        max-width: 100%;\r\n    }\r\n    .quick-start-in{\r\n        margin: 0 0 0 50%;\r\n    } */\r\n    .rnd{      \r\n        margin: 5% 0 7% 100% !important;\r\n    }\r\n    .socialpnl {\r\n        margin-left: 290px;\r\n    }\r\n    .cm-speech h2 {\r\n        font-size: 22px;\r\n    }\r\n    .cm-speech h2 {\r\n        font-size: 18px;\r\n    }\r\n    .cm-speech p {\r\n        padding: 10px 40px 0 40px;\r\n        font-size: 14px;\r\n    }\r\n    .flip-box-back h2 {\r\n        font-size: 16px;\r\n    }\r\n    .flip-box-back p {\r\n        font-size: 13px;\r\n    }\r\n    .quick-rnd {\r\n        margin: 5% 0 7% -8% !important;\r\n    }\r\n    .quick-start-in {\r\n        padding: 0 0 0 0 !important;\r\n    }\r\n    .count{\r\n        line-height: 0;\r\n    }\r\n    .percent {\r\n        font-size: 28px;\r\n        margin-left: -10px;\r\n    }\r\n}\r\n\r\n@media only screen and (max-width: 480px){\r\n    .rnd{      \r\n        margin: 5% 0 7% 80% !important;\r\n    }\r\n    .socialpnl {\r\n        margin-left: 225px;\r\n    }\r\n    .cm-speech h2 {\r\n        font-size: 19px;\r\n    }\r\n    .cm-speech p {\r\n        padding: 10px 30px 0 30px;\r\n        font-size: 15px;\r\n    }\r\n    .flip-box-back p {\r\n        padding: 15px 15px 40px 15px;\r\n    }\r\n    .flip-para1 {\r\n        padding: 0px 45px 26px 45px !important;\r\n    }\r\n    .flip-border {\r\n        border: 1px solid;\r\n        margin: 20px;\r\n    }\r\n\r\n}\r\n\r\n@media only screen and (max-width: 360px){\r\n\r\n    .social-panel {\r\n        margin-top: 80px;\r\n    }\r\n    .social-box {\r\n        height: 380px;\r\n    }\r\n    .cm-speech h2 {\r\n        font-size: 18px;\r\n    }\r\n    .cm-speech p {\r\n        padding: 10px 15px 0 15px !important;\r\n        font-size: 13px;\r\n    }\r\n    .socialpnl {\r\n        margin-left: 180px;\r\n    }\r\n    .rnd {\r\n        margin: 5% 0 7% 45% !important;\r\n    }\r\n    .flip-box-back p {\r\n        padding: 0px 25px 9px 25px;\r\n        font-size: 14px;\r\n    }\r\n    .flip-para1 {\r\n        padding: 0px 30px 25px 30px !important;\r\n    }\r\n    .flip-border {\r\n        border: 1px solid;\r\n        margin: 10px;\r\n    }\r\n\r\n    \r\n    \r\n}\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0JBQWtCOztBQUVsQjtJQUNJLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsV0FBVztDQUNkOztBQUVEO0lBQ0ksaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQiw4QkFBOEI7O0NBRWpDOztBQUVEO0lBQ0kscUdBQXFHO0NBQ3hHOztBQUNEO0lBQ0ksa0NBQWtDO0NBQ3JDOztBQUNEO0lBQ0ksbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixpQkFBaUI7Q0FDcEI7O0FBQ0Q7SUFDSSxZQUFZO0lBQ1osYUFBYTtDQUNoQjs7QUFDRDtJQUNJLGlDQUFpQztDQUNwQzs7QUFDRDtJQUNJLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsMEJBQTBCO0lBQzFCLGFBQWE7Q0FDaEI7O0FBQ0Q7SUFDSSxvQkFBb0I7SUFDcEIsc0JBQXNCO0lBQ3RCLFlBQVk7Q0FDZjs7QUFDRDtJQUNJLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEIsWUFBWTtDQUNmOztBQUVEO0lBQ0ksYUFBYTtJQUNiLGNBQWM7SUFDZCxXQUFXO0lBQ1gsb0JBQW9CO0lBQ3BCLGVBQWU7Q0FDbEI7O0FBRUQ7SUFDSSxhQUFhO0lBQ2IsY0FBYztJQUNkLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEI7O2lDQUU2QjtDQUNoQzs7QUFDRDtJQUNJLGFBQWE7SUFDYixlQUFlO0lBQ2YsMkJBQTJCO0NBQzlCOztBQUVEO0lBQ0ksWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIscUNBQXFDO0NBQ3hDOztBQUNEO0lBQ0ksYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixvQkFBb0I7Q0FDdkI7O0FBQ0Q7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIscUJBQXFCO0NBQ3hCOztBQUNEO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtDQUN6Qjs7QUFDRDtJQUNJLGlCQUFpQjtJQUNqQixrQkFBa0I7Q0FDckI7O0FBQ0Q7SUFDSSwwQkFBMEI7SUFDMUIsZ0JBQWdCO0lBQ2hCLGFBQWE7Q0FDaEI7O0FBQ0Q7SUFDSSxpQkFBaUI7SUFDakIsb0JBQW9CO0NBQ3ZCOztBQUVEO0lBQ0ksb0JBQW9CO0NBQ3ZCOztBQUNEO0lBQ0ksaUNBQWlDO0NBQ3BDOztBQUNEO0lBQ0ksZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLGlCQUFpQjtDQUNwQjs7QUFDRDtJQUNJLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsa0JBQWtCO0NBQ3JCOztBQUlEO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixrR0FBa0c7SUFDbEcsc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWix3QkFBd0I7Q0FDM0I7O0FBRUQ7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQix1Q0FBdUM7SUFDdkMsaUJBQWlCO0lBQ2pCLDBCQUEwQjtJQUMxQixxQkFBcUI7SUFDckIsOEJBQThCO0lBQzlCLGdDQUFnQztDQUNuQzs7QUFFRDtJQUNJLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQixrQkFBa0I7Q0FDckI7O0FBQ0Q7SUFDSSwwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsa0JBQWtCO0NBQ3JCOztBQUVEO0lBQ0ksMkJBQTJCO0lBQzNCLGlCQUFpQjtDQUNwQjs7QUFFRDtJQUNJLGFBQWE7Q0FDaEI7O0FBRUQ7SUFDSSx3QkFBd0I7Q0FDM0I7O0FBRUQ7SUFDSSxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGlCQUFpQjtDQUNwQjs7QUFFRDtJQUNJLHFCQUFxQjtDQUN4Qjs7QUFFRDtJQUNJLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQixrQkFBa0I7Q0FDckI7O0FBQ0Q7QUFDQSwwQkFBMEI7SUFDdEIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixvQkFBb0I7Q0FDdkI7O0FBQ0Q7SUFDSSxvQkFBb0I7SUFDcEIsZ0NBQWdDO0NBQ25DOztBQUVEO0lBQ0ksc0JBQXNCO0lBQ3RCLGtCQUFrQjtDQUNyQjs7QUFFRDtJQUNJLGdDQUFnQztDQUNuQzs7QUFFRDtJQUNJLHNCQUFzQjtJQUN0QixrQkFBa0I7Q0FDckI7O0FBRUQ7SUFDSSxtSUFBbUk7Q0FDdEk7O0FBRUQ7SUFDSSxZQUFZO0lBQ1osaUJBQWlCO0NBQ3BCOztBQUNEO0lBQ0kscUJBQXFCO0NBQ3hCOztBQUNEO0lBQ0ksc0JBQXNCO0NBQ3pCOztBQUNEO0lBQ0ksc0JBQXNCO0NBQ3pCOztBQUNEO0lBQ0ksY0FBYztJQUNkLFlBQVk7SUFDWixpQkFBaUI7Q0FDcEI7O0FBQ0Q7SUFDSSxzQkFBc0I7Q0FDekI7O0FBQ0Q7SUFDSSxpQkFBaUI7Q0FDcEI7O0FBQ0Q7SUFDSSx1QkFBdUI7Q0FDMUI7O0FBQ0Q7SUFDSSx1QkFBdUI7SUFDdkIsY0FBYztDQUNqQjs7QUFDRDtJQUNJLGlCQUFpQjtDQUNwQjs7QUFDRDtJQUNJLGVBQWU7Q0FDbEI7O0FBQ0Q7SUFDSSxxQkFBcUI7Q0FDeEI7O0FBQ0Q7SUFDSSxzQkFBc0I7SUFDdEIsbUJBQW1CO0NBQ3RCOztBQUNEOztJQUVJLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLGdCQUFnQjtDQUNuQjs7QUFDRDtJQUNJLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLGdCQUFnQjtDQUNuQjs7QUFFRDtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsYUFBYTtDQUNoQjs7QUFHRDs7SUFFSSxjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGlDQUFpQztDQUNwQzs7QUFDRDtJQUNJLFdBQVc7Q0FDZDs7QUFDRDtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsa0JBQWtCO0NBQ3JCOztBQUNEO0lBQ0ksbUJBQW1CO0lBQ25CLGtCQUFrQjtDQUNyQjs7QUFHRDtJQUNJLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixjQUFjO0NBQ2pCOztBQUNEO0lBQ0ksZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixpQkFBaUI7Q0FDcEI7O0FBR0Q7SUFDSSxtQkFBbUI7SUFHbkIsdUJBQXVCO0lBQ3ZCLGNBQWM7SUFDZCxlQUFlO0lBQ2Ysc0JBQXNCO0NBQ3pCOztBQUVEO0lBQ0ksa0JBQWtCO0NBQ3JCOztBQUVEO0VBQ0UsbUJBQW1CO0NBQ3BCOztBQUVEO0lBQ0ksaUJBQWlCO0NBQ3BCOztBQUdEO0lBQ0ksc0JBQXNCO0NBQ3pCOztBQUNEO0lBQ0ksa0JBQWtCO0NBQ3JCOztBQUVEO0lBQ0ksbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLG1DQUFtQztJQUNuQyxhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLFdBQVc7SUFDWCxZQUFZO0NBQ2Y7O0FBRUQ7SUFDSSxZQUFZO0lBQ1osZUFBZTtJQUNmLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLGlCQUFpQjtJQUNqQixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixnQkFBZ0I7Q0FDbkI7O0FBRUQ7SUFDSSxlQUFlO0lBQ2YsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixrQkFBa0I7Q0FDckI7O0FBQ0Q7SUFDSSxtSUFBbUk7Q0FDdEk7O0FBQ0Q7SUFDSSxZQUFZO0lBQ1osWUFBWTtDQUNmOztBQUNEO0lBQ0ksbUJBQW1CO0NBQ3RCOztBQUNEO0lBQ0ksYUFBYTtDQUNoQjs7QUFDRDtJQUNJLHNCQUFzQjtDQUN6Qjs7QUFFRDtJQUNJLHlCQUF5QjtDQUM1Qjs7QUFDRDtJQUNJLGNBQWM7Q0FDakI7O0FBQ0Q7SUFDSSxpQkFBaUI7Q0FDcEI7O0FBR0Qsc0JBQXNCOztBQUV0QjtJQUNJLGFBQWE7SUFDYixjQUFjO0lBQ2QsbUJBQW1CO0NBQ3RCOztBQUNEO0lBQ0ksaUJBQWlCO0NBQ3BCOztBQUNEO0lBQ0ksY0FBYztJQUNkLDBCQUEwQjs7Q0FFN0I7O0FBQ0Q7SUFDSSxtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsYUFBYTtDQUNoQjs7QUFDRDtJQUNJLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsb0JBQW9CO0NBQ3ZCOztBQUNELG9CQUFvQjs7QUFDcEI7SUFDSSx1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCOztBQUVKO0lBQ0ksOEJBQThCO0NBQ2pDOztBQUNEO0lBQ0ksOEJBQThCO0lBQzlCLFlBQVk7SUFDWixhQUFhO0lBQ2IsNEJBQW9CO1lBQXBCLG9CQUFvQjtHQUNyQjs7QUFFRDtJQUNFLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixtQ0FBMkI7SUFBM0IsMkJBQTJCO0lBQTNCLG1EQUEyQjtJQUMzQixxQ0FBNkI7WUFBN0IsNkJBQTZCO0dBQzlCOztBQUVEO0lBQ0UsbUNBQTJCO1lBQTNCLDJCQUEyQjtHQUM1Qjs7QUFFRDtJQUNFLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osYUFBYTtJQUNiLG9DQUE0QjtZQUE1Qiw0QkFBNEI7R0FDN0I7O0FBRUQ7SUFDRSwwQkFBMEI7R0FDM0I7O0FBRUQ7SUFDRSwwRUFBMEU7SUFDMUUsYUFBYTtJQUNiLG1DQUEyQjtZQUEzQiwyQkFBMkI7R0FDNUI7O0FBQ0Q7SUFDRSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixhQUFhO0dBQ2Q7O0FBQ0Q7Ozs7OztNQU1JOztBQUNKO0lBQ0UsdUNBQXVDO0dBQ3hDOztBQUNEO0lBQ0UsZUFBZTtJQUNmLGVBQWU7SUFDZix3QkFBd0I7SUFDeEIsZUFBZTtJQUNmLFlBQVk7SUFDWixhQUFhO0dBQ2Q7O0FBQ0Q7SUFDRSxZQUFZO0lBQ1osZUFBZTtJQUNmLDBCQUEwQjtJQUMxQixlQUFlO0lBQ2YsWUFBWTtJQUNaLGFBQWE7SUFDYixzQkFBc0I7O0dBRXZCOztBQUVEO0lBQ0Usb0JBQW9CO0lBQ3BCLDRCQUE0QjtJQUM1QixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtDQUNuQjs7QUFDRDtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0NBQ2hCOztBQUdEO0lBQ0ksWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtDQUNyQjs7QUFDRDtJQUNJLGlCQUFpQjtDQUNwQjs7QUFDRDtJQUNJLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsa0JBQWtCO0NBQ3JCOztBQUVEO0lBQ0ksaUJBQWlCO0lBQ2pCLG9CQUFvQjtDQUN2Qjs7QUFDRDtJQUNJLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsb0JBQW9CO0NBQ3ZCOztBQUVEO0lBQ0ksc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2Ysa0JBQWtCO0NBQ3JCOztBQUNEO0lBQ0ksOEJBQThCO0NBQ2pDOztBQUVEO0lBQ0ksdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixvQkFBb0I7Q0FDdkI7O0FBRUM7SUFDRSxlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxVQUFVO0dBQ1g7O0FBQ0Q7SUFDRSxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxXQUFXO0lBQ1gsWUFBWTtJQUNaLGtCQUFrQjtHQUNuQjs7QUFDRDtNQUNJLGlCQUFpQjtHQUNwQjs7QUFFSDtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixhQUFhO0NBQ2hCOztBQUNEO0lBQ0ksb0JBQW9CO0lBQ3BCLGdDQUFnQztJQUNoQyx1QkFBdUI7Q0FDMUI7O0FBQ0Q7SUFDSSwrQkFBK0I7SUFDL0IsdUJBQXVCO0NBQzFCOztBQUNEO0lBQ0ksZ0JBQWdCO0lBQ2hCLHVCQUF1QjtDQUMxQjs7QUFFRDtJQUNJLGtCQUFrQjtJQUNsQixpQkFBaUI7Q0FDcEI7O0FBQ0Q7SUFDSSx1QkFBdUI7SUFDdkIsaUNBQWlDO0NBQ3BDOztBQUNEO0lBQ0ksdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsbUJBQW1CO0NBQ3RCOztBQUNEO0lBQ0ksaUJBQWlCO0lBQ2pCLGdDQUFnQztDQUNuQzs7QUFDRDtJQUNJLGVBQWU7Q0FDbEI7O0FBRUQ7SUFDSSwyQkFBMkI7O0NBRTlCOztBQUVEO0lBQ0ksbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixxQkFBcUI7Q0FDeEI7O0FBRUQ7SUFDSSxnQkFBZ0I7SUFDaEIsK0JBQStCO0lBQy9CLHNCQUFzQjtJQUN0QixvQkFBb0I7SUFDcEIsaUJBQWlCO0NBQ3BCOztBQUVEOztJQUVJLGFBQWE7Q0FDaEI7O0FBRUQ7SUFDSSx5S0FBeUs7SUFDekssWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxPQUFPO0lBQ1AsWUFBWTtDQUNmOztBQUVEO0lBQ0ksb0JBQW9CO0lBQ3BCLG1CQUFtQjtDQUN0Qjs7QUFFRDtJQUNJLCtCQUErQjtJQUMvQixzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLHVCQUF1QjtJQUN2Qiw0QkFBNEI7SUFDNUIsK0JBQStCO0NBQ2xDOztBQUNEO0lBQ0ksc0JBQXNCO0NBQ3pCOztBQUVEO0lBQ0ksWUFBWTtDQUNmOztBQUVEO0lBQ0ksa0JBQWtCO0lBQ2xCLHFCQUFxQjtDQUN4Qjs7QUFDRDtJQUNJLHNCQUFzQjtDQUN6Qjs7QUFDRDtJQUNJLHdCQUF3QjtJQUN4QixzQkFBc0I7Q0FDekI7O0FBRUQ7SUFDSSx3QkFBd0I7SUFDeEIsMkJBQTJCO0NBQzlCOztBQUNEO0lBQ0ksWUFBWTtJQUNaLGNBQWM7Q0FDakI7O0FBQ0Q7SUFDSSxhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLG9CQUFvQjtDQUN2Qjs7QUFHRDtBQUNBO0lBQ0kseUJBQXlCO0NBQzVCO0FBQ0Q7SUFDSSx5QkFBeUI7Q0FDNUI7QUFDRDtJQUNJLHNCQUFzQjtDQUN6QjtBQUNEO0lBQ0ksb0JBQW9CO0NBQ3ZCO0FBQ0Q7SUFDSSw0QkFBNEI7Q0FDL0I7QUFDRDtJQUNJLDJCQUEyQjtDQUM5QjtBQUNEO0lBQ0ksZUFBZTtJQUNmLDJCQUEyQjtDQUM5QjtBQUNEO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYix3QkFBd0I7Q0FDM0I7QUFDRDtJQUNJLG1CQUFtQjtDQUN0QjtBQUNEO0lBQ0ksaUJBQWlCO0NBQ3BCO0FBQ0Q7SUFDSSxjQUFjO0lBQ2Q7O0FBRUo7SUFDSSxrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLGdCQUFnQjtDQUNuQjtBQUNEO0lBQ0ksWUFBWTtDQUNmO0VBQ0M7SUFDRSxnQkFBZ0I7SUFDaEIseUJBQXlCO0dBQzFCO0VBQ0Q7SUFDRSxrQkFBa0I7Q0FDckI7RUFDQztJQUNFLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsZ0JBQWdCO0NBQ25CO0FBQ0Q7SUFDSSx1Q0FBdUM7R0FDeEM7QUFDSDtJQUNJLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsb0JBQW9CO0NBQ3ZCOztDQUVBOztBQUVEO0lBQ0k7UUFDSSx1QkFBdUI7UUFDdkIsbUJBQW1CO0tBQ3RCO0lBQ0Q7UUFDSSxhQUFhO0tBQ2hCO0lBQ0Q7UUFDSSxtQkFBbUI7S0FDdEI7SUFDRDtRQUNJLGNBQWM7S0FDakI7SUFDRDtRQUNJLGtCQUFrQjtLQUNyQjtJQUNEO1FBQ0ksY0FBYztLQUNqQjtJQUNEO1FBQ0ksMEJBQTBCO0tBQzdCO0lBQ0Q7UUFDSSxrQkFBa0I7UUFDbEIsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtLQUNuQjs7Q0FFSjs7QUFFRDtJQUNJO1FBQ0ksa0JBQWtCO0tBQ3JCO0lBQ0Q7UUFDSSxlQUFlO0tBQ2xCO0lBQ0Q7UUFDSSxnQkFBZ0I7S0FDbkI7S0FDQTs7QUFDTDtBQUNBO0lBQ0ksWUFBWTtJQUdaLHVCQUF1QjtDQUMxQjtBQUNEO0lBQ0ksK0JBQStCO0NBQ2xDO0NBQ0E7O0FBQ0Q7QUFDQTtJQUNJLGlCQUFpQjtDQUNwQjtBQUNEO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixvQkFBb0I7Q0FDdkI7QUFDRDtJQUNJLDJCQUEyQjtDQUM5QjtBQUNEO0lBQ0ksMkJBQTJCO0NBQzlCO0FBQ0Q7SUFDSSxzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLDhCQUE4QjtJQUM5QixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtDQUNyQjtBQUNEO0lBQ0ksbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixXQUFXO0NBQ2Q7Q0FDQTs7QUFFRDtJQUNJOztRQUVJLGNBQWM7UUFDZCwwQkFBMEI7S0FDN0I7SUFDRDtRQUNJLHVCQUF1QjtLQUMxQjtDQUNKOztBQUVEO0lBQ0k7UUFDSSxpQkFBaUI7UUFDakIsb0JBQW9CO0tBQ3ZCO0lBQ0Q7UUFDSSxXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixZQUFZO1FBQ1osZUFBZTtLQUNsQjtJQUNEO1FBQ0ksK0JBQStCO0tBQ2xDO0NBQ0o7O0FBSUQ7SUFDSTtRQUNJLGNBQWM7S0FDakI7SUFDRDtRQUNJLGlCQUFpQjtLQUNwQjtJQUNEOzs7Ozs7UUFNSTtJQUNKO1FBQ0ksZ0NBQWdDO0tBQ25DO0lBQ0Q7UUFDSSxhQUFhO1FBQ2IsY0FBYztRQUNkLG1CQUFtQjtRQUNuQix3QkFBd0I7S0FDM0I7SUFDRDtRQUNJLGtCQUFrQjtLQUNyQjtJQUNEO1FBQ0ksYUFBYTtLQUNoQjtJQUNEO1FBR0kscUJBQXFCO1FBQ3JCLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksWUFBWTtLQUNmO0lBQ0Q7UUFDSSxtQkFBbUI7S0FDdEI7SUFDRDtRQUNJLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksZ0JBQWdCO0tBQ25CO0lBQ0Q7UUFDSSxnQkFBZ0I7S0FDbkI7SUFDRDtRQUNJLDBCQUEwQjtRQUMxQixnQkFBZ0I7S0FDbkI7SUFDRDtRQUNJLDZCQUE2QjtRQUM3QixnQkFBZ0I7S0FDbkI7SUFDRDtRQUNJLHVDQUF1QztLQUMxQztJQUNEO1FBQ0ksa0JBQWtCO1FBQ2xCLGFBQWE7S0FDaEI7SUFDRDtRQUNJLGdCQUFnQjtLQUNuQjs7Q0FFSjs7QUFDRDtJQUNJO1FBQ0kseUJBQXlCO1FBQ3pCLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksZ0JBQWdCO0tBQ25CO0lBQ0Q7UUFDSSx1QkFBdUI7S0FDMUI7SUFDRDtRQUNJLFdBQVc7S0FDZDtJQUNEO1FBQ0ksWUFBWTtLQUNmO0lBQ0Q7UUFDSSxZQUFZO0tBQ2Y7SUFDRDtRQUNJLFdBQVc7S0FDZDtJQUNEO1FBQ0ksYUFBYTtRQUNiLGNBQWM7UUFDZCwrQkFBK0I7UUFDL0IsbUJBQW1CO1FBQ25CLHdCQUF3QjtLQUMzQjtJQUNEOzs7Ozs7UUFNSTtJQUNKO1FBQ0ksMEJBQTBCO1FBQzFCLG1CQUFtQjtLQUN0QjtJQUNEO1FBQ0ksbUJBQW1CO0tBQ3RCO0lBQ0Q7UUFDSSxrQkFBa0I7S0FDckI7SUFDRDtRQUNJLGtCQUFrQjtRQUNsQixhQUFhO0tBQ2hCO0lBQ0Q7UUFDSSwrQkFBK0I7S0FDbEM7OztDQUdKOztBQUNEO0lBQ0k7UUFDSSwyQkFBMkI7S0FDOUI7SUFDRDtRQUNJLHNCQUFzQjtLQUN6QjtJQUNEO1FBQ0ksNEJBQTRCOztLQUUvQjtJQUNEOzs7Ozs7UUFNSTtJQUNKO1FBQ0ksZ0NBQWdDO0tBQ25DO0lBQ0Q7UUFDSSxtQkFBbUI7S0FDdEI7SUFDRDtRQUNJLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksZ0JBQWdCO0tBQ25CO0lBQ0Q7UUFDSSwwQkFBMEI7UUFDMUIsZ0JBQWdCO0tBQ25CO0lBQ0Q7UUFDSSxnQkFBZ0I7S0FDbkI7SUFDRDtRQUNJLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksK0JBQStCO0tBQ2xDO0lBQ0Q7UUFDSSw0QkFBNEI7S0FDL0I7SUFDRDtRQUNJLGVBQWU7S0FDbEI7SUFDRDtRQUNJLGdCQUFnQjtRQUNoQixtQkFBbUI7S0FDdEI7Q0FDSjs7QUFDRDtJQUNJO1FBQ0ksK0JBQStCO0tBQ2xDO0lBQ0Q7UUFDSSxtQkFBbUI7S0FDdEI7SUFDRDtRQUNJLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksMEJBQTBCO1FBQzFCLGdCQUFnQjtLQUNuQjtJQUNEO1FBQ0ksNkJBQTZCO0tBQ2hDO0lBQ0Q7UUFDSSx1Q0FBdUM7S0FDMUM7SUFDRDtRQUNJLGtCQUFrQjtRQUNsQixhQUFhO0tBQ2hCOztDQUVKOztBQUNEOztJQUVJO1FBQ0ksaUJBQWlCO0tBQ3BCO0lBQ0Q7UUFDSSxjQUFjO0tBQ2pCO0lBQ0Q7UUFDSSxnQkFBZ0I7S0FDbkI7SUFDRDtRQUNJLHFDQUFxQztRQUNyQyxnQkFBZ0I7S0FDbkI7SUFDRDtRQUNJLG1CQUFtQjtLQUN0QjtJQUNEO1FBQ0ksK0JBQStCO0tBQ2xDO0lBQ0Q7UUFDSSwyQkFBMkI7UUFDM0IsZ0JBQWdCO0tBQ25CO0lBQ0Q7UUFDSSx1Q0FBdUM7S0FDMUM7SUFDRDtRQUNJLGtCQUFrQjtRQUNsQixhQUFhO0tBQ2hCOzs7O0NBSUoiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFBoYXNlLUlJIGNzcyAqL1xyXG5cclxuI2Jsb2NrLXZpZXdzLWZlYXR1cmVkLXRhc2stYmxvY2stNSB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG5cclxuI2Jsb2NrLWNvbW1vbi11dGlscy1teWdvdi1zdGF0aXN0aWNzLWJsb2NrLCAjYmxvY2stdmlld3MtZmVhdHVyZWQtdGFzay1ibG9jay01IHtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggI2RiZGJkYjtcclxuIFxyXG59XHJcblxyXG4jYmxvY2stdmlld3MtZmVhdHVyZWQtdGFzay1ibG9jay01OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoLy93d3cubXlnb3YuaW4vc2l0ZXMvYWxsL3RoZW1lcy9teWdvdi9mcm9udF9hc3NldHMvaW1hZ2VzL2ljby1pbmZvY3VzLnBuZykgbm8tcmVwZWF0O1xyXG59XHJcbmltZy5pbmZvY3VzIHtcclxuICAgIGJveC1zaGFkb3c6IC0xcHggMHB4IDVweCA1cHggI2RkZDtcclxufVxyXG4uY2Fyb3VzZWwtaW5uZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcbi5jYXJvdXNlbC1pbm5lciBpbWcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLnNvY2lhbC1zZWN7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q0ZDRkNDtcclxufVxyXG4uc29jaWFscG5se1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMTczcHg7XHJcbiAgICBoZWlnaHQ6IDM0cHg7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDJjOGZiO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcbiN0dy1idXR0b246aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kOiAjNDJjOGZiO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjNDJjOGZiO1xyXG4gICAgY29sb3I6ICNmZmY7IFxyXG59XHJcbiNmYi1idXR0b246aG92ZXIsICNmYi1idXR0b24uYWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQ6ICM0YTc4YjM7XHJcbiAgICBib3JkZXItY29sb3I6ICM0YTc4YjM7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLnF1aWNrLXJuZHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogMjAwcHg7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgbWFyZ2luOiAxMCUgYXV0byA3JTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4ucm5ke1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgaGVpZ2h0OiAyMDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGJvcmRlcjogN3B4IHNvbGlkIHdoaXRlO1xyXG4gICAgLyogb3BhY2l0eTogMC41O1xyXG4gICAgdHJhbnNpdGlvbjogMnM7XHJcbiAgICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9NTApOyAqL1xyXG59XHJcbi5ybmQ6aG92ZXJ7XHJcbiAgICBvcGFjaXR5OiAxLjA7XHJcbiAgICB0cmFuc2l0aW9uOiAycztcclxuICAgIGZpbHRlcjogYWxwaGEob3BhY2l0eT0xMDApO1xyXG59XHJcblxyXG4ucXVpY2stc3RhcnQtaW4ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAwIDAgMTAlIDA7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBib3JkZXI6IDBweCBzb2xpZCAjZTdiMzQ1ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmNvdW50IHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICdhbnRvbic7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogNXB4O1xyXG59XHJcbi5zdWItdGl0bGUge1xyXG4gICAgY29sb3I6ICMyMTI1Mjk7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBsaW5lLWhlaWdodDogMzBweDtcclxuICAgIGZvbnQtZmFtaWx5OiAnYW50b24nO1xyXG59IFxyXG4uYWJvdXR1cy1pbWd7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBwYWRkaW5nOiA1cHggMjBweCAwIDA7XHJcbn1cclxuLnR3aXR0ZXJ7XHJcbiAgICBwYWRkaW5nLXRvcDogNnB4O1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuLnR3aXR0ZXItdmlld3tcclxuICAgIGNvbG9yOiAjNGE3OGIzICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuLnF1aWNrLXN0YXRze1xyXG4gICAgbWFyZ2luLXRvcDogNTBweDtcclxuICAgIGJhY2tncm91bmQ6ICM4OGI0ZDY7XHJcbn1cclxuXHJcbi5hYm91dC1oZWFkIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMCAwIDA7XHJcbn1cclxuLmNtLXR3aXR0ZXJ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q0ZDRkNDtcclxufVxyXG4udHdpdHRlci10aXRsZXtcclxuICAgIGZvbnQtc2l6ZTogMjFweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBjb2xvcjogIzFmNDk3YjtcclxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcclxuICAgIHBhZGRpbmctdG9wOiA1cHg7XHJcbn1cclxuLnR3aXR0ZXJieXtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcclxufVxyXG4gICAgXHJcbiAgICBcclxuXHJcbiNibG9jay1jb21tb24tdXRpbHMtbXlnb3Ytc3RhdGlzdGljcy1ibG9jazpiZWZvcmUsICNibG9jay12aWV3cy1mZWF0dXJlZC10YXNrLWJsb2NrLTU6YmVmb3JlIHtcclxuICAgIHdpZHRoOiA4OHB4O1xyXG4gICAgaGVpZ2h0OiA4MnB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIGJhY2tncm91bmQ6IHVybCgvL3d3dy5teWdvdi5pbi9zaXRlcy9hbGwvdGhlbWVzL215Z292L2Zyb250X2Fzc2V0cy9pbWFnZXMvaWNvLXN0YXQucG5nKSBuby1yZXBlYXQ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIG1hcmdpbjogLTUzcHggMCAwIC01MXB4O1xyXG59XHJcblxyXG4jYmxvY2stdmlld3MtZmVhdHVyZWQtdGFzay1ibG9jay01ID4gaDIge1xyXG4gICAgY29sb3I6ICMzODM4Mzg7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LWZhbWlseTogTGF0byxzYW5zLXNlcmlmIWltcG9ydGFudDtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgcGFkZGluZzogNDBweCAwIDEycHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcclxuICAgIGJveC1zaGFkb3c6IDAgMHB4IDEwcHggMHB4ICNkZGQ7XHJcbn1cclxuXHJcbi52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdyB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBtYXJnaW4tbGVmdDogMS45JTtcclxuICAgIHdpZHRoOiAyMi41JTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xyXG4gICAgbWluLWhlaWdodDogMzY2cHg7XHJcbn1cclxuLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudmlld3Mtcm93LWdhbGxlcnkge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMuOSU7XHJcbiAgICB3aWR0aDogNDMlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG1hcmdpbi1ib3R0b206IDI1cHg7XHJcbiAgICBtaW4taGVpZ2h0OiAzNjZweDtcclxufVxyXG5cclxuLnRhbGtfZmVhdHVyZWQgLnRhbGtfaW1hZ2UsIC5kaXNjdXNzX2ZlYXR1cmVkIC5kaXNjdXNzX2ltYWdlLCAuZG9fZmVhdHVyZWQgLmRvX2ltYWdlLCAuZ3JvdXBfZmVhdHVyZWQgLmdyb3VwX2ltYWdlLCAuYmxvZ19mZWF0dXJlZCAuYmxvZ19pbWFnZSB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHggM3B4IDAgMDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLmdyb3VwX2ltYWdlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC50YWxrX2ltYWdlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5kb19pbWFnZSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZGlzY3Vzc19pbWFnZSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuYmxvZ19pbWFnZSB7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLmdyb3VwX3RpdGxlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5kaXNjdXNzX3RpdGxlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5kb190aXRsZSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudGFza190aXRsZSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAucG9sbF90aXRsZSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudGFsa190aXRsZSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuYmxvZ190aXRsZSB7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDE1cHggMTBweDtcclxufVxyXG5cclxuLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuYmxvZ190aXRsZSBhIHtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgZm9udC1zaXplOiAxMDYlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZ3JvdXBfZGVzYywgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZGlzY3Vzc19kZXNjLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5kb19kZXNjciwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAucG9sbF9kZXMsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnRhbGtfZGVzYywgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuYmxvZ19kZXNjIHtcclxuICAgIHBhZGRpbmc6IDAgMTVweCAxNXB4O1xyXG59XHJcblxyXG52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdyB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBtYXJnaW4tbGVmdDogMS45JTtcclxuICAgIHdpZHRoOiAyMi41JTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xyXG4gICAgbWluLWhlaWdodDogMzY2cHg7XHJcbn1cclxuLmdhbGxlcnktdmlldyAudmlld3Mtcm93IHtcclxuYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEuOSU7XHJcbiAgICB3aWR0aDogMjIuNSU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjVweDtcclxufVxyXG4uYmxvZ19mZWF0dXJlZDpob3ZlciwgLmRvX2ZlYXR1cmVkOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6ICNmZmU5YzI7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IDJweCAjZDRkM2QzO1xyXG59XHJcblxyXG4udmlldy1pZC1mZWF0dXJlZF90YXNrIC52aWV3cy1yb3c6aG92ZXIgLmJsb2dfZmVhdHVyZWQge1xyXG4gICAgYmFja2dyb3VuZDogIzllOWU5ZTQ1O1xyXG4gICAgbWluLWhlaWdodDogMzY2cHg7XHJcbn1cclxuXHJcbi52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdzpob3ZlciB7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IDJweCAjZDRkM2QzO1xyXG59XHJcblxyXG4udmlldy1pZC1mZWF0dXJlZF90YXNrIC52aWV3cy1yb3c6aG92ZXIgLmRvX2ZlYXR1cmVkIHtcclxuICAgIGJhY2tncm91bmQ6ICM5ZTllOWU0NTtcclxuICAgIG1pbi1oZWlnaHQ6IDM2NnB4O1xyXG59XHJcblxyXG4udmlldy1pZC1mZWF0dXJlZF90YXNrIC52aWV3cy1yb3cgLmNvbnRlbnRfdHlwZS50YXNrIHtcclxuICAgIGJhY2tncm91bmQ6IHVybCgvL3d3dy5teWdvdi5pbi9zaXRlcy9hbGwvdGhlbWVzL215Z292L2ltYWdlcy9yb3VuZGVkX2ljb25zLnBuZykgbm8tcmVwZWF0IHNjcm9sbCBjZW50ZXIgLTI0OXB4IC8gMzNweCBhdXRvICNkYzY4MDA7XHJcbn1cclxuXHJcbi52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLmdyb3VwX3RpdGxlIGEsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLmRpc2N1c3NfdGl0bGUgYSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZG9fdGl0bGUgYSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudGFza190aXRsZSBhLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5wb2xsX3RpdGxlIGEge1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcbi5nYWxsZXJ5LXNlY3Rpb257XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxufVxyXG4ucGhvdG8tZ2FsbGVyeS1ibG9jayB7XHJcbiAgICBwYWRkaW5nOiAwIDIycHggMCA4cHg7XHJcbn1cclxuLnZvZGVvLWdhbGxlcnktYmxvY2sge1xyXG4gICAgcGFkZGluZzogMCAyOHB4IDAgMHB4O1xyXG59XHJcbi5nYWxsZXJ5X3RpdGxlIHtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICBjb2xvcjogIzAwMDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuLmJsb2ctY29udGVudCB7XHJcbiAgICBwYWRkaW5nOiAwIDAgM3B4IDE2cHg7XHJcbn1cclxuLnNvY2lhbC1wYW5lbCB7XHJcbiAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG59XHJcbi5kaXN0LWJsb2NrIHtcclxuICAgIHBhZGRpbmc6IDAgMTRweCAwIDIzcHg7XHJcbn1cclxuLmJsb2ctYm9yZGVyIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICBoZWlnaHQ6IDQxN3B4O1xyXG59XHJcbi5ibG9nLWJvcmRlcjpob3ZlcntcclxuICAgIGJhY2tncm91bmQ6ICNkZGQ7XHJcbn1cclxuLmdhbGxlcnktaW1hZ2VzIHtcclxuICAgIHBhZGRpbmc6IDAgNHB4O1xyXG59XHJcbi5wYWRkaW5nLWJvdHRvbS1jbHMge1xyXG4gICAgcGFkZGluZy1ib3R0b206IDI1cHg7XHJcbn1cclxuLnNsaWRlci1pbWcge1xyXG4gICAgcGFkZGluZzogMCAxNXB4IDVweCAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG59XHJcbi5uZXh0XHJcbntcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIGNvbG9yOiAjMzMzO1xyXG4gICAgbWFyZ2luLXRvcDogLTIwJSAgXHJcbn1cclxuLnByZXYge1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBjb2xvcjogIzMzMztcclxuICAgIG1hcmdpbi10b3A6IC0yMCUgIFxyXG59XHJcblxyXG4uZGlzdC1yZWFkLW1vcmUtYnRue1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjAwO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGNvbG9yOiAjMDAwICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiA2cHg7XHJcbn1cclxuXHJcblxyXG4ubm90aWZpY2F0aW9uLWJsb2NrLWxzdFxyXG57XHJcbiAgICBoZWlnaHQ6IDMxMnB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDRkNGQ0O1xyXG59XHJcbi5wYWRkaW5nLXplcm8ge1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG4uZGlzdC1pbmZvLWhlYWQge1xyXG4gICAgY29sb3I6ICMxZjQ5N2I7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4ubm90aWZpY2F0aW9uLWJsb2NrIGxpICB7XHJcbiAgICBkaXNwbGF5OiBsaXN0LWl0ZW07XHJcbiAgICBtYXJnaW4tbGVmdDogMTdweDtcclxufVxyXG5cclxuXHJcbi5kaXN0LWlubm92YXRpb24tYmxvY2t7XHJcbiAgICBtYXJnaW46IDE0cHggMTZweCAwcHggMHB4O1xyXG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBoZWlnaHQ6IDI0MHB4O1xyXG59XHJcbi5yZWFkLW1vcmUtYXJyb3cge1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgbWFyZ2luLXRvcDogLTZweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA2cHg7XHJcbn1cclxuXHJcblxyXG4uZm9vdGVyLXdyYXBwZXIgI2Jsb2NrLW1lbnUtbWVudS1jb250ZW50LW1lbnUge1xyXG4gICAgcGFkZGluZzogNTBweCAzMXB4O1xyXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHdpZHRoOiAxMTgwcHg7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLmZvb3Rlci13cmFwcGVyICNibG9jay1tZW51LW1lbnUtY29udGVudC1tZW51IC5jb250ZW50IHtcclxuICAgIHBhZGRpbmctdG9wOiAxMnB4O1xyXG59XHJcblxyXG4ucmVzcG9uc2l2ZS1zbGlkZXItYmxvZyB7XHJcbiAgbWFyZ2luOiA0NXB4IDAgMCAwO1xyXG59XHJcblxyXG4ubWFyZ2luLXRvcC1mb290ZXItbG9nbyB7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcblxyXG5cclxuLmZvb3Rlci1jb250YWluZXIgZGl2LCBkaXYuY29tX2xpa2Vfd3JhcCBzcGFuLmZsYWctYWJ1c2UtY29tbWVudCwgI2Jsb2NrLWxvY2FsZS1sYW5ndWFnZSB1bCBsaSwgI2Jsb2NrLXZpZXdzLWZlYXR1cmVkLXRhc2stYmxvY2sgLnR4dF9vcmFuZ2UgYSwgI2Jsb2NrLXZpZXdzLWZlYXR1cmVkLXRhc2stYmxvY2stMSAudHh0X29yYW5nZSBhLCAjYmxvY2stbWVudS1tZW51LWNvbnRlbnQtbWVudSB1bC5tZW51IHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG4uZm9vdGVyLXdyYXBwZXIgI2Jsb2NrLW1lbnUtbWVudS1jb250ZW50LW1lbnUgdWwgbGksIC5mb290ZXItd3JhcHBlciAjYmxvY2stbWVudS1tZW51LWNvbnRlbnQtbWVudSB1bCBsaS5wb2xsIHtcclxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xyXG59XHJcblxyXG4jYmxvY2stbWVudS1tZW51LWNvbnRlbnQtbWVudSB1bCBsaSB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBmb250LXNpemU6IDEwOCU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBsaXN0LXN0eWxlOiBvdXRzaWRlIG5vbmUgbm9uZTtcclxuICAgIG9wYWNpdHk6IDAuOTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2UtaW4tb3V0IDBzO1xyXG4gICAgd2lkdGg6IDEwMnB4O1xyXG4gICAgbWFyZ2luOiBhdXRvIDQycHggYXV0byBhdXRvO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG59XHJcblxyXG4jYmxvY2stbWVudS1tZW51LWNvbnRlbnQtbWVudSB1bCBsaSBhIHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICAgIHBhZGRpbmctdG9wOiA3M3B4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAxMDAlO1xyXG59XHJcblxyXG4jYmxvY2stbWVudS1tZW51LWNvbnRlbnQtbWVudSB1bCBsaSBzcGFuIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgZm9udC1zaXplOiA5MyU7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgbGluZS1oZWlnaHQ6IDE2cHg7XHJcbn1cclxuI2Jsb2NrLW1lbnUtbWVudS1jb250ZW50LW1lbnUgdWwgbGkuZG8gYSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoLy93d3cubXlnb3YuaW4vc2l0ZXMvYWxsL3RoZW1lcy9teWdvdi9pbWFnZXMvcm91bmRlZF9pY29ucy5wbmcpIG5vLXJlcGVhdCBzY3JvbGwgY2VudGVyIC00MzNweCAvIDU5cHggYXV0byAjZGM2ODAwO1xyXG59XHJcbi5nYWxsZXJ5e1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDUwJTtcclxufVxyXG4uc2VjdGlvbi1pbmZvIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4ubm90aWZ5LWNvbnRhaW4gdWwgbGkgYXtcclxuICAgIGNvbG9yOiBibGFjaztcclxufVxyXG4ubm90aWZ5LWNvbnRhaW4gdWwgbGkgYSAgOmhvdmVye1xyXG4gICAgY29sb3I6IHJlZCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLXN0YXRlIHtcclxuICAgIGhlaWdodDogNDE0cHggIWltcG9ydGFudDtcclxufVxyXG4uaGVpZ2h0LW5ldyB7XHJcbiAgICBoZWlnaHQ6IDQ1MHB4O1xyXG59XHJcbi52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdzpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZGRkO1xyXG59XHJcblxyXG5cclxuLyogbmV3IGNzcyBmb3IgaG9tZSAqL1xyXG5cclxuLmluZm9jdXMtaW1hZ2Utc2l6ZSB7XHJcbiAgICB3aWR0aDogMjM1cHg7XHJcbiAgICBoZWlnaHQ6IDE2MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG59XHJcbi5pbml0aWFsLWNvbnRlbnRzLW9mLWlubmVycGFnZSB7XHJcbiAgICBkaXNwbGF5OiBpbml0aWFsO1xyXG59XHJcbi5hYm91dC1jb250ZW50IHtcclxuICAgIGhlaWdodDogMjIwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdhNzA3O1xyXG4gIFxyXG59XHJcbi5jbS1zcGVlY2ggaDJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDI4cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcbi5jbS1zcGVlY2ggcHtcclxuICAgIGZvbnQtc2l6ZTogMTlweDtcclxuICAgIHBhZGRpbmc6IDEwcHggOTBweCAwIDkwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG59XHJcbi8qIHNvY2lhbC1jb250ZW50ICovXHJcbi5zb2NpYWwtYm94e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBoZWlnaHQ6IDM4MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgIH1cclxuXHJcbi5zb2NpYWwtdGl0bGV7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcclxufVxyXG4uZmxpcC1ib3gge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHBlcnNwZWN0aXZlOiAxMDAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5mbGlwLWJveC1pbm5lciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjhzO1xyXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcclxuICB9XHJcbiAgXHJcbiAgLmZsaXAtYm94OmhvdmVyIC5mbGlwLWJveC1pbm5lciB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcclxuICB9XHJcbiAgXHJcbiAgLmZsaXAtYm94LWZyb250LCAuZmxpcC1ib3gtYmFjayB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcclxuICB9XHJcbiAgXHJcbiAgLmZsaXAtYm94LWZyb250IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2MjgwYTQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5mbGlwLWJveC1iYWNrIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgIzFmNGE3YyA3MCUsICM0NTg5ZDYgMTAwJSk7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcclxuICB9XHJcbiAgLmZsaXAtYm94LWJhY2sgaDJ7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuICAvKiAuZmxpcC1ib3gtYmFjayBwe1xyXG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcclxuICAgIHBhZGRpbmc6IDAgMTdweCAwIDE3cHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgfSAqL1xyXG4gIC5mbGlwLXBhcmExe1xyXG4gICAgcGFkZGluZzogMHB4IDE3cHggMTNweCAxN3B4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC5mbGlwLXBhcmExIGF7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAwIDVweDtcclxuICAgIHdpZHRoOiA3NXB4O1xyXG4gICAgaGVpZ2h0OiAyMnB4O1xyXG4gIH1cclxuICAuZmxpcC1wYXJhMSBhOmhvdmVye1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2E3MDc7XHJcbiAgICBwYWRkaW5nOiAwIDVweDtcclxuICAgIHdpZHRoOiA3NXB4O1xyXG4gICAgaGVpZ2h0OiAyMnB4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICAuZmxpcC1ib3gtYmFjayBwIHtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbiAgICBwYWRkaW5nOiAwcHggMTdweCAxNXB4IDE3cHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuLmZsaXAtYm9yZGVyIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcblxyXG4gIFxyXG4uaGVhZC1pbmZvLWluZm9jdXMge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IDQycHggMCAxMHB4IC02cHg7XHJcbiAgICBmb250LXNpemU6IDIzcHg7XHJcbiAgICBjb2xvcjogIzFmNDk3YjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbi5iYWNrZ3JvdW5kLWhpZ2hsaWdodCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG59XHJcbi5pbmZvY3VzLWVhY2gtYmxvY2sge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDsgIFxyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbn1cclxuXHJcbi5tYXJnaW4tdG9wLWluZm9jdXMtYmxvY2stMiB7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG4uZGlzcGxheS1pbmxpbmUtaW5mb2N1cyB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIG1hcmdpbi10b3A6IDUwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xyXG59XHJcblxyXG4uaW5mb2N1cy1ibG9jay10aXRsZSB7XHJcbiAgICBwYWRkaW5nOiA4cHggMCAwIDE4cHg7XHJcbiAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICBjb2xvcjogIzFmNDk3YjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbi5zb2NpYWwtaGVhZGluZ3tcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xyXG59XHJcblxyXG4uaW5mb2N1cy1ibG9jay1pbml0aWFsLWNvbnRlbnRzLWJsb2NrIHtcclxuICAgIHBhZGRpbmc6IDAgMTVweCAwIDEycHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG59XHJcblxyXG4gIC5ibG9jay13aXRoLXRleHQ6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6ICcuLi4nO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgfVxyXG4gIC5ibG9jay13aXRoLXRleHQ6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICByaWdodDogMDtcclxuICAgIHdpZHRoOiAxZW07XHJcbiAgICBoZWlnaHQ6IDFlbTtcclxuICAgIG1hcmdpbi10b3A6IDAuMmVtO1xyXG4gIH1cclxuICAuZGlzdC1ibG9jay1yZWFkLW1vcmUtYnRuIHtcclxuICAgICAgbWFyZ2luLXRvcDogNzhweDtcclxuICB9XHJcbiAgXHJcbi5yZWFkLW1vcmUtYnRuIHtcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIGJhY2tncm91bmQ6ICNkZGQwO1xyXG4gICAgY29sb3I6ICMwMDAgIWltcG9ydGFudDtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICBwYWRkaW5nOiA2cHg7XHJcbn1cclxuLnJlYWQtbW9yZS1idG46aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogIzFmNDk3YjtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggMnB4ICNkNGQzZDM7XHJcbiAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xyXG59XHJcbi5kaXN0LXJlYWQtbW9yZS1idG46aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogIzFmNDk3YiAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcclxufVxyXG4uZmEtYW5nbGUtcmlnaHR7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBtYXJnaW46IC00cHggMHB4IDAgM3B4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLWJsb2NrIHtcclxuICAgIHBhZGRpbmctbGVmdDogOHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcclxufVxyXG4uaW1hZ2UtYm9yZGVyIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICBib3gtc2hhZG93OiAwcHggNXB4IDVweCAzcHggI2RkZDtcclxufSBcclxuLmluZm9jdXMtZWFjaC1ibG9jay1kaXN0IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICBtYXgtd2lkdGg6IDQ3LjglO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG59XHJcbi5pbmZvY3VzLWVhY2gtYmxvY2stZGlzdDpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZGRkO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDNweCAycHggI2Q0ZDNkMztcclxufVxyXG4ubm90aWNlLWFuY2hye1xyXG4gICAgY29sb3I6ICMxZjRhN2M7XHJcbn1cclxuXHJcbi5ub3RpY2UtYW5jaHI6aG92ZXIge1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICBcclxufVxyXG5cclxuLnN1Yi1zaXRlcyB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHggMDtcclxufVxyXG5cclxuLnN1Yi1zaXRlcyBsaSB7XHJcbiAgICBwYWRkaW5nOiAwIDEwcHg7XHJcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM2YjZjNmY7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxufVxyXG5cclxuLnN1Yi1zaXRlcyBsaTpmaXJzdC1jaGlsZCxcclxuLmZvb3Rlci1sb2dvIGxpOmZpcnN0LWNoaWxkIHtcclxuICAgIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLnN1Yi1zaXRlczphZnRlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDApIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSg2LCA0NywgNjAsIDAuMDEpIDAlLCByZ2JhKDQ1LCA3NSwgMTAwLCAwLjk4KSA1MCUsICMyYzRhNjMgNTElLCByZ2JhKDYsIDQ3LCA2MCwgMC4wMSkgMTAwJSkgcmVwZWF0IHNjcm9sbCAwIDA7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBoZWlnaHQ6IDFweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5mb290ZXItbG9nbyB7XHJcbiAgICBwYWRkaW5nOiA3cHggMTVweCAwO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uZm9vdGVyLWxvZ28gbGkge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMjgyODJhO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcGFkZGluZzogMCAxMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogN3B4O1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcbi5hZF9mb290ZXJfYmxvY2sge1xyXG4gICAgd2lkdGg6IDk0JSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtY29udHJvbC1wcmV2IHtcclxuICAgIGxlZnQ6IC01NnB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLWdhcCB7XHJcbiAgICBtYXJnaW4tdG9wOiAtMjRweDtcclxuICAgIG1hcmdpbi1ib3R0b206IC02N3B4O1xyXG59XHJcbi5mb290ZXItaW1hZ2Uge1xyXG4gICAgd2lkdGg6IDc4JSAhaW1wb3J0YW50O1xyXG59XHJcbmEubm90aWNlLWFuY2hyIHtcclxuICAgIGNvbG9yOiByZ2IoMTksIDMxLCAyMDYpO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG5hLm5vdGljZS1hbmNocjpob3ZlciB7XHJcbiAgICBjb2xvcjogcmdiKDE5LCAzMSwgMjA2KTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG59XHJcbi5pbmZvY3VzLWltYWdlLXNpemV7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTYwcHg7XHJcbn1cclxuLnBlcmNlbnR7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBsaW5lLWhlaWdodDogMjRweDtcclxuICAgIGZvbnQtZmFtaWx5OiAnYW50b24nO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDVweDtcclxufVxyXG5cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KXtcclxuLmRpc3QtYmxvY2t7XHJcbiAgICBwYWRkaW5nOiAwIDExcHggMHB4IDIxcHg7XHJcbn1cclxuLnBob3RvLWdhbGxlcnktaG9tZSB7XHJcbiAgICBoZWlnaHQ6IDE0NXB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmdhbGxlcnktc2VjdGlvbi5wYWRkaW5nLWJvdHRvbS1jbHMge1xyXG4gICAgcGFkZGluZzogMCAxN3B4IDAgN3B4O1xyXG59XHJcbi5wYWRkaW5nLWJvdHRvbS1jbHMge1xyXG4gICAgcGFkZGluZzogMCAyMnB4IDAgMDtcclxufVxyXG4uZm9vdGVyLXdyYXBwZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMzVweCAhaW1wb3J0YW50O1xyXG59XHJcbi5tYXJnaW4tdG9wLWZvb3Rlci1sb2dvIHtcclxuICAgIG1hcmdpbi10b3A6IDRweCAhaW1wb3J0YW50O1xyXG59XHJcbiNibG9jay12aWV3cy1mZWF0dXJlZC10YXNrLWJsb2NrLTUgaDIge1xyXG4gICAgY29sb3I6ICMzODM4Mzg7XHJcbiAgICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcclxufVxyXG4jYmxvY2stY29tbW9uLXV0aWxzLW15Z292LXN0YXRpc3RpY3MtYmxvY2s6YmVmb3JlLCAjYmxvY2stdmlld3MtZmVhdHVyZWQtdGFzay1ibG9jay01OmJlZm9yZSB7XHJcbiAgICB3aWR0aDogNzdweDtcclxuICAgIGhlaWdodDogODJweDtcclxuICAgIG1hcmdpbjogLTQwcHggMCAwIC00MnB4O1xyXG59XHJcbi5xdWljay1ybmR7XHJcbiAgICBtYXJnaW46IDUlIDAgNyUgNSU7XHJcbn1cclxuLnR3aXR0ZXItdmlld3tcclxuICAgIHBhZGRpbmctdG9wOiA0cHg7XHJcbn1cclxuLm5vdGlmaWNhdGlvbi1ibG9jay1sc3R7XHJcbiAgICBoZWlnaHQ6IDM3OHB4O1xyXG4gICB9XHJcblxyXG4uc29jaWFscG5sIHtcclxuICAgIHBhZGRpbmc6IDVweCAxMnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMTVweDtcclxuICAgIGhlaWdodDogMzRweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxufVxyXG5pbWcuaW1nLXJlc3BvbnNpdmUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuICAuaW1nLXJlc3BvbnNpdmV7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XHJcbiAgfVxyXG4gIC5mbGlwLWJveC1iYWNrIGgye1xyXG4gICAgcGFkZGluZy10b3A6IDE1cHg7XHJcbn1cclxuICAuZmxpcC1ib3gtYmFjayBwIHtcclxuICAgIHBhZGRpbmc6IDAgMTVweCAwIDE1cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjBweDtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxufVxyXG4uZmxpcC1wYXJhMXtcclxuICAgIHBhZGRpbmc6IDBweCAxN3B4IDEycHggMTdweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuLmNtLXNwZWVjaCBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgIHBhZGRpbmc6IDEwcHggNjBweCAwIDYwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG59XHJcblxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MXB4KXtcclxuICAgIC5zbGlkZXItaW1nIHtcclxuICAgICAgICBwYWRkaW5nOiAwIDE1cHggMzZweCAwO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIH1cclxuICAgIC5yZWFkLW1vcmUtYnRue1xyXG4gICAgICAgIHBhZGRpbmc6IDRweDtcclxuICAgIH1cclxuICAgIC5xdWljay1ybmQge1xyXG4gICAgICAgIG1hcmdpbjogNSUgMCA3JSA1JTtcclxuICAgIH1cclxuICAgIC5ub3RpZmljYXRpb24tYmxvY2stbHN0e1xyXG4gICAgICAgIGhlaWdodDogNDI0cHg7XHJcbiAgICB9XHJcbiAgICAuc29jaWFscG5sIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogODhweDtcclxuICAgIH1cclxuICAgIC5hYm91dC1jb250ZW50e1xyXG4gICAgICAgIGhlaWdodDogMjIycHg7XHJcbiAgICB9XHJcbiAgICAuY20tc3BlZWNoIHAge1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggNjBweCAwIDYwcHg7XHJcbiAgICB9XHJcbiAgICAuZmxpcC1ib3gtYmFjayBwe1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDAgMTVweCAwIDE1cHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCl7XHJcbiAgICAudmlldy1pZC1mZWF0dXJlZF90YXNrIC52aWV3cy1yb3c6aG92ZXIgLmdyb3VwX2ZlYXR1cmVkLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC52aWV3cy1yb3c6aG92ZXIgLmRpc2N1c3NfZmVhdHVyZWQsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdzpob3ZlciwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudmlld3Mtcm93OmhvdmVyIC5wb2xsX2ZlYXR1cmVkLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC52aWV3cy1yb3c6aG92ZXIgLnRhbGtfZmVhdHVyZWQsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdzpob3ZlciAuYmxvZ19mZWF0dXJlZCB7XHJcbiAgICAgICAgbWluLWhlaWdodDogMzgwcHg7XHJcbiAgICB9XHJcbiAgICAuZGlzcGxheS1pbmxpbmUtaW5mb2N1cyB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbiAgICAuaW5mb2N1cy1lYWNoLWJsb2NrIHtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICB9XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIGFuZCAobWluLXdpZHRoOiA0ODBweCl7XHJcbi5mcm9udCAuY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG4ucm5keyAgICAgIFxyXG4gICAgbWFyZ2luOiA1JSAwIDclIDUwJSAhaW1wb3J0YW50O1xyXG59XHJcbn1cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0NzlweCl7XHJcbi52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdzpob3ZlciAuZ3JvdXBfZmVhdHVyZWQsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdzpob3ZlciAuZGlzY3Vzc19mZWF0dXJlZCwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudmlld3Mtcm93OmhvdmVyIC5kb19mZWF0dXJlZCwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudmlld3Mtcm93OmhvdmVyIC5wb2xsX2ZlYXR1cmVkLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC52aWV3cy1yb3c6aG92ZXIgLnRhbGtfZmVhdHVyZWQsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdzpob3ZlciAuYmxvZ19mZWF0dXJlZCB7XHJcbiAgICBtaW4taGVpZ2h0OiA3MHB4O1xyXG59XHJcbi52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdyAuZ3JvdXBfaW1hZ2UsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnZpZXdzLXJvdyAudGFsa19pbWFnZSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudmlld3Mtcm93IC5kb19pbWFnZSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAudmlld3Mtcm93IC5kaXNjdXNzX2ltYWdlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC52aWV3cy1yb3cgLmJsb2dfaW1hZ2Uge1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICB3aWR0aDogOTBweDtcclxuICAgIG1hcmdpbi1yaWdodDogLTEwMCU7XHJcbn1cclxuLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZ3JvdXBfdGl0bGUgYSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZGlzY3Vzc190aXRsZSBhLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5kb190aXRsZSBhLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC50YXNrX3RpdGxlIGEsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnBvbGxfdGl0bGUgYSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuYmxvZ190aXRsZSBhLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC50YWxrX3RpdGxlIGEge1xyXG4gICAgZm9udC1zaXplOiAxM3B4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZ3JvdXBfdGl0bGUgYSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZGlzY3Vzc190aXRsZSBhLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5kb190aXRsZSBhLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC50YXNrX3RpdGxlIGEsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLnBvbGxfdGl0bGUgYSwgLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuYmxvZ190aXRsZSBhLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC50YWxrX3RpdGxlIGEge1xyXG4gICAgZm9udC1zaXplOiAxM3B4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLnZpZXctaWQtZmVhdHVyZWRfdGFzayAuZ3JvdXBfdGl0bGUsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLmRpc2N1c3NfdGl0bGUsIC52aWV3LWlkLWZlYXR1cmVkX3Rhc2sgLmRvX3RpdGxlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC50YXNrX3RpdGxlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5wb2xsX3RpdGxlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC50YWxrX3RpdGxlLCAudmlldy1pZC1mZWF0dXJlZF90YXNrIC5ibG9nX3RpdGxlIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi1sZWZ0OiA5NXB4O1xyXG4gICAgcGFkZGluZzogM3B4IDVweCAwICFpbXBvcnRhbnQ7XHJcbiAgICBtYXgtaGVpZ2h0OiAzNHB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xyXG59XHJcbi5jb250YWluZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcbn1cclxuXHJcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6NjQwcHgpIHtcclxuICAgIC5zdWItc2l0ZXMgbGksXHJcbiAgICAuc3ViLXNpdGVzIGxpOmZpcnN0LWNoaWxkIHtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMyYzRhNjM7XHJcbiAgICB9XHJcbiAgICAuc3ViLXNpdGVzIHtcclxuICAgICAgICBwYWRkaW5nOiAxNXB4IDEwcHggNXB4O1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOjU2N3B4KSB7XHJcbiAgICAuZm9vdGVyLWxvZ28ge1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgcGFkZGluZzogMTBweCA1cHggMDtcclxuICAgIH1cclxuICAgIC5mb290ZXItbG9nbyBsaSB7XHJcbiAgICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgICBib3JkZXItbGVmdDogbm9uZTtcclxuICAgICAgICBwYWRkaW5nOiAwcHg7XHJcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgICB9XHJcbiAgICAuZm9vdGVyLWxvZ28gbGk6bnRoLWNoaWxkKDJuKzIpIHtcclxuICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMyODI4MmE7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCl7XHJcbiAgICAubm90aWZpY2F0aW9uLWJsb2NrLWxzdHtcclxuICAgICAgICBoZWlnaHQ6IDU0NHB4O1xyXG4gICAgfVxyXG4gICAgLmRpc3QtYmxvY2stcmVhZC1tb3JlLWJ0bltfbmdjb250ZW50LWM0XSB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMjZweDtcclxuICAgIH1cclxuICAgIC8qIC5jaXJjbGUge1xyXG4gICAgICAgIGZsZXg6IDAgMCAzNCU7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAzOSU7XHJcbiAgICB9XHJcbiAgICAucXVpY2stc3RhcnQtaW57XHJcbiAgICAgICAgbWFyZ2luOiAwIDAgMCA1MCU7XHJcbiAgICB9ICovXHJcbiAgICAucXVpY2stcm5ke1xyXG4gICAgICAgIG1hcmdpbjogNSUgMCA3JSAtMTIlICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAucm5ke1xyXG4gICAgICAgIHdpZHRoOiAxODBweDtcclxuICAgICAgICBoZWlnaHQ6IDE4MHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICBib3JkZXI6IDdweCBzb2xpZCB3aGl0ZTtcclxuICAgIH1cclxuICAgIC5zb2NpYWxwbmx7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcbiAgICB9XHJcbiAgICAuYWJvdXQtY29udGVudHtcclxuICAgICAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICB9XHJcbiAgICAuc29jaWFsLWNvbnRlbnQgLmNvbC1tZC00IHtcclxuICAgICAgICAtbXMtZmxleDogMCAwIDMzLjMzMzMzMyU7XHJcbiAgICAgICAgLXdlYmtpdC1ib3gtZmxleDogMDtcclxuICAgICAgICBmbGV4OiAxIDAgNjQuMzMzMzMzJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICBpbWcuaW1nLXJlc3BvbnNpdmUge1xyXG4gICAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgfVxyXG4gICAgLnNvY2lhbHBubCB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDQ4MHB4O1xyXG4gICAgfVxyXG4gICAgLmNvdW50IHtcclxuICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICB9XHJcbiAgICAuc3ViLXRpdGxlIHtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB9XHJcbiAgICAuY20tc3BlZWNoIGgyIHtcclxuICAgICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICB9XHJcbiAgICAuY20tc3BlZWNoIHAge1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggNTBweCAwIDUwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgfVxyXG4gICAgLmZsaXAtYm94LWJhY2sgcCB7XHJcbiAgICAgICAgcGFkZGluZzogMTVweCA0NXB4IDE1cHggNDVweDtcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICB9XHJcbiAgICAuZmxpcC1wYXJhMSB7XHJcbiAgICAgICAgcGFkZGluZzogMHB4IDQ1cHggNTBweCA0NXB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuZmxpcC1ib3JkZXIge1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gICAgICAgIG1hcmdpbjogNjBweDtcclxuICAgIH1cclxuICAgIC5wZXJjZW50IHtcclxuICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwOHB4KXtcclxuICAgIC5pbmZvY3VzLWVhY2gtYmxvY2t7XHJcbiAgICAgICAgcGFkZGluZzogMzBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIH1cclxuICAgIC5pbmZvY3VzLWVhY2gtYmxvY2stZGlzdCB7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlOyAgICAgIFxyXG4gICAgfVxyXG4gICAgLmZvb3Rlci1pbWFnZXtcclxuICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLndyYXBwZXItaW1hZ2V7XHJcbiAgICAgICAgd2lkdGg6IDI1JTtcclxuICAgIH1cclxuICAgIC5zdWItc2l0ZXNbX25nY29udGVudC1jNF0gbGlbX25nY29udGVudC1jNF0sIC5zdWItc2l0ZXNbX25nY29udGVudC1jNF0gbGlbX25nY29udGVudC1jNF06Zmlyc3QtY2hpbGR7XHJcbiAgICAgICAgcGFkZGluZzogMCU7XHJcbiAgICB9XHJcbiAgICAuZm9vdGVyLWxvZ29bX25nY29udGVudC1jNF17XHJcbiAgICAgICAgcGFkZGluZzogMCU7XHJcbiAgICB9XHJcbiAgICAuc29jaWFsLCAudHdpdHRlcntcclxuICAgICAgICB3aWR0aDogNTAlO1xyXG4gICAgfVxyXG4gICAgLnJuZHtcclxuICAgICAgICB3aWR0aDogMjAwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcclxuICAgICAgICBtYXJnaW46IDUlIDAgNyUgMzAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIGJvcmRlcjogN3B4IHNvbGlkIHdoaXRlO1xyXG4gICAgfVxyXG4gICAgLyogLmNpcmNsZSB7XHJcbiAgICAgICAgZmxleDogMCAwIDM0JTtcclxuICAgICAgICBtYXgtd2lkdGg6IDM5JTtcclxuICAgIH1cclxuICAgIC5xdWljay1zdGFydC1pbntcclxuICAgICAgICBtYXJnaW46IDAgMCAwIDUwJTtcclxuICAgIH0gKi9cclxuICAgIC5hYm91dC1jb250ZW50IHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdhNzA3O1xyXG4gICAgICAgIG1hcmdpbjogMCAwIDQwcHggMDtcclxuICAgIH1cclxuICAgIC5zb2NpYWxwbmwge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAzMzBweDtcclxuICAgIH1cclxuICAgIC5jb3VudCB7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDUycHg7XHJcbiAgICB9XHJcbiAgICAuZmxpcC1ib3JkZXIge1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gICAgICAgIG1hcmdpbjogMzBweDtcclxuICAgIH1cclxuICAgIC5xdWljay1ybmQge1xyXG4gICAgICAgIG1hcmdpbjogNSUgMCA3JSAtOSUgIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgICBcclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDU2MHB4KXtcclxuICAgIC5oZWFkLXRpdGxle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmxlZnQtbG9nby1iYmJwe1xyXG4gICAgICAgIHdpZHRoOiA1MCUgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5mb290ZXItd3JhcHBlciB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMzVweCAhaW1wb3J0YW50O1xyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICAvKiAuY2lyY2xlIHtcclxuICAgICAgICBmbGV4OiAwIDAgMTAwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAucXVpY2stc3RhcnQtaW57XHJcbiAgICAgICAgbWFyZ2luOiAwIDAgMCA1MCU7XHJcbiAgICB9ICovXHJcbiAgICAucm5keyAgICAgIFxyXG4gICAgICAgIG1hcmdpbjogNSUgMCA3JSAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuc29jaWFscG5sIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMjkwcHg7XHJcbiAgICB9XHJcbiAgICAuY20tc3BlZWNoIGgyIHtcclxuICAgICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICB9XHJcbiAgICAuY20tc3BlZWNoIGgyIHtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB9XHJcbiAgICAuY20tc3BlZWNoIHAge1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggNDBweCAwIDQwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG4gICAgLmZsaXAtYm94LWJhY2sgaDIge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH1cclxuICAgIC5mbGlwLWJveC1iYWNrIHAge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIH1cclxuICAgIC5xdWljay1ybmQge1xyXG4gICAgICAgIG1hcmdpbjogNSUgMCA3JSAtOCUgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5xdWljay1zdGFydC1pbiB7XHJcbiAgICAgICAgcGFkZGluZzogMCAwIDAgMCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmNvdW50e1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAwO1xyXG4gICAgfVxyXG4gICAgLnBlcmNlbnQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjhweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTEwcHg7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0ODBweCl7XHJcbiAgICAucm5keyAgICAgIFxyXG4gICAgICAgIG1hcmdpbjogNSUgMCA3JSA4MCUgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5zb2NpYWxwbmwge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMjVweDtcclxuICAgIH1cclxuICAgIC5jbS1zcGVlY2ggaDIge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTlweDtcclxuICAgIH1cclxuICAgIC5jbS1zcGVlY2ggcCB7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAzMHB4IDAgMzBweDtcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICB9XHJcbiAgICAuZmxpcC1ib3gtYmFjayBwIHtcclxuICAgICAgICBwYWRkaW5nOiAxNXB4IDE1cHggNDBweCAxNXB4O1xyXG4gICAgfVxyXG4gICAgLmZsaXAtcGFyYTEge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCA0NXB4IDI2cHggNDVweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmZsaXAtYm9yZGVyIHtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZDtcclxuICAgICAgICBtYXJnaW46IDIwcHg7XHJcbiAgICB9XHJcblxyXG59XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzYwcHgpe1xyXG5cclxuICAgIC5zb2NpYWwtcGFuZWwge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDgwcHg7XHJcbiAgICB9XHJcbiAgICAuc29jaWFsLWJveCB7XHJcbiAgICAgICAgaGVpZ2h0OiAzODBweDtcclxuICAgIH1cclxuICAgIC5jbS1zcGVlY2ggaDIge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIH1cclxuICAgIC5jbS1zcGVlY2ggcCB7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAxNXB4IDAgMTVweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIH1cclxuICAgIC5zb2NpYWxwbmwge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxODBweDtcclxuICAgIH1cclxuICAgIC5ybmQge1xyXG4gICAgICAgIG1hcmdpbjogNSUgMCA3JSA0NSUgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5mbGlwLWJveC1iYWNrIHAge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCAyNXB4IDlweCAyNXB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIH1cclxuICAgIC5mbGlwLXBhcmExIHtcclxuICAgICAgICBwYWRkaW5nOiAwcHggMzBweCAyNXB4IDMwcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5mbGlwLWJvcmRlciB7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQ7XHJcbiAgICAgICAgbWFyZ2luOiAxMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<style>\r\n    #infocus-area:before {\r\n        width: 88px;\r\n        height: 85px;\r\n        position: absolute;\r\n        overflow: hidden;\r\n        background: url(./assets/icons/bbbp_in-focus_icon_design-3.png) no-repeat;\r\n        left: 50%;\r\n        background-size: 100%;\r\n        content: '';\r\n        margin: -53px 0 0 -54px;\r\n    }\r\n</style>\r\n\r\n\r\n<!-- <div *ngIf=\"appService.logoutSuccess\" style=\"border: 1px solid #549054; background: #ddd; text-align: center;\">\r\n    Successfully logged out.\r\n</div> -->\r\n\r\n<div id=\"demo\" class=\"carousel slide\" data-ride=\"carousel\">\r\n\r\n    <!-- The slideshow -->\r\n    <div class=\"carousel-inner\">\r\n        <!-- <div class=\"carousel-item active\">\r\n            <img src=\"assets/images/banners/Banner-1.jpg\" alt=\"SOSO\">\r\n        </div> -->\r\n        <div class=\"carousel-item active\">\r\n            <img src=\"assets/images/banners/Banner-2.jpg\" alt=\"SOSO\">\r\n        </div>\r\n        <div class=\"carousel-item\">\r\n            <img src=\"assets/images/banners/Banner-3.jpg\" alt=\"SOSO\">\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Left and right controls -->\r\n    <a class=\"carousel-control-prev\" href=\"#demo\" data-slide=\"prev\">\r\n        <span class=\"carousel-control-prev-icon\"></span>\r\n    </a>\r\n    <a class=\"carousel-control-next\" href=\"#demo\" data-slide=\"next\">\r\n        <span class=\"carousel-control-next-icon\"></span>\r\n    </a>\r\n</div>\r\n\r\n\r\n<div class=\"container-fluid about-content\">\r\n    <div class=\"row about-speech\">\r\n        <div class=\"col-md-12 cm-speech\">\r\n            <h2>Sanitation In Odisha</h2>\r\n            <p>Odisha started out with an Rural Sanitation Coverage of 11% on 2nd October 2014.\r\n                As on date Odisha has achieved over 72% Sanitation coverage. Five districts\r\n                (Debagarh, Jharsuguda, Baleswar, Sambalpur and Kandhamal) have achieved 100%\r\n                Sanitation Coverage. Over 1500 GPs and more than 17,000 villages across the state\r\n                have been declared ODF. Since April, 2017 more than 2 million individual household\r\n                latrines (IHHLs) have been constructed in the State.</p>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n<div class=\"container social-panel background-highlight\">\r\n    <div class=\"row social-content\">\r\n        <div class=\"col-md-4 \">\r\n            <div class=\"social-box\">\r\n                <div class=\"flip-box\">\r\n                    <div class=\"flip-box-inner\">\r\n                        <div class=\"flip-box-front\">\r\n                            <img class=\"img-responsive\" alt=\"soso\" src=\".\\assets\\images\\gallery\\box-1.jpg\">\r\n                        </div>\r\n                        <div class=\"flip-box-back\">\r\n                            <div class=\"flip-border\">\r\n                                <h2>SOSO </h2>\r\n                                <p class=\"flip-para1\">On 25th August 2018, the Hon’ble Chief Minister of Odisha gave the clarion call of Swachha Odisha Sustha Odisha (SOSO). SOSO is a holistic approach to ensure availability and sustainable management of water and sanitation for all in lines with the Sustainable Development Goals - 6 of the United Nations.\r\n                                    <br><br>The aim of Swachha Odisha Sustha Odisha is to improve the standard of living of the people of rural Odisha and to ensure that all villages in Odisha are clean and green villages. \r\n                                <br><br>\r\n                                <a routerLink=\"/soso\" >Read more</a>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-4 \">\r\n            <div class=\"social-box\">\r\n                <div class=\"flip-box\">\r\n                    <div class=\"flip-box-inner\">\r\n                        <div class=\"flip-box-front\">\r\n                            <img class=\"img-responsive\" alt=\"sbm\" src=\".\\assets\\images\\gallery\\box-2.jpg\">\r\n                        </div>\r\n                        <div class=\"flip-box-back\">\r\n                            <div class=\"flip-border\">\r\n                                <h2>SBM(G)</h2>\r\n                                <p class=\"flip-para1\">To accelerate the efforts to achieve universal sanitation coverage and to put focus on sanitation, the Hon'ble Prime Minister of India, Shri Narendra Modi, launched the Swachh Bharat Mission on 2nd October, 2014. The Mission aims to achieve a Swachh Bharat by 2019, as a fitting tribute to Mahatma Gandhi on his 150th birth anniversary. In Rural India this would mean making villages Open-Defecation Free (ODF), improving the levels of cleanliness through Solid and Liquid Waste Management activities, and ensuring clean and sanitized villages.\r\n                                    <br><br>\r\n                                    <a routerLink=\"/about-us\">Read more</a>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-4 \">\r\n            <div class=\"col-md-12 social-box\">\r\n                <div class=\"row social-heading\">\r\n                    <h4 class=\"infocus-block-title\">Social </h4>\r\n                    <a href=\"\" id=\"tw-button\" class=\"socialpnl\"><i class=\"fa fa-twitter\" aria-hidden=\"true\"></i>\r\n                        twitter</a>\r\n                </div>\r\n                <div class=\"col-md-12 twittwer-post\">\r\n                    <a class=\"twitter-timeline\" data-height=\"300\" href=\"https://twitter.com/sbmodisha?ref_src=twsrc%5Etfw\">Tweets\r\n                        by sbmodisha</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"container-fluid \">\r\n    <div class=\"row quick-stats\">\r\n        <div class=\"col-md-3 col-sm-6 col-12 circle\">\r\n            <div class=\"quick-start-in\">\r\n                <div class=\"quick-rnd\" >\r\n                    <img class=\"rnd\" src=\"assets/images/gallery/rnd-1.jpg\">\r\n                </div>\r\n                <span class=\"count\">{{staticService.quickVal.coverage}}</span><span class=\"percent\"> %</span>\r\n                <br>\r\n                <span class=\"sub-title\">Coverage</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-3 col-sm-6 col-12 circle\">\r\n            <div class=\"quick-start-in\">\r\n                <div class=\"quick-rnd\">\r\n                    <img class=\"rnd\" src=\"assets/images/gallery/rnd-2.jpg\">\r\n                </div>\r\n                <span class=\"count\">{{staticService.quickVal.geoTagging}}</span><span class=\"percent\"> %</span>\r\n                <br>\r\n                <span class=\"sub-title\">Geo Tagging</span>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-3 col-sm-6 col-12 circle\">\r\n            <div class=\"quick-start-in\">\r\n                <div class=\"quick-rnd\">\r\n                    <img class=\"rnd\" src=\"assets/images/gallery/rnd-3.jpg\">\r\n                </div>\r\n                <span class=\"count\">{{staticService.quickVal.odfDeclaredVillage}}</span>\r\n                <br>\r\n                <span class=\"sub-title\">ODF Declared Village</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-3 col-sm-6 col-12 circle\">\r\n            <div class=\"quick-start-in\">\r\n                <div class=\"quick-rnd\">\r\n                    <img class=\"rnd\" src=\"assets/images/gallery/rnd-4.jpg\">\r\n                </div>\r\n                <span class=\"count\"> {{staticService.quickVal.noOfSwachhagrahi}} </span>\r\n                <br>\r\n                <span class=\"sub-title\">No. of Swachhagrahi </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_static_home_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/static-home.service */ "./src/app/service/static-home.service.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");





var HomeComponent = /** @class */ (function () {
    function HomeComponent(app, staticServiceProvider, router) {
        this.app = app;
        this.staticServiceProvider = staticServiceProvider;
        this.router = router;
        this.whatnew = "What's New";
        this.homeHindiDetails = [];
        this.initTwitterWidget();
        this.appService = app;
        this.staticService = staticServiceProvider;
    }
    HomeComponent.prototype.initTwitterWidget = function () {
        this.twitter = this.router.events.subscribe(function (val) {
            if (val instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                window.twttr = (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
                    if (d.getElementById(id))
                        return t;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "https://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                    t._e = [];
                    t.ready = function (f) {
                        t._e.push(f);
                    };
                    return t;
                }(document, "script", "twitter-wjs"));
                if (window.twttr.ready())
                    window.twttr.widgets.load();
            }
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        //  this.staticService.getData("Home").subscribe(data=>{
        //   this.staticService.reinitializeData(data);
        var _this = this;
        // })
        // this.rotateNumber();
        this.twitter.unsubscribe();
        if (!this.staticService.quickStarts) {
            this.staticService.getQuickStarts().subscribe(function (data) {
                _this.staticService.quickStarts = data;
                _this.staticService.quickVal = _this.staticService.quickStarts.QuickStart;
                setTimeout(function () {
                    if ($('.count').offset()) {
                        var oTop = $('.count').offset().top - window.innerHeight;
                        if ($(window).scrollTop() > oTop) {
                            _this.startCount();
                        }
                    }
                }, 200);
            });
        }
    };
    // getNewsContent(item){
    //   this.staticService.whatsNewCategory = item;
    //    this.router.navigate(['pages/whatsnewcontent']);
    // }
    HomeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $(window).scroll(function () {
            if ($('.count').offset()) {
                var oTop = $('.count').offset().top - window.innerHeight;
                if (!_this.staticService.countLoaded && _this.staticService.quickStarts && $(window).scrollTop() > oTop) {
                    _this.startCount();
                }
            }
        });
    };
    HomeComponent.prototype.startCount = function () {
        $('.count').each(function (index) {
            var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 5000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(parseFloat(now).toFixed(size));
                }
            });
        });
        this.staticService.countLoaded = true;
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"], _service_static_home_service__WEBPACK_IMPORTED_MODULE_3__["StaticHomeService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div style=\"padding-bottom: 34%\"> -->\n<div class=\"container\"> \n<div class=\"login-form-container\">\n  <header class=\"col-lg-12 login-header\" style=\"text-align:center;\"><strong>User Login</strong></header>\n  <div class=\"container-body\">     \n    <form (submit)=\"login()\" [noValidate]=\"false\">  \n        <div class=\"row\">\n            <div class=\"col login-pwd\">\n                <label for=\"usr\">Username:</label>\n                <mat-form-field>\n                    <input matInput [(ngModel)]=\"credentials.username\" maxlength=\"15\" name='username' required>\n                </mat-form-field>\n                                \n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col login-pwd\">\n                <label for=\"pwd\">Password:</label>\n                <mat-form-field>\n                    <input matInput type=\"password\" name=\"password\" [(ngModel)]=\"credentials.password\"required>\n                </mat-form-field>\n                \n            </div>\n        </div>\n        <div class=\"form-group row\">\n          <div class=\"col\">\n            <button mat-button class=\"btn btn-default login-submit\" type=\"submit\">Submit</button>\n          </div>\n        </div>\n    </form>\n    <div class=\"row error-message\" *ngIf=\"app.validationMsg\">\n        <div class=\"col\">\n            <b>{{app.validationMsg}}</b>\n        </div>        \n    </div>\n  </div>\n</div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-form-container {\n  height: auto;\n  background-color: white;\n  box-shadow: -1px 3px 25px gray;\n  position: absolute;\n  width: 350px;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n\n.login-submit {\n  width: 100%;\n  margin: 25px 0 -10px;\n  padding: 0.65rem 2.13rem;\n  background-color: #234a7c;\n  color: #FFF; }\n\n.login-header {\n  height: 50px;\n  padding: 10px;\n  color: #444444;\n  font-family: sans-serif;\n  font-size: x-large; }\n\n.container-body {\n  padding: 20px;\n  padding-top: 0; }\n\n.error-message {\n  text-align: center;\n  color: #f54848; }\n\n.forgotpass {\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  color: #1f497b; }\n\n.container-fluid {\n  padding: 250px; }\n\n.login-pwd .mat-form-field {\n  width: 100%; }\n\n.login-pwd input[type=password] {\n  border: none;\n  height: 18px; }\n\n.login-header strong {\n  font-weight: bolder;\n  color: #234a7c; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vRDpcXHNibV8xMDBfdWlfZGV2XFxzYm0xMDAvc3JjXFxhcHBcXGxvZ2luXFxsb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQVk7RUFDWix3QkFBdUI7RUFDdkIsK0JBQStCO0VBQy9CLG1CQUFrQjtFQUNsQixhQUFZO0VBQ1osU0FBUTtFQUNSLFVBQVM7RUFDVCx5Q0FBZ0M7VUFBaEMsaUNBQWdDLEVBRWpDOztBQUNEO0VBQ0UsWUFBVztFQUNYLHFCQUFvQjtFQUNwQix5QkFBd0I7RUFDeEIsMEJBQXlCO0VBQ3pCLFlBQVcsRUFDWjs7QUFFRDtFQUNFLGFBQVk7RUFDWixjQUFhO0VBQ2IsZUFBYztFQUNkLHdCQUF1QjtFQUN2QixtQkFBa0IsRUFDbkI7O0FBQ0Q7RUFDRSxjQUFhO0VBQ2IsZUFBYyxFQUNmOztBQUVEO0VBQ0UsbUJBQWtCO0VBQ2xCLGVBQXVCLEVBRXhCOztBQUNEO0VBQ0UsZ0JBQWU7RUFDZixnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixlQUFjLEVBQ2Y7O0FBQ0Q7RUFDQyxlQUFjLEVBQ2Q7O0FBQ0Q7RUFDRSxZQUFXLEVBQ1o7O0FBQ0Q7RUFDRSxhQUFZO0VBQ1osYUFBWSxFQUNiOztBQUVEO0VBQ0Esb0JBQW1CO0VBQ25CLGVBQWMsRUFDZiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ2luLWZvcm0tY29udGFpbmVye1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBib3gtc2hhZG93OiAgLTFweCAzcHggMjVweCBncmF5O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDM1MHB4O1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgIFxyXG4gIH1cclxuICAubG9naW4tc3VibWl0IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luOiAyNXB4IDAgLTEwcHg7XHJcbiAgICBwYWRkaW5nOiAwLjY1cmVtIDIuMTNyZW07ICAgXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0YTdjO1xyXG4gICAgY29sb3I6ICNGRkY7XHJcbiAgfVxyXG4gXHJcbiAgLmxvZ2luLWhlYWRlciB7XHJcbiAgICBoZWlnaHQ6IDUwcHg7ICAgIFxyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIGNvbG9yOiAjNDQ0NDQ0O1xyXG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXNpemU6IHgtbGFyZ2U7ICAgIFxyXG4gIH1cclxuICAuY29udGFpbmVyLWJvZHkge1xyXG4gICAgcGFkZGluZzogMjBweDtcclxuICAgIHBhZGRpbmctdG9wOiAwO1xyXG4gIH1cclxuXHJcbiAgLmVycm9yLW1lc3NhZ2V7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogcmdiKDI0NSwgNzIsIDcyKTtcclxuICAgIC8vIGRpc3BsYXk6IG5vbmU7XHJcbiAgfSAgXHJcbiAgLmZvcmdvdHBhc3N7IFxyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIGNvbG9yOiAjMWY0OTdiO1xyXG4gIH1cclxuICAuY29udGFpbmVyLWZsdWlkIHtcclxuICAgcGFkZGluZzogMjUwcHg7XHJcbiAgfVxyXG4gIC5sb2dpbi1wd2QgLm1hdC1mb3JtLWZpZWxke1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIC5sb2dpbi1wd2QgaW5wdXRbdHlwZT1wYXNzd29yZF17XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgfVxyXG5cclxuICAubG9naW4taGVhZGVyIHN0cm9uZyB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcclxuICBjb2xvcjogIzIzNGE3YztcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");





var LoginComponent = /** @class */ (function () {
    function LoginComponent(appService, router, frmbuilder) {
        this.appService = appService;
        this.router = router;
        this.frmbuilder = frmbuilder;
        this.hide = true;
        this.credentials = {
            username: '',
            password: ''
        };
        this.app = appService;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.app.authenticate(this.credentials, function () {
            if (_this.app.authenticated == true) {
                _this.router.navigateByUrl('/');
            }
            else {
                $(".error-message").fadeIn("slow");
                setTimeout(function () {
                    $(".error-message").fadeOut("slow");
                }, 5000);
            }
        });
        return false;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('resetPass'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LoginComponent.prototype, "resetPassModal", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('side'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LoginComponent.prototype, "checkEmailModal", void 0);
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'sdrc-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/report/filters/area-filter.pipe.ts":
/*!****************************************************!*\
  !*** ./src/app/report/filters/area-filter.pipe.ts ***!
  \****************************************************/
/*! exports provided: AreaFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaFilterPipe", function() { return AreaFilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AreaFilterPipe = /** @class */ (function () {
    function AreaFilterPipe() {
    }
    AreaFilterPipe.prototype.transform = function (areas, areaLevel, parentAreaId) {
        if (areas != undefined && areas != null && areaLevel != undefined && areaLevel != null && parentAreaId != undefined && parentAreaId != null) {
            switch (areaLevel) {
                // case 1:
                //   return areas.State.filter(area => area.parentAreaId === parentAreaId)
                case 2:
                    return areas.District.filter(function (area) { return area.parentAreaId === parentAreaId; });
                case 3:
                    return areas.Block.filter(function (area) { return area.parentAreaId === parentAreaId; });
            }
        }
        else {
            return [];
        }
    };
    AreaFilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'areaFilter'
        })
    ], AreaFilterPipe);
    return AreaFilterPipe;
}());



/***/ }),

/***/ "./src/app/report/report-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/report/report-routing.module.ts ***!
  \*************************************************/
/*! exports provided: ReportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportRoutingModule", function() { return ReportRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _report_report_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./report/report.component */ "./src/app/report/report/report.component.ts");
/* harmony import */ var _guard_role_guard_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../guard/role-guard.guard */ "./src/app/guard/role-guard.guard.ts");





var routes = [
    {
        path: 'report',
        component: _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"],
        pathMatch: 'full',
        canActivate: [_guard_role_guard_guard__WEBPACK_IMPORTED_MODULE_4__["RoleGuardGuard"]],
        data: {
            expectedRoles: ["report_HAVING_read"]
        }
    }
];
var ReportRoutingModule = /** @class */ (function () {
    function ReportRoutingModule() {
    }
    ReportRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], ReportRoutingModule);
    return ReportRoutingModule;
}());



/***/ }),

/***/ "./src/app/report/report.module.ts":
/*!*****************************************!*\
  !*** ./src/app/report/report.module.ts ***!
  \*****************************************/
/*! exports provided: ReportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportModule", function() { return ReportModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _report_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./report-routing.module */ "./src/app/report/report-routing.module.ts");
/* harmony import */ var _report_report_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./report/report.component */ "./src/app/report/report/report.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_report_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/report.service */ "./src/app/report/services/report.service.ts");
/* harmony import */ var lib_public_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lib/public_api */ "./lib/public_api.ts");
/* harmony import */ var _filters_area_filter_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./filters/area-filter.pipe */ "./src/app/report/filters/area-filter.pipe.ts");










var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _report_report_component__WEBPACK_IMPORTED_MODULE_4__["ReportComponent"],
                _filters_area_filter_pipe__WEBPACK_IMPORTED_MODULE_9__["AreaFilterPipe"]
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _report_routing_module__WEBPACK_IMPORTED_MODULE_3__["ReportRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                lib_public_api__WEBPACK_IMPORTED_MODULE_8__["TableModule"]
            ],
            providers: [_services_report_service__WEBPACK_IMPORTED_MODULE_7__["ReportService"]]
        })
    ], ReportModule);
    return ReportModule;
}());



/***/ }),

/***/ "./src/app/report/report/report.component.html":
/*!*****************************************************!*\
  !*** ./src/app/report/report/report.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 offset-md-3\">\r\n            <div class=\"row selection-sec\">\r\n                <div class=\"col-md-6\">\r\n                    <label for=\"usr\">Report Type:</label>\r\n                    <mat-form-field>\r\n                        <mat-select name=\"reportType\" [(ngModel)]=\"selectedReportTypeId\">\r\n                            <mat-option *ngFor=\"let opt of reportTypes\" [value]=\"opt.reportTypeId\">\r\n                                {{opt.reportType}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                </div>\r\n                <!-- <div class=\"col-md-6\">\r\n                    <label for=\"usr\">State:</label>\r\n                    <mat-form-field>\r\n                        <mat-select name=\"state\" [(ngModel)]=\"selectedStateId\" (valueChange)=\"selectedDistrictId = undefined; selectedBlockId=undefined\">\r\n                            <mat-option *ngFor=\"let opt of areaDetails | areaFilter:1:1\" [value]=\"opt.areaId\">\r\n                                {{opt.areaName}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                </div> -->\r\n                <div class=\"col-md-6\" *ngIf=\"selectedStateId != -2\">\r\n                    <label for=\"usr\">District:</label>\r\n                    <mat-form-field>\r\n                        <mat-select name=\"district\" [(ngModel)]=\"selectedDistrictId\" (valueChange)=\"selectedBlockId=undefined\">\r\n                            <mat-option [value]=\"-2\" >All Districts</mat-option>\r\n                            <mat-option *ngFor=\"let opt of areaDetails | areaFilter:2:18\" [value]=\"opt.sbmAreaId\">\r\n                                {{opt.areaName}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col-md-6\" *ngIf=\"selectedDistrictId != -2\">\r\n                    <label for=\"usr\">BLock:</label>\r\n                    <mat-form-field>\r\n                        <mat-select name=\"block\" [(ngModel)]=\"selectedBlockId\">\r\n                            <mat-option [value]=\"-2\" >All Blocks</mat-option>\r\n                            <mat-option *ngFor=\"let opt of areaDetails | areaFilter:3:selectedDistrictId\" [value]=\"opt.sbmAreaId\">\r\n                                {{opt.areaName}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div [ngClass]=\"selectedDistrictId && selectedDistrictId == -2 ? 'col-md-12 text-center':'col-md-6 text-left mt-btn' \">\r\n                    <button \r\n                    [disabled]=\"!selectedReportTypeId || (!selectedDistrictId ) || (selectedDistrictId != -2 && !selectedBlockId )\"\r\n                     mat-raised-button class=\"btn-primary btn report-submit\" (click)=\"getTable(selectedReportTypeId)\">Submit</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 table-section\" *ngIf=\"tableData && tableData.length\">\r\n            <sdrc-table \r\n                [id]=\"'tab1'\"\r\n                [rowData]=\"tableData\" \r\n                [columnData]=\"tableColumns\" \r\n                [maxTableHeight]=\"'500px'\"\r\n                [headerFixed]=\"true\"\r\n                [sorting]=\"true\" \r\n                [searchBox]=\"true\" \r\n                [downloadExcel]=\"true\"\r\n                [excelName]=\"excelName\"\r\n                [downloadPdfByServer]=\"true\"\r\n                (onDownloadPdfByServerClicked)=\"downloadTableAsPdf($event)\"\r\n                ></sdrc-table>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/report/report/report.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/report/report/report.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn.report-submit {\n  background-color: #234a7c;\n  border-radius: 0;\n  width: 120px; }\n\n.selection-sec {\n  margin-bottom: 100px;\n  margin-top: 50px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVwb3J0L3JlcG9ydC9EOlxcc2JtXzEwMF91aV9kZXZcXHNibTEwMC9zcmNcXGFwcFxccmVwb3J0XFxyZXBvcnRcXHJlcG9ydC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDBCQUF5QjtFQUN6QixpQkFBZ0I7RUFDaEIsYUFBWSxFQUNmOztBQUNEO0VBQ0kscUJBQW9CO0VBQ3BCLGlCQUFnQixFQUNuQiIsImZpbGUiOiJzcmMvYXBwL3JlcG9ydC9yZXBvcnQvcmVwb3J0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ0bi5yZXBvcnQtc3VibWl0IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMzRhN2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgd2lkdGg6IDEyMHB4O1xyXG59XHJcbi5zZWxlY3Rpb24tc2Vje1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTAwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/report/report/report.component.ts":
/*!***************************************************!*\
  !*** ./src/app/report/report/report.component.ts ***!
  \***************************************************/
/*! exports provided: ReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportComponent", function() { return ReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_report_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/report.service */ "./src/app/report/services/report.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");





var ReportComponent = /** @class */ (function () {
    function ReportComponent(reportService, spinner, app) {
        this.reportService = reportService;
        this.spinner = spinner;
        this.app = app;
    }
    ReportComponent.prototype.ngOnInit = function () {
        this.getReportTypes();
        this.getAllArea();
    };
    ReportComponent.prototype.getReportTypes = function () {
        var _this = this;
        this.reportService.getReportTypes().subscribe(function (res) {
            _this.reportTypes = res;
        });
    };
    ReportComponent.prototype.getAllArea = function () {
        var _this = this;
        this.spinner.show();
        this.reportService.getAreaDetails().subscribe(function (res) {
            _this.spinner.hide();
            _this.areaDetails = res;
        });
    };
    ReportComponent.prototype.getElementBySbmId = function (areaDetails, sbmAreaId) {
        var areaJson;
        for (var i = 0; i < Object.keys(areaDetails).length; i++) {
            var key = Object.keys(areaDetails)[i];
            areaDetails[key].forEach(function (element) {
                if (element.sbmAreaId == sbmAreaId) {
                    areaJson = element;
                }
            });
        }
        return areaJson;
    };
    ReportComponent.prototype.getTable = function (reportTypeId) {
        var _this = this;
        var sbmAreaId;
        if (this.selectedBlockId && this.selectedBlockId != -2) {
            sbmAreaId = this.selectedBlockId;
            this.submittedBlock = this.getElementBySbmId(this.areaDetails, this.selectedBlockId);
            this.submittedDistrict = this.getElementBySbmId(this.areaDetails, this.selectedDistrictId);
            this.submittedReportType = this.reportTypes[this.selectedReportTypeId - 1];
        }
        else if (this.selectedBlockId == -2) {
            sbmAreaId = this.selectedDistrictId;
            this.submittedBlock = undefined;
            this.submittedDistrict = this.getElementBySbmId(this.areaDetails, this.selectedDistrictId);
            this.submittedReportType = this.reportTypes[this.selectedReportTypeId - 1];
        }
        else if (this.selectedDistrictId == -2) {
            this.submittedBlock = undefined;
            this.submittedDistrict = undefined;
            this.submittedReportType = this.reportTypes[this.selectedReportTypeId - 1];
            sbmAreaId = 18;
        }
        else {
            sbmAreaId = 2;
        }
        this.submittedSbmAreaId = parseInt(sbmAreaId);
        this.excelName = (this.submittedBlock ? this.submittedBlock.areaName : this.submittedDistrict ? this.submittedDistrict.areaName : "Odisha") + "_" + new Date().toLocaleDateString();
        this.spinner.show();
        this.reportService.getTableData(reportTypeId, this.submittedSbmAreaId).subscribe(function (res) {
            _this.spinner.hide();
            var tempTableData = res;
            if (tempTableData.length)
                tempTableData[tempTableData.length - 1][Object.keys(tempTableData[0])[0]] = "";
            tempTableData[tempTableData.length - 1][Object.keys(tempTableData[0])[1]] = "Total";
            _this.tableData = tempTableData;
            _this.tableColumns = Object.keys(_this.tableData[0]);
        });
    };
    ReportComponent.prototype.downloadTableAsPdf = function (data) {
        // this.spinner.show()
        // this.reportService.downloadPdf(this.submittedSbmAreaId).subscribe(res =>{
        //   this.spinner.hide();
        // });
        this.reportService.downloadPdf(this.submittedReportType.reportTypeId, this.submittedSbmAreaId);
    };
    ReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-report',
            template: __webpack_require__(/*! ./report.component.html */ "./src/app/report/report/report.component.html"),
            styles: [__webpack_require__(/*! ./report.component.scss */ "./src/app/report/report/report.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_report_service__WEBPACK_IMPORTED_MODULE_2__["ReportService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"]])
    ], ReportComponent);
    return ReportComponent;
}());



/***/ }),

/***/ "./src/app/report/services/report.service.ts":
/*!***************************************************!*\
  !*** ./src/app/report/services/report.service.ts ***!
  \***************************************************/
/*! exports provided: ReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportService", function() { return ReportService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-cookies */ "./node_modules/ng2-cookies/index.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ng2_cookies__WEBPACK_IMPORTED_MODULE_4__);





var ReportService = /** @class */ (function () {
    function ReportService(httpClient) {
        this.httpClient = httpClient;
    }
    ReportService.prototype.getReportTypes = function () {
        return this.httpClient.get("assets/reportTypes.json");
    };
    ReportService.prototype.getAreaDetails = function () {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + 'getAllArea');
    };
    ReportService.prototype.getTableData = function (reportTypeId, areaId) {
        if (reportTypeId == 2)
            return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + "getDailyA03?forAreaId=" + areaId);
        if (reportTypeId == 1)
            return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + "weeklyExcel?parentAreaId=" + areaId);
    };
    ReportService.prototype.downloadPdf = function (reportTypeId, areaId) {
        var _this = this;
        if (reportTypeId == 2) {
            // $('<form action="'+ Constants.HOME_URL + "downloadDailyA03PdfReport?forAreaId=" + areaId +'" method="GET"></form>')
            // .appendTo('body').submit().remove();
            this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + "downloadDailyA03PdfReport?forAreaId=" + areaId).subscribe(function (res) {
                console.log(res);
                _this.download('fileName=' + res + '&access_token=' + ng2_cookies__WEBPACK_IMPORTED_MODULE_4__["Cookie"].get("access_token"));
            }, function (error) {
                console.log(error);
                // var byteString = atob(<string>error.error.text);
                // // Convert that text into a byte array.
                // var ab = new ArrayBuffer(byteString.length);
                // var ia = new Uint8Array(ab);
                // for (var i = 0; i < byteString.length; i++) {
                //   ia[i] = byteString.charCodeAt(i);
                // }
                // // Blob for saving.
                // var blob = new Blob([ia], { type: "application/pdf" });
                // // Tell the browser to save as report.pdf.
                // saveAs(blob, "report.pdf");
            });
            // this.download(Constants.HOME_URL + "downloadDailyA03PdfReport", 'forAreaId='+ areaId +'&access_token=' +Cookie.get("access_token"))
        }
        if (reportTypeId == 1) {
            this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + "weeklyPdf?parentAreaId=" + areaId).subscribe(function (res) {
                console.log(res);
                _this.download('fileName=' + res + '&access_token=' + ng2_cookies__WEBPACK_IMPORTED_MODULE_4__["Cookie"].get("access_token"));
            });
        }
    };
    ReportService.prototype.download = function (data) {
        if (data) {
            //data can be string of parameters or array/object
            data = typeof data == 'string' ? data : $.param(data);
            //split params into form inputs
            var inputs = '';
            var url = _constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + 'downloadReport';
            $.each(data.split('&'), function () {
                var pair = this.split('=');
                inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
            });
            //send request
            $('<form action="' + url + '" method="post">' + inputs + '</form>')
                .appendTo('body').submit().remove();
        }
        ;
    };
    ReportService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ReportService);
    return ReportService;
}());



/***/ }),

/***/ "./src/app/service/session-check.service.ts":
/*!**************************************************!*\
  !*** ./src/app/service/session-check.service.ts ***!
  \**************************************************/
/*! exports provided: SessionCheckService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionCheckService", function() { return SessionCheckService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-cookies */ "./node_modules/ng2-cookies/index.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_cookies__WEBPACK_IMPORTED_MODULE_3__);




var SessionCheckService = /** @class */ (function () {
    function SessionCheckService() {
        this.timeoutExpired = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.timeoutExpired.subscribe(function () {
            console.log("session expired ");
            ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].delete('access_token');
            ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].delete('JSESSIONID');
            ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].delete('XSRF-TOKEN');
        });
        // this.startTimer();
    }
    SessionCheckService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SessionCheckService);
    return SessionCheckService;
}());



/***/ }),

/***/ "./src/app/service/static-home.service.ts":
/*!************************************************!*\
  !*** ./src/app/service/static-home.service.ts ***!
  \************************************************/
/*! exports provided: StaticHomeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticHomeService", function() { return StaticHomeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./src/app/constants.ts");




var StaticHomeService = /** @class */ (function () {
    function StaticHomeService(httpClient) {
        this.httpClient = httpClient;
        this.selectedLang = 'english';
        this.contentDetails = [];
        this.contentSection = {};
        this.contentList = [];
        this.countLoaded = false;
        this.quickVal = {};
    }
    StaticHomeService.prototype.getQuickStarts = function () {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + "quickStartData?areaId=" + 'IND021');
    };
    StaticHomeService.prototype.getMenuList = function (menu) {
        return this.httpClient.get("assets/menu.json");
    };
    StaticHomeService.prototype.getData = function (viewName) {
        return this.httpClient.get("assets/language.json");
    };
    StaticHomeService.prototype.getPhotogalleryData = function (viewName) {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + _constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].CMS_URL + 'fetchPhotoGallery?viewName=' + viewName);
    };
    StaticHomeService.prototype.getOrganisationalData = function () {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + _constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].CONTACT_URL + 'getOrganisationType');
    };
    StaticHomeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], StaticHomeService);
    return StaticHomeService;
}());



/***/ }),

/***/ "./src/app/service/user/user.service.ts":
/*!**********************************************!*\
  !*** ./src/app/service/user/user.service.ts ***!
  \**********************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-cookies */ "./node_modules/ng2-cookies/index.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ng2_cookies__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");






var UserService = /** @class */ (function () {
    function UserService(router, http) {
        this.router = router;
        this.http = http;
    }
    UserService.prototype.checkLoggedIn = function () {
        if (!ng2_cookies__WEBPACK_IMPORTED_MODULE_2__["Cookie"].check('access_token')) {
            return false;
        }
        else {
            return true;
        }
    };
    UserService.prototype.logout = function () {
        ng2_cookies__WEBPACK_IMPORTED_MODULE_2__["Cookie"].delete('access_token');
        this.router.navigate(['/login']);
    };
    UserService.prototype.obtainAccessToken = function (loginData) {
        var _this = this;
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({ 'Authorization': 'Basic ' + btoa("client:clientpassword"),
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' })
        };
        var params = new URLSearchParams();
        params.append('username', loginData.username);
        params.append('password', loginData.password);
        params.append('grant_type', 'password');
        params.append('client_id', 'client');
        this.http.post(_constants__WEBPACK_IMPORTED_MODULE_5__["Constants"].HOME_URL + 'user', params.toString(), httpOptions).subscribe(function (data) {
            console.log("First access token : ", data);
            _this.saveToken(data);
        }, function (err) {
            console.log(err);
        });
    };
    // obtainAccessTokenFromRefreshToken(){
    //   const httpOptions = {
    //     headers: new HttpHeaders({ 'Authorization': 'Basic ' + btoa("client:clientpassword"), 
    //     'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' }, )
    //   };
    //   let params = new URLSearchParams();
    //   params.append('refresh_token',"a93dd1f1-3c36-4ae8-ba8b-9935496f7cab");
    //   params.append('grant_type','refresh_token');
    //   this.http.post('/oauth/token', params.toString(), httpOptions).subscribe(
    //     data=>{        
    //       // this.saveToken(data)
    //       console.log("access_token : ", data)
    //     },
    //     err=>{
    //       console.log(err)
    //     }
    //   )     
    // }
    UserService.prototype.saveToken = function (token) {
        var expireDate = new Date().getTime() + (1000 * token.expires_in);
        var date = new Date(expireDate);
        console.log("expireDate " + date);
        ng2_cookies__WEBPACK_IMPORTED_MODULE_2__["Cookie"].set("access_token", token.access_token, expireDate);
        this.router.navigate(['/']);
    };
    UserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/service/xhr-interceptor.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/xhr-interceptor.service.ts ***!
  \****************************************************/
/*! exports provided: XhrInterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XhrInterceptorService", function() { return XhrInterceptorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _session_check_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./session-check.service */ "./src/app/service/session-check.service.ts");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-cookies */ "./node_modules/ng2-cookies/index.js");
/* harmony import */ var ng2_cookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_cookies__WEBPACK_IMPORTED_MODULE_3__);




var XhrInterceptorService = /** @class */ (function () {
    function XhrInterceptorService(sessionCheckService) {
        this.sessionCheckService = sessionCheckService;
    }
    XhrInterceptorService.prototype.intercept = function (req, next) {
        var authToken = ng2_cookies__WEBPACK_IMPORTED_MODULE_3__["Cookie"].get('access_token');
        var xhr;
        if (authToken)
            xhr = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authToken) });
        else
            xhr = req.clone();
        return next.handle(xhr);
    };
    XhrInterceptorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_session_check_service__WEBPACK_IMPORTED_MODULE_2__["SessionCheckService"]])
    ], XhrInterceptorService);
    return XhrInterceptorService;
}());



/***/ }),

/***/ "./src/app/static/about-side-menu/about-side-menu.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/static/about-side-menu/about-side-menu.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <ul class=\"about-heads\">\n    <li class=\"about-head-list\" routerLink=\"/about-us\" [ngClass]=\"{'active': router.url=='/about-us'}\">\n      <span class=\"list-span\"><a class=\"active\" routerLink=\"/about-us\">Swachh Bharat Mission (Gramin)</a></span>\n    </li>             \n    <li class=\"about-head-list\" routerLink=\"/soso\" [ngClass]=\"{'active': router.url=='/soso'}\">\n      <span class=\"list-span\"><a routerLink=\"/soso\">Swachha Odisha Sustha Odisha (SOSO)</a></span>\n    </li> \n    <li class=\"about-head-list\" routerLink=\"/sustainable\" [ngClass]=\"{'active': router.url=='/sustainable'}\">\n      <span class=\"list-span\"><a routerLink=\"/sustainable\">Sustainable Development Goal – 6 (SDG-6)</a></span>\n    </li> \n    <li class=\"about-head-list\" routerLink=\"/water-sanitation\" [ngClass]=\"{'active': router.url=='/water-sanitation'}\">\n      <span class=\"list-span\"><a routerLink=\"/water-sanitation\">Odisha Water & Sanitation Mission (OWSM)</a></span>\n    </li>\n    <li class=\"about-head-list\" routerLink=\"/organisational-structure\" [ngClass]=\"{'active': router.url=='/organisational-structure'}\">\n      <span class=\"list-span\"><a routerLink=\"/organisational-structure\">Organisational Structure</a></span>\n    </li>     \n  </ul>\n</div>\n\n"

/***/ }),

/***/ "./src/app/static/about-side-menu/about-side-menu.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/static/about-side-menu/about-side-menu.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".about-heads {\n  list-style: none;\n  padding: 0;\n  border: 1px solid #ddd;\n  margin-top: 20px; }\n\n.about-head-list {\n  border-bottom: 1px solid #ddd;\n  counter-increment: step-counter;\n  position: relative;\n  height: 50px;\n  background-color: #80a7e0; }\n\na:hover {\n  text-decoration: none; }\n\nli.about-head-list a {\n  color: white; }\n\nli.about-head-list.active {\n  background-color: #1f4a7c; }\n\nli.about-head-list.active::before {\n  background-color: #80a7e0; }\n\n.list-span {\n  top: 50%;\n  display: block;\n  margin-left: 13px;\n  position: absolute;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\n.about-heads li {\n  cursor: pointer; }\n\n@media (max-width: 991px) {\n  .about-head-list {\n    height: 80px; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL2Fib3V0LXNpZGUtbWVudS9EOlxcc2JtXzEwMF91aV9kZXZcXHNibTEwMC9zcmNcXGFwcFxcc3RhdGljXFxhYm91dC1zaWRlLW1lbnVcXGFib3V0LXNpZGUtbWVudS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixXQUFVO0VBQ1YsdUJBQXNCO0VBQ3RCLGlCQUFnQixFQUNuQjs7QUFDRDtFQUNJLDhCQUE2QjtFQUU3QixnQ0FBK0I7RUFDL0IsbUJBQWtCO0VBQ2xCLGFBQVk7RUFDWiwwQkFBeUIsRUFDNUI7O0FBQ0Q7RUFDSSxzQkFBcUIsRUFDeEI7O0FBQ0Q7RUFDSSxhQUFZLEVBQ2Y7O0FBQ0Q7RUFDSSwwQkFBeUIsRUFDNUI7O0FBQ0Q7RUFDSSwwQkFBeUIsRUFDNUI7O0FBQ0Q7RUFDSSxTQUFRO0VBQ1IsZUFBYztFQUNkLGtCQUFpQjtFQUNqQixtQkFBa0I7RUFDbEIsb0NBQW1DO0VBQ25DLDRCQUEyQixFQUM5Qjs7QUFDRDtFQUNJLGdCQUFlLEVBQ2xCOztBQUNEO0VBQ0k7SUFDSSxhQUFZLEVBQ2YsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3N0YXRpYy9hYm91dC1zaWRlLW1lbnUvYWJvdXQtc2lkZS1tZW51LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFib3V0LWhlYWRze1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG4uYWJvdXQtaGVhZC1saXN0IHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgLy8gZm9udC1zaXplOiAxOHB4O1xyXG4gICAgY291bnRlci1pbmNyZW1lbnQ6IHN0ZXAtY291bnRlcjtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4MGE3ZTA7XHJcbn1cclxuYTpob3ZlcntcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5saS5hYm91dC1oZWFkLWxpc3QgYXtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5saS5hYm91dC1oZWFkLWxpc3QuYWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxZjRhN2M7XHJcbn1cclxubGkuYWJvdXQtaGVhZC1saXN0LmFjdGl2ZTo6YmVmb3Jle1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzgwYTdlMDtcclxufVxyXG4ubGlzdC1zcGFuIHtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tbGVmdDogMTNweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG59XHJcbi5hYm91dC1oZWFkcyBsaSB7ICAgIFxyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA5OTFweCl7XHJcbiAgICAuYWJvdXQtaGVhZC1saXN0e1xyXG4gICAgICAgIGhlaWdodDogODBweDtcclxuICAgIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/static/about-side-menu/about-side-menu.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/static/about-side-menu/about-side-menu.component.ts ***!
  \*********************************************************************/
/*! exports provided: AboutSideMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutSideMenuComponent", function() { return AboutSideMenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var AboutSideMenuComponent = /** @class */ (function () {
    function AboutSideMenuComponent(router) {
        this.router = router;
    }
    AboutSideMenuComponent.prototype.ngOnInit = function () {
    };
    AboutSideMenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-about-side-menu',
            template: __webpack_require__(/*! ./about-side-menu.component.html */ "./src/app/static/about-side-menu/about-side-menu.component.html"),
            styles: [__webpack_require__(/*! ./about-side-menu.component.scss */ "./src/app/static/about-side-menu/about-side-menu.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AboutSideMenuComponent);
    return AboutSideMenuComponent;
}());



/***/ }),

/***/ "./src/app/static/about-us/about-us.component.html":
/*!*********************************************************!*\
  !*** ./src/app/static/about-us/about-us.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row content-header\">\n          <h3>Swachh Bharat Mission (Gramin)</h3> \n            \n  </div>\n  <div class=\"row\">\n      <div class=\"col-md-3\">\n          <app-about-side-menu></app-about-side-menu>\n      </div>\n        <div class=\"col-md-9 about\">\n                <p>To accelerate the efforts to achieve universal sanitation coverage and to put focus on sanitation, the Hon'ble Prime Minister of India, Shri Narendra Modi, launched the Swachh Bharat Mission on 2nd October, 2014. The Mission aims to achieve a Swachh Bharat by 2019, as a fitting tribute to Mahatma Gandhi on his 150th birth anniversary. In Rural India this would mean making villages Open-Defecation Free (ODF), improving the levels of cleanliness through Solid and Liquid Waste Management activities, and ensuring clean and sanitized villages.</p>\n                <h5>Vision:</h5>\n                <p>The aim of Swachh Bharat Mission (Gramin) is to achieve a clean and Open Defecation Free (ODF) India by 2nd October, 2019</p>\n                <h5>Objectives:</h5>\n                <ul>\n                  <li>To bring about an improvement in the general quality of life in the rural areas, by promoting cleanliness, hygiene and eliminating open defecation.</li>\n                  <li>To accelerate sanitation coverage in rural areas to achieve the vision of Swachh Bharat by 2nd October 2019.</li>\n                  <li>To motivate communities to adopt sustainable sanitation practices and facilities through awareness creation and health education.</li>\n                  <li>To encourage cost effective and appropriate technologies for ecologically safe and sustainable sanitation.</li>\n                  <li>To develop, wherever required, community managed sanitation systems focusing on scientific Solid & Liquid Waste Management systems for overall cleanliness in the rural areas.</li>\n                  <li>To create significant positive impact on gender and promote social inclusion by improving sanitation especially in marginalized communities</li>\n                </ul>\n                <h5>Key Elements of the Strategy:</h5>\n                <ul>\n                  <li>Augmenting the institutional capacity of districts for undertaking intensive behavior change activities at the grassroots level</li>\n                  <li>Strengthening the capacities of implementing agencies to roll out the programme in a time-bound manner and to measure collective outcomes</li>\n                  <li>Incentivizing the performance of State-level institutions to implement behavioral change activities in communities</li>\n                </ul>\n                <h5>Focus on Behaviour Change</h5>\n                <ul>\n                  <li>Behaviour change has been the key differentiator of Swachh Bharat Mission and therefore emphasis is placed on Behaviour Change Communication (BCC). BCC is not a 'stand-alone' separate activity to be done as a 'component' of SBM-G, but about nudging communities into adopting safe and sustainable sanitation practices through effective BCC. </li>\n                  <li>Emphasis is placed on awareness generation, triggering mindsets leading to community behaviour change and demand generation for sanitary facilities in houses, schools, Anganwadis, places of community congregation, and for Solid and Liquid Waste Management activities. Since Open Defecation Free villages cannot be achieved without all the households and individuals conforming to the desired behaviour of toilet use every day and every time, community action and generation of peer pressure on the outliers are key. </li>\n                </ul>\n                <h5>Swachhagrahis as Foot Soldiers of SBM(G)</h5>\n                <p>There is a need for a dedicated, trained and properly incentivized sanitation workforce at the GP level. An army of ‘foot soldiers’ or ‘Swachhagrahis’, earlier known as ‘Swachhata Doots’ is developed and engaged through existing arrangements like Panchayati Raj Institutions, Co-operatives, ASHAs, Anganwadi workers, Women Groups, Community Based Organizations, Self-Help Groups, water linemen/pump operators etc. who are already working in the GPs, or through engaging Swachhagrahis specifically for the purpose. In case existing employees of line departments are utilized, their original Line Departments are in clear agreement to the expansion of their roles to include activities under the Swachh Bharat Mission. </p>\n                <h5>Sanitation Technology</h5>\n                <p>Appropriate participation of the beneficiary/communities, financially or otherwise in the setting up of the toilets is advised to promote ownership and sustained use, both at the household and community levels. The built-in flexibility in the menu of options is to give the poor and the disadvantaged families’ opportunity for subsequent upgrading of their toilets depending upon their requirements and financial position and to ensure that sanitary toilets are constructed, which ensure safe confinement and disposal of faeces. An illustrative list of technology options, with cost implications is provided to meet the user preferences and location-specific needs. While the Government provides flexibility in choosing the toilet technology considering area’s topography, soil conditions etc., properly constructed Twin-Pit is considered the most preferred technology. </p>\n                <h5>Twin Pit Pour Flush Water Seal Toilets</h5>\n                <p>The Twin Pit Water Seal Toilet is an on-site sanitation measure for houses where the water table is sufficiently low to avoid ground water pollution. On one hand it fulfills all sanitary requirements; of a toilet and on the other provides continuous use with minimal maintenance. The main components of such a toilet are the two pits used alternately, a pan, water seal / trap, squatting platform, junction chamber and a superstructure.</p>\n                <p>Under the system, there are two pits which are used alternately. Both pits are connected with a junction chamber at one end. Pit walls have a honeycomb structure. The bottom of the pit is not plastered and is earthen. Depending on the number of users of toilet, size of the pit varies. Capacity of each pit is normally kept for three years. First pit, after it gets filled up in about three years, is blocked at the junction chamber and second pit is put in operation. The watery part of excreta percolates in soil through the honey comb structure. After two years of blockage of the first pit, its contents degrade completely and turn to solid, odourless, pathogen free manure. It is dug out by beneficiaries and used for agriculture and horticulture purposes. After the second pit is filled, it is similarly blocked and the first pit is put in use again. Thus, alternate use of both the pit continues.</p>\n            \n        </div>  \n\n  </div>\n  \n</div>"

/***/ }),

/***/ "./src/app/static/about-us/about-us.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/static/about-us/about-us.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-header {\n  margin-top: 20px;\n  border-bottom: 1px solid #1f4a7c; }\n\n.about-cont {\n  margin-top: 20px;\n  margin-bottom: 30px; }\n\n.content-header h3 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1f4a7c; }\n\n.about {\n  margin-top: 17px;\n  margin-bottom: 20px; }\n\n.about h5 {\n  font-size: 20px;\n  color: #1f4a7c; }\n\n.about p {\n  text-align: justify; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL2Fib3V0LXVzL0Q6XFxzYm1fMTAwX3VpX2Rldlxcc2JtMTAwL3NyY1xcYXBwXFxzdGF0aWNcXGFib3V0LXVzXFxhYm91dC11cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixpQ0FBZ0MsRUFDbkM7O0FBQ0Q7RUFDSSxpQkFBZ0I7RUFDaEIsb0JBQW1CLEVBQ3RCOztBQUNEO0VBQ0ksZ0JBQWU7RUFDZixpQkFBZ0I7RUFDaEIsZUFBYyxFQUNqQjs7QUFDRDtFQUNJLGlCQUFnQjtFQUNoQixvQkFBbUIsRUFDdEI7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGVBQWMsRUFDakI7O0FBQ0Q7RUFDSSxvQkFBbUIsRUFDdEIiLCJmaWxlIjoic3JjL2FwcC9zdGF0aWMvYWJvdXQtdXMvYWJvdXQtdXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudC1oZWFkZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMWY0YTdjO1xyXG59XHJcbi5hYm91dC1jb250IHtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcbi5jb250ZW50LWhlYWRlciBoM3tcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxufVxyXG4uYWJvdXR7XHJcbiAgICBtYXJnaW4tdG9wOiAxN3B4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG4uYWJvdXQgaDV7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxufVxyXG4uYWJvdXQgcHtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/static/about-us/about-us.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/static/about-us/about-us.component.ts ***!
  \*******************************************************/
/*! exports provided: AboutUsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutUsComponent", function() { return AboutUsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var AboutUsComponent = /** @class */ (function () {
    function AboutUsComponent(router) {
        this.router = router;
    }
    AboutUsComponent.prototype.ngOnInit = function () {
    };
    AboutUsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-about-us',
            template: __webpack_require__(/*! ./about-us.component.html */ "./src/app/static/about-us/about-us.component.html"),
            styles: [__webpack_require__(/*! ./about-us.component.scss */ "./src/app/static/about-us/about-us.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AboutUsComponent);
    return AboutUsComponent;
}());



/***/ }),

/***/ "./src/app/static/disclaimer/disclaimer.component.html":
/*!*************************************************************!*\
  !*** ./src/app/static/disclaimer/disclaimer.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container disclaimer-cont\">\n    <div class=\"content-header\">\n      <h3>Disclaimer</h3>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-12 col-sm-12 col-xs-12 disclaimer\">\n        <p><span>The information contained in this website is for general information purposes only. \n          The information is provided by SOSO and while we endeavour to keep the information up to date \n          and correct, we make no representations or warranties of any kind, express or implied, about the \n          completeness, accuracy, reliability, suitability or availability with respect to the website or the \n          information, products, services, or related graphics contained on the website for any purpose. \n          Any reliance you place on such information is therefore strictly at your own risk. Users are \n          advised to verify/ check any information, and to obtain any appropriate professional advice before \n          acting on the information provided on the website.</span></p>\n          <p><span>In no event will we be liable for any loss or damage including without limitation, \n          indirect or consequential loss or damage, or any loss or damage whatsoever arising from \n          loss of data or profits arising out of, or in connection with, the use of this website.</span></p>\n          <p><span>Every effort is made to keep the website up and running smoothly. However, SOSO \n          takes no responsibility for, and will not be liable for the website being temporarily \n          unavailable due to technical issues beyond our control.</span></p>\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/static/disclaimer/disclaimer.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/static/disclaimer/disclaimer.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".disclaimer-cont {\n  margin-top: 30px;\n  margin-bottom: 30px; }\n\n.content-header h3 {\n  font-size: 24px;\n  font-weight: 500;\n  color: #1f4a7c; }\n\n.disclaimer p {\n  text-align: justify; }\n\n@media (max-width: 560px) {\n  .content-header h3 {\n    margin-left: 12px; }\n  .disclaimer {\n    margin-left: 12px;\n    margin-right: 12px; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL2Rpc2NsYWltZXIvRDpcXHNibV8xMDBfdWlfZGV2XFxzYm0xMDAvc3JjXFxhcHBcXHN0YXRpY1xcZGlzY2xhaW1lclxcZGlzY2xhaW1lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixvQkFBbUIsRUFDdEI7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixlQUFjLEVBQ2pCOztBQUNEO0VBQ0ksb0JBQW1CLEVBQ3RCOztBQUNEO0VBQ0k7SUFDSSxrQkFBaUIsRUFDcEI7RUFDRDtJQUNJLGtCQUFpQjtJQUNqQixtQkFBa0IsRUFDckIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3N0YXRpYy9kaXNjbGFpbWVyL2Rpc2NsYWltZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlzY2xhaW1lci1jb250IHtcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcbi5jb250ZW50LWhlYWRlciBoM3tcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxufVxyXG4uZGlzY2xhaW1lciBwe1xyXG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDogNTYwcHgpe1xyXG4gICAgLmNvbnRlbnQtaGVhZGVyIGgzIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMTJweDtcclxuICAgIH1cclxuICAgIC5kaXNjbGFpbWVyIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMTJweDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XHJcbiAgICB9XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/static/disclaimer/disclaimer.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/static/disclaimer/disclaimer.component.ts ***!
  \***********************************************************/
/*! exports provided: DisclaimerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisclaimerComponent", function() { return DisclaimerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DisclaimerComponent = /** @class */ (function () {
    function DisclaimerComponent() {
    }
    DisclaimerComponent.prototype.ngOnInit = function () {
    };
    DisclaimerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-disclaimer',
            template: __webpack_require__(/*! ./disclaimer.component.html */ "./src/app/static/disclaimer/disclaimer.component.html"),
            styles: [__webpack_require__(/*! ./disclaimer.component.scss */ "./src/app/static/disclaimer/disclaimer.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DisclaimerComponent);
    return DisclaimerComponent;
}());



/***/ }),

/***/ "./src/app/static/documents/documents.component.html":
/*!***********************************************************!*\
  !*** ./src/app/static/documents/documents.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>Coming Soon...</h2>\n"

/***/ }),

/***/ "./src/app/static/documents/documents.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/static/documents/documents.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2 {\n  text-align: center;\n  margin-top: 40px;\n  color: #1f4a7c; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL2RvY3VtZW50cy9EOlxcc2JtXzEwMF91aV9kZXZcXHNibTEwMC9zcmNcXGFwcFxcc3RhdGljXFxkb2N1bWVudHNcXGRvY3VtZW50cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFrQjtFQUNsQixpQkFBZ0I7RUFDaEIsZUFBYyxFQUNqQiIsImZpbGUiOiJzcmMvYXBwL3N0YXRpYy9kb2N1bWVudHMvZG9jdW1lbnRzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xyXG4gICAgY29sb3I6ICMxZjRhN2M7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/static/documents/documents.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/static/documents/documents.component.ts ***!
  \*********************************************************/
/*! exports provided: DocumentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentsComponent", function() { return DocumentsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DocumentsComponent = /** @class */ (function () {
    function DocumentsComponent() {
    }
    DocumentsComponent.prototype.ngOnInit = function () {
    };
    DocumentsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-documents',
            template: __webpack_require__(/*! ./documents.component.html */ "./src/app/static/documents/documents.component.html"),
            styles: [__webpack_require__(/*! ./documents.component.scss */ "./src/app/static/documents/documents.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DocumentsComponent);
    return DocumentsComponent;
}());



/***/ }),

/***/ "./src/app/static/organisational-structure/organisational-structure.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/static/organisational-structure/organisational-structure.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row content-header\">\n      <h3>Organisational Structure </h3>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <app-about-side-menu></app-about-side-menu>\n      </div>\n      <div class=\"col-md-9 Organisational\">\n       <div class=\"state-level\">\n         <h5>State level</h5>\n          <img class=\"img-responsive\" alt=\"state-level\" src=\".\\assets\\images\\gallery\\state-level.jpg\">\n       </div>\n       <div class=\"dist-level\">\n          <h5>District level</h5>\n          <img class=\"img-responsive\" alt=\"dist-level\" src=\".\\assets\\images\\gallery\\dist-level.jpg\">\n       </div>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/static/organisational-structure/organisational-structure.component.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/static/organisational-structure/organisational-structure.component.scss ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".organisational-cont {\n  margin-top: 20px;\n  margin-bottom: 30px; }\n\n.content-header {\n  margin-top: 20px;\n  border-bottom: 1px solid #1f4a7c; }\n\n.content-header h3 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1f4a7c; }\n\n.Organisational {\n  margin-top: 17px;\n  margin-bottom: 20px; }\n\n.organisational p {\n  text-align: justify; }\n\n.state-level, .dist-level {\n  text-align: center; }\n\n.state-level h5, .dist-level h5 {\n  color: #1f4a7c; }\n\nimg.img-responsive {\n  width: 65%; }\n\n.dist-level {\n  margin-top: 50px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL29yZ2FuaXNhdGlvbmFsLXN0cnVjdHVyZS9EOlxcc2JtXzEwMF91aV9kZXZcXHNibTEwMC9zcmNcXGFwcFxcc3RhdGljXFxvcmdhbmlzYXRpb25hbC1zdHJ1Y3R1cmVcXG9yZ2FuaXNhdGlvbmFsLXN0cnVjdHVyZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixvQkFBbUIsRUFDdEI7O0FBQ0Q7RUFDSSxpQkFBZ0I7RUFDaEIsaUNBQWdDLEVBQ25DOztBQUNEO0VBQ0ksZ0JBQWU7RUFDZixpQkFBZ0I7RUFDaEIsZUFBYyxFQUNqQjs7QUFDRDtFQUNJLGlCQUFnQjtFQUNoQixvQkFBbUIsRUFDdEI7O0FBQ0Q7RUFDSSxvQkFBbUIsRUFDdEI7O0FBQ0Q7RUFDSSxtQkFBa0IsRUFDckI7O0FBQ0Q7RUFDSSxlQUFjLEVBQ2pCOztBQUNEO0VBQ0ksV0FBVSxFQUNiOztBQUNEO0VBQ0ksaUJBQWdCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvc3RhdGljL29yZ2FuaXNhdGlvbmFsLXN0cnVjdHVyZS9vcmdhbmlzYXRpb25hbC1zdHJ1Y3R1cmUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIub3JnYW5pc2F0aW9uYWwtY29udCB7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG4uY29udGVudC1oZWFkZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMWY0YTdjO1xyXG59XHJcbi5jb250ZW50LWhlYWRlciBoM3tcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxufVxyXG4uT3JnYW5pc2F0aW9uYWx7XHJcbiAgICBtYXJnaW4tdG9wOiAxN3B4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG4ub3JnYW5pc2F0aW9uYWwgcHtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbn1cclxuLnN0YXRlLWxldmVsLCAuZGlzdC1sZXZlbHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4uc3RhdGUtbGV2ZWwgaDUsIC5kaXN0LWxldmVsIGg1e1xyXG4gICAgY29sb3I6ICMxZjRhN2M7XHJcbn1cclxuaW1nLmltZy1yZXNwb25zaXZlIHtcclxuICAgIHdpZHRoOiA2NSU7XHJcbn1cclxuLmRpc3QtbGV2ZWx7XHJcbiAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/static/organisational-structure/organisational-structure.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/static/organisational-structure/organisational-structure.component.ts ***!
  \***************************************************************************************/
/*! exports provided: OrganisationalStructureComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganisationalStructureComponent", function() { return OrganisationalStructureComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OrganisationalStructureComponent = /** @class */ (function () {
    function OrganisationalStructureComponent() {
    }
    OrganisationalStructureComponent.prototype.ngOnInit = function () {
    };
    OrganisationalStructureComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-organisational-structure',
            template: __webpack_require__(/*! ./organisational-structure.component.html */ "./src/app/static/organisational-structure/organisational-structure.component.html"),
            styles: [__webpack_require__(/*! ./organisational-structure.component.scss */ "./src/app/static/organisational-structure/organisational-structure.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OrganisationalStructureComponent);
    return OrganisationalStructureComponent;
}());



/***/ }),

/***/ "./src/app/static/privacy-policy/privacy-policy.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/static/privacy-policy/privacy-policy.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container privacy-cont\">\n  <div class=\"content-header\">\n    <h2>Privacy Policy</h2>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-12 col-sm-12 col-xs-12 privacy\">\n      <p><span>This privacy policy sets out how SOSO uses and protects any information that you give \n        while you use this website.</span></p>\n      <p><span>SOSO is committed to ensuring that your privacy is protected. When we ask you to provide \n        certain information by which you can be identified when using this website, then you can be assured \n        that it will only be used in accordance with this privacy statement.</span></p>\n      <p><span>SOSO may change this policy from time to time by updating this page. You should check \n        this page from time to time to ensure that you are happy with any changes. </span></p>\n        <h3>What we collect</h3>\n        <p><span>While using our Site, we may ask you to provide us with certain Personal Information \n          (information that can be used to contact or identify you) and Non-Personal Information. </span></p>\n          <h3>What we do with the information we gather</h3>\n          <p><span>Except as otherwise stated in this privacy policy, we do not sell, trade, rent or otherwise share for marketing purposes your personal information with third parties without your consent. In general, the Personal Information you provide to us is used to help us communicate with you.  For example, we use Personal Information to contact users in response to questions, solicit feedback from users, provide technical support, and inform users about promotional offers.</span></p>\n          <h3>Security</h3>\n          <p><span>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. </span></p>\n          <h3>Why we use cookies</h3>\n          <p><span>The site may use cookies to enhance users’ experience. Cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. The user may choose to set their web browser to refuse Cookies or alert the user when the Cookies are being sent. However, this may prevent you from taking full advantage of the website.</span></p>\n          <h3>Links to other websites</h3>\n          <p><span>At many places in this website, you will find links to other websites/ portals. These links have been placed for your convenience. SOSO has no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</span></p>\n          <h3>Copyright Policy</h3>\n          <p><span>This website and its content is copyright of SOSO - © SOSO. All rights reserved.</span></p>\n          <p><span>Any redistribution or reproduction of part or all of the contents in any form is prohibited other than the following:</span></p>\n          <ul>\n            <li>\n              <span>You may reproduce the content partially or fully, with duly & prominently acknowledging the source. \n\n              </span>\n            </li>\n          </ul>\n          <p><span>However, the permission to reproduce any material that is copyright of any third party has to be obtained from the copyright holders concerned.</span><span> The contents of this website cannot be used in any misleading or objectionable context or derogatory manner.</span></p>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/static/privacy-policy/privacy-policy.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/static/privacy-policy/privacy-policy.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".privacy-cont {\n  margin-top: 30px;\n  margin-bottom: 30px; }\n\n.content-header h2 {\n  font-size: 24px;\n  font-weight: 500;\n  color: #1f4a7c; }\n\n.privacy h3 {\n  font-size: 17px;\n  font-weight: 600;\n  color: #1f4a7c; }\n\n.privacy p {\n  text-align: justify; }\n\n@media (max-width: 560px) {\n  .content-header h2 {\n    margin-left: 12px; }\n  .privacy {\n    margin-left: 12px;\n    margin-right: 12px; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL3ByaXZhY3ktcG9saWN5L0Q6XFxzYm1fMTAwX3VpX2Rldlxcc2JtMTAwL3NyY1xcYXBwXFxzdGF0aWNcXHByaXZhY3ktcG9saWN5XFxwcml2YWN5LXBvbGljeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixvQkFBbUIsRUFDdEI7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixlQUFjLEVBQ2pCOztBQUNEO0VBQ0ksZ0JBQWU7RUFDZixpQkFBZ0I7RUFDaEIsZUFBYyxFQUNqQjs7QUFDRDtFQUNJLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJO0lBQ0ksa0JBQWlCLEVBQ3BCO0VBQ0Q7SUFDSSxrQkFBaUI7SUFDakIsbUJBQWtCLEVBQ3JCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zdGF0aWMvcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJpdmFjeS1jb250e1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuLmNvbnRlbnQtaGVhZGVyIGgye1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGNvbG9yOiAjMWY0YTdjO1xyXG59XHJcbi5wcml2YWN5IGgze1xyXG4gICAgZm9udC1zaXplOiAxN3B4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjMWY0YTdjO1xyXG59XHJcbi5wcml2YWN5IHB7XHJcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA1NjBweCl7XHJcbiAgICAuY29udGVudC1oZWFkZXIgaDIge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xyXG4gICAgfVxyXG4gICAgLnByaXZhY3kge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTJweDtcclxuICAgIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/static/privacy-policy/privacy-policy.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/static/privacy-policy/privacy-policy.component.ts ***!
  \*******************************************************************/
/*! exports provided: PrivacyPolicyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacyPolicyComponent", function() { return PrivacyPolicyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PrivacyPolicyComponent = /** @class */ (function () {
    function PrivacyPolicyComponent() {
    }
    PrivacyPolicyComponent.prototype.ngOnInit = function () {
    };
    PrivacyPolicyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-privacy-policy',
            template: __webpack_require__(/*! ./privacy-policy.component.html */ "./src/app/static/privacy-policy/privacy-policy.component.html"),
            styles: [__webpack_require__(/*! ./privacy-policy.component.scss */ "./src/app/static/privacy-policy/privacy-policy.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PrivacyPolicyComponent);
    return PrivacyPolicyComponent;
}());



/***/ }),

/***/ "./src/app/static/sitemap/sitemap.component.html":
/*!*******************************************************!*\
  !*** ./src/app/static/sitemap/sitemap.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container sitemap-content\">\n  <div class=\"content-header\">\n    <h2>Sitemap</h2>\n    <div class=\"row\">\n      <div class=\"col-md-12 col-sm-12 col-xs-12 sitemap\">\n        <ul>\n          <li><a>Home</a></li>\n          <li><a>About Us</a></li>\n          <li><a>Documents</a></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/static/sitemap/sitemap.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/static/sitemap/sitemap.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sitemap-content {\n  margin-top: 30px;\n  margin-bottom: 30px; }\n\n.content-header h2 {\n  font-size: 24px;\n  font-weight: 500;\n  color: #1f4a7c; }\n\n.sitemap ul li {\n  font-size: 18px;\n  font-weight: 400; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL3NpdGVtYXAvRDpcXHNibV8xMDBfdWlfZGV2XFxzYm0xMDAvc3JjXFxhcHBcXHN0YXRpY1xcc2l0ZW1hcFxcc2l0ZW1hcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixvQkFBbUIsRUFDdEI7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixlQUFjLEVBQ2pCOztBQUVEO0VBQ1EsZ0JBQWU7RUFDZixpQkFBZ0IsRUFDdEIiLCJmaWxlIjoic3JjL2FwcC9zdGF0aWMvc2l0ZW1hcC9zaXRlbWFwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpdGVtYXAtY29udGVudHtcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcbi5jb250ZW50LWhlYWRlciBoMntcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxufVxyXG5cclxuLnNpdGVtYXAgdWwgbGl7ICAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICBmb250LXdlaWdodDogNDAwOyAgICAgICBcclxuIH1cclxuIl19 */"

/***/ }),

/***/ "./src/app/static/sitemap/sitemap.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/static/sitemap/sitemap.component.ts ***!
  \*****************************************************/
/*! exports provided: SitemapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SitemapComponent", function() { return SitemapComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SitemapComponent = /** @class */ (function () {
    function SitemapComponent() {
    }
    SitemapComponent.prototype.ngOnInit = function () {
    };
    SitemapComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sitemap',
            template: __webpack_require__(/*! ./sitemap.component.html */ "./src/app/static/sitemap/sitemap.component.html"),
            styles: [__webpack_require__(/*! ./sitemap.component.scss */ "./src/app/static/sitemap/sitemap.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SitemapComponent);
    return SitemapComponent;
}());



/***/ }),

/***/ "./src/app/static/soso/soso.component.html":
/*!*************************************************!*\
  !*** ./src/app/static/soso/soso.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row content-header\">\n    <h3>Swachha Odisha Sustha Odisha (SOSO) </h3>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <app-about-side-menu></app-about-side-menu>\n    </div>\n    <div class=\"col-md-9 soso\">\n      <p>On 25th August 2018, the Hon’ble Chief Minister of Odisha gave the clarion call of Swachha Odisha Sustha\n        Odisha (SOSO). SOSO is a holistic approach to ensure availability and sustainable management of water and\n        sanitation for all in lines with the Sustainable Development Goals - 6 of the United Nations.</p>\n      <h5>Vision</h5>\n      <p>The aim of <span class=\"vision\"> Swachha Odisha Sustha Odisha</span> is to improve the standard of living of the\n          people of rural Odisha and to ensure that all villages in Odisha are clean and green villages.</p>\n      <h5>Objectives</h5>\n      <ul>\n        <li>Ensure safe sanitation facilities for all the people of rural Odisha through access to Individual Household\n          Latrines (IHHLs)</li>\n        <li>Ensure availability of clean drinking water for every citizen of Odisha</li>\n        <li>Make all the villages in Odisha Open-Defecation Free</li>\n        <li>Eliminate the use of plastic bags across Odisha</li>\n        <li>Promote solid and liquid waste management</li>\n      </ul>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/static/soso/soso.component.scss":
/*!*************************************************!*\
  !*** ./src/app/static/soso/soso.component.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-header {\n  margin-top: 20px;\n  border-bottom: 1px solid #1f4a7c; }\n\n.content-header h3 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1f4a7c; }\n\n.soso {\n  margin-top: 17px;\n  margin-bottom: 20px; }\n\n.soso h5 {\n  font-size: 20px;\n  color: #1f4a7c; }\n\n.soso p {\n  text-align: justify; }\n\n.vision {\n  font-style: italic;\n  font-weight: bold; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL3Nvc28vRDpcXHNibV8xMDBfdWlfZGV2XFxzYm0xMDAvc3JjXFxhcHBcXHN0YXRpY1xcc29zb1xcc29zby5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixpQ0FBZ0MsRUFDbkM7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixlQUFjLEVBRWpCOztBQUNEO0VBQ0ksaUJBQWdCO0VBQ2hCLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJLGdCQUFlO0VBQ2YsZUFBYyxFQUNqQjs7QUFDRDtFQUNJLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixrQkFBaUIsRUFDcEIiLCJmaWxlIjoic3JjL2FwcC9zdGF0aWMvc29zby9zb3NvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQtaGVhZGVyIHtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzFmNGE3YztcclxufVxyXG4uY29udGVudC1oZWFkZXIgaDN7XHJcbiAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICMxZjRhN2M7XHJcbiAgICBcclxufVxyXG4uc29zb3tcclxuICAgIG1hcmdpbi10b3A6IDE3cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbi5zb3NvIGg1e1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgY29sb3I6ICMxZjRhN2M7XHJcbn1cclxuLnNvc28gcHtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbn1cclxuLnZpc2lvbntcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/static/soso/soso.component.ts":
/*!***********************************************!*\
  !*** ./src/app/static/soso/soso.component.ts ***!
  \***********************************************/
/*! exports provided: SosoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SosoComponent", function() { return SosoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SosoComponent = /** @class */ (function () {
    function SosoComponent() {
    }
    SosoComponent.prototype.ngOnInit = function () {
    };
    SosoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-soso',
            template: __webpack_require__(/*! ./soso.component.html */ "./src/app/static/soso/soso.component.html"),
            styles: [__webpack_require__(/*! ./soso.component.scss */ "./src/app/static/soso/soso.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SosoComponent);
    return SosoComponent;
}());



/***/ }),

/***/ "./src/app/static/static-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/static/static-routing.module.ts ***!
  \*************************************************/
/*! exports provided: StaticRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRoutingModule", function() { return StaticRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./terms-of-use/terms-of-use.component */ "./src/app/static/terms-of-use/terms-of-use.component.ts");
/* harmony import */ var _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./privacy-policy/privacy-policy.component */ "./src/app/static/privacy-policy/privacy-policy.component.ts");
/* harmony import */ var _disclaimer_disclaimer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./disclaimer/disclaimer.component */ "./src/app/static/disclaimer/disclaimer.component.ts");
/* harmony import */ var _sitemap_sitemap_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sitemap/sitemap.component */ "./src/app/static/sitemap/sitemap.component.ts");
/* harmony import */ var _about_us_about_us_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./about-us/about-us.component */ "./src/app/static/about-us/about-us.component.ts");
/* harmony import */ var _organisational_structure_organisational_structure_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./organisational-structure/organisational-structure.component */ "./src/app/static/organisational-structure/organisational-structure.component.ts");
/* harmony import */ var _soso_soso_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./soso/soso.component */ "./src/app/static/soso/soso.component.ts");
/* harmony import */ var _sustainable_sustainable_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sustainable/sustainable.component */ "./src/app/static/sustainable/sustainable.component.ts");
/* harmony import */ var _water_sanitation_water_sanitation_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./water-sanitation/water-sanitation.component */ "./src/app/static/water-sanitation/water-sanitation.component.ts");
/* harmony import */ var _documents_documents_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./documents/documents.component */ "./src/app/static/documents/documents.component.ts");













var routes = [
    {
        path: 'about-us',
        component: _about_us_about_us_component__WEBPACK_IMPORTED_MODULE_7__["AboutUsComponent"],
        pathMatch: 'full'
    },
    {
        path: 'documents',
        component: _documents_documents_component__WEBPACK_IMPORTED_MODULE_12__["DocumentsComponent"],
        pathMatch: 'full'
    },
    {
        path: 'organisational-structure',
        component: _organisational_structure_organisational_structure_component__WEBPACK_IMPORTED_MODULE_8__["OrganisationalStructureComponent"],
        pathMatch: 'full'
    },
    {
        path: 'soso',
        component: _soso_soso_component__WEBPACK_IMPORTED_MODULE_9__["SosoComponent"],
        pathMatch: 'full'
    },
    {
        path: 'sustainable',
        component: _sustainable_sustainable_component__WEBPACK_IMPORTED_MODULE_10__["SustainableComponent"],
        pathMatch: 'full'
    },
    {
        path: 'water-sanitation',
        component: _water_sanitation_water_sanitation_component__WEBPACK_IMPORTED_MODULE_11__["WaterSanitationComponent"],
        pathMatch: 'full'
    },
    {
        path: 'terms-of-use',
        component: _terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_3__["TermsOfUseComponent"],
        pathMatch: 'full'
    },
    {
        path: 'privacy-policy',
        component: _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_4__["PrivacyPolicyComponent"],
        pathMatch: 'full'
    },
    {
        path: 'disclaimer',
        component: _disclaimer_disclaimer_component__WEBPACK_IMPORTED_MODULE_5__["DisclaimerComponent"],
        pathMatch: 'full'
    },
    {
        path: 'sitemap',
        component: _sitemap_sitemap_component__WEBPACK_IMPORTED_MODULE_6__["SitemapComponent"],
        pathMatch: 'full'
    }
];
var StaticRoutingModule = /** @class */ (function () {
    function StaticRoutingModule() {
    }
    StaticRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], StaticRoutingModule);
    return StaticRoutingModule;
}());



/***/ }),

/***/ "./src/app/static/static.module.ts":
/*!*****************************************!*\
  !*** ./src/app/static/static.module.ts ***!
  \*****************************************/
/*! exports provided: StaticModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticModule", function() { return StaticModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _static_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./static-routing.module */ "./src/app/static/static-routing.module.ts");
/* harmony import */ var _terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./terms-of-use/terms-of-use.component */ "./src/app/static/terms-of-use/terms-of-use.component.ts");
/* harmony import */ var _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./privacy-policy/privacy-policy.component */ "./src/app/static/privacy-policy/privacy-policy.component.ts");
/* harmony import */ var _disclaimer_disclaimer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./disclaimer/disclaimer.component */ "./src/app/static/disclaimer/disclaimer.component.ts");
/* harmony import */ var _sitemap_sitemap_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sitemap/sitemap.component */ "./src/app/static/sitemap/sitemap.component.ts");
/* harmony import */ var _about_us_about_us_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./about-us/about-us.component */ "./src/app/static/about-us/about-us.component.ts");
/* harmony import */ var _organisational_structure_organisational_structure_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./organisational-structure/organisational-structure.component */ "./src/app/static/organisational-structure/organisational-structure.component.ts");
/* harmony import */ var _soso_soso_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./soso/soso.component */ "./src/app/static/soso/soso.component.ts");
/* harmony import */ var _about_side_menu_about_side_menu_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./about-side-menu/about-side-menu.component */ "./src/app/static/about-side-menu/about-side-menu.component.ts");
/* harmony import */ var _sustainable_sustainable_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sustainable/sustainable.component */ "./src/app/static/sustainable/sustainable.component.ts");
/* harmony import */ var _water_sanitation_water_sanitation_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./water-sanitation/water-sanitation.component */ "./src/app/static/water-sanitation/water-sanitation.component.ts");
/* harmony import */ var _documents_documents_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./documents/documents.component */ "./src/app/static/documents/documents.component.ts");















var StaticModule = /** @class */ (function () {
    function StaticModule() {
    }
    StaticModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_4__["TermsOfUseComponent"], _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_5__["PrivacyPolicyComponent"], _disclaimer_disclaimer_component__WEBPACK_IMPORTED_MODULE_6__["DisclaimerComponent"], _sitemap_sitemap_component__WEBPACK_IMPORTED_MODULE_7__["SitemapComponent"], _about_us_about_us_component__WEBPACK_IMPORTED_MODULE_8__["AboutUsComponent"], _organisational_structure_organisational_structure_component__WEBPACK_IMPORTED_MODULE_9__["OrganisationalStructureComponent"], _soso_soso_component__WEBPACK_IMPORTED_MODULE_10__["SosoComponent"], _about_side_menu_about_side_menu_component__WEBPACK_IMPORTED_MODULE_11__["AboutSideMenuComponent"], _sustainable_sustainable_component__WEBPACK_IMPORTED_MODULE_12__["SustainableComponent"], _water_sanitation_water_sanitation_component__WEBPACK_IMPORTED_MODULE_13__["WaterSanitationComponent"], _documents_documents_component__WEBPACK_IMPORTED_MODULE_14__["DocumentsComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _static_routing_module__WEBPACK_IMPORTED_MODULE_3__["StaticRoutingModule"]
            ]
        })
    ], StaticModule);
    return StaticModule;
}());



/***/ }),

/***/ "./src/app/static/sustainable/sustainable.component.html":
/*!***************************************************************!*\
  !*** ./src/app/static/sustainable/sustainable.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row content-header\">\n      <h3>Sustainable Development Goal - 6 (SDG-6) </h3>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <app-about-side-menu></app-about-side-menu>\n      </div>\n      <div class=\"col-md-9 sdg\">\n          <h5>Goal:</h5>\n          <p><i>Ensure availability and sustainable management of water and sanitation for all</i></p>\n          <h5>Targets and Indicators:</h5>\n          <table class=\"table table-striped\">\n              <thead>\n                  <tr>\n                    <th class=\"th-header width-col-one\">Targets</th>\n                    <th class=\"th-header width-col-two\">Indicators</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td>By 2030, achieve universal and equitable access to safe and affordable drinking water for all</td>\n                    <td>Proportion of population using safely managed drinking water services</td>\n                  </tr>\n                  <tr>\n                    <td>By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations</td>\n                    <td>Proportion of population using safely managed sanitation services, including a hand-washing facility with soap and water</td>\n                  </tr>\n                  <tr>\n                    <td>By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally</td>\n                    <td>Proportion of wastewater safely treated; Proportion of bodies of water with good ambient water quality</td>\n                  </tr>\n                  <tr>\n                    <td>By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity</td>\n                    <td>Change in water-use efficiency over time; Level of water stress: freshwater withdrawal as a proportion of available freshwater resources</td>\n                  </tr>\n                  <tr>\n                    <td>By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate</td>\n                    <td>Degree of integrated water resources management implementation (0-100); Proportion of transboundary basin area with an operational arrangement for water cooperation</td>\n                  </tr>\n                  <tr>\n                    <td>By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes</td>\n                    <td>Change in the extent of water-related ecosystems over time</td>\n                  </tr>\n                  <tr>\n                    <td>By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies</td>\n                    <td>Amount of water- and sanitation-related official development assistance that is part of a government-coordinated spending plan</td>\n                  </tr>\n                  <tr>\n                    <td>Support and strengthen the participation of local communities in improving water and sanitation management</td>\n                    <td>Proportion of local administrative units with established and operational policies and procedures for participation of local communities in water and sanitation management</td>\n                  </tr>\n                </tbody>\n          </table>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/static/sustainable/sustainable.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/static/sustainable/sustainable.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-header {\n  margin-top: 20px;\n  border-bottom: 1px solid #1f4a7c; }\n\n.content-header h3 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1f4a7c; }\n\n.sdg {\n  margin-top: 17px;\n  margin-bottom: 20px; }\n\n.sdg h5 {\n  font-size: 20px;\n  color: #1f4a7c; }\n\n.sdg p {\n  text-align: justify; }\n\n.vision {\n  font-style: italic;\n  font-weight: bold; }\n\ntable.table.table-striped {\n  border: 1px solid #ddd; }\n\nthead {\n  background-color: #777; }\n\nth {\n  color: white;\n  text-align: center;\n  font-weight: 500; }\n\n.width-col-one, .width-col-two {\n  width: 50%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL3N1c3RhaW5hYmxlL0Q6XFxzYm1fMTAwX3VpX2Rldlxcc2JtMTAwL3NyY1xcYXBwXFxzdGF0aWNcXHN1c3RhaW5hYmxlXFxzdXN0YWluYWJsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixpQ0FBZ0MsRUFDbkM7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixlQUFjLEVBQ2pCOztBQUNEO0VBQ0ksaUJBQWdCO0VBQ2hCLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJLGdCQUFlO0VBQ2YsZUFBYyxFQUNqQjs7QUFDRDtFQUNJLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixrQkFBaUIsRUFDcEI7O0FBQ0Q7RUFDSSx1QkFBc0IsRUFDekI7O0FBQ0Q7RUFDSSx1QkFBc0IsRUFDekI7O0FBQ0Q7RUFDSSxhQUFZO0VBQ1osbUJBQWtCO0VBQ2xCLGlCQUFnQixFQUNuQjs7QUFDRDtFQUNJLFdBQVUsRUFDYiIsImZpbGUiOiJzcmMvYXBwL3N0YXRpYy9zdXN0YWluYWJsZS9zdXN0YWluYWJsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50LWhlYWRlciB7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxZjRhN2M7XHJcbn1cclxuLmNvbnRlbnQtaGVhZGVyIGgze1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjMWY0YTdjO1xyXG59XHJcbi5zZGd7XHJcbiAgICBtYXJnaW4tdG9wOiAxN3B4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG4uc2RnIGg1e1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgY29sb3I6ICMxZjRhN2M7XHJcbn1cclxuLnNkZyBwe1xyXG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcclxufVxyXG4udmlzaW9ue1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxudGFibGUudGFibGUudGFibGUtc3RyaXBlZCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG59XHJcbnRoZWFkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3Nzc7XHJcbn1cclxudGgge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG4ud2lkdGgtY29sLW9uZSwgLndpZHRoLWNvbC10d297XHJcbiAgICB3aWR0aDogNTAlO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/static/sustainable/sustainable.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/static/sustainable/sustainable.component.ts ***!
  \*************************************************************/
/*! exports provided: SustainableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SustainableComponent", function() { return SustainableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SustainableComponent = /** @class */ (function () {
    function SustainableComponent() {
    }
    SustainableComponent.prototype.ngOnInit = function () {
    };
    SustainableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sustainable',
            template: __webpack_require__(/*! ./sustainable.component.html */ "./src/app/static/sustainable/sustainable.component.html"),
            styles: [__webpack_require__(/*! ./sustainable.component.scss */ "./src/app/static/sustainable/sustainable.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SustainableComponent);
    return SustainableComponent;
}());



/***/ }),

/***/ "./src/app/static/terms-of-use/terms-of-use.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/static/terms-of-use/terms-of-use.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container terms\">\n  <div class=\"content-header\">\n    <h3>Terms of Use</h3>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-12 col-sm-12 col-xs-12 terms-use\">\n      <p><span>Welcome to our website. If you continue to browse and use this website,\n          you are agreeing to comply with and be bound by the following terms and conditions of use: </span></p>\n      <ul>\n        <li>The content of the pages of this website is for your general information and use only. It is subject to\n          change without notice.</li>\n        <li>This website does not provide any warranty or guarantee as to the accuracy, timeliness, performance,\n          completeness or suitability of the information and materials found or offered on this website for any\n          particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors\n          and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by\n          law.</li>\n        <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall\n          not be liable.</li>\n        <li>This website contains material which is owned by or licensed to us. This material includes, but is not\n          limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in\n          accordance with the copyright notice, which forms part of these terms and conditions.</li>\n        <li>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are\n          acknowledged on the website.</li>\n        <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.</li>\n        <li>From time to time, this website may also include links to other websites. These links are provided for your\n          convenience to provide further information. They do not signify that we endorse the website(s). We have no\n          responsibility for the content of the linked website(s).</li>\n      </ul>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/static/terms-of-use/terms-of-use.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/static/terms-of-use/terms-of-use.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".terms {\n  margin-top: 30px;\n  margin-bottom: 30px; }\n\n.content-header h3 {\n  font-size: 24px;\n  font-weight: 500;\n  color: #1f4a7c; }\n\n.terms-use p {\n  text-align: justify; }\n\n.terms-use ul li {\n  text-align: justify;\n  line-height: 27px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL3Rlcm1zLW9mLXVzZS9EOlxcc2JtXzEwMF91aV9kZXZcXHNibTEwMC9zcmNcXGFwcFxcc3RhdGljXFx0ZXJtcy1vZi11c2VcXHRlcm1zLW9mLXVzZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixvQkFBbUIsRUFDdEI7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixlQUFjLEVBQ2pCOztBQUNEO0VBQ0ksb0JBQW1CLEVBQ3RCOztBQUNEO0VBQ0ksb0JBQW1CO0VBQ25CLGtCQUFpQixFQUNwQiIsImZpbGUiOiJzcmMvYXBwL3N0YXRpYy90ZXJtcy1vZi11c2UvdGVybXMtb2YtdXNlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRlcm1ze1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuLmNvbnRlbnQtaGVhZGVyIGgze1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGNvbG9yOiAjMWY0YTdjO1xyXG59XHJcbi50ZXJtcy11c2UgcHtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbn1cclxuLnRlcm1zLXVzZSB1bCBsaXtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbiAgICBsaW5lLWhlaWdodDogMjdweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/static/terms-of-use/terms-of-use.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/static/terms-of-use/terms-of-use.component.ts ***!
  \***************************************************************/
/*! exports provided: TermsOfUseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsOfUseComponent", function() { return TermsOfUseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TermsOfUseComponent = /** @class */ (function () {
    function TermsOfUseComponent() {
    }
    TermsOfUseComponent.prototype.ngOnInit = function () {
    };
    TermsOfUseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-terms-of-use',
            template: __webpack_require__(/*! ./terms-of-use.component.html */ "./src/app/static/terms-of-use/terms-of-use.component.html"),
            styles: [__webpack_require__(/*! ./terms-of-use.component.scss */ "./src/app/static/terms-of-use/terms-of-use.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TermsOfUseComponent);
    return TermsOfUseComponent;
}());



/***/ }),

/***/ "./src/app/static/water-sanitation/water-sanitation.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/static/water-sanitation/water-sanitation.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row content-header\">\n      <h3>Odisha Water & Sanitation Mission (OWSM)</h3>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <app-about-side-menu></app-about-side-menu>\n      </div>\n      <div class=\"col-md-9 sanitation\">\n          <p>The Odisha State Water and Sanitation Mission (OSWSM) was established vide Govt. of Odisha\n              Resolution No. 9990/RD dated 05.07.2002. The Mission is tasked with implementation and monitoring of\n              Rural Water Supply and Sanitation Programs across Odisha. The Mission initially operated under the aegis\n              of Department of Rural Development, Govt. of Odisha. After reorganization in 2017, it currently operates\n              under the Department of Panchayati Raj & Drinking Water, Government of Odisha. In the Governing Body Meet\n              of OSWSM on 16th January 2018, the Mission was re-christened as Odisha Water and Sanitation Mission\n              (OWSM).</p>\n          <h5>Aims and Objectives of the Mission:</h5>\n          <p>The Mission has the overall goal of improving the quality of life by ensuring access to better water\n              supply and sanitation facilities in rural areas. The Mission will be responsible to:</p>\n          <ul>\n            <li>Ensure universal access to safe drinking water in rural areas as per BIS standard</li>\n            <li>Ensure portability, reliability, sustainability, convenience, equity and consumer preference while\n              providing drinking water facility in rural Odisha</li>\n            <li>Provide safe drinking water facility especially Pipe Water Supply to Gram Panchayats, Villages, Govt.\n              Schools and AWCs</li>\n            <li>Provide enabling support and environment for Panchayat Raj Institutions and local communities to manage\n              their own drinking water sources and systems in their villages</li>\n            <li>Shift from a Supply to a Demand Driven approach through community participation with user charges for\n              the operation and maintenance of the system by the Gram Panchayats as well as communities.</li>\n            <li>Enable the community to plan, implement and manage their own water supply systems, the State should\n              transfer the program to the PRIs particularly to the Gram Panchayats for management within the village.</li>\n            <li>Prepare water safety plan in water quality problem areas and ensure periodic water quality testing\n              through established Water Testing Laboratories located at district and sub-division levels as well as\n              ensure sanitary surveillance of water sources through community participation.</li>\n            <li>Establish Water Quality Monitoring & Surveillance System to address the water quality problems in rural\n              areas.</li>\n            <li>Use Information Technology (IT) based Management Information System for Maintenance of habitation –\n              level status of water supply data and provide access to information through online reporting mechanism\n              with information placed in public domain to bring in transparency and informed decision making. </li>\n            <li>Identify field problems and generate new ideas for research, development and innovation and identify\n              institutions and scientists for specific research areas</li>\n            <li>Formulate guidelines for various programmes of the Mission</li>\n            <li>Build the capabilities of Panchayats at every level and other local institutions to address the needs\n              identified by the poor.</li>\n            <li>Promote community ownership of the projects with the responsibility for operation and maintenance in\n              order to ensure sustainability</li>\n            <li>Overall policy guidance and coordination of programmes implemented by the District Water & Sanitation\n              Missions keeping in view the guidelines of Govt. of India & Govt. of Odisha for water and sanitation\n              programmes in order to make the water supply and sanitation projects self-sustainable.</li>\n            <li>Ensure transfer of all existing and new Rural Piped Water Supply projects to the Gram Panchayats /\n              Village Water & Sanitation Committee (VWSC).</li>\n            <li>Ensure coordination with different departments, agencies and convergence of different activities and\n              different schemes related to water supply & sanitation in rural areas.</li>\n            <li>Bring about an improvement in the general quality of life in the rural areas, by promoting cleanliness,\n              hygiene and eliminating open defecation.</li>\n            <li>Accelerate sanitation coverage in rural areas to achieve the vision of Swachh Bharat by 2nd October\n              2019.</li>\n            <li>Motivate Communities and Panchayati Raj Institutions to adopt sustainable sanitation practices and\n              facilities through awareness creation and health education.</li>\n            <li>Encourage cost effective and appropriate technologies for ecologically safe and sustainable sanitation.</li>\n            <li>Develop wherever required, Community managed sanitation systems focusing on scientific Solid & Liquid\n              Waste Management systems for overall cleanliness in the rural areas.</li>\n            <li>Make any other activities that are consistent with the aims & objectives of the Mission</li>\n            </ul>\n          <p>In order to achieve the above water & sanitation goals, 30 District Water & Sanitation Missions\n              (DWSMs) in each of the 30 districts function under the Odisha Water & Sanitation Mission (OWSM) tasked\n              with the ground-level implementation and monitoring of the Rural Water Supply and Sanitation programs.</p>\n          <div class=\" table-title\">\n            <h3>Composition of Executive Committee of OWSM:</h3>\n          </div>\n          <table class=\"table table-striped\">\n            <thead>\n              <tr>\n                <th class=\"th-header width-col-one\">Sl No.</th>\n                <th class=\"th-header width-col-two\">Executive Committee of OWSM </th>\n                <th class=\"th-header width-col-three\"></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>1</td>\n                <td>Principal Secretary, Panchayati Raj & Drinking Water</td>\n                <td>Chairman</td>\n              </tr>\n              <tr>\n                <td>2</td>\n                <td>Director, Drinking Water & Sanitation and Mission Director</td>\n                <td>Member Convenor</td>\n              </tr>\n              <tr>\n                <td>3</td>\n                <td>Director, Panchayati Raj</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>4</td>\n                <td>FA-cum-Additional Secretary, PR&DW</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>5</td>\n                <td>Engineer-in-Chief, RWSS</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>6</td>\n                <td>Chief Engineer, RWSS, Water Supply</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>7</td>\n                <td>Chief Engineer, RWSS, Sanitation</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>8</td>\n                <td>Regional Director, Central Ground Water Board</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>9</td>\n                <td>The Executive Committee will invite the State-level Officials of other Departments as per the\n                  agenda requirements</td>\n                <td>Member</td>\n              </tr>\n            </tbody>\n          </table>\n\n          <div class=\" table-title\">\n            <h3>Composition of Governing Body of DWSM:</h3>\n          </div>\n          <table class=\"table table-striped\">\n            <thead>\n              <tr>\n                <th class=\"th-header width-col-one\">Sl No.</th>\n                <th class=\"th-header width-col-two\">Governing Body of DWSM </th>\n                <th class=\"th-header width-col-three\"></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>1</td>\n                <td>Chairman Zilla Parisad/DRDA </td>\n                <td>Chairman</td>\n              </tr>\n              <tr>\n                <td>2</td>\n                <td>District Collector </td>\n                <td>Vice-Chairman</td>\n              </tr>\n              <tr>\n                <td>3</td>\n                <td>PD DRDA </td>\n                <td>Member Secretary</td>\n              </tr>\n              <tr>\n                <td>4</td>\n                <td>Executive Engineer, RWSS </td>\n                <td>Member Convenor</td>\n              </tr>\n              <tr>\n                <td>5</td>\n                <td>MP Lok Sabha - Member</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>6</td>\n                <td>All MLAs - Member</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>7</td>\n                <td>SE, RWSS Circle - Member</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>8</td>\n                <td>Representative of the State Govt. from PR&DW Deptt.</td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>9</td>\n                <td>CDMO </td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>10</td>\n                <td>District Education Officer  </td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>11</td>\n                <td>District Social Welfare Officer  </td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>12</td>\n                <td>District Planning Officer  </td>\n                <td>Member</td>\n              </tr>\n              <tr>\n                <td>13</td>\n                <td>DWO/PA,ITDA (as the case maybe)</td>\n                <td>Member</td>\n              </tr>\n            </tbody>\n          </table>\n\n            <table class=\"table table-striped\">\n              <thead>\n                <tr>\n                  <th class=\"th-header width-col-one\">Sl No.</th>\n                  <th class=\"th-header width-col-two\">Executive Committee of DWSM  </th>\n                  <th class=\"th-header width-col-three\"></th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>1</td>\n                  <td>District Collector </td>\n                  <td>Chairman</td>\n                </tr>\n                <tr>\n                  <td>2</td>\n                  <td>PD DRDA </td>\n                  <td>Member Secretary</td>\n                </tr>\n                <tr>\n                  <td>3</td>\n                  <td>Executive Engineer, RWSS</td>\n                  <td>Member Convenor</td>\n                </tr>\n                <tr>\n                  <td>4</td>\n                  <td>Additional PD (Finance) </td>\n                  <td>Member</td>\n                </tr>\n                <tr>\n                  <td>5</td>\n                  <td>All Sub-Collectors </td>\n                  <td>Member</td>\n                </tr>\n                <tr>\n                  <td>6</td>\n                  <td>All BDOs </td>\n                  <td>Member</td>\n                </tr>\n                <tr>\n                  <td>7</td>\n                  <td>District Education Officer </td>\n                  <td>Member</td>\n                </tr>\n                <tr>\n                  <td>8</td>\n                  <td>District Social Welfare Officer </td>\n                  <td>Member</td>\n                </tr>\n                <tr>\n                  <td>9</td>\n                  <td>District Planning Officer </td>\n                  <td>Member</td>\n                </tr>\n                <tr>\n                    <td>10</td>\n                    <td>CDMO  </td>\n                    <td>Member</td>\n                  </tr>\n                  <tr>\n                      <td>11</td>\n                      <td>DWO/PA,ITDA </td>\n                      <td>Member</td>\n                    </tr>\n                    <tr>\n                        <td>12</td>\n                        <td>The Executive Committee will invite the District-level Line \n                          Deptt. officers as per the agenda requirements.</td>\n                        <td>Member</td>\n                      </tr>\n              </tbody>\n            </table>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/static/water-sanitation/water-sanitation.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/static/water-sanitation/water-sanitation.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-header {\n  margin-top: 20px;\n  border-bottom: 1px solid #1f4a7c; }\n\n.content-header h3 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1f4a7c; }\n\n.sanitation {\n  margin-top: 17px;\n  margin-bottom: 20px; }\n\n.sanitation h5 {\n  font-size: 20px;\n  color: #1f4a7c; }\n\n.sanitation p {\n  text-align: justify; }\n\n.vision {\n  font-style: italic;\n  font-weight: bold; }\n\ntable.table.table-striped {\n  border: 1px solid #ddd; }\n\nthead {\n  background-color: #777; }\n\nth {\n  color: white;\n  font-weight: 500; }\n\n.width-col-one {\n  width: 15%; }\n\n.width-col-two {\n  width: 55%; }\n\n.width-col-three {\n  width: 30%; }\n\n.table-title h3 {\n  font-size: 20px;\n  color: #1f4a7c;\n  margin-top: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdGljL3dhdGVyLXNhbml0YXRpb24vRDpcXHNibV8xMDBfdWlfZGV2XFxzYm0xMDAvc3JjXFxhcHBcXHN0YXRpY1xcd2F0ZXItc2FuaXRhdGlvblxcd2F0ZXItc2FuaXRhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQjtFQUNoQixpQ0FBZ0MsRUFDbkM7O0FBQ0Q7RUFDSSxnQkFBZTtFQUNmLGlCQUFnQjtFQUNoQixlQUFjLEVBQ2pCOztBQUNEO0VBQ0ksaUJBQWdCO0VBQ2hCLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJLGdCQUFlO0VBQ2YsZUFBYyxFQUNqQjs7QUFDRDtFQUNJLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixrQkFBaUIsRUFDcEI7O0FBQ0Q7RUFDSSx1QkFBc0IsRUFDekI7O0FBQ0Q7RUFDSSx1QkFBc0IsRUFDekI7O0FBQ0Q7RUFDSSxhQUFZO0VBQ1osaUJBQWdCLEVBQ25COztBQUNEO0VBQ0ksV0FBVSxFQUNiOztBQUNEO0VBQ0ksV0FBVSxFQUNiOztBQUNEO0VBQ0ksV0FBVSxFQUNiOztBQUNEO0VBQ0ksZ0JBQWU7RUFDZixlQUFjO0VBQ2QsaUJBQWdCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvc3RhdGljL3dhdGVyLXNhbml0YXRpb24vd2F0ZXItc2FuaXRhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50LWhlYWRlciB7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxZjRhN2M7XHJcbn1cclxuLmNvbnRlbnQtaGVhZGVyIGgze1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjMWY0YTdjO1xyXG59XHJcbi5zYW5pdGF0aW9ue1xyXG4gICAgbWFyZ2luLXRvcDogMTdweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuLnNhbml0YXRpb24gaDV7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBjb2xvcjogIzFmNGE3YztcclxufVxyXG4uc2FuaXRhdGlvbiBwe1xyXG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcclxufVxyXG4udmlzaW9ue1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxudGFibGUudGFibGUudGFibGUtc3RyaXBlZCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG59XHJcbnRoZWFkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3Nzc7XHJcbn1cclxudGgge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG4ud2lkdGgtY29sLW9uZXtcclxuICAgIHdpZHRoOiAxNSU7XHJcbn1cclxuLndpZHRoLWNvbC10d297XHJcbiAgICB3aWR0aDogNTUlO1xyXG59XHJcbi53aWR0aC1jb2wtdGhyZWV7XHJcbiAgICB3aWR0aDogMzAlO1xyXG59XHJcbi50YWJsZS10aXRsZSBoM3tcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGNvbG9yOiAjMWY0YTdjO1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/static/water-sanitation/water-sanitation.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/static/water-sanitation/water-sanitation.component.ts ***!
  \***********************************************************************/
/*! exports provided: WaterSanitationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaterSanitationComponent", function() { return WaterSanitationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var WaterSanitationComponent = /** @class */ (function () {
    function WaterSanitationComponent() {
    }
    WaterSanitationComponent.prototype.ngOnInit = function () {
    };
    WaterSanitationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-water-sanitation',
            template: __webpack_require__(/*! ./water-sanitation.component.html */ "./src/app/static/water-sanitation/water-sanitation.component.html"),
            styles: [__webpack_require__(/*! ./water-sanitation.component.scss */ "./src/app/static/water-sanitation/water-sanitation.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], WaterSanitationComponent);
    return WaterSanitationComponent;
}());



/***/ }),

/***/ "./src/app/user-management/filters/area-filter.pipe.ts":
/*!*************************************************************!*\
  !*** ./src/app/user-management/filters/area-filter.pipe.ts ***!
  \*************************************************************/
/*! exports provided: AreaFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaFilterPipe", function() { return AreaFilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AreaFilterPipe = /** @class */ (function () {
    function AreaFilterPipe() {
    }
    AreaFilterPipe.prototype.transform = function (areas, areaLevel, parentAreaId) {
        if (areas != undefined && areas != null && areaLevel != undefined && areaLevel != null && parentAreaId != undefined && parentAreaId != null) {
            switch (areaLevel) {
                // case 1:
                //   return areas.State.filter(area => area.parentAreaId === parentAreaId)
                case 2:
                    return areas.District.filter(function (area) { return area.parentAreaId === parentAreaId; });
                case 3:
                    return areas.Block.filter(function (area) { return area.parentAreaId === parentAreaId; });
            }
        }
        else {
            return [];
        }
    };
    AreaFilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'areaFilter'
        })
    ], AreaFilterPipe);
    return AreaFilterPipe;
}());



/***/ }),

/***/ "./src/app/user-management/reset-password/reset-password.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/user-management/reset-password/reset-password.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row question-row\">\n        <div class=\"col-md-3 left-list\">\n            <app-user-side-menu></app-user-side-menu>\n        </div>\n\n        <div class=\"col-md-9 content-sec offset-md-3\">\n            <div class=\"col-md-10 offset-md-1\">\n                <h2 class=\"user-heading\">Reset password</h2>\n                <form class=\"all-fields row\" #f=\"ngForm\">\n                    <div class=\"selection-fields col-md-6\">\n                        <label for=\"usr\">User Role:</label>\n                        <mat-form-field>\n                                <mat-select [(ngModel)]=\"selectedRoleId\" name=\"role\" (valueChange)=\"selectedDistrictId = undefined; selectedBlockId=undefined\">\n                                    <mat-option *ngFor=\"let opt of formFieldsAll\" [value]=\"opt.id\">\n                                        {{opt.name}}\n                                    </mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                    </div>\n                    <div class=\"selection-fields col-md-6\" *ngIf=\"selectedRoleId\">\n                        <label for=\"usr\">State:</label>\n                        <mat-form-field>\n                            <mat-select name=\"state\" [(ngModel)]=\"selectedStateId\" (valueChange)=\"selectedDistrictId = undefined; selectedBlockId=undefined\">\n                                <mat-option *ngFor=\"let opt of areaDetails | areaFilter:1:18\" [value]=\"opt.areaId\">\n                                    {{opt.areaName}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n\n                    <div class=\"selection-fields col-md-6\" *ngIf=\"selectedRoleId==2 || selectedRoleId == 3\">\n                        <label for=\"usr\">District:</label>\n                        <mat-form-field>\n                            <mat-select name=\"district\" [(ngModel)]=\"selectedDistrictId\" (valueChange)=\"selectedBlockId=undefined\">\n                                <mat-option *ngFor=\"let dist of areaDetails | areaFilter:2:selectedStateId\" [value]=\"dist.areaId\">\n                                    {{dist.areaName}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"selection-fields col-md-6\" *ngIf=\"selectedRoleId == 3\">\n                        <label for=\"usr\">Block:</label>\n                        <mat-form-field>\n                            <mat-select name=\"block\" [(ngModel)]=\"selectedBlockId\">\n                                <mat-option *ngFor=\"let block of areaDetails | areaFilter:3:selectedDistrictId\" [value]=\"block.areaId\">\n                                    {{block.areaName}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n\n                    <div class=\"form-group\" [ngClass]=\"selectedRoleId == 1 || selectedRoleId == 3 ? 'col-md-12 text-center':'col-md-6 text-left mt-btn' \">\n                        <button class=\"btn btn-default proceed-btn user-submit\" type=\"submit\" (click)=\"getDetails()\"\n                            [disabled]=\"!selectedRoleId || (selectedRoleId ==1 && !selectedStateId) || (selectedRoleId ==2 && !selectedDistrictId) ||  (selectedRoleId ==3 && !selectedBlockId)\">Submit</button>\n                    </div>\n                </form>\n\n                <div class=\"user-details-tbl\" *ngIf=\"tableData\">\n                    <h2 class=\"user-heading\"></h2>\n                    <table id=\"user-history\" class=\"table table-striped\" cellspacing=\"0\" width=\"100%\">\n                        <thead>\n                            <tr>\n                                <th class=\"t-heading\">Sl No</th>\n                                <th class=\"t-heading\">User name</th>\n                                <th class=\"t-heading\">Action</th>\n                            </tr>\n                        </thead>\n\n                        <tbody>\n                            <tr *ngFor=\"let tbl of tableData\">\n                                <td>{{tbl.userId}}</td>\n                                <td>{{tbl.userName}}</td>\n                                <td><button type=\"button\" class=\"btn btn-success\" style=\"background-color:#1f497b;\"\n                                        (click)=\"resetModal()\">Reset password</button></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"resetPassModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-notify modal-error\" role=\"document\">\n            <!--Content-->\n            <div class=\"modal-content\">\n                <!--Header-->\n                <div class=\"modal-header\">\n                    <p class=\"heading lead\">Reset Password</p>\n                </div>\n\n                <!--Body-->\n                <div class=\"modal-body\">\n                    <div class=\"col-md-12 select-container\">\n                        <form>\n                            <div class=\"form-group\">\n                                <label for=\"password\" class=\"control-label col-md-5\">new password :</label>\n                                <div class=\"col-md-6 input-holder\">\n                                    <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"user.password\"\n                                        required (change)=\"newPassError()\">\n                                </div>\n                                <div class=\"col-md-6 offset-md-5\" style=\"padding-left: 20px;\">\n                                    <small id=\"newPasserror\" style=\"color: red;\"></small>\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"password\" class=\"control-label col-md-5\">Confirm password :</label>\n                                <div class=\"col-md-6 input-holder\">\n                                    <input type=\"password\" class=\"form-control\" name=\"confirmPassword\" [(ngModel)]=\"user.confirmPassword\"\n                                        required (change)=\"confirmPassError()\">\n                                </div>\n                                <div class=\"col-md-6 offset-md-5\" style=\"padding-left: 20px;\">\n                                    <small id=\"confirmPasserror\" style=\"color: red;\"></small>\n                                    <small *ngIf=\"user.confirmPassword.length && user.password!=user.confirmPassword\"\n                                        style=\"color: red\">\n                                        Password and Confirm password does not match\n                                    </small>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                    <div class=\"text-center\">\n                        <button type=\"button\" class=\"btn errorOk\" (click)=\"submitModal(userId,user)\">Ok</button>\n                        <button type=\"button\" class=\"btn errorOk\" data-dismiss=\"modal\" (click)=\"resetBox(user)\">Cancel</button>\n                    </div>\n                </div>\n            </div>\n            <!--/.Content-->\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"successMatch\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-notify modal-error\" role=\"document\">\n            <!--Content-->\n            <div class=\"modal-content\">\n                <!--Header-->\n                <div class=\"modal-header\">\n                    <p class=\"heading lead\">Success</p>\n                </div>\n\n                <!--Body-->\n                <div class=\"modal-body\">\n                    <div class=\"text-center\">\n                        <i class=\"fa fa-check fa-4x animated rotateIn\"></i>\n                        <p>Your password has been successfully reset.</p>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-secondary m-auto d-block\" data-dismiss=\"modal\">Ok</button>\n                </div>\n            </div>\n            <!--/.Content-->\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"oldPassNotMatch\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-notify modal-error\" role=\"document\">\n            <!--Content-->\n            <div class=\"modal-content\">\n                <!--Header-->\n                <div class=\"modal-header data-error\">\n                    <p class=\"heading lead\">Error</p>\n                </div>\n\n                <!--Body-->\n                <div class=\"modal-body\">\n                    <div class=\"text-center\">\n                        <i class=\"fa fa-close fa-4x animated rotateIn\"></i>\n                        <p>{{validationMsg}}</p>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-secondary m-auto d-block err-btn\" data-dismiss=\"modal\">Close</button>\n                </div>\n            </div>\n            <!--/.Content-->\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/user-management/reset-password/reset-password.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/user-management/reset-password/reset-password.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-sec {\n  padding-top: 15px; }\n\n.waves-light, .waves-light:hover, .waves-light:focus {\n  background-color: #1f497b !important; }\n\n.user-label {\n  max-width: 18.666667% !important; }\n\n.left-list {\n  height: 105%;\n  width: 30%;\n  background-color: #80a7e0;\n  padding-top: 80px;\n  position: absolute; }\n\n.user-heading {\n  font-size: 26px;\n  text-align: center;\n  border-bottom: 1px solid #31859c;\n  color: #31859c;\n  margin-bottom: 20px;\n  padding-bottom: 7px; }\n\n.btn.user-submit {\n  background-color: #234a7c;\n  border-radius: 0;\n  width: 120px;\n  color: #FFF; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1tYW5hZ2VtZW50L3Jlc2V0LXBhc3N3b3JkL0Q6XFxzYm1fMTAwX3VpX2Rldlxcc2JtMTAwL3NyY1xcYXBwXFx1c2VyLW1hbmFnZW1lbnRcXHJlc2V0LXBhc3N3b3JkXFxyZXNldC1wYXNzd29yZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGtCQUFpQixFQUNsQjs7QUFDRDtFQUNJLHFDQUFvQyxFQUNyQzs7QUFDRDtFQUNFLGlDQUFnQyxFQUNqQzs7QUFJRDtFQUNFLGFBQVk7RUFDWixXQUFVO0VBQ1YsMEJBQXlCO0VBQ3pCLGtCQUFpQjtFQUNqQixtQkFBa0IsRUFDckI7O0FBQ0Q7RUFDRSxnQkFBZTtFQUNmLG1CQUFrQjtFQUNsQixpQ0FBZ0M7RUFDaEMsZUFBYztFQUNkLG9CQUFtQjtFQUNuQixvQkFBbUIsRUFDcEI7O0FBQ0Q7RUFDRSwwQkFBeUI7RUFDekIsaUJBQWdCO0VBQ2hCLGFBQVk7RUFDWixZQUFXLEVBQ1oiLCJmaWxlIjoic3JjL2FwcC91c2VyLW1hbmFnZW1lbnQvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi5jb250ZW50LXNlYyB7XHJcbiAgcGFkZGluZy10b3A6IDE1cHg7XHJcbn1cclxuLndhdmVzLWxpZ2h0LCAud2F2ZXMtbGlnaHQ6aG92ZXIsIC53YXZlcy1saWdodDpmb2N1c3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxZjQ5N2IgIWltcG9ydGFudDtcclxuICB9XHJcbiAgLnVzZXItbGFiZWx7XHJcbiAgICBtYXgtd2lkdGg6IDE4LjY2NjY2NyUgIWltcG9ydGFudDtcclxuICB9XHJcbiAgLy8gLmRhdGEtZXJyb3IsIC5tb2RhbCAuZXJyLWJ0biB7XHJcbiAgLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWYxOTI2ICFpbXBvcnRhbnQ7XHJcbiAgLy8gfVxyXG4gIC5sZWZ0LWxpc3Qge1xyXG4gICAgaGVpZ2h0OiAxMDUlO1xyXG4gICAgd2lkdGg6IDMwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4MGE3ZTA7XHJcbiAgICBwYWRkaW5nLXRvcDogODBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxufVxyXG4udXNlci1oZWFkaW5nIHtcclxuICBmb250LXNpemU6IDI2cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzE4NTljO1xyXG4gIGNvbG9yOiAjMzE4NTljO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDdweDtcclxufVxyXG4uYnRuLnVzZXItc3VibWl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0YTdjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgd2lkdGg6IDEyMHB4O1xyXG4gIGNvbG9yOiAjRkZGO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/user-management/reset-password/reset-password.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/user-management/reset-password/reset-password.component.ts ***!
  \****************************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http/ */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_user_management_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user-management.service */ "./src/app/user-management/services/user-management.service.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");





var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(http, userManagementProvider) {
        this.http = http;
        this.userManagementProvider = userManagementProvider;
        this.payLoad = '';
        this.user = {
            username: '',
            oldPassword: '',
            password: '',
            confirmPassword: ''
        };
        this.userManagementService = userManagementProvider;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userManagementService.getUserRoles().subscribe(function (data) {
            _this.formFieldsAll = data;
        });
        this.userManagementService.getAreaDetails().subscribe(function (data) {
            _this.areaDetails = data;
        });
    };
    ResetPasswordComponent.prototype.getDetails = function () {
        var _this = this;
        this.http.get('assets/allUser.json').subscribe(function (response) {
            _this.allData = response;
            _this.allUser = Object.keys(_this.allData);
            for (var i = 0; i <= _this.allUser.length; i++) {
                if (_this.allUser[i] == "IND") {
                    _this.tableData = _this.allData[_this.allUser[i]];
                    _this.userId = _this.tableData[0].userId;
                }
            }
        });
    };
    ResetPasswordComponent.prototype.resetModal = function () {
        $("#resetPassModal").modal('show');
    };
    ResetPasswordComponent.prototype.resetBox = function (user) {
        this.user.password = "";
        this.user.confirmPassword = "";
        document.getElementById('newPasserror').innerHTML = "";
        document.getElementById('confirmPasserror').innerHTML = "";
    };
    ResetPasswordComponent.prototype.submitModal = function (userId, user) {
        var _this = this;
        var passDetails = {
            'userId': userId,
            'newPassword': this.user.password
        };
        if (this.user.password === "" || this.user.password === undefined) {
            document.getElementById('newPasserror').innerHTML = "Please enter new password.";
        }
        else if (this.user.confirmPassword === "" || this.user.confirmPassword === undefined) {
            document.getElementById('confirmPasserror').innerHTML = "Please enter confirm password.";
        }
        else if (this.user.confirmPassword === this.user.password) {
            this.http.post(_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].HOME_URL + 'resetPassword', passDetails).subscribe(function (data) {
                if (data === true) {
                    $("#resetPassModal").modal('hide');
                    $("#successMatch").modal('show');
                    _this.user.password = "";
                    _this.user.confirmPassword = "";
                    _this.tableData = '';
                }
                else {
                    $("#resetPassModal").modal('hide');
                    $("#oldPassNotMatch").modal('show');
                    _this.user.password = "";
                    _this.user.confirmPassword = "";
                    _this.validationMsg = "Error occurred";
                }
            }, function (err) {
                $("#oldPassNotMatch").modal('show');
                _this.validationMsg = "Error occurred";
            });
        }
    };
    ResetPasswordComponent.prototype.newPassError = function () {
        if (this.user.password != undefined || this.user.password != "")
            document.getElementById('newPasserror').innerHTML = "";
    };
    ;
    ResetPasswordComponent.prototype.confirmPassError = function () {
        if (this.user.confirmPassword != undefined || this.user.confirmPassword != "")
            document.getElementById('confirmPasserror').innerHTML = "";
    };
    ;
    ResetPasswordComponent.prototype.ngAfterViewInit = function () {
        $("input, textarea, .select-dropdown").focus(function () {
            $(this).closest(".input-holder").parent().find("> label").css({ "color": "#4285F4" });
        });
        $("input, textarea, .select-dropdown").blur(function () {
            $(this).closest(".input-holder").parent().find("> label").css({ "color": "#333" });
        });
    };
    ResetPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/user-management/reset-password/reset-password.component.html"),
            styles: [__webpack_require__(/*! ./reset-password.component.scss */ "./src/app/user-management/reset-password/reset-password.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http___WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _services_user_management_service__WEBPACK_IMPORTED_MODULE_3__["UserManagementService"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/user-management/services/user-management.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/user-management/services/user-management.service.ts ***!
  \*********************************************************************/
/*! exports provided: UserManagementService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementService", function() { return UserManagementService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var UserManagementService = /** @class */ (function () {
    function UserManagementService(httpClient) {
        this.httpClient = httpClient;
    }
    UserManagementService.prototype.getUserRoles = function () {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].HOME_URL + 'getAllDesignations');
    };
    UserManagementService.prototype.getAreaDetails = function () {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].HOME_URL + 'getAllArea');
    };
    UserManagementService.prototype.getTypeDetails = function () {
        return this.httpClient.get(_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].HOME_URL + 'getTypeDetails');
    };
    UserManagementService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], UserManagementService);
    return UserManagementService;
}());



/***/ }),

/***/ "./src/app/user-management/user-management-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/user-management/user-management-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: UserManagementRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementRoutingModule", function() { return UserManagementRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-management/user-management.component */ "./src/app/user-management/user-management/user-management.component.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/user-management/reset-password/reset-password.component.ts");
/* harmony import */ var _guard_role_guard_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../guard/role-guard.guard */ "./src/app/guard/role-guard.guard.ts");






var routes = [
    {
        path: 'user-management',
        pathMatch: 'full',
        component: _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_3__["UserManagementComponent"],
        canActivate: [_guard_role_guard_guard__WEBPACK_IMPORTED_MODULE_5__["RoleGuardGuard"]],
        data: {
            expectedRoles: ["usermgmt_HAVING_write"]
        }
    },
    {
        path: 'reset-password',
        pathMatch: 'full',
        component: _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_4__["ResetPasswordComponent"],
        canActivate: [_guard_role_guard_guard__WEBPACK_IMPORTED_MODULE_5__["RoleGuardGuard"]],
        data: {
            expectedRoles: ["usermgmt_HAVING_write"]
        }
    }
];
var UserManagementRoutingModule = /** @class */ (function () {
    function UserManagementRoutingModule() {
    }
    UserManagementRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], UserManagementRoutingModule);
    return UserManagementRoutingModule;
}());



/***/ }),

/***/ "./src/app/user-management/user-management.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/user-management/user-management.module.ts ***!
  \***********************************************************/
/*! exports provided: UserManagementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementModule", function() { return UserManagementModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _user_management_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-management-routing.module */ "./src/app/user-management/user-management-routing.module.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-management/user-management.component */ "./src/app/user-management/user-management/user-management.component.ts");
/* harmony import */ var _user_side_menu_user_side_menu_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-side-menu/user-side-menu.component */ "./src/app/user-management/user-side-menu/user-side-menu.component.ts");
/* harmony import */ var _filters_area_filter_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./filters/area-filter.pipe */ "./src/app/user-management/filters/area-filter.pipe.ts");
/* harmony import */ var _services_user_management_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/user-management.service */ "./src/app/user-management/services/user-management.service.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/user-management/reset-password/reset-password.component.ts");
/* harmony import */ var sdrc_form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! sdrc-form */ "./node_modules/sdrc-form/fesm5/sdrc-form.js");












var UserManagementModule = /** @class */ (function () {
    function UserManagementModule() {
    }
    UserManagementModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                //,HttpModule
                //,HttpClientModule
                ,
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _user_management_routing_module__WEBPACK_IMPORTED_MODULE_3__["UserManagementRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                sdrc_form__WEBPACK_IMPORTED_MODULE_11__["FormModule"]
            ],
            declarations: [
                _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_6__["UserManagementComponent"],
                _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_10__["ResetPasswordComponent"],
                _user_side_menu_user_side_menu_component__WEBPACK_IMPORTED_MODULE_7__["UserSideMenuComponent"],
                _filters_area_filter_pipe__WEBPACK_IMPORTED_MODULE_8__["AreaFilterPipe"]
            ],
            providers: [_services_user_management_service__WEBPACK_IMPORTED_MODULE_9__["UserManagementService"]]
        })
    ], UserManagementModule);
    return UserManagementModule;
}());



/***/ }),

/***/ "./src/app/user-management/user-management/user-management.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/user-management/user-management/user-management.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row question-row\">\n        <div class=\"col-md-3 left-list\">\n            <app-user-side-menu></app-user-side-menu>\n        </div>\n\n        <div class=\"col-md-9 content-sec offset-md-3\">\n            <div class=\"col-md-10 offset-md-1\">\n                <h2 class=\"user-heading\">Create new user</h2>\n                <form class=\"all-fields row\" #f=\"ngForm\">\n                    <div class=\"selection-fields col-md-6\">\n                        <label for=\"usr\">Full Name:</label>\n                        <mat-form-field>\n                            <input matInput name=\"name\" [(ngModel)]=\"fullName\" required>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"selection-fields col-md-6\">\n                        <label for=\"usr\">Mobile No.:</label>\n                        <mat-form-field>\n                            <input matInput class=\"nospinner\" type=\"number\" maxlength=\"10\" minlength=\"10\" name=\"mobile\" [(ngModel)]=\"mobile\" required>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"selection-fields col-md-6\">\n                        <label for=\"usr\">Username:</label>\n                        <mat-form-field>\n                            <input matInput name=\"name\" [(ngModel)]=\"userName\" required>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"selection-fields col-md-6\">\n                        <label for=\"usr\">password:</label>\n                        <mat-form-field>\n                            <input matInput name=\"password\" [(ngModel)]=\"password\" required>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"selection-fields col-md-6\">\n                        <label for=\"usr\">Type Detail:</label>\n                        <mat-form-field>\n                            <mat-select [(ngModel)]=\"selectedUserTypeId\" name=\"typeDetail\">\n                                <mat-option *ngFor=\"let opt of userManagementService.typeDetails\" [value]=\"opt.typeDetailId\">\n                                    {{opt.typeDetailName}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"selection-fields col-md-6\">\n                        <label for=\"usr\">User Role:</label>\n                        <mat-form-field>\n                            <mat-select [(ngModel)]=\"selectedRoleId\" name=\"role\" (valueChange)=\"selectedDistrictId = undefined; selectedBlockId=undefined\">\n                                <mat-option *ngFor=\"let opt of userManagementService.formFieldsAll\" [value]=\"opt.id\">\n                                    {{opt.name}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n\n                    <!-- <div class=\"selection-fields col-md-6\" *ngIf=\"selectedRoleId\">\n                        <label for=\"usr\">State:</label>\n                        <mat-form-field>\n                            <mat-select name=\"state\" [(ngModel)]=\"selectedStateId\" \n                            (valueChange)=\"selectedDistrictId = undefined; selectedBlockId=undefined\">\n                                <mat-option *ngFor=\"let opt of areaDetails | areaFilter:1:2\" [value]=\"opt.areaId\">\n                                    {{opt.areaName}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div> -->\n\n                    <div class=\"selection-fields col-md-6\" *ngIf=\"selectedRoleId==2 || selectedRoleId == 3\">\n                        <label for=\"usr\">District:</label>\n                        <mat-form-field>\n                            <mat-select name=\"district\" [(ngModel)]=\"selectedDistrictId\" (valueChange)=\"selectedBlockId=undefined\">\n                                <mat-option *ngFor=\"let dist of userManagementService.areaDetails | areaFilter:2:18\" [value]=\"dist.areaId\">\n                                    {{dist.areaName}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"selection-fields col-md-6\" *ngIf=\"selectedRoleId == 3\">\n                        <label for=\"usr\">Block:</label>\n                        <mat-form-field>\n                            <mat-select name=\"block\" [(ngModel)]=\"selectedBlockId\">\n                                <mat-option *ngFor=\"let block of userManagementService.areaDetails | areaFilter:3:selectedDistrictId\" [value]=\"block.areaId\">\n                                    {{block.areaName}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n\n                    <div class=\"form-group\" [ngClass]=\"selectedRoleId && selectedRoleId == 2  ? 'col-md-6 text-left mt-btn':'col-md-12 text-center' \">\n                        <button class=\"btn btn-default proceed-btn user-submit\" type=\"submit\" (click)=\"submitForm(selectedRoleId)\"\n                            [disabled]=\"!selectedRoleId || (selectedRoleId ==2 && !selectedDistrictId) ||  (selectedRoleId ==3 && !selectedBlockId)\">Create</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"successMatch\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-notify modal-error\" role=\"document\">\n            <!--Content-->\n            <div class=\"modal-content\">\n                <!--Header-->\n                <div class=\"modal-header\">\n                    <p class=\"heading lead\">Success</p>\n                </div>\n\n                <!--Body-->\n                <div class=\"modal-body\">\n                    <div class=\"text-center\">\n                        <p> User has been created.</p>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-secondary m-auto d-block\" (click)=\"successModal()\">Ok</button>\n                </div>\n            </div>\n            <!--/.Content-->\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"oldPassNotMatch\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-notify modal-error\" role=\"document\">\n            <!--Content-->\n            <div class=\"modal-content\">\n                <!--Header-->\n                <div class=\"modal-header data-error\">\n                    <p class=\"heading lead\">Error</p>\n                </div>\n\n                <!--Body-->\n                <div class=\"modal-body\">\n                    <div class=\"text-center\">\n                        <p>{{validationMsg}}</p>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-secondary m-auto d-block err-btn\" data-dismiss=\"modal\">Close</button>\n                </div>\n            </div>\n            <!--/.Content-->\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/user-management/user-management/user-management.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/user-management/user-management/user-management.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-sec {\n  padding-top: 15px; }\n\n.waves-light, .waves-light:hover, .waves-light:focus {\n  background-color: #1f497b !important; }\n\n.user-label {\n  max-width: 18.666667% !important; }\n\n.left-list {\n  height: 105%;\n  width: 30%;\n  background-color: #80a7e0;\n  padding-top: 80px;\n  position: absolute; }\n\n.user-heading {\n  font-size: 26px;\n  text-align: center;\n  border-bottom: 1px solid #31859c;\n  color: #31859c;\n  margin-bottom: 20px;\n  padding-bottom: 7px; }\n\n.btn.user-submit {\n  background-color: #234a7c;\n  border-radius: 0;\n  width: 120px;\n  color: #FFF; }\n\n#oldPassNotMatch .modal-header {\n  height: 39px;\n  padding: 3px 14px; }\n\np.heading.lead {\n  font-weight: bold;\n  color: #234a7c; }\n\n.err-btn {\n  border-radius: 0;\n  background-color: #234a7c; }\n\ninput.nospinner[type=number]::-webkit-inner-spin-button,\ninput.nospinner[type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1tYW5hZ2VtZW50L3VzZXItbWFuYWdlbWVudC9EOlxcc2JtXzEwMF91aV9kZXZcXHNibTEwMC9zcmNcXGFwcFxcdXNlci1tYW5hZ2VtZW50XFx1c2VyLW1hbmFnZW1lbnRcXHVzZXItbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGtCQUFpQixFQUNsQjs7QUFDRDtFQUNJLHFDQUFvQyxFQUNyQzs7QUFDRDtFQUNFLGlDQUFnQyxFQUNqQzs7QUFJRDtFQUNFLGFBQVk7RUFDWixXQUFVO0VBQ1YsMEJBQXlCO0VBQ3pCLGtCQUFpQjtFQUNqQixtQkFBa0IsRUFDckI7O0FBQ0Q7RUFDRSxnQkFBZTtFQUNmLG1CQUFrQjtFQUNsQixpQ0FBZ0M7RUFDaEMsZUFBYztFQUNkLG9CQUFtQjtFQUNuQixvQkFBbUIsRUFDcEI7O0FBQ0Q7RUFDRSwwQkFBeUI7RUFDekIsaUJBQWdCO0VBQ2hCLGFBQVk7RUFDWixZQUFXLEVBQ1o7O0FBQ0Q7RUFDRSxhQUFZO0VBQ1osa0JBQWlCLEVBQ2xCOztBQUNEO0VBQ0Usa0JBQWlCO0VBQ2pCLGVBQWMsRUFDZjs7QUFDRDtFQUNFLGlCQUFnQjtFQUNoQiwwQkFBeUIsRUFDMUI7O0FBQ0Q7O0VBRUUseUJBQXdCO0VBQ3hCLFVBQVMsRUFDViIsImZpbGUiOiJzcmMvYXBwL3VzZXItbWFuYWdlbWVudC91c2VyLW1hbmFnZW1lbnQvdXNlci1tYW5hZ2VtZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4uY29udGVudC1zZWMge1xyXG4gIHBhZGRpbmctdG9wOiAxNXB4O1xyXG59XHJcbi53YXZlcy1saWdodCwgLndhdmVzLWxpZ2h0OmhvdmVyLCAud2F2ZXMtbGlnaHQ6Zm9jdXN7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWY0OTdiICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC51c2VyLWxhYmVse1xyXG4gICAgbWF4LXdpZHRoOiAxOC42NjY2NjclICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC8vIC5kYXRhLWVycm9yLCAubW9kYWwgLmVyci1idG4ge1xyXG4gIC8vICAgYmFja2dyb3VuZC1jb2xvcjogI2FmMTkyNiAhaW1wb3J0YW50O1xyXG4gIC8vIH1cclxuICAubGVmdC1saXN0IHtcclxuICAgIGhlaWdodDogMTA1JTtcclxuICAgIHdpZHRoOiAzMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODBhN2UwO1xyXG4gICAgcGFkZGluZy10b3A6IDgwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbn1cclxuLnVzZXItaGVhZGluZyB7XHJcbiAgZm9udC1zaXplOiAyNnB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMxODU5YztcclxuICBjb2xvcjogIzMxODU5YztcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiA3cHg7XHJcbn1cclxuLmJ0bi51c2VyLXN1Ym1pdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGE3YztcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG4gIHdpZHRoOiAxMjBweDtcclxuICBjb2xvcjogI0ZGRjtcclxufVxyXG4jb2xkUGFzc05vdE1hdGNoIC5tb2RhbC1oZWFkZXJ7XHJcbiAgaGVpZ2h0OiAzOXB4O1xyXG4gIHBhZGRpbmc6IDNweCAxNHB4O1xyXG59XHJcbnAuaGVhZGluZy5sZWFkIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogIzIzNGE3YztcclxufVxyXG4uZXJyLWJ0biB7XHJcbiAgYm9yZGVyLXJhZGl1czogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0YTdjO1xyXG59XHJcbmlucHV0Lm5vc3Bpbm5lclt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIFxyXG5pbnB1dC5ub3NwaW5uZXJbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHsgXHJcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOyBcclxuICBtYXJnaW46IDA7IFxyXG59Il19 */"

/***/ }),

/***/ "./src/app/user-management/user-management/user-management.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/user-management/user-management/user-management.component.ts ***!
  \******************************************************************************/
/*! exports provided: UserManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementComponent", function() { return UserManagementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/app/constants.ts");
/* harmony import */ var _services_user_management_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user-management.service */ "./src/app/user-management/services/user-management.service.ts");





var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(http, userManagementProvider) {
        this.http = http;
        this.userManagementProvider = userManagementProvider;
        this.payLoad = '';
        this.btnDisable = false;
        this.userManagementService = userManagementProvider;
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userManagementService.getUserRoles().subscribe(function (data) {
            _this.userManagementService.formFieldsAll = data;
        });
        this.userManagementService.getAreaDetails().subscribe(function (data) {
            _this.userManagementService.areaDetails = data;
        });
        this.userManagementService.getTypeDetails().subscribe(function (data) {
            _this.userManagementService.typeDetails = data;
        });
    };
    UserManagementComponent.prototype.submitForm = function (roleId) {
        var _this = this;
        var areaId;
        if (roleId == 3) {
            areaId = this.selectedBlockId;
        }
        if (roleId == 2) {
            areaId = this.selectedDistrictId;
        }
        if (roleId == 1) {
            areaId = 2;
        }
        var userDetails = {
            "userName": this.userName,
            "password": this.password,
            "designationIds": roleId,
            "mblNo": this.mobile,
            "areaId": areaId,
            "name": this.fullName,
            "email": "",
            "typeDetailsId": this.selectedUserTypeId
        };
        this.http.post(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HOME_URL + 'createUser', userDetails).subscribe(function (data) {
            if (data === true) {
                $("#successMatch").modal('show');
            }
            else {
                $("#oldPassNotMatch").modal('show');
                _this.validationMsg = "The given user details are already exists";
            }
        }, function (err) {
            $("#oldPassNotMatch").modal('show');
            //this.validationMsg = err.error;
            _this.validationMsg = "Some server error occured";
        });
    };
    UserManagementComponent.prototype.successModal = function () {
        $("#successMatch").modal('hide');
    };
    UserManagementComponent.prototype.ngAfterViewInit = function () {
        $("input, textarea, .select-dropdown").focus(function () {
            $(this).closest(".input-holder").parent().find("> label").css({ "color": "#4285F4" });
        });
        $("input, textarea, .select-dropdown").blur(function () {
            $(this).closest(".input-holder").parent().find("> label").css({ "color": "#333" });
        });
    };
    UserManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user-management',
            template: __webpack_require__(/*! ./user-management.component.html */ "./src/app/user-management/user-management/user-management.component.html"),
            styles: [__webpack_require__(/*! ./user-management.component.scss */ "./src/app/user-management/user-management/user-management.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _services_user_management_service__WEBPACK_IMPORTED_MODULE_4__["UserManagementService"]])
    ], UserManagementComponent);
    return UserManagementComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-side-menu/user-side-menu.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/user-management/user-side-menu/user-side-menu.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <ul class=\"data-heads\">\n    <li class=\"data-head-list\" [ngClass]=\"{'active': router.url=='/user-management'}\">\n      <span class=\"list-span\"><a class=\"active\" routerLink=\"/user-management\">Create new user</a></span>\n    </li>             \n    <li class=\"data-head-list\" [ngClass]=\"{'active': router.url=='/reset-password'}\">\n      <span class=\"list-span\"><a routerLink=\"/reset-password\">Reset password</a></span>\n    </li>      \n  </ul>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/user-management/user-side-menu/user-side-menu.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/user-management/user-side-menu/user-side-menu.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".data-heads {\n  list-style: none; }\n\n.data-head-list {\n  border-bottom: 1px solid #ddd;\n  font-size: 18px;\n  counter-increment: step-counter;\n  margin-left: -20px;\n  position: relative;\n  height: 100px; }\n\nli.data-head-list.active {\n  background-color: #1f4a7c; }\n\nli.data-head-list.active::before {\n  background-color: #80a7e0; }\n\n.list-span {\n  top: 50%;\n  display: block;\n  margin-left: 45px;\n  position: absolute;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\n.data-head-list .list-span > a {\n  color: #fff;\n  cursor: pointer; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1tYW5hZ2VtZW50L3VzZXItc2lkZS1tZW51L0Q6XFxzYm1fMTAwX3VpX2Rldlxcc2JtMTAwL3NyY1xcYXBwXFx1c2VyLW1hbmFnZW1lbnRcXHVzZXItc2lkZS1tZW51XFx1c2VyLXNpZGUtbWVudS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFnQixFQUNuQjs7QUFDRDtFQUNJLDhCQUE2QjtFQUM3QixnQkFBZTtFQUNmLGdDQUErQjtFQUMvQixtQkFBa0I7RUFDbEIsbUJBQWtCO0VBQ2xCLGNBQWEsRUFDaEI7O0FBRUQ7RUFDSSwwQkFBeUIsRUFDNUI7O0FBQ0Q7RUFDSSwwQkFBeUIsRUFDNUI7O0FBQ0Q7RUFDSSxTQUFRO0VBQ1IsZUFBYztFQUNkLGtCQUFpQjtFQUNqQixtQkFBa0I7RUFDbEIsb0NBQW1DO0VBQ25DLDRCQUEyQixFQUM5Qjs7QUFDRDtFQUNJLFlBQVc7RUFDWCxnQkFBZSxFQUNsQiIsImZpbGUiOiJzcmMvYXBwL3VzZXItbWFuYWdlbWVudC91c2VyLXNpZGUtbWVudS91c2VyLXNpZGUtbWVudS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kYXRhLWhlYWRzIHtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbn1cclxuLmRhdGEtaGVhZC1saXN0IHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgY291bnRlci1pbmNyZW1lbnQ6IHN0ZXAtY291bnRlcjtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMjBweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbn1cclxuXHJcbmxpLmRhdGEtaGVhZC1saXN0LmFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWY0YTdjO1xyXG59XHJcbmxpLmRhdGEtaGVhZC1saXN0LmFjdGl2ZTo6YmVmb3Jle1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzgwYTdlMDtcclxufVxyXG4ubGlzdC1zcGFuIHtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tbGVmdDogNDVweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG59XHJcbi5kYXRhLWhlYWQtbGlzdCAubGlzdC1zcGFuPmEge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/user-management/user-side-menu/user-side-menu.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/user-management/user-side-menu/user-side-menu.component.ts ***!
  \****************************************************************************/
/*! exports provided: UserSideMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSideMenuComponent", function() { return UserSideMenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var UserSideMenuComponent = /** @class */ (function () {
    function UserSideMenuComponent(router) {
        this.router = router;
    }
    UserSideMenuComponent.prototype.ngOnInit = function () {
    };
    UserSideMenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user-side-menu',
            template: __webpack_require__(/*! ./user-side-menu.component.html */ "./src/app/user-management/user-side-menu/user-side-menu.component.html"),
            styles: [__webpack_require__(/*! ./user-side-menu.component.scss */ "./src/app/user-management/user-side-menu/user-side-menu.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], UserSideMenuComponent);
    return UserSideMenuComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\sbm_100_ui_dev\sbm100\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map