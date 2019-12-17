/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import save from 'save-as';
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
        this.onActionButtonClicked = new EventEmitter();
        this.onDownloadPdfByServerClicked = new EventEmitter();
        this.onDownloadExcelByServerClicked = new EventEmitter();
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
    ;
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
            var htmls = "";
            /** @type {?} */
            var uri = 'data:application/vnd.ms-excel;base64,';
            /** @type {?} */
            var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
            /** @type {?} */
            var base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)));
            };
            /** @type {?} */
            var format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                });
            };
            /** @type {?} */
            var tab_text = "<table border='2px'>";
            /** @type {?} */
            var textRange;
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
            /** @type {?} */
            var ctx = {
                worksheet: 'Worksheet',
                table: tab_text
            };
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
        { type: Component, args: [{
                    selector: 'sdrc-table',
                    template: "\n    <div class=\"row\">           \n\n      <div class=\"col-md-12\">\n        <div class=\"text-right\" [hidden]=\"rowData && !rowData.length\">\n        <!-- <div class=\"col-md-3\">\n          <div class=\"form-group\">\n              <button class=\"btn btn-submit\" [disabled]=\"tableService.disableDeleteBtn\">Delete All</button>\n          </div>\n        </div> -->\n        <div *ngIf=\"searchBox\" class=\"table-btn search\">\n          <div class=\"form-group\">\n            <input class=\"form-control\" type=\"text\" id=\"myInput\" [(ngModel)]=\"searchFilter\" placeholder=\"..search\">\n          </div>\n      </div>\n        <div *ngIf=\"downloadPdf\" class=\"table-btn\">\n          <button class=\"btn btn-pdf btn-submit\" (click)=\"createPdf(pdf, 'table-fixed-container'+id)\"><span><i class=\"fa fa-download\" style=\"font-size:15px;\"\n                aria-hidden=\"true\"></i></span>&nbsp;download pdf</button>\n        </div>\n        <div *ngIf=\"downloadExcel\" class=\"table-btn\">\n          <button class=\"btn btn-excel btn-submit\" (click)=\"tableToExcel(id)\"><span><i class=\"fa fa-file-excel-o\"\n                style=\"font-size:15px;\" aria-hidden=\"true\"></i></span>&nbsp;download excel</button>\n        </div>\n        <div *ngIf=\"downloadPdfByServer\" class=\"table-btn\">\n          <button class=\"btn btn-pdf btn-submit\" (click)=\"downloadPdfByServerClicked(id, rowData)\"><span><i class=\"fa fa-download\" style=\"font-size:15px;\"\n                aria-hidden=\"true\"></i></span>&nbsp;download pdf</button>\n        </div>\n        <div *ngIf=\"downloadExcelByServer\" class=\"table-btn\">\n          <button class=\"btn btn-excel btn-submit\" (click)=\"downloadExcelByServerClicked(id, rowData)\"><span><i class=\"fa fa-file-excel-o\"\n                style=\"font-size:15px;\" aria-hidden=\"true\"></i></span>&nbsp;download excel</button>\n        </div>\n        \n      </div>\n    </div>\n\n    <div class=\"col-md-12\">\n    <div class=\"parent-tabl-container\">\n    <kendo-pdf-export #pdf paperSize=\"A2\" margin=\"2cm\" [repeatHeaders]=\"true\"  [scale]=\"0.6\">\n    <div class=\"filled-form view-form\" id=\"{{'table-fixed-container'+id}}\" (scroll)=\"fixTableHeader($event)\" style=\"overflow: auto;\">                 \n      \n      <!-- Header fixed table section -->\n      <table *ngIf=\"headerFixed\" id=\"{{'header-fixed'+id}}\" class=\"table table-striped table-bordered header-fixed\">\n            <thead>\n                <tr>\n                  <!-- <th><input type=\"checkbox\" [(ngModel)]=\"tableService.checkStatus\" (click)=\"tableService.selectAllCheckBoxes(rowData, !tableService.checkStatus)\">&nbsp; Select All </th> -->\n                  <th *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\">{{col}}\n                    <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                        'fa-sort-asc': (col == columns && !isDesc), \n                        'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                    </i>\n                  </th>\n                </tr>\n              </thead>\n              <tbody>\n                  <tr [ngClass]=\"rowDetails.cssClass ? rowDetails.cssClass:''\" *ngFor=\"let rowDetails of rowData | searchPipe: searchFilter | sortPipe: {property: columns, direction: direction} | paginate: { itemsPerPage: itemsPerPage, currentPage: p } let i = index;\">\n                    <!-- <td><input type=\"checkbox\" [(ngModel)]=\"rowDetails.isChecked\" (change)=\"tableService.singleCheckBoxClicked(tableService.rowData)\"></td> -->\n                    <td *ngFor=\"let col of columnData\">\n                      <div *ngIf=\"getType(rowDetails[col]) != 'object'\">{{rowDetails[col]}}</div>\n                      <div *ngIf=\"getType(rowDetails[col]) == 'object'\" style=\"display: inline-flex;\">\n                        <div *ngFor=\"let colDetails of rowDetails[col]\">\n                            <div [ngSwitch]=\"colDetails.controlType\" class=\"col-md-9 input-holder\">\n                              <button *ngSwitchCase=\"'button'\"  class=\"{{colDetails.class}}\" type=\"{{colDetails.type}}\" (click)=\"actionClicked(colDetails.class, rowDetails)\"><i *ngIf=\"colDetails.icon\" class=\"fa\" [ngClass]=\"colDetails.icon\"></i>{{colDetails.value}}</button>\n                                \n                                <input *ngSwitchCase=\"'textbox'\" name=\"{{colDetails.name}}\" [type]=\"colDetails.type\" [(ngModel)]=\"colDetails.value\" class=\"form-control\">\n    \n                                <!-- <input *ngSwitchCase=\"'checkbox'\" name=\"{{colDetails.name}}\" type=\"{{colDetails.type}}\">                                    -->\n                            </div>\n                        </div>\n                      </div>\n                    </td>\n                  </tr>   \n                </tbody>\n         </table>\n        \n\n         <!-- main table -->\n          <table class=\"table table-striped table-bordered\" id=\"{{id}}\">\n            <thead>\n              <tr>\n                <!-- <th><input type=\"checkbox\" [(ngModel)]=\"tableService.checkStatus\" (click)=\"tableService.selectAllCheckBoxes(rowData, !tableService.checkStatus)\">&nbsp; Select All </th> -->\n                <th *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\">{{col}}\n                  <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                      'fa-sort-asc': (col == columns && !isDesc), \n                      'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                  </i>\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let rowDetails of rowData | searchPipe: searchFilter | sortPipe: {property: columns, direction: direction} | paginate: { itemsPerPage: itemsPerPage, currentPage: p, id:id } let i = index;\">\n                <!-- <td><input type=\"checkbox\" [(ngModel)]=\"rowDetails.isChecked\" (change)=\"tableService.singleCheckBoxClicked(tableService.rowData)\"></td> -->\n                <td *ngFor=\"let col of columnData\">\n                  <div *ngIf=\"getType(rowDetails[col]) != 'object'\">{{rowDetails[col]}}</div>\n                  <div *ngIf=\"getType(rowDetails[col]) == 'object'\" style=\"display: inline-flex;\">\n                    <div *ngFor=\"let colDetails of rowDetails[col]\">\n                        <div [ngSwitch]=\"colDetails.controlType\" class=\"col-md-9 input-holder\">\n                          <button *ngSwitchCase=\"'button'\"  class=\"{{colDetails.class}}\" type=\"{{colDetails.type}}\" (click)=\"actionClicked(colDetails.class, rowDetails)\"><i *ngIf=\"colDetails.icon\" class=\"fa\" [ngClass]=\"colDetails.icon\"></i>{{colDetails.value}}</button>\n                            \n                            <input *ngSwitchCase=\"'textbox'\" name=\"{{colDetails.name}}\" [type]=\"colDetails.type\" [(ngModel)]=\"colDetails.value\" class=\"form-control\">\n\n                            <!-- <input *ngSwitchCase=\"'checkbox'\" name=\"{{colDetails.name}}\" type=\"{{colDetails.type}}\">                                    -->\n                        </div>\n                    </div>\n                  </div>\n                </td>\n              </tr>   \n            </tbody>\n          </table>   \n        \n        </div>\n        </kendo-pdf-export>\n        <br/>\n        <div  *ngIf=\"(rowData && !rowData.length) || (rowData && rowData.length && (rowData | searchPipe: searchFilter).length==0)\" class=\"col-md-12 text-center search-area\">No Data Found.</div>\n        <div *ngIf=\"isPaginate && rowData && rowData.length\">\n          <pagination-controls (pageChange)=\"p = $event;\" id=\"{{id}}\" class=\"pagination-view\"></pagination-controls>\n        </div>\n      </div>\n     </div>\n    </div>\n",
                    styles: [".header-fixed{position:absolute;display:none;z-index:1;overflow:hidden;margin-right:15px}.parent-tabl-container{position:relative}table thead{background-color:#187080;color:#fff}td{text-align:center}table thead th{vertical-align:middle;text-align:center}.pagination-view{float:right}#myInput{width:100%;border-radius:0;font-size:16px;padding:7px 20px 12px 30px;font-style:inherit;border:1px solid #ddd;margin-bottom:12px;box-shadow:0 0 2px 0}.table-btn.search .form-group{position:relative}.table-btn.search .form-group:before{position:absolute;font-family:FontAwesome;top:5px;left:7px;color:#9c9c9c;content:\"\\f002\"}.search-area{font-style:italic;margin-top:30px;margin-bottom:30px;font-size:30px}input[type=text]{font-style:italic}.table-btn .btn-excel,.table-btn .btn-pdf{margin-bottom:16px;background-color:#357080;color:#fff;border-radius:0}.btn-excel:active,.btn-excel:focus{outline:0!important;border:none!important}.fa-sorting{cursor:pointer}.table-btn{display:inline-block;float:right;margin:0 5px}"]
                }] }
    ];
    /** @nocollapse */
    TableComponent.ctorParameters = function () { return []; };
    TableComponent.propDecorators = {
        id: [{ type: Input }],
        rowData: [{ type: Input }],
        columnData: [{ type: Input }],
        maxTableHeight: [{ type: Input }],
        sorting: [{ type: Input }],
        sortExcludeColumn: [{ type: Input }],
        isPaginate: [{ type: Input }],
        itemsPerPage: [{ type: Input }],
        headerFixed: [{ type: Input }],
        searchBox: [{ type: Input }],
        downloadPdf: [{ type: Input }],
        pdfName: [{ type: Input }],
        downloadExcel: [{ type: Input }],
        excelName: [{ type: Input }],
        downloadPdfByServer: [{ type: Input }],
        downloadExcelByServer: [{ type: Input }],
        onActionButtonClicked: [{ type: Output }],
        onDownloadPdfByServerClicked: [{ type: Output }],
        onDownloadExcelByServerClicked: [{ type: Output }]
    };
    return TableComponent;
}());
export { TableComponent };
if (false) {
    /** @type {?} */
    TableComponent.prototype.isDesc;
    /** @type {?} */
    TableComponent.prototype.direction;
    /** @type {?} */
    TableComponent.prototype.fixTableConfig;
    /** @type {?} */
    TableComponent.prototype.checkStatus;
    /** @type {?} */
    TableComponent.prototype.disableDeleteBtn;
    /** @type {?} */
    TableComponent.prototype.columns;
    /** @type {?} */
    TableComponent.prototype.p;
    /** @type {?} */
    TableComponent.prototype.searchFilter;
    /** @type {?} */
    TableComponent.prototype.id;
    /** @type {?} */
    TableComponent.prototype.rowData;
    /** @type {?} */
    TableComponent.prototype.columnData;
    /** @type {?} */
    TableComponent.prototype.maxTableHeight;
    /** @type {?} */
    TableComponent.prototype.sorting;
    /** @type {?} */
    TableComponent.prototype.sortExcludeColumn;
    /** @type {?} */
    TableComponent.prototype.isPaginate;
    /** @type {?} */
    TableComponent.prototype.itemsPerPage;
    /** @type {?} */
    TableComponent.prototype.headerFixed;
    /** @type {?} */
    TableComponent.prototype.searchBox;
    /** @type {?} */
    TableComponent.prototype.downloadPdf;
    /** @type {?} */
    TableComponent.prototype.pdfName;
    /** @type {?} */
    TableComponent.prototype.downloadExcel;
    /** @type {?} */
    TableComponent.prototype.excelName;
    /** @type {?} */
    TableComponent.prototype.downloadPdfByServer;
    /** @type {?} */
    TableComponent.prototype.downloadExcelByServer;
    /** @type {?} */
    TableComponent.prototype.onActionButtonClicked;
    /** @type {?} */
    TableComponent.prototype.onDownloadPdfByServerClicked;
    /** @type {?} */
    TableComponent.prototype.onDownloadExcelByServerClicked;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2RyYy10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUYsT0FBTyxJQUFJLE1BQU0sU0FBUyxDQUFDOztJQW1EekI7OEJBeENzQixFQUFFOzJCQUNELEtBQUs7Z0NBQ0EsSUFBSTtpQkFHcEIsQ0FBQzs7MEJBYWtCLEtBQUs7OzJCQUlKLEtBQUs7O3lCQUdQLEtBQUs7OzJCQUdILEtBQUs7NkJBRUgsS0FBSzs7bUNBSUEsS0FBSztxQ0FDSCxLQUFLO3FDQUVPLElBQUksWUFBWSxFQUFPOzRDQUNoQixJQUFJLFlBQVksRUFBTzs4Q0FDckIsSUFBSSxZQUFZLEVBQU87S0FFcEY7Ozs7SUFFRCxpQ0FBUTs7O0lBQVIsZUFBYzs7OztJQUVkLG9DQUFXOzs7SUFBWDtRQUFBLGlCQVdDO1FBVkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxVQUFVLENBQUM7WUFDVCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNuQixLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLHdCQUF3QixHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTthQUM3RTtTQUNGLENBQUMsQ0FBQTtLQUVIOzs7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dXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2luYXRlUGlwZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1kcmF3aW5nL3BkZic7XG5pbXBvcnQgc2F2ZSBmcm9tICdzYXZlLWFzJztcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2RyYy10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGlzRGVzYzogYW55O1xuICBkaXJlY3Rpb246IG51bWJlcjtcbiAgZml4VGFibGVDb25maWc6IGFueSA9IHt9O1xuICBjaGVja1N0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNhYmxlRGVsZXRlQnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgY29sdW1uczogYW55O1xuXG4gIHA6IG51bWJlciA9IDE7XG4gIHNlYXJjaEZpbHRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSByb3dEYXRhOiBhbnlbXTtcbiAgQElucHV0KCkgY29sdW1uRGF0YTogYW55W107XG4gIEBJbnB1dCgpIG1heFRhYmxlSGVpZ2h0OiBzdHJpbmc7XG5cblxuICAvL2tleXMgZm9yIHNvcnRpbmcgYW5kIGV4Y2x1ZGUgc29ydGluZyBjb2x1bW4gZnJvbSB0YWJsZS1zb3J0aW5nLmRpcmVjdGl2ZVxuICBASW5wdXQoKSBzb3J0aW5nOiBib29sZWFuO1xuICBASW5wdXQoKSBzb3J0RXhjbHVkZUNvbHVtbjogc3RyaW5nW107XG5cbiAgLy9rZXlzIGZvciBwYWdpbmF0ZSBhbmQgaXRlbXNQZXJwYWdlIGZyb20gdGFibGUtcGFnaW5hdGUuZGlyZWN0aXZlXG4gIEBJbnB1dCgpIGlzUGFnaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgaXRlbXNQZXJQYWdlOiBudW1iZXI7XG5cbiAgLy9pc0hlYWRlckZpeGVkIGZyb20gdGFibGUtaGVhZGVyZml4LmRpcmVjdGl2ZVxuICBASW5wdXQoKSBoZWFkZXJGaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vc2VhcmNoQm94IGZyb20gdGFibGUtc2VhcmNoQm94LmRpcmVjdGl2ZS50c1xuICBASW5wdXQoKSBzZWFyY2hCb3g6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvL2Rvd25sb2FkIFBkZiBhbmQgRXhjZWwgdGFibGUtZG93bmxvYWRQZGYuZGlyZWN0aXZlIGFuZCB0YWJsZS1kb3dubG9hZEV4Y2VsLmRpcmVjdGl2ZVxuICBASW5wdXQoKSBkb3dubG9hZFBkZjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwZGZOYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRvd25sb2FkRXhjZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZXhjZWxOYW1lOiBzdHJpbmc7XG5cbiAgLy9kb3dubG9hZCBwZGYgYW5kIGV4Y2VsIGJ5IHNlcnZlciBzaWRlXG4gIEBJbnB1dCgpIGRvd25sb2FkUGRmQnlTZXJ2ZXI6Ym9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBkb3dubG9hZEV4Y2VsQnlTZXJ2ZXI6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBvbkFjdGlvbkJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvbkRvd25sb2FkUGRmQnlTZXJ2ZXJDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25Eb3dubG9hZEV4Y2VsQnlTZXJ2ZXJDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMucm93RGF0YSAmJiAhdGhpcy5pc1BhZ2luYXRlKVxuICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSB0aGlzLnJvd0RhdGEubGVuZ3RoO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaGVhZGVyRml4ZWQpXG4gICAgICAgIHRoaXMuc2V0RHVwbGljYXRlRml4ZWRUYWJsZSgpO1xuICAgICAgaWYgKHRoaXMubWF4VGFibGVIZWlnaHQpIHtcbiAgICAgICAgJCgnI3RhYmxlLWZpeGVkLWNvbnRhaW5lcicgKyB0aGlzLmlkKS5jc3MoXCJtYXgtaGVpZ2h0XCIsIHRoaXMubWF4VGFibGVIZWlnaHQpXG4gICAgICB9XG4gICAgfSlcblxuICB9XG5cbiAgYXBwZW5kSHR0cChsaW5rOiBzdHJpbmcpIHtcbiAgICBpZiAoIWxpbmsuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICByZXR1cm4gJ2h0dHA6Ly8nICsgbGluaztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbGluaztcbiAgICB9XG4gIH1cbiAgc29ydChwcm9wZXJ0eSkge1xuICAgIHRoaXMuaXNEZXNjID0gIXRoaXMuaXNEZXNjOyAvL2NoYW5nZSB0aGUgZGlyZWN0aW9uICAgIFxuICAgIHRoaXMuY29sdW1ucyA9IHByb3BlcnR5O1xuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5pc0Rlc2MgPyAxIDogLTE7XG4gIH07XG5cblxuXG5cbiAgc2V0RHVwbGljYXRlRml4ZWRUYWJsZSgpIHtcbiAgICAvLyAkKFwiI2hlYWRlci1maXhlZFwiKS5odG1sKFwiXCIpO1xuICAgIHRoaXMuZml4VGFibGVDb25maWcuaGVhZGVySGVpZ2h0ID0gJChcIiNcIiArIHRoaXMuaWQgKyBcIiA+IHRoZWFkXCIpLmhlaWdodCgpO1xuICAgIHRoaXMuZml4VGFibGVDb25maWcud2lkdGggPSAkKCcjJyArIHRoaXMuaWQpLmNsb3Nlc3QoXCIucGFyZW50LXRhYmwtY29udGFpbmVyXCIpLndpZHRoKCk7XG4gICAgLy8gdGhpcy5maXhUYWJsZUNvbmZpZy5oZWFkZXIgPSAkKFwiI29yZy1mdWxsLWRhdGEgPiB0aGVhZFwiKS5jbG9uZSgpO1xuICAgIC8vIHRoaXMuZml4VGFibGVDb25maWcuYm9keSA9ICQoXCIjb3JnLWZ1bGwtZGF0YSA+IHRib2R5XCIpLmNsb25lKCk7XG4gICAgLy8gdGhpcy5maXhUYWJsZUNvbmZpZy5maXhlZEhlYWRlciA9ICQoXCIjaGVhZGVyLWZpeGVkXCIpLmFwcGVuZCh0aGlzLmZpeFRhYmxlQ29uZmlnLmhlYWRlcik7XG4gICAgLy8gdGhpcy5maXhUYWJsZUNvbmZpZy50YWJsZSA9ICQoXCIjaGVhZGVyLWZpeGVkXCIpLmFwcGVuZCh0aGlzLmZpeFRhYmxlQ29uZmlnLmJvZHkpO1xuICAgICQoXCIjaGVhZGVyLWZpeGVkXCIgKyB0aGlzLmlkKS5oZWlnaHQodGhpcy5maXhUYWJsZUNvbmZpZy5oZWFkZXJIZWlnaHQpXG4gICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLndpZHRoKHRoaXMuZml4VGFibGVDb25maWcud2lkdGggLSAxNilcbiAgICBpZigkKFwiI1wiK3RoaXMuaWQpLnBhcmVudCgpWzBdLnNjcm9sbFdpZHRoID09ICQoXCIjXCIrdGhpcy5pZCkucGFyZW50KClbMF0uY2xpZW50V2lkdGgpe1xuICAgICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLmZpbmQoXCJ0aFwiKS53aWR0aCgkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkuZmluZChcInRoXCIpLndpZHRoKCkgKyAoKCQoXCIjaGVhZGVyLWZpeGVkXCIgKyB0aGlzLmlkKS53aWR0aCgpIC0gJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLmZpbmQoXCJ0aGVhZFwiKS53aWR0aCgpKS8kKFwiI2hlYWRlci1maXhlZHRhYjEgdGhcIikubGVuZ3RoKSlcbiAgICB9XG4gIH1cblxuICBmaXhUYWJsZUhlYWRlcihldmVudCkge1xuICAgIHZhciBvZmZzZXQgPSAkKGV2ZW50LnRhcmdldCkuc2Nyb2xsVG9wKCk7XG4gICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLnNjcm9sbExlZnQoJChldmVudC50YXJnZXQpLnNjcm9sbExlZnQoKSlcbiAgICBpZiAob2Zmc2V0ID49IHRoaXMuZml4VGFibGVDb25maWcuaGVhZGVySGVpZ2h0KSB7XG4gICAgICAkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvZmZzZXQgPCB0aGlzLmZpeFRhYmxlQ29uZmlnLmhlYWRlckhlaWdodCkge1xuICAgICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICB0YWJsZVRvRXhjZWwoaWQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyh0YWJsZSk7XG4gICAgbGV0IGl0ZW1zUGVyUGFnZSA9IHRoaXMuaXRlbXNQZXJQYWdlO1xuICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gdGhpcy5yb3dEYXRhLmxlbmd0aDtcbiAgICAvLyBzZXRUaW1lb3V0KCgpPT57XG4gICAgLy8gICBsZXQgdXJpID0gJ2RhdGE6YXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsO2Jhc2U2NCwnXG4gICAgLy8gICAgICwgdGVtcGxhdGUgPSAnPGh0bWwgeG1sbnM6bz1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206b2ZmaWNlOm9mZmljZVwiIHhtbG5zOng9XCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOm9mZmljZTpleGNlbFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLWh0bWw0MFwiPjxoZWFkPjwhLS1baWYgZ3RlIG1zbyA5XT48eG1sPjx4OkV4Y2VsV29ya2Jvb2s+PHg6RXhjZWxXb3Jrc2hlZXRzPjx4OkV4Y2VsV29ya3NoZWV0Pjx4Ok5hbWU+e3dvcmtzaGVldH08L3g6TmFtZT48eDpXb3Jrc2hlZXRPcHRpb25zPjx4OkRpc3BsYXlHcmlkbGluZXMvPjwveDpXb3Jrc2hlZXRPcHRpb25zPjwveDpFeGNlbFdvcmtzaGVldD48L3g6RXhjZWxXb3Jrc2hlZXRzPjwveDpFeGNlbFdvcmtib29rPjwveG1sPjwhW2VuZGlmXS0tPjxtZXRhIGh0dHAtZXF1aXY9XCJjb250ZW50LXR5cGVcIiBjb250ZW50PVwidGV4dC9wbGFpbjsgY2hhcnNldD1VVEYtOFwiLz48L2hlYWQ+PGJvZHk+PHRhYmxlPnt0YWJsZX08L3RhYmxlPjwvYm9keT48L2h0bWw+J1xuICAgIC8vICAgICAsIGJhc2U2NCA9IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHdpbmRvdy5idG9hKGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQocykpKSB9XG4gICAgLy8gICAgICwgZm9ybWF0ID0gZnVuY3Rpb24ocyxjKSB7IHJldHVybiBzLnJlcGxhY2UoL3soXFx3Kyl9L2csIGZ1bmN0aW9uKG0sIHApIHsgcmV0dXJuIGNbcF07IH0pIH1cbiAgICAvLyAgIGlmICghdGFibGUubm9kZVR5cGUpIHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFibGUpXG4gICAgLy8gICAgdmFyIGN0eCA9IHt3b3Jrc2hlZXQ6IG5hbWUgfHwgJ1dvcmtzaGVldCcsIHRhYmxlOiB0YWJsZS5pbm5lckhUTUx9XG4gICAgLy8gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmkgKyBiYXNlNjQoZm9ybWF0KHRlbXBsYXRlLCBjdHgpKVxuICAgIC8vICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAvLyAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgLy8gICAgfSwxMDAwKVxuICAgIC8vIH0sIDIwMClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHZhciBodG1scyA9IFwiXCI7XG4gICAgICB2YXIgdXJpID0gJ2RhdGE6YXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsO2Jhc2U2NCwnO1xuICAgICAgdmFyIHRlbXBsYXRlID0gJzxodG1sIHhtbG5zOm89XCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOm9mZmljZTpvZmZpY2VcIiB4bWxuczp4PVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6ZXhjZWxcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy1odG1sNDBcIj48aGVhZD48IS0tW2lmIGd0ZSBtc28gOV0+PHhtbD48eDpFeGNlbFdvcmtib29rPjx4OkV4Y2VsV29ya3NoZWV0cz48eDpFeGNlbFdvcmtzaGVldD48eDpOYW1lPnt3b3Jrc2hlZXR9PC94Ok5hbWU+PHg6V29ya3NoZWV0T3B0aW9ucz48eDpEaXNwbGF5R3JpZGxpbmVzLz48L3g6V29ya3NoZWV0T3B0aW9ucz48L3g6RXhjZWxXb3Jrc2hlZXQ+PC94OkV4Y2VsV29ya3NoZWV0cz48L3g6RXhjZWxXb3JrYm9vaz48L3htbD48IVtlbmRpZl0tLT48L2hlYWQ+PGJvZHk+PHRhYmxlPnt0YWJsZX08L3RhYmxlPjwvYm9keT48L2h0bWw+JztcbiAgICAgIHZhciBiYXNlNjQgPSBmdW5jdGlvbiAocykge1xuICAgICAgICByZXR1cm4gd2luZG93LmJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZm9ybWF0ID0gZnVuY3Rpb24gKHMsIGMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgveyhcXHcrKX0vZywgZnVuY3Rpb24gKG0sIHApIHtcbiAgICAgICAgICByZXR1cm4gY1twXTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgdGFiX3RleHQgPSBcIjx0YWJsZSBib3JkZXI9JzJweCc+XCI7XG4gICAgICB2YXIgdGV4dFJhbmdlOyB2YXIgaiA9IDA7XG4gICAgICBsZXQgdGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpOyAvLyBpZCBvZiB0YWJsZVxuXG4gICAgICBmb3IgKGogPSAwOyBqIDwgdGFiWydyb3dzJ10ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGogPT0gMClcbiAgICAgICAgICB0YWJfdGV4dCA9IHRhYl90ZXh0ICsgXCI8dHIgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6ICMwMDgzN0Y7IGNvbG9yOiAjRkZGOyBmb250LXdlaWdodDogYm9sZCcgdmFsaWduPSd0b3AnPlwiICsgdGFiWydyb3dzJ11bal0uaW5uZXJIVE1MICsgXCI8L3RyPlwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGFiX3RleHQgPSB0YWJfdGV4dCArIFwiPHRyIHZhbGlnbj0ndG9wJz5cIiArIHRhYlsncm93cyddW2pdLmlubmVySFRNTCArIFwiPC90cj5cIjtcbiAgICAgICAgLy90YWJfdGV4dD10YWJfdGV4dCtcIjwvdHI+XCI7XG4gICAgICB9XG5cbiAgICAgIHRhYl90ZXh0ID0gdGFiX3RleHQgKyBcIjwvdGFibGU+XCI7XG4gICAgICB0YWJfdGV4dCA9IHRhYl90ZXh0LnJlcGxhY2UoLzxBW14+XSo+fDxcXC9BPi9nLCBcIlwiKTsvL3JlbW92ZSBpZiB1IHdhbnQgbGlua3MgaW4geW91ciB0YWJsZVxuICAgICAgdGFiX3RleHQgPSB0YWJfdGV4dC5yZXBsYWNlKC88aW1nW14+XSo+L2dpLCBcIlwiKTsgLy8gcmVtb3ZlIGlmIHUgd2FudCBpbWFnZXMgaW4geW91ciB0YWJsZVxuICAgICAgdGFiX3RleHQgPSB0YWJfdGV4dC5yZXBsYWNlKC88aW5wdXRbXj5dKj58PFxcL2lucHV0Pi9naSwgXCJcIik7IC8vIHJlb212ZXMgaW5wdXQgcGFyYW1zXG5cblxuICAgICAgdmFyIGN0eCA9IHtcbiAgICAgICAgd29ya3NoZWV0OiAnV29ya3NoZWV0JyxcbiAgICAgICAgdGFibGU6IHRhYl90ZXh0XG4gICAgICB9O1xuICAgICAgc2F2ZShuZXcgQmxvYihbdGFiX3RleHRdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsXCIgfSksIHRoaXMuZXhjZWxOYW1lICsgXCIueGxzXCIpO1xuICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgICAgICAgIH0sNTAwKVxuICAgIH0sIDIwMClcblxuXG4gIH1cbiAgXG4gIGdldFR5cGUoeCl7XG4gICAgcmV0dXJuIHR5cGVvZiB4O1xuICB9XG5cbiAgY3JlYXRlUGRmKHRhcmdldCwgY29udGFpbmVySWQpIHtcbiAgICBsZXQgdGVtcEhlaWdodCA9ICQoXCJrZW5kby1wZGYtZXhwb3J0XCIpLmZpbmQoXCIjXCIgKyBjb250YWluZXJJZCkuY3NzKFwibWF4LWhlaWdodFwiKTtcbiAgICBsZXQgaXRlbXNQZXJQYWdlID0gdGhpcy5pdGVtc1BlclBhZ2U7XG4gICAgbGV0IHNvcnRpbmcgPSB0aGlzLnNvcnRpbmc7XG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSB0aGlzLnJvd0RhdGEubGVuZ3RoO1xuICAgIHRoaXMuc29ydGluZyA9IGZhbHNlO1xuICAgICQoXCJrZW5kby1wZGYtZXhwb3J0XCIpLmZpbmQoXCIjXCIgKyBjb250YWluZXJJZCkuc2Nyb2xsVG9wKDApXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKFwia2VuZG8tcGRmLWV4cG9ydFwiKS5maW5kKFwiI1wiICsgY29udGFpbmVySWQpLmNzcyhcIm1heC1oZWlnaHRcIiwgXCJub25lXCIpXG4gICAgICB0YXJnZXQuc2F2ZUFzKHRoaXMucGRmTmFtZSArIFwiLnBkZlwiKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gaXRlbXNQZXJQYWdlO1xuICAgICAgICB0aGlzLnNvcnRpbmcgPSBzb3J0aW5nO1xuICAgICAgICAkKFwia2VuZG8tcGRmLWV4cG9ydFwiKS5maW5kKFwiI1wiICsgY29udGFpbmVySWQpLmNzcyhcIm1heC1oZWlnaHRcIiwgdGVtcEhlaWdodClcbiAgICAgIH0sIDEwMDApO1xuICAgIH0sIDIwMClcbiAgfVxuXG4gIHB1YmxpYyBhY3Rpb25DbGlja2VkKGJ0bkNsYXNzLCByb3dPYmopOiB2b2lkIHtcbiAgICBsZXQgZW1pdHRlZERhdGE6IGFueSA9IHt0YXJnZXQ6IGJ0bkNsYXNzLCByb3dPYmo6IHJvd09ian07XG4gICAgdGhpcy5vbkFjdGlvbkJ1dHRvbkNsaWNrZWQuZW1pdChlbWl0dGVkRGF0YSk7XG4gIH1cblxuICBwdWJsaWMgZG93bmxvYWRQZGZCeVNlcnZlckNsaWNrZWQodGFibGVJZCwgdGFibGVEYXRhKTogdm9pZCB7XG4gICAgbGV0IGVtaXR0ZWREYXRhOiBhbnkgPSB7dGFibGU6IHRhYmxlSWQsIHRhYmxlRGF0YTogdGFibGVEYXRhfTtcbiAgICB0aGlzLm9uRG93bmxvYWRQZGZCeVNlcnZlckNsaWNrZWQuZW1pdChlbWl0dGVkRGF0YSk7XG4gIH1cbiAgcHVibGljIGRvd25sb2FkRXhjZWxCeVNlcnZlckNsaWNrZWQodGFibGVJZCwgdGFibGVEYXRhKTogdm9pZCB7XG4gICAgbGV0IGVtaXR0ZWREYXRhOiBhbnkgPSB7dGFibGU6IHRhYmxlSWQsIHRhYmxlRGF0YTogdGFibGVEYXRhfTtcbiAgICB0aGlzLm9uRG93bmxvYWRFeGNlbEJ5U2VydmVyQ2xpY2tlZC5lbWl0KGVtaXR0ZWREYXRhKTtcbiAgfVxufVxuIl19