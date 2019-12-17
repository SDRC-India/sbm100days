(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('save-as'), require('@angular/common'), require('ngx-pagination'), require('ng2-search-filter'), require('@angular/forms'), require('@progress/kendo-angular-pdf-export')) :
    typeof define === 'function' && define.amd ? define('sdrc-table', ['exports', '@angular/core', 'save-as', '@angular/common', 'ngx-pagination', 'ng2-search-filter', '@angular/forms', '@progress/kendo-angular-pdf-export'], factory) :
    (factory((global['sdrc-table'] = {}),global.ng.core,global.save,global.ng.common,global.ngxPagination,global.ng2SearchFilter,global.ng.forms,global.kendoAngularPdfExport));
}(this, (function (exports,core,save,common,ngxPagination,ng2SearchFilter,forms,kendoAngularPdfExport) { 'use strict';

    save = save && save.hasOwnProperty('default') ? save['default'] : save;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TableComponent = (function () {
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
            this.onActionButtonClicked = new core.EventEmitter();
            this.onDownloadPdfByServerClicked = new core.EventEmitter();
            this.onDownloadExcelByServerClicked = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        TableComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        /**
         * @return {?}
         */
        TableComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
            function () {
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
        /**
         * @param {?} link
         * @return {?}
         */
        TableComponent.prototype.appendHttp = /**
         * @param {?} link
         * @return {?}
         */
            function (link) {
                if (!link.startsWith('http')) {
                    return 'http://' + link;
                }
                else {
                    return link;
                }
            };
        /**
         * @param {?} property
         * @return {?}
         */
        TableComponent.prototype.sort = /**
         * @param {?} property
         * @return {?}
         */
            function (property) {
                this.isDesc = !this.isDesc; //change the direction
                this.columns = property;
                this.direction = this.isDesc ? 1 : -1;
            };
        /**
         * @return {?}
         */
        TableComponent.prototype.setDuplicateFixedTable = /**
         * @return {?}
         */
            function () {
                // $("#header-fixed").html("");
                this.fixTableConfig.headerHeight = $("#" + this.id + " > thead").height();
                this.fixTableConfig.width = $('#' + this.id).closest(".parent-tabl-container").width();
                // this.fixTableConfig.header = $("#org-full-data > thead").clone();
                // this.fixTableConfig.body = $("#org-full-data > tbody").clone();
                // this.fixTableConfig.fixedHeader = $("#header-fixed").append(this.fixTableConfig.header);
                // this.fixTableConfig.table = $("#header-fixed").append(this.fixTableConfig.body);
                $("#header-fixed" + this.id).height(this.fixTableConfig.headerHeight);
                $("#header-fixed" + this.id).width(this.fixTableConfig.width - 16);
                if ($("#" + this.id).parent()[0].scrollWidth == $("#" + this.id).parent()[0].clientWidth) {
                    $("#header-fixed" + this.id).find("th").width($("#header-fixed" + this.id).find("th").width() + (($("#header-fixed" + this.id).width() - $("#header-fixed" + this.id).find("thead").width()) / $("#header-fixedtab1 th").length));
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        TableComponent.prototype.fixTableHeader = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var offset = $(event.target).scrollTop();
                $("#header-fixed" + this.id).scrollLeft($(event.target).scrollLeft());
                if (offset >= this.fixTableConfig.headerHeight) {
                    $("#header-fixed" + this.id).css("display", "block");
                }
                else if (offset < this.fixTableConfig.headerHeight) {
                    $("#header-fixed" + this.id).hide();
                }
            };
        /**
         * @param {?} id
         * @return {?}
         */
        TableComponent.prototype.tableToExcel = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                var _this = this;
                /** @type {?} */
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
                    /** @type {?} */
                    var tab_text = "<table border='2px'>";
                    /** @type {?} */
                    var j = 0;
                    /** @type {?} */
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
                    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");
                    save(new Blob([tab_text], { type: "application/vnd.ms-excel" }), _this.excelName + ".xls");
                    setTimeout(function () {
                        _this.itemsPerPage = itemsPerPage;
                    }, 500);
                }, 200);
            };
        /**
         * @param {?} x
         * @return {?}
         */
        TableComponent.prototype.getType = /**
         * @param {?} x
         * @return {?}
         */
            function (x) {
                return typeof x;
            };
        /**
         * @param {?} target
         * @param {?} containerId
         * @return {?}
         */
        TableComponent.prototype.createPdf = /**
         * @param {?} target
         * @param {?} containerId
         * @return {?}
         */
            function (target, containerId) {
                var _this = this;
                /** @type {?} */
                var tempHeight = $("kendo-pdf-export").find("#" + containerId).css("max-height");
                /** @type {?} */
                var itemsPerPage = this.itemsPerPage;
                /** @type {?} */
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
        /**
         * @param {?} btnClass
         * @param {?} rowObj
         * @return {?}
         */
        TableComponent.prototype.actionClicked = /**
         * @param {?} btnClass
         * @param {?} rowObj
         * @return {?}
         */
            function (btnClass, rowObj) {
                /** @type {?} */
                var emittedData = { target: btnClass, rowObj: rowObj };
                this.onActionButtonClicked.emit(emittedData);
            };
        /**
         * @param {?} tableId
         * @param {?} tableData
         * @return {?}
         */
        TableComponent.prototype.downloadPdfByServerClicked = /**
         * @param {?} tableId
         * @param {?} tableData
         * @return {?}
         */
            function (tableId, tableData) {
                /** @type {?} */
                var emittedData = { table: tableId, tableData: tableData };
                this.onDownloadPdfByServerClicked.emit(emittedData);
            };
        /**
         * @param {?} tableId
         * @param {?} tableData
         * @return {?}
         */
        TableComponent.prototype.downloadExcelByServerClicked = /**
         * @param {?} tableId
         * @param {?} tableData
         * @return {?}
         */
            function (tableId, tableData) {
                /** @type {?} */
                var emittedData = { table: tableId, tableData: tableData };
                this.onDownloadExcelByServerClicked.emit(emittedData);
            };
        TableComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'sdrc-table',
                        template: "\n    <div class=\"row\">           \n\n      <div class=\"col-md-12\">\n        <div class=\"text-right\" [hidden]=\"rowData && !rowData.length\">\n        <!-- <div class=\"col-md-3\">\n          <div class=\"form-group\">\n              <button class=\"btn btn-submit\" [disabled]=\"tableService.disableDeleteBtn\">Delete All</button>\n          </div>\n        </div> -->\n        <div *ngIf=\"searchBox\" class=\"table-btn search\">\n          <div class=\"form-group\">\n            <input class=\"form-control\" type=\"text\" id=\"myInput\" [(ngModel)]=\"searchFilter\" placeholder=\"..search\">\n          </div>\n      </div>\n        <div *ngIf=\"downloadPdf\" class=\"table-btn\">\n          <button class=\"btn btn-pdf btn-submit\" (click)=\"createPdf(pdf, 'table-fixed-container'+id)\"><span><i class=\"fa fa-download\" style=\"font-size:15px;\"\n                aria-hidden=\"true\"></i></span>&nbsp;download pdf</button>\n        </div>\n        <div *ngIf=\"downloadExcel\" class=\"table-btn\">\n          <button class=\"btn btn-excel btn-submit\" (click)=\"tableToExcel(id)\"><span><i class=\"fa fa-file-excel-o\"\n                style=\"font-size:15px;\" aria-hidden=\"true\"></i></span>&nbsp;download excel</button>\n        </div>\n        <div *ngIf=\"downloadPdfByServer\" class=\"table-btn\">\n          <button class=\"btn btn-pdf btn-submit\" (click)=\"downloadPdfByServerClicked(id, rowData)\"><span><i class=\"fa fa-download\" style=\"font-size:15px;\"\n                aria-hidden=\"true\"></i></span>&nbsp;download pdf</button>\n        </div>\n        <div *ngIf=\"downloadExcelByServer\" class=\"table-btn\">\n          <button class=\"btn btn-excel btn-submit\" (click)=\"downloadExcelByServerClicked(id, rowData)\"><span><i class=\"fa fa-file-excel-o\"\n                style=\"font-size:15px;\" aria-hidden=\"true\"></i></span>&nbsp;download excel</button>\n        </div>\n        \n      </div>\n    </div>\n\n    <div class=\"col-md-12\">\n    <div class=\"parent-tabl-container\">\n    <kendo-pdf-export #pdf paperSize=\"A2\" margin=\"2cm\" [repeatHeaders]=\"true\"  [scale]=\"0.6\">\n    <div class=\"filled-form view-form\" id=\"{{'table-fixed-container'+id}}\" (scroll)=\"fixTableHeader($event)\" style=\"overflow: auto;\">                 \n      \n      <!-- Header fixed table section -->\n      <table *ngIf=\"headerFixed\" id=\"{{'header-fixed'+id}}\" class=\"table table-striped table-bordered header-fixed\">\n            <thead>\n                <tr>\n                  <!-- <th><input type=\"checkbox\" [(ngModel)]=\"tableService.checkStatus\" (click)=\"tableService.selectAllCheckBoxes(rowData, !tableService.checkStatus)\">&nbsp; Select All </th> -->\n                  <th *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\">{{col}}\n                    <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                        'fa-sort-asc': (col == columns && !isDesc), \n                        'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                    </i>\n                  </th>\n                </tr>\n              </thead>\n              <tbody>\n                  <tr [ngClass]=\"rowDetails.cssClass ? rowDetails.cssClass:''\" *ngFor=\"let rowDetails of rowData | searchPipe: searchFilter | sortPipe: {property: columns, direction: direction} | paginate: { itemsPerPage: itemsPerPage, currentPage: p } let i = index;\">\n                    <!-- <td><input type=\"checkbox\" [(ngModel)]=\"rowDetails.isChecked\" (change)=\"tableService.singleCheckBoxClicked(tableService.rowData)\"></td> -->\n                    <td *ngFor=\"let col of columnData\">\n                      <div *ngIf=\"getType(rowDetails[col]) != 'object'\">{{rowDetails[col]}}</div>\n                      <div *ngIf=\"getType(rowDetails[col]) == 'object'\" style=\"display: inline-flex;\">\n                        <div *ngFor=\"let colDetails of rowDetails[col]\">\n                            <div [ngSwitch]=\"colDetails.controlType\" class=\"col-md-9 input-holder\">\n                              <button *ngSwitchCase=\"'button'\"  class=\"{{colDetails.class}}\" type=\"{{colDetails.type}}\" (click)=\"actionClicked(colDetails.class, rowDetails)\"><i *ngIf=\"colDetails.icon\" class=\"fa\" [ngClass]=\"colDetails.icon\"></i>{{colDetails.value}}</button>\n                                \n                                <input *ngSwitchCase=\"'textbox'\" name=\"{{colDetails.name}}\" [type]=\"colDetails.type\" [(ngModel)]=\"colDetails.value\" class=\"form-control\">\n    \n                                <!-- <input *ngSwitchCase=\"'checkbox'\" name=\"{{colDetails.name}}\" type=\"{{colDetails.type}}\">                                    -->\n                            </div>\n                        </div>\n                      </div>\n                    </td>\n                  </tr>   \n                </tbody>\n         </table>\n        \n\n         <!-- main table -->\n          <table class=\"table table-striped table-bordered\" id=\"{{id}}\">\n            <thead>\n              <tr>\n                <!-- <th><input type=\"checkbox\" [(ngModel)]=\"tableService.checkStatus\" (click)=\"tableService.selectAllCheckBoxes(rowData, !tableService.checkStatus)\">&nbsp; Select All </th> -->\n                <th *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\">{{col}}\n                  <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                      'fa-sort-asc': (col == columns && !isDesc), \n                      'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                  </i>\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let rowDetails of rowData | searchPipe: searchFilter | sortPipe: {property: columns, direction: direction} | paginate: { itemsPerPage: itemsPerPage, currentPage: p, id:id } let i = index;\">\n                <!-- <td><input type=\"checkbox\" [(ngModel)]=\"rowDetails.isChecked\" (change)=\"tableService.singleCheckBoxClicked(tableService.rowData)\"></td> -->\n                <td *ngFor=\"let col of columnData\">\n                  <div *ngIf=\"getType(rowDetails[col]) != 'object'\">{{rowDetails[col]}}</div>\n                  <div *ngIf=\"getType(rowDetails[col]) == 'object'\" style=\"display: inline-flex;\">\n                    <div *ngFor=\"let colDetails of rowDetails[col]\">\n                        <div [ngSwitch]=\"colDetails.controlType\" class=\"col-md-9 input-holder\">\n                          <button *ngSwitchCase=\"'button'\"  class=\"{{colDetails.class}}\" type=\"{{colDetails.type}}\" (click)=\"actionClicked(colDetails.class, rowDetails)\"><i *ngIf=\"colDetails.icon\" class=\"fa\" [ngClass]=\"colDetails.icon\"></i>{{colDetails.value}}</button>\n                            \n                            <input *ngSwitchCase=\"'textbox'\" name=\"{{colDetails.name}}\" [type]=\"colDetails.type\" [(ngModel)]=\"colDetails.value\" class=\"form-control\">\n\n                            <!-- <input *ngSwitchCase=\"'checkbox'\" name=\"{{colDetails.name}}\" type=\"{{colDetails.type}}\">                                    -->\n                        </div>\n                    </div>\n                  </div>\n                </td>\n              </tr>   \n            </tbody>\n          </table>   \n        \n        </div>\n        </kendo-pdf-export>\n        <br/>\n        <div  *ngIf=\"(rowData && !rowData.length) || (rowData && rowData.length && (rowData | searchPipe: searchFilter).length==0)\" class=\"col-md-12 text-center search-area\">No Data Found.</div>\n        <div *ngIf=\"isPaginate && rowData && rowData.length\">\n          <pagination-controls (pageChange)=\"p = $event;\" id=\"{{id}}\" class=\"pagination-view\"></pagination-controls>\n        </div>\n      </div>\n     </div>\n    </div>\n",
                        styles: [".header-fixed{position:absolute;display:none;z-index:1;overflow:hidden;margin-right:15px}.parent-tabl-container{position:relative}table thead{background-color:#187080;color:#fff}td{text-align:center}table thead th{vertical-align:middle;text-align:center}.pagination-view{float:right}#myInput{width:100%;border-radius:0;font-size:16px;padding:7px 20px 12px 30px;font-style:inherit;border:1px solid #ddd;margin-bottom:12px;box-shadow:0 0 2px 0}.table-btn.search .form-group{position:relative}.table-btn.search .form-group:before{position:absolute;font-family:FontAwesome;top:5px;left:7px;color:#9c9c9c;content:\"\\f002\"}.search-area{font-style:italic;margin-top:30px;margin-bottom:30px;font-size:30px}input[type=text]{font-style:italic}.table-btn .btn-excel,.table-btn .btn-pdf{margin-bottom:16px;background-color:#357080;color:#fff;border-radius:0}.btn-excel:active,.btn-excel:focus{outline:0!important;border:none!important}.fa-sorting{cursor:pointer}.table-btn{display:inline-block;float:right;margin:0 5px}"]
                    }] }
        ];
        /** @nocollapse */
        TableComponent.ctorParameters = function () { return []; };
        TableComponent.propDecorators = {
            id: [{ type: core.Input }],
            rowData: [{ type: core.Input }],
            columnData: [{ type: core.Input }],
            maxTableHeight: [{ type: core.Input }],
            sorting: [{ type: core.Input }],
            sortExcludeColumn: [{ type: core.Input }],
            isPaginate: [{ type: core.Input }],
            itemsPerPage: [{ type: core.Input }],
            headerFixed: [{ type: core.Input }],
            searchBox: [{ type: core.Input }],
            downloadPdf: [{ type: core.Input }],
            pdfName: [{ type: core.Input }],
            downloadExcel: [{ type: core.Input }],
            excelName: [{ type: core.Input }],
            downloadPdfByServer: [{ type: core.Input }],
            downloadExcelByServer: [{ type: core.Input }],
            onActionButtonClicked: [{ type: core.Output }],
            onDownloadPdfByServerClicked: [{ type: core.Output }],
            onDownloadExcelByServerClicked: [{ type: core.Output }]
        };
        return TableComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SortPipePipe = (function () {
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
        SortPipePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'sortPipe'
                    },] }
        ];
        return SortPipePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SearchPipePipe = (function () {
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
            { type: core.Pipe, args: [{
                        name: 'searchPipe'
                    },] }
        ];
        return SearchPipePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TableModule = (function () {
        function TableModule() {
        }
        TableModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            ngxPagination.NgxPaginationModule,
                            ng2SearchFilter.Ng2SearchPipeModule,
                            kendoAngularPdfExport.PDFExportModule
                        ],
                        declarations: [TableComponent, SearchPipePipe, SortPipePipe],
                        providers: [],
                        exports: [TableComponent, SearchPipePipe, SortPipePipe]
                    },] }
        ];
        return TableModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.TableComponent = TableComponent;
    exports.SortPipePipe = SortPipePipe;
    exports.SearchPipePipe = SearchPipePipe;
    exports.TableModule = TableModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2RyYy10YWJsZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3NkcmMtdGFibGUvc3JjL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc2RyYy10YWJsZS9zcmMvc29ydC1waXBlLnBpcGUudHMiLCJuZzovL3NkcmMtdGFibGUvc3JjL3NlYXJjaC1waXBlLnBpcGUudHMiLCJuZzovL3NkcmMtdGFibGUvc3JjL3RhYmxlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2luYXRlUGlwZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1kcmF3aW5nL3BkZic7XG5pbXBvcnQgc2F2ZSBmcm9tICdzYXZlLWFzJztcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2RyYy10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGlzRGVzYzogYW55O1xuICBkaXJlY3Rpb246IG51bWJlcjtcbiAgZml4VGFibGVDb25maWc6IGFueSA9IHt9O1xuICBjaGVja1N0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNhYmxlRGVsZXRlQnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgY29sdW1uczogYW55O1xuXG4gIHA6IG51bWJlciA9IDE7XG4gIHNlYXJjaEZpbHRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSByb3dEYXRhOiBhbnlbXTtcbiAgQElucHV0KCkgY29sdW1uRGF0YTogYW55W107XG4gIEBJbnB1dCgpIG1heFRhYmxlSGVpZ2h0OiBzdHJpbmc7XG5cblxuICAvL2tleXMgZm9yIHNvcnRpbmcgYW5kIGV4Y2x1ZGUgc29ydGluZyBjb2x1bW4gZnJvbSB0YWJsZS1zb3J0aW5nLmRpcmVjdGl2ZVxuICBASW5wdXQoKSBzb3J0aW5nOiBib29sZWFuO1xuICBASW5wdXQoKSBzb3J0RXhjbHVkZUNvbHVtbjogc3RyaW5nW107XG5cbiAgLy9rZXlzIGZvciBwYWdpbmF0ZSBhbmQgaXRlbXNQZXJwYWdlIGZyb20gdGFibGUtcGFnaW5hdGUuZGlyZWN0aXZlXG4gIEBJbnB1dCgpIGlzUGFnaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgaXRlbXNQZXJQYWdlOiBudW1iZXI7XG5cbiAgLy9pc0hlYWRlckZpeGVkIGZyb20gdGFibGUtaGVhZGVyZml4LmRpcmVjdGl2ZVxuICBASW5wdXQoKSBoZWFkZXJGaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vc2VhcmNoQm94IGZyb20gdGFibGUtc2VhcmNoQm94LmRpcmVjdGl2ZS50c1xuICBASW5wdXQoKSBzZWFyY2hCb3g6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvL2Rvd25sb2FkIFBkZiBhbmQgRXhjZWwgdGFibGUtZG93bmxvYWRQZGYuZGlyZWN0aXZlIGFuZCB0YWJsZS1kb3dubG9hZEV4Y2VsLmRpcmVjdGl2ZVxuICBASW5wdXQoKSBkb3dubG9hZFBkZjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwZGZOYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRvd25sb2FkRXhjZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZXhjZWxOYW1lOiBzdHJpbmc7XG5cbiAgLy9kb3dubG9hZCBwZGYgYW5kIGV4Y2VsIGJ5IHNlcnZlciBzaWRlXG4gIEBJbnB1dCgpIGRvd25sb2FkUGRmQnlTZXJ2ZXI6Ym9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBkb3dubG9hZEV4Y2VsQnlTZXJ2ZXI6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBvbkFjdGlvbkJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvbkRvd25sb2FkUGRmQnlTZXJ2ZXJDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25Eb3dubG9hZEV4Y2VsQnlTZXJ2ZXJDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMucm93RGF0YSAmJiAhdGhpcy5pc1BhZ2luYXRlKVxuICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSB0aGlzLnJvd0RhdGEubGVuZ3RoO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaGVhZGVyRml4ZWQpXG4gICAgICAgIHRoaXMuc2V0RHVwbGljYXRlRml4ZWRUYWJsZSgpO1xuICAgICAgaWYgKHRoaXMubWF4VGFibGVIZWlnaHQpIHtcbiAgICAgICAgJCgnI3RhYmxlLWZpeGVkLWNvbnRhaW5lcicgKyB0aGlzLmlkKS5jc3MoXCJtYXgtaGVpZ2h0XCIsIHRoaXMubWF4VGFibGVIZWlnaHQpXG4gICAgICB9XG4gICAgfSlcblxuICB9XG5cbiAgYXBwZW5kSHR0cChsaW5rOiBzdHJpbmcpIHtcbiAgICBpZiAoIWxpbmsuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICByZXR1cm4gJ2h0dHA6Ly8nICsgbGluaztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbGluaztcbiAgICB9XG4gIH1cbiAgc29ydChwcm9wZXJ0eSkge1xuICAgIHRoaXMuaXNEZXNjID0gIXRoaXMuaXNEZXNjOyAvL2NoYW5nZSB0aGUgZGlyZWN0aW9uICAgIFxuICAgIHRoaXMuY29sdW1ucyA9IHByb3BlcnR5O1xuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5pc0Rlc2MgPyAxIDogLTE7XG4gIH07XG5cblxuXG5cbiAgc2V0RHVwbGljYXRlRml4ZWRUYWJsZSgpIHtcbiAgICAvLyAkKFwiI2hlYWRlci1maXhlZFwiKS5odG1sKFwiXCIpO1xuICAgIHRoaXMuZml4VGFibGVDb25maWcuaGVhZGVySGVpZ2h0ID0gJChcIiNcIiArIHRoaXMuaWQgKyBcIiA+IHRoZWFkXCIpLmhlaWdodCgpO1xuICAgIHRoaXMuZml4VGFibGVDb25maWcud2lkdGggPSAkKCcjJyArIHRoaXMuaWQpLmNsb3Nlc3QoXCIucGFyZW50LXRhYmwtY29udGFpbmVyXCIpLndpZHRoKCk7XG4gICAgLy8gdGhpcy5maXhUYWJsZUNvbmZpZy5oZWFkZXIgPSAkKFwiI29yZy1mdWxsLWRhdGEgPiB0aGVhZFwiKS5jbG9uZSgpO1xuICAgIC8vIHRoaXMuZml4VGFibGVDb25maWcuYm9keSA9ICQoXCIjb3JnLWZ1bGwtZGF0YSA+IHRib2R5XCIpLmNsb25lKCk7XG4gICAgLy8gdGhpcy5maXhUYWJsZUNvbmZpZy5maXhlZEhlYWRlciA9ICQoXCIjaGVhZGVyLWZpeGVkXCIpLmFwcGVuZCh0aGlzLmZpeFRhYmxlQ29uZmlnLmhlYWRlcik7XG4gICAgLy8gdGhpcy5maXhUYWJsZUNvbmZpZy50YWJsZSA9ICQoXCIjaGVhZGVyLWZpeGVkXCIpLmFwcGVuZCh0aGlzLmZpeFRhYmxlQ29uZmlnLmJvZHkpO1xuICAgICQoXCIjaGVhZGVyLWZpeGVkXCIgKyB0aGlzLmlkKS5oZWlnaHQodGhpcy5maXhUYWJsZUNvbmZpZy5oZWFkZXJIZWlnaHQpXG4gICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLndpZHRoKHRoaXMuZml4VGFibGVDb25maWcud2lkdGggLSAxNilcbiAgICBpZigkKFwiI1wiK3RoaXMuaWQpLnBhcmVudCgpWzBdLnNjcm9sbFdpZHRoID09ICQoXCIjXCIrdGhpcy5pZCkucGFyZW50KClbMF0uY2xpZW50V2lkdGgpe1xuICAgICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLmZpbmQoXCJ0aFwiKS53aWR0aCgkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkuZmluZChcInRoXCIpLndpZHRoKCkgKyAoKCQoXCIjaGVhZGVyLWZpeGVkXCIgKyB0aGlzLmlkKS53aWR0aCgpIC0gJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLmZpbmQoXCJ0aGVhZFwiKS53aWR0aCgpKS8kKFwiI2hlYWRlci1maXhlZHRhYjEgdGhcIikubGVuZ3RoKSlcbiAgICB9XG4gIH1cblxuICBmaXhUYWJsZUhlYWRlcihldmVudCkge1xuICAgIHZhciBvZmZzZXQgPSAkKGV2ZW50LnRhcmdldCkuc2Nyb2xsVG9wKCk7XG4gICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLnNjcm9sbExlZnQoJChldmVudC50YXJnZXQpLnNjcm9sbExlZnQoKSlcbiAgICBpZiAob2Zmc2V0ID49IHRoaXMuZml4VGFibGVDb25maWcuaGVhZGVySGVpZ2h0KSB7XG4gICAgICAkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvZmZzZXQgPCB0aGlzLmZpeFRhYmxlQ29uZmlnLmhlYWRlckhlaWdodCkge1xuICAgICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICB0YWJsZVRvRXhjZWwoaWQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyh0YWJsZSk7XG4gICAgbGV0IGl0ZW1zUGVyUGFnZSA9IHRoaXMuaXRlbXNQZXJQYWdlO1xuICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gdGhpcy5yb3dEYXRhLmxlbmd0aDtcbiAgICAvLyBzZXRUaW1lb3V0KCgpPT57XG4gICAgLy8gICBsZXQgdXJpID0gJ2RhdGE6YXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsO2Jhc2U2NCwnXG4gICAgLy8gICAgICwgdGVtcGxhdGUgPSAnPGh0bWwgeG1sbnM6bz1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206b2ZmaWNlOm9mZmljZVwiIHhtbG5zOng9XCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOm9mZmljZTpleGNlbFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLWh0bWw0MFwiPjxoZWFkPjwhLS1baWYgZ3RlIG1zbyA5XT48eG1sPjx4OkV4Y2VsV29ya2Jvb2s+PHg6RXhjZWxXb3Jrc2hlZXRzPjx4OkV4Y2VsV29ya3NoZWV0Pjx4Ok5hbWU+e3dvcmtzaGVldH08L3g6TmFtZT48eDpXb3Jrc2hlZXRPcHRpb25zPjx4OkRpc3BsYXlHcmlkbGluZXMvPjwveDpXb3Jrc2hlZXRPcHRpb25zPjwveDpFeGNlbFdvcmtzaGVldD48L3g6RXhjZWxXb3Jrc2hlZXRzPjwveDpFeGNlbFdvcmtib29rPjwveG1sPjwhW2VuZGlmXS0tPjxtZXRhIGh0dHAtZXF1aXY9XCJjb250ZW50LXR5cGVcIiBjb250ZW50PVwidGV4dC9wbGFpbjsgY2hhcnNldD1VVEYtOFwiLz48L2hlYWQ+PGJvZHk+PHRhYmxlPnt0YWJsZX08L3RhYmxlPjwvYm9keT48L2h0bWw+J1xuICAgIC8vICAgICAsIGJhc2U2NCA9IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHdpbmRvdy5idG9hKGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQocykpKSB9XG4gICAgLy8gICAgICwgZm9ybWF0ID0gZnVuY3Rpb24ocyxjKSB7IHJldHVybiBzLnJlcGxhY2UoL3soXFx3Kyl9L2csIGZ1bmN0aW9uKG0sIHApIHsgcmV0dXJuIGNbcF07IH0pIH1cbiAgICAvLyAgIGlmICghdGFibGUubm9kZVR5cGUpIHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFibGUpXG4gICAgLy8gICAgdmFyIGN0eCA9IHt3b3Jrc2hlZXQ6IG5hbWUgfHwgJ1dvcmtzaGVldCcsIHRhYmxlOiB0YWJsZS5pbm5lckhUTUx9XG4gICAgLy8gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmkgKyBiYXNlNjQoZm9ybWF0KHRlbXBsYXRlLCBjdHgpKVxuICAgIC8vICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAvLyAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgLy8gICAgfSwxMDAwKVxuICAgIC8vIH0sIDIwMClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHZhciBodG1scyA9IFwiXCI7XG4gICAgICB2YXIgdXJpID0gJ2RhdGE6YXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsO2Jhc2U2NCwnO1xuICAgICAgdmFyIHRlbXBsYXRlID0gJzxodG1sIHhtbG5zOm89XCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOm9mZmljZTpvZmZpY2VcIiB4bWxuczp4PVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6ZXhjZWxcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy1odG1sNDBcIj48aGVhZD48IS0tW2lmIGd0ZSBtc28gOV0+PHhtbD48eDpFeGNlbFdvcmtib29rPjx4OkV4Y2VsV29ya3NoZWV0cz48eDpFeGNlbFdvcmtzaGVldD48eDpOYW1lPnt3b3Jrc2hlZXR9PC94Ok5hbWU+PHg6V29ya3NoZWV0T3B0aW9ucz48eDpEaXNwbGF5R3JpZGxpbmVzLz48L3g6V29ya3NoZWV0T3B0aW9ucz48L3g6RXhjZWxXb3Jrc2hlZXQ+PC94OkV4Y2VsV29ya3NoZWV0cz48L3g6RXhjZWxXb3JrYm9vaz48L3htbD48IVtlbmRpZl0tLT48L2hlYWQ+PGJvZHk+PHRhYmxlPnt0YWJsZX08L3RhYmxlPjwvYm9keT48L2h0bWw+JztcbiAgICAgIHZhciBiYXNlNjQgPSBmdW5jdGlvbiAocykge1xuICAgICAgICByZXR1cm4gd2luZG93LmJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZm9ybWF0ID0gZnVuY3Rpb24gKHMsIGMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgveyhcXHcrKX0vZywgZnVuY3Rpb24gKG0sIHApIHtcbiAgICAgICAgICByZXR1cm4gY1twXTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgdGFiX3RleHQgPSBcIjx0YWJsZSBib3JkZXI9JzJweCc+XCI7XG4gICAgICB2YXIgdGV4dFJhbmdlOyB2YXIgaiA9IDA7XG4gICAgICBsZXQgdGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpOyAvLyBpZCBvZiB0YWJsZVxuXG4gICAgICBmb3IgKGogPSAwOyBqIDwgdGFiWydyb3dzJ10ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGogPT0gMClcbiAgICAgICAgICB0YWJfdGV4dCA9IHRhYl90ZXh0ICsgXCI8dHIgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6ICMwMDgzN0Y7IGNvbG9yOiAjRkZGOyBmb250LXdlaWdodDogYm9sZCcgdmFsaWduPSd0b3AnPlwiICsgdGFiWydyb3dzJ11bal0uaW5uZXJIVE1MICsgXCI8L3RyPlwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGFiX3RleHQgPSB0YWJfdGV4dCArIFwiPHRyIHZhbGlnbj0ndG9wJz5cIiArIHRhYlsncm93cyddW2pdLmlubmVySFRNTCArIFwiPC90cj5cIjtcbiAgICAgICAgLy90YWJfdGV4dD10YWJfdGV4dCtcIjwvdHI+XCI7XG4gICAgICB9XG5cbiAgICAgIHRhYl90ZXh0ID0gdGFiX3RleHQgKyBcIjwvdGFibGU+XCI7XG4gICAgICB0YWJfdGV4dCA9IHRhYl90ZXh0LnJlcGxhY2UoLzxBW14+XSo+fDxcXC9BPi9nLCBcIlwiKTsvL3JlbW92ZSBpZiB1IHdhbnQgbGlua3MgaW4geW91ciB0YWJsZVxuICAgICAgdGFiX3RleHQgPSB0YWJfdGV4dC5yZXBsYWNlKC88aW1nW14+XSo+L2dpLCBcIlwiKTsgLy8gcmVtb3ZlIGlmIHUgd2FudCBpbWFnZXMgaW4geW91ciB0YWJsZVxuICAgICAgdGFiX3RleHQgPSB0YWJfdGV4dC5yZXBsYWNlKC88aW5wdXRbXj5dKj58PFxcL2lucHV0Pi9naSwgXCJcIik7IC8vIHJlb212ZXMgaW5wdXQgcGFyYW1zXG5cblxuICAgICAgdmFyIGN0eCA9IHtcbiAgICAgICAgd29ya3NoZWV0OiAnV29ya3NoZWV0JyxcbiAgICAgICAgdGFibGU6IHRhYl90ZXh0XG4gICAgICB9O1xuICAgICAgc2F2ZShuZXcgQmxvYihbdGFiX3RleHRdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsXCIgfSksIHRoaXMuZXhjZWxOYW1lICsgXCIueGxzXCIpO1xuICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgICAgICAgIH0sNTAwKVxuICAgIH0sIDIwMClcblxuXG4gIH1cbiAgXG4gIGdldFR5cGUoeCl7XG4gICAgcmV0dXJuIHR5cGVvZiB4O1xuICB9XG5cbiAgY3JlYXRlUGRmKHRhcmdldCwgY29udGFpbmVySWQpIHtcbiAgICBsZXQgdGVtcEhlaWdodCA9ICQoXCJrZW5kby1wZGYtZXhwb3J0XCIpLmZpbmQoXCIjXCIgKyBjb250YWluZXJJZCkuY3NzKFwibWF4LWhlaWdodFwiKTtcbiAgICBsZXQgaXRlbXNQZXJQYWdlID0gdGhpcy5pdGVtc1BlclBhZ2U7XG4gICAgbGV0IHNvcnRpbmcgPSB0aGlzLnNvcnRpbmc7XG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSB0aGlzLnJvd0RhdGEubGVuZ3RoO1xuICAgIHRoaXMuc29ydGluZyA9IGZhbHNlO1xuICAgICQoXCJrZW5kby1wZGYtZXhwb3J0XCIpLmZpbmQoXCIjXCIgKyBjb250YWluZXJJZCkuc2Nyb2xsVG9wKDApXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKFwia2VuZG8tcGRmLWV4cG9ydFwiKS5maW5kKFwiI1wiICsgY29udGFpbmVySWQpLmNzcyhcIm1heC1oZWlnaHRcIiwgXCJub25lXCIpXG4gICAgICB0YXJnZXQuc2F2ZUFzKHRoaXMucGRmTmFtZSArIFwiLnBkZlwiKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gaXRlbXNQZXJQYWdlO1xuICAgICAgICB0aGlzLnNvcnRpbmcgPSBzb3J0aW5nO1xuICAgICAgICAkKFwia2VuZG8tcGRmLWV4cG9ydFwiKS5maW5kKFwiI1wiICsgY29udGFpbmVySWQpLmNzcyhcIm1heC1oZWlnaHRcIiwgdGVtcEhlaWdodClcbiAgICAgIH0sIDEwMDApO1xuICAgIH0sIDIwMClcbiAgfVxuXG4gIHB1YmxpYyBhY3Rpb25DbGlja2VkKGJ0bkNsYXNzLCByb3dPYmopOiB2b2lkIHtcbiAgICBsZXQgZW1pdHRlZERhdGE6IGFueSA9IHt0YXJnZXQ6IGJ0bkNsYXNzLCByb3dPYmo6IHJvd09ian07XG4gICAgdGhpcy5vbkFjdGlvbkJ1dHRvbkNsaWNrZWQuZW1pdChlbWl0dGVkRGF0YSk7XG4gIH1cblxuICBwdWJsaWMgZG93bmxvYWRQZGZCeVNlcnZlckNsaWNrZWQodGFibGVJZCwgdGFibGVEYXRhKTogdm9pZCB7XG4gICAgbGV0IGVtaXR0ZWREYXRhOiBhbnkgPSB7dGFibGU6IHRhYmxlSWQsIHRhYmxlRGF0YTogdGFibGVEYXRhfTtcbiAgICB0aGlzLm9uRG93bmxvYWRQZGZCeVNlcnZlckNsaWNrZWQuZW1pdChlbWl0dGVkRGF0YSk7XG4gIH1cbiAgcHVibGljIGRvd25sb2FkRXhjZWxCeVNlcnZlckNsaWNrZWQodGFibGVJZCwgdGFibGVEYXRhKTogdm9pZCB7XG4gICAgbGV0IGVtaXR0ZWREYXRhOiBhbnkgPSB7dGFibGU6IHRhYmxlSWQsIHRhYmxlRGF0YTogdGFibGVEYXRhfTtcbiAgICB0aGlzLm9uRG93bmxvYWRFeGNlbEJ5U2VydmVyQ2xpY2tlZC5lbWl0KGVtaXR0ZWREYXRhKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzb3J0UGlwZSdcbn0pXG5leHBvcnQgY2xhc3MgU29ydFBpcGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbnRyYW5zZm9ybShyb3dEYXRhOiBhbnlbXSwgYXJnczogYW55KTogYW55IHtcbiAgICBpZiAocm93RGF0YSAhPSB1bmRlZmluZWQgJiYgcm93RGF0YSAhPSBudWxsKXtcbiAgICAgcmV0dXJuIHJvd0RhdGEuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICAgIGxldCByb3dkYXRhQSA9IHBhcnNlSW50KGFbYXJncy5wcm9wZXJ0eV0pO1xuICAgICAgbGV0IHJvd2RhdGFCID0gcGFyc2VJbnQoYlthcmdzLnByb3BlcnR5XSk7XG4gICAgICAgIGlmKGlzTmFOKHJvd2RhdGFBKSAmJiBpc05hTihyb3dkYXRhQikpe1xuICAgICAgICAgICAgaWYoYVthcmdzLnByb3BlcnR5XSA8IGJbYXJncy5wcm9wZXJ0eV0pe1xuICAgICAgICAgICAgICAgIHJldHVybiAtMSAqIGFyZ3MuZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhW2FyZ3MucHJvcGVydHldID4gYlthcmdzLnByb3BlcnR5XSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgKiBhcmdzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIGlmKCFpc05hTihyb3dkYXRhQSkgJiYgIWlzTmFOKHJvd2RhdGFCKSl7XG4gICAgICAgICAgICBpZihyb3dkYXRhQSA8IHJvd2RhdGFCKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTEgKiBhcmdzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocm93ZGF0YUEgPiByb3dkYXRhQil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgKiBhcmdzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnc2VhcmNoUGlwZSdcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUGlwZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICB0cmFuc2Zvcm0odGFibGVEYXRhOiBhbnlbXSwgc2VhcmNoVGV4dDogc3RyaW5nKTogYW55W10ge1xuICAgIGlmICghdGFibGVEYXRhKSByZXR1cm4gW107XG4gICAgaWYgKCFzZWFyY2hUZXh0KSByZXR1cm4gdGFibGVEYXRhO1xuICAgIHNlYXJjaFRleHQgPSBzZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHRhYmxlRGF0YS5maWx0ZXIoZGV0YWlscyA9PiB7XG4gICAgIC8vIHJldHVybiBkZXRhaWxzLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dCk7XG4gICAgICAvL2xldCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKCFub1NlYXJjaC5pbmNsdWRlcyhkZXRhaWxzKSk7XG4gICAgICBsZXQgdmFsdWVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gT2JqZWN0LnZhbHVlcyhkZXRhaWxzKS5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IE9iamVjdC52YWx1ZXMoZGV0YWlscylbaV07XG4gICAgICAgIGlmKHR5cGVvZiBlbGVtZW50ICE9ICdvYmplY3QnKXtcbiAgICAgICAgICB2YWx1ZXMucHVzaChlbGVtZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWVzKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQpO1xuICAgIH0pO1xuICB9XG59XG5cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hQYWdpbmF0aW9uTW9kdWxlLCBQYWdpbmF0ZVBpcGUgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBOZzJTZWFyY2hQaXBlTW9kdWxlfSBmcm9tICduZzItc2VhcmNoLWZpbHRlcic7IFxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZWFyY2hQaXBlUGlwZSB9IGZyb20gJy4vc2VhcmNoLXBpcGUucGlwZSc7XG5pbXBvcnQgeyBQREZFeHBvcnRNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1wZGYtZXhwb3J0JztcbmltcG9ydCB7IFNvcnRQaXBlUGlwZSB9IGZyb20gJy4vc29ydC1waXBlLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5neFBhZ2luYXRpb25Nb2R1bGUsXG4gICAgTmcyU2VhcmNoUGlwZU1vZHVsZSxcbiAgICBQREZFeHBvcnRNb2R1bGVcbiAgXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RhYmxlQ29tcG9uZW50LCBTZWFyY2hQaXBlUGlwZSxTb3J0UGlwZVBpcGVdLFxuXG4gIHByb3ZpZGVyczogW10sXG4gIGV4cG9ydHM6IFtUYWJsZUNvbXBvbmVudCwgU2VhcmNoUGlwZVBpcGUsIFNvcnRQaXBlUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVNb2R1bGUge1xuICAvLyBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIG5nTW9kdWxlOiBUYWJsZU1vZHVsZSxcbiAgLy8gICAgIHByb3ZpZGVyczogW1xuICAvLyAgICAgICBUYWJsZVNlcnZpY2UsXG4gIC8vICAgICAgIHsgcHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWcgfVxuICAvLyAgICAgXVxuICAvLyAgIH07XG4gIC8vIH1cbn1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIlBpcGUiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiTmd4UGFnaW5hdGlvbk1vZHVsZSIsIk5nMlNlYXJjaFBpcGVNb2R1bGUiLCJQREZFeHBvcnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO1FBc0RFO2tDQXhDc0IsRUFBRTsrQkFDRCxLQUFLO29DQUNBLElBQUk7cUJBR3BCLENBQUM7OzhCQWFrQixLQUFLOzsrQkFJSixLQUFLOzs2QkFHUCxLQUFLOzsrQkFHSCxLQUFLO2lDQUVILEtBQUs7O3VDQUlBLEtBQUs7eUNBQ0gsS0FBSzt5Q0FFTyxJQUFJQSxpQkFBWSxFQUFPO2dEQUNoQixJQUFJQSxpQkFBWSxFQUFPO2tEQUNyQixJQUFJQSxpQkFBWSxFQUFPO1NBRXBGOzs7O1FBRUQsaUNBQVE7OztZQUFSLGVBQWM7Ozs7UUFFZCxvQ0FBVzs7O1lBQVg7Z0JBQUEsaUJBV0M7Z0JBVkMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7b0JBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQzFDLFVBQVUsQ0FBQztvQkFDVCxJQUFJLEtBQUksQ0FBQyxXQUFXO3dCQUNsQixLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztvQkFDaEMsSUFBSSxLQUFJLENBQUMsY0FBYyxFQUFFO3dCQUN2QixDQUFDLENBQUMsd0JBQXdCLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO3FCQUM3RTtpQkFDRixDQUFDLENBQUE7YUFFSDs7Ozs7UUFFRCxtQ0FBVTs7OztZQUFWLFVBQVcsSUFBWTtnQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQzVCLE9BQU8sU0FBUyxHQUFHLElBQUksQ0FBQztpQkFDekI7cUJBQ0k7b0JBQ0gsT0FBTyxJQUFJLENBQUM7aUJBQ2I7YUFDRjs7Ozs7UUFDRCw2QkFBSTs7OztZQUFKLFVBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdkM7Ozs7UUFLRCwrQ0FBc0I7OztZQUF0Qjs7Z0JBRUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMxRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7Z0JBS3ZGLENBQUMsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUNyRSxDQUFDLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUE7Z0JBQ2xFLElBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBQztvQkFDbEYsQ0FBQyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtpQkFDaE87YUFDRjs7Ozs7UUFFRCx1Q0FBYzs7OztZQUFkLFVBQWUsS0FBSzs7Z0JBQ2xCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7Z0JBQ3JFLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFO29CQUM5QyxDQUFDLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUN0RDtxQkFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtvQkFDbEQsQ0FBQyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ3JDO2FBQ0Y7Ozs7O1FBRUQscUNBQVk7Ozs7WUFBWixVQUFhLEVBQUU7Z0JBQWYsaUJBMkRDOztnQkF6REMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7OztnQkFheEMsVUFBVSxDQUFDOztvQkFjVCxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQzs7b0JBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7b0JBQ3pCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRXRDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDUixRQUFRLEdBQUcsUUFBUSxHQUFHLHFGQUFxRixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDOzs0QkFFakosUUFBUSxHQUFHLFFBQVEsR0FBRyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzs7cUJBRWxGO29CQUVELFFBQVEsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDO29CQUNqQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDbkQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNoRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFPNUQsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBQzFGLFVBQVUsQ0FBQzt3QkFDTCxLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztxQkFDakMsRUFBQyxHQUFHLENBQUMsQ0FBQTtpQkFDWixFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBR1I7Ozs7O1FBRUQsZ0NBQU87Ozs7WUFBUCxVQUFRLENBQUM7Z0JBQ1AsT0FBTyxPQUFPLENBQUMsQ0FBQzthQUNqQjs7Ozs7O1FBRUQsa0NBQVM7Ozs7O1lBQVQsVUFBVSxNQUFNLEVBQUUsV0FBVztnQkFBN0IsaUJBZ0JDOztnQkFmQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Z0JBQ2pGLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O2dCQUNyQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFELFVBQVUsQ0FBQztvQkFDVCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUE7b0JBQ3ZFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQTtvQkFDcEMsVUFBVSxDQUFDO3dCQUNULEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO3dCQUNqQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDdkIsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFBO3FCQUM1RSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNWLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDUjs7Ozs7O1FBRU0sc0NBQWE7Ozs7O3NCQUFDLFFBQVEsRUFBRSxNQUFNOztnQkFDbkMsSUFBSSxXQUFXLEdBQVEsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztRQUd4QyxtREFBMEI7Ozs7O3NCQUFDLE9BQU8sRUFBRSxTQUFTOztnQkFDbEQsSUFBSSxXQUFXLEdBQVEsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztRQUUvQyxxREFBNEI7Ozs7O3NCQUFDLE9BQU8sRUFBRSxTQUFTOztnQkFDcEQsSUFBSSxXQUFXLEdBQVEsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7O29CQTNNekRDLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsWUFBWTt3QkFDdEIsMGdRQUFxQzs7cUJBRXRDOzs7Ozt5QkFXRUMsVUFBSzs4QkFDTEEsVUFBSztpQ0FDTEEsVUFBSztxQ0FDTEEsVUFBSzs4QkFJTEEsVUFBSzt3Q0FDTEEsVUFBSztpQ0FHTEEsVUFBSzttQ0FDTEEsVUFBSztrQ0FHTEEsVUFBSztnQ0FHTEEsVUFBSztrQ0FHTEEsVUFBSzs4QkFDTEEsVUFBSztvQ0FDTEEsVUFBSztnQ0FDTEEsVUFBSzswQ0FHTEEsVUFBSzs0Q0FDTEEsVUFBSzs0Q0FFTEMsV0FBTTttREFDTkEsV0FBTTtxREFDTkEsV0FBTTs7NkJBckRUOzs7Ozs7O0FDQUE7Ozs7Ozs7O1FBT0EsZ0NBQVM7Ozs7O1lBQVQsVUFBVSxPQUFjLEVBQUUsSUFBUztnQkFDL0IsSUFBSSxPQUFPLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUM7b0JBQzNDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDOzt3QkFDaEMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7d0JBQzFDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ3hDLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBQzs0QkFDbEMsSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUM7Z0NBQ25DLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzs2QkFDOUI7aUNBQ0ksSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUM7Z0NBQ3hDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7NkJBQzdCO2lDQUNHO2dDQUNBLE9BQU8sQ0FBQyxDQUFDOzZCQUNaO3lCQUNKOzZCQUFLLElBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUM7NEJBQzFDLElBQUcsUUFBUSxHQUFHLFFBQVEsRUFBQztnQ0FDbkIsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDOzZCQUM5QjtpQ0FDSSxJQUFHLFFBQVEsR0FBRyxRQUFRLEVBQUM7Z0NBQ3hCLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7NkJBQzdCO2lDQUNHO2dDQUNBLE9BQU8sQ0FBQyxDQUFDOzZCQUNaO3lCQUNKO3FCQUNGLENBQUMsQ0FBQztpQkFDSjthQUNGOztvQkFqQ0ZDLFNBQUksU0FBQzt3QkFDSixJQUFJLEVBQUUsVUFBVTtxQkFDakI7OzJCQUpEOzs7Ozs7O0FDQUE7Ozs7Ozs7O1FBT0Usa0NBQVM7Ozs7O1lBQVQsVUFBVSxTQUFnQixFQUFFLFVBQWtCO2dCQUM1QyxJQUFJLENBQUMsU0FBUztvQkFBRSxPQUFPLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFVBQVU7b0JBQUUsT0FBTyxTQUFTLENBQUM7Z0JBQ2xDLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU87O29CQUc3QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O3dCQUN6RCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxJQUFHLE9BQU8sT0FBTyxJQUFJLFFBQVEsRUFBQzs0QkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTt5QkFDckI7cUJBQ0Y7b0JBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDbEUsQ0FBQyxDQUFDO2FBQ0o7O29CQXJCRkEsU0FBSSxTQUFDO3dCQUNKLElBQUksRUFBRSxZQUFZO3FCQUNuQjs7NkJBSkQ7Ozs7Ozs7QUNBQTs7OztvQkFVQ0MsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsbUJBQVk7NEJBQ1pDLGlCQUFXOzRCQUNYQyxpQ0FBbUI7NEJBQ25CQyxtQ0FBbUI7NEJBQ25CQyxxQ0FBZTt5QkFFaEI7d0JBQ0QsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBQyxZQUFZLENBQUM7d0JBRTNELFNBQVMsRUFBRSxFQUFFO3dCQUNiLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDO3FCQUN4RDs7MEJBdkJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==