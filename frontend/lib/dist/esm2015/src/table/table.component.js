/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import save from 'save-as';
export class TableComponent {
    constructor() {
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
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.rowData && !this.isPaginate)
            this.itemsPerPage = this.rowData.length;
        setTimeout(() => {
            if (this.headerFixed)
                this.setDuplicateFixedTable();
            if (this.maxTableHeight) {
                $('#table-fixed-container' + this.id).css("max-height", this.maxTableHeight);
            }
        });
    }
    /**
     * @param {?} link
     * @return {?}
     */
    appendHttp(link) {
        if (!link.startsWith('http')) {
            return 'http://' + link;
        }
        else {
            return link;
        }
    }
    /**
     * @param {?} property
     * @return {?}
     */
    sort(property) {
        this.isDesc = !this.isDesc; //change the direction
        this.columns = property;
        this.direction = this.isDesc ? 1 : -1;
    }
    ;
    /**
     * @return {?}
     */
    setDuplicateFixedTable() {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    fixTableHeader(event) {
        /** @type {?} */
        var offset = $(event.target).scrollTop();
        $("#header-fixed" + this.id).scrollLeft($(event.target).scrollLeft());
        if (offset >= this.fixTableConfig.headerHeight) {
            $("#header-fixed" + this.id).css("display", "block");
        }
        else if (offset < this.fixTableConfig.headerHeight) {
            $("#header-fixed" + this.id).hide();
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    tableToExcel(id) {
        /** @type {?} */
        let itemsPerPage = this.itemsPerPage;
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
        setTimeout(() => {
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
            let tab = document.getElementById(id); // id of table
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
            save(new Blob([tab_text], { type: "application/vnd.ms-excel" }), this.excelName + ".xls");
            setTimeout(() => {
                this.itemsPerPage = itemsPerPage;
            }, 500);
        }, 200);
    }
    /**
     * @param {?} x
     * @return {?}
     */
    getType(x) {
        return typeof x;
    }
    /**
     * @param {?} target
     * @param {?} containerId
     * @return {?}
     */
    createPdf(target, containerId) {
        /** @type {?} */
        let tempHeight = $("kendo-pdf-export").find("#" + containerId).css("max-height");
        /** @type {?} */
        let itemsPerPage = this.itemsPerPage;
        /** @type {?} */
        let sorting = this.sorting;
        this.itemsPerPage = this.rowData.length;
        this.sorting = false;
        $("kendo-pdf-export").find("#" + containerId).scrollTop(0);
        setTimeout(() => {
            $("kendo-pdf-export").find("#" + containerId).css("max-height", "none");
            target.saveAs(this.pdfName + ".pdf");
            setTimeout(() => {
                this.itemsPerPage = itemsPerPage;
                this.sorting = sorting;
                $("kendo-pdf-export").find("#" + containerId).css("max-height", tempHeight);
            }, 1000);
        }, 200);
    }
    /**
     * @param {?} btnClass
     * @param {?} rowObj
     * @return {?}
     */
    actionClicked(btnClass, rowObj) {
        /** @type {?} */
        let emittedData = { target: btnClass, rowObj: rowObj };
        this.onActionButtonClicked.emit(emittedData);
    }
    /**
     * @param {?} tableId
     * @param {?} tableData
     * @return {?}
     */
    downloadPdfByServerClicked(tableId, tableData) {
        /** @type {?} */
        let emittedData = { table: tableId, tableData: tableData };
        this.onDownloadPdfByServerClicked.emit(emittedData);
    }
    /**
     * @param {?} tableId
     * @param {?} tableData
     * @return {?}
     */
    downloadExcelByServerClicked(tableId, tableData) {
        /** @type {?} */
        let emittedData = { table: tableId, tableData: tableData };
        this.onDownloadExcelByServerClicked.emit(emittedData);
    }
}
TableComponent.decorators = [
    { type: Component, args: [{
                selector: 'sdrc-table',
                template: "\n    <div class=\"row\">           \n\n      <div class=\"col-md-12\">\n        <div class=\"text-right\" [hidden]=\"rowData && !rowData.length\">\n        <!-- <div class=\"col-md-3\">\n          <div class=\"form-group\">\n              <button class=\"btn btn-submit\" [disabled]=\"tableService.disableDeleteBtn\">Delete All</button>\n          </div>\n        </div> -->\n        <div *ngIf=\"searchBox\" class=\"table-btn search\">\n          <div class=\"form-group\">\n            <input class=\"form-control\" type=\"text\" id=\"myInput\" [(ngModel)]=\"searchFilter\" placeholder=\"..search\">\n          </div>\n      </div>\n        <div *ngIf=\"downloadPdf\" class=\"table-btn\">\n          <button class=\"btn btn-pdf btn-submit\" (click)=\"createPdf(pdf, 'table-fixed-container'+id)\"><span><i class=\"fa fa-download\" style=\"font-size:15px;\"\n                aria-hidden=\"true\"></i></span>&nbsp;download pdf</button>\n        </div>\n        <div *ngIf=\"downloadExcel\" class=\"table-btn\">\n          <button class=\"btn btn-excel btn-submit\" (click)=\"tableToExcel(id)\"><span><i class=\"fa fa-file-excel-o\"\n                style=\"font-size:15px;\" aria-hidden=\"true\"></i></span>&nbsp;download excel</button>\n        </div>\n        <div *ngIf=\"downloadPdfByServer\" class=\"table-btn\">\n          <button class=\"btn btn-pdf btn-submit\" (click)=\"downloadPdfByServerClicked(id, rowData)\"><span><i class=\"fa fa-download\" style=\"font-size:15px;\"\n                aria-hidden=\"true\"></i></span>&nbsp;download pdf</button>\n        </div>\n        <div *ngIf=\"downloadExcelByServer\" class=\"table-btn\">\n          <button class=\"btn btn-excel btn-submit\" (click)=\"downloadExcelByServerClicked(id, rowData)\"><span><i class=\"fa fa-file-excel-o\"\n                style=\"font-size:15px;\" aria-hidden=\"true\"></i></span>&nbsp;download excel</button>\n        </div>\n        \n      </div>\n    </div>\n\n    <div class=\"col-md-12\">\n    <div class=\"parent-tabl-container\">\n    <kendo-pdf-export #pdf paperSize=\"A2\" margin=\"2cm\" [repeatHeaders]=\"true\"  [scale]=\"0.6\">\n    <div class=\"filled-form view-form\" id=\"{{'table-fixed-container'+id}}\" (scroll)=\"fixTableHeader($event)\" style=\"overflow: auto;\">                 \n      \n      <!-- Header fixed table section -->\n      <table *ngIf=\"headerFixed\" id=\"{{'header-fixed'+id}}\" class=\"table table-striped table-bordered header-fixed\">\n            <thead>\n                <tr>\n                  <!-- <th><input type=\"checkbox\" [(ngModel)]=\"tableService.checkStatus\" (click)=\"tableService.selectAllCheckBoxes(rowData, !tableService.checkStatus)\">&nbsp; Select All </th> -->\n                  <th *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\">{{col}}\n                    <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                        'fa-sort-asc': (col == columns && !isDesc), \n                        'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                    </i>\n                  </th>\n                </tr>\n              </thead>\n              <tbody>\n                  <tr [ngClass]=\"rowDetails.cssClass ? rowDetails.cssClass:''\" *ngFor=\"let rowDetails of rowData | searchPipe: searchFilter | sortPipe: {property: columns, direction: direction} | paginate: { itemsPerPage: itemsPerPage, currentPage: p } let i = index;\">\n                    <!-- <td><input type=\"checkbox\" [(ngModel)]=\"rowDetails.isChecked\" (change)=\"tableService.singleCheckBoxClicked(tableService.rowData)\"></td> -->\n                    <td *ngFor=\"let col of columnData\">\n                      <div *ngIf=\"getType(rowDetails[col]) != 'object'\">{{rowDetails[col]}}</div>\n                      <div *ngIf=\"getType(rowDetails[col]) == 'object'\" style=\"display: inline-flex;\">\n                        <div *ngFor=\"let colDetails of rowDetails[col]\">\n                            <div [ngSwitch]=\"colDetails.controlType\" class=\"col-md-9 input-holder\">\n                              <button *ngSwitchCase=\"'button'\"  class=\"{{colDetails.class}}\" type=\"{{colDetails.type}}\" (click)=\"actionClicked(colDetails.class, rowDetails)\"><i *ngIf=\"colDetails.icon\" class=\"fa\" [ngClass]=\"colDetails.icon\"></i>{{colDetails.value}}</button>\n                                \n                                <input *ngSwitchCase=\"'textbox'\" name=\"{{colDetails.name}}\" [type]=\"colDetails.type\" [(ngModel)]=\"colDetails.value\" class=\"form-control\">\n    \n                                <!-- <input *ngSwitchCase=\"'checkbox'\" name=\"{{colDetails.name}}\" type=\"{{colDetails.type}}\">                                    -->\n                            </div>\n                        </div>\n                      </div>\n                    </td>\n                  </tr>   \n                </tbody>\n         </table>\n        \n\n         <!-- main table -->\n          <table class=\"table table-striped table-bordered\" id=\"{{id}}\">\n            <thead>\n              <tr>\n                <!-- <th><input type=\"checkbox\" [(ngModel)]=\"tableService.checkStatus\" (click)=\"tableService.selectAllCheckBoxes(rowData, !tableService.checkStatus)\">&nbsp; Select All </th> -->\n                <th *ngFor=\"let col of columnData\" [ngClass]=\"{selected: col == columns}\">{{col}}\n                  <i *ngIf=\"sorting && (!sortExcludeColumn || (sortExcludeColumn && sortExcludeColumn.indexOf(col) == -1))\" (click)=\"sort(col)\" class=\"fa fa-caret-up fa-lg fa-sorting\" [ngClass]=\"{\n                      'fa-sort-asc': (col == columns && !isDesc), \n                      'fa-sort-desc': (col == columns && isDesc) }\" aria-hidden=\"true\">\n                  </i>\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let rowDetails of rowData | searchPipe: searchFilter | sortPipe: {property: columns, direction: direction} | paginate: { itemsPerPage: itemsPerPage, currentPage: p, id:id } let i = index;\">\n                <!-- <td><input type=\"checkbox\" [(ngModel)]=\"rowDetails.isChecked\" (change)=\"tableService.singleCheckBoxClicked(tableService.rowData)\"></td> -->\n                <td *ngFor=\"let col of columnData\">\n                  <div *ngIf=\"getType(rowDetails[col]) != 'object'\">{{rowDetails[col]}}</div>\n                  <div *ngIf=\"getType(rowDetails[col]) == 'object'\" style=\"display: inline-flex;\">\n                    <div *ngFor=\"let colDetails of rowDetails[col]\">\n                        <div [ngSwitch]=\"colDetails.controlType\" class=\"col-md-9 input-holder\">\n                          <button *ngSwitchCase=\"'button'\"  class=\"{{colDetails.class}}\" type=\"{{colDetails.type}}\" (click)=\"actionClicked(colDetails.class, rowDetails)\"><i *ngIf=\"colDetails.icon\" class=\"fa\" [ngClass]=\"colDetails.icon\"></i>{{colDetails.value}}</button>\n                            \n                            <input *ngSwitchCase=\"'textbox'\" name=\"{{colDetails.name}}\" [type]=\"colDetails.type\" [(ngModel)]=\"colDetails.value\" class=\"form-control\">\n\n                            <!-- <input *ngSwitchCase=\"'checkbox'\" name=\"{{colDetails.name}}\" type=\"{{colDetails.type}}\">                                    -->\n                        </div>\n                    </div>\n                  </div>\n                </td>\n              </tr>   \n            </tbody>\n          </table>   \n        \n        </div>\n        </kendo-pdf-export>\n        <br/>\n        <div  *ngIf=\"(rowData && !rowData.length) || (rowData && rowData.length && (rowData | searchPipe: searchFilter).length==0)\" class=\"col-md-12 text-center search-area\">No Data Found.</div>\n        <div *ngIf=\"isPaginate && rowData && rowData.length\">\n          <pagination-controls (pageChange)=\"p = $event;\" id=\"{{id}}\" class=\"pagination-view\"></pagination-controls>\n        </div>\n      </div>\n     </div>\n    </div>\n",
                styles: [".header-fixed{position:absolute;display:none;z-index:1;overflow:hidden;margin-right:15px}.parent-tabl-container{position:relative}table thead{background-color:#187080;color:#fff}td{text-align:center}table thead th{vertical-align:middle;text-align:center}.pagination-view{float:right}#myInput{width:100%;border-radius:0;font-size:16px;padding:7px 20px 12px 30px;font-style:inherit;border:1px solid #ddd;margin-bottom:12px;box-shadow:0 0 2px 0}.table-btn.search .form-group{position:relative}.table-btn.search .form-group:before{position:absolute;font-family:FontAwesome;top:5px;left:7px;color:#9c9c9c;content:\"\\f002\"}.search-area{font-style:italic;margin-top:30px;margin-bottom:30px;font-size:30px}input[type=text]{font-style:italic}.table-btn .btn-excel,.table-btn .btn-pdf{margin-bottom:16px;background-color:#357080;color:#fff;border-radius:0}.btn-excel:active,.btn-excel:focus{outline:0!important;border:none!important}.fa-sorting{cursor:pointer}.table-btn{display:inline-block;float:right;margin:0 5px}"]
            }] }
];
/** @nocollapse */
TableComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2RyYy10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUYsT0FBTyxJQUFJLE1BQU0sU0FBUyxDQUFDO0FBUTNCLE1BQU07SUEyQ0o7OEJBeENzQixFQUFFOzJCQUNELEtBQUs7Z0NBQ0EsSUFBSTtpQkFHcEIsQ0FBQzs7MEJBYWtCLEtBQUs7OzJCQUlKLEtBQUs7O3lCQUdQLEtBQUs7OzJCQUdILEtBQUs7NkJBRUgsS0FBSzs7bUNBSUEsS0FBSztxQ0FDSCxLQUFLO3FDQUVPLElBQUksWUFBWSxFQUFPOzRDQUNoQixJQUFJLFlBQVksRUFBTzs4Q0FDckIsSUFBSSxZQUFZLEVBQU87S0FFcEY7Ozs7SUFFRCxRQUFRLE1BQU07Ozs7SUFFZCxXQUFXO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7YUFDN0U7U0FDRixDQUFDLENBQUE7S0FFSDs7Ozs7SUFFRCxV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OztJQUVNLGFBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTTs7UUFDbkMsSUFBSSxXQUFXLEdBQVEsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7O0lBR3hDLDBCQUEwQixDQUFDLE9BQU8sRUFBRSxTQUFTOztRQUNsRCxJQUFJLFdBQVcsR0FBUSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDO1FBQzlELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7SUFFL0MsNEJBQTRCLENBQUMsT0FBTyxFQUFFLFNBQVM7O1FBQ3BELElBQUksV0FBVyxHQUFRLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7OztZQTNNekQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QiwwZ1FBQXFDOzthQUV0Qzs7Ozs7aUJBV0UsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSztzQkFJTCxLQUFLO2dDQUNMLEtBQUs7eUJBR0wsS0FBSzsyQkFDTCxLQUFLOzBCQUdMLEtBQUs7d0JBR0wsS0FBSzswQkFHTCxLQUFLO3NCQUNMLEtBQUs7NEJBQ0wsS0FBSzt3QkFDTCxLQUFLO2tDQUdMLEtBQUs7b0NBQ0wsS0FBSztvQ0FFTCxNQUFNOzJDQUNOLE1BQU07NkNBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGVQaXBlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWRyYXdpbmcvcGRmJztcbmltcG9ydCBzYXZlIGZyb20gJ3NhdmUtYXMnO1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZHJjLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgaXNEZXNjOiBhbnk7XG4gIGRpcmVjdGlvbjogbnVtYmVyO1xuICBmaXhUYWJsZUNvbmZpZzogYW55ID0ge307XG4gIGNoZWNrU3RhdHVzOiBib29sZWFuID0gZmFsc2U7XG4gIGRpc2FibGVEZWxldGVCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBjb2x1bW5zOiBhbnk7XG5cbiAgcDogbnVtYmVyID0gMTtcbiAgc2VhcmNoRmlsdGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJvd0RhdGE6IGFueVtdO1xuICBASW5wdXQoKSBjb2x1bW5EYXRhOiBhbnlbXTtcbiAgQElucHV0KCkgbWF4VGFibGVIZWlnaHQ6IHN0cmluZztcblxuXG4gIC8va2V5cyBmb3Igc29ydGluZyBhbmQgZXhjbHVkZSBzb3J0aW5nIGNvbHVtbiBmcm9tIHRhYmxlLXNvcnRpbmcuZGlyZWN0aXZlXG4gIEBJbnB1dCgpIHNvcnRpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNvcnRFeGNsdWRlQ29sdW1uOiBzdHJpbmdbXTtcblxuICAvL2tleXMgZm9yIHBhZ2luYXRlIGFuZCBpdGVtc1BlcnBhZ2UgZnJvbSB0YWJsZS1wYWdpbmF0ZS5kaXJlY3RpdmVcbiAgQElucHV0KCkgaXNQYWdpbmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBpdGVtc1BlclBhZ2U6IG51bWJlcjtcblxuICAvL2lzSGVhZGVyRml4ZWQgZnJvbSB0YWJsZS1oZWFkZXJmaXguZGlyZWN0aXZlXG4gIEBJbnB1dCgpIGhlYWRlckZpeGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy9zZWFyY2hCb3ggZnJvbSB0YWJsZS1zZWFyY2hCb3guZGlyZWN0aXZlLnRzXG4gIEBJbnB1dCgpIHNlYXJjaEJveDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vZG93bmxvYWQgUGRmIGFuZCBFeGNlbCB0YWJsZS1kb3dubG9hZFBkZi5kaXJlY3RpdmUgYW5kIHRhYmxlLWRvd25sb2FkRXhjZWwuZGlyZWN0aXZlXG4gIEBJbnB1dCgpIGRvd25sb2FkUGRmOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBkZk5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgZG93bmxvYWRFeGNlbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBleGNlbE5hbWU6IHN0cmluZztcblxuICAvL2Rvd25sb2FkIHBkZiBhbmQgZXhjZWwgYnkgc2VydmVyIHNpZGVcbiAgQElucHV0KCkgZG93bmxvYWRQZGZCeVNlcnZlcjpib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRvd25sb2FkRXhjZWxCeVNlcnZlcjpib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIG9uQWN0aW9uQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG9uRG93bmxvYWRQZGZCeVNlcnZlckNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvbkRvd25sb2FkRXhjZWxCeVNlcnZlckNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5yb3dEYXRhICYmICF0aGlzLmlzUGFnaW5hdGUpXG4gICAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IHRoaXMucm93RGF0YS5sZW5ndGg7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5oZWFkZXJGaXhlZClcbiAgICAgICAgdGhpcy5zZXREdXBsaWNhdGVGaXhlZFRhYmxlKCk7XG4gICAgICBpZiAodGhpcy5tYXhUYWJsZUhlaWdodCkge1xuICAgICAgICAkKCcjdGFibGUtZml4ZWQtY29udGFpbmVyJyArIHRoaXMuaWQpLmNzcyhcIm1heC1oZWlnaHRcIiwgdGhpcy5tYXhUYWJsZUhlaWdodClcbiAgICAgIH1cbiAgICB9KVxuXG4gIH1cblxuICBhcHBlbmRIdHRwKGxpbms6IHN0cmluZykge1xuICAgIGlmICghbGluay5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICAgIHJldHVybiAnaHR0cDovLycgKyBsaW5rO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBsaW5rO1xuICAgIH1cbiAgfVxuICBzb3J0KHByb3BlcnR5KSB7XG4gICAgdGhpcy5pc0Rlc2MgPSAhdGhpcy5pc0Rlc2M7IC8vY2hhbmdlIHRoZSBkaXJlY3Rpb24gICAgXG4gICAgdGhpcy5jb2x1bW5zID0gcHJvcGVydHk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmlzRGVzYyA/IDEgOiAtMTtcbiAgfTtcblxuXG5cblxuICBzZXREdXBsaWNhdGVGaXhlZFRhYmxlKCkge1xuICAgIC8vICQoXCIjaGVhZGVyLWZpeGVkXCIpLmh0bWwoXCJcIik7XG4gICAgdGhpcy5maXhUYWJsZUNvbmZpZy5oZWFkZXJIZWlnaHQgPSAkKFwiI1wiICsgdGhpcy5pZCArIFwiID4gdGhlYWRcIikuaGVpZ2h0KCk7XG4gICAgdGhpcy5maXhUYWJsZUNvbmZpZy53aWR0aCA9ICQoJyMnICsgdGhpcy5pZCkuY2xvc2VzdChcIi5wYXJlbnQtdGFibC1jb250YWluZXJcIikud2lkdGgoKTtcbiAgICAvLyB0aGlzLmZpeFRhYmxlQ29uZmlnLmhlYWRlciA9ICQoXCIjb3JnLWZ1bGwtZGF0YSA+IHRoZWFkXCIpLmNsb25lKCk7XG4gICAgLy8gdGhpcy5maXhUYWJsZUNvbmZpZy5ib2R5ID0gJChcIiNvcmctZnVsbC1kYXRhID4gdGJvZHlcIikuY2xvbmUoKTtcbiAgICAvLyB0aGlzLmZpeFRhYmxlQ29uZmlnLmZpeGVkSGVhZGVyID0gJChcIiNoZWFkZXItZml4ZWRcIikuYXBwZW5kKHRoaXMuZml4VGFibGVDb25maWcuaGVhZGVyKTtcbiAgICAvLyB0aGlzLmZpeFRhYmxlQ29uZmlnLnRhYmxlID0gJChcIiNoZWFkZXItZml4ZWRcIikuYXBwZW5kKHRoaXMuZml4VGFibGVDb25maWcuYm9keSk7XG4gICAgJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLmhlaWdodCh0aGlzLmZpeFRhYmxlQ29uZmlnLmhlYWRlckhlaWdodClcbiAgICAkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkud2lkdGgodGhpcy5maXhUYWJsZUNvbmZpZy53aWR0aCAtIDE2KVxuICAgIGlmKCQoXCIjXCIrdGhpcy5pZCkucGFyZW50KClbMF0uc2Nyb2xsV2lkdGggPT0gJChcIiNcIit0aGlzLmlkKS5wYXJlbnQoKVswXS5jbGllbnRXaWR0aCl7XG4gICAgICAkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkuZmluZChcInRoXCIpLndpZHRoKCQoXCIjaGVhZGVyLWZpeGVkXCIgKyB0aGlzLmlkKS5maW5kKFwidGhcIikud2lkdGgoKSArICgoJChcIiNoZWFkZXItZml4ZWRcIiArIHRoaXMuaWQpLndpZHRoKCkgLSAkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkuZmluZChcInRoZWFkXCIpLndpZHRoKCkpLyQoXCIjaGVhZGVyLWZpeGVkdGFiMSB0aFwiKS5sZW5ndGgpKVxuICAgIH1cbiAgfVxuXG4gIGZpeFRhYmxlSGVhZGVyKGV2ZW50KSB7XG4gICAgdmFyIG9mZnNldCA9ICQoZXZlbnQudGFyZ2V0KS5zY3JvbGxUb3AoKTtcbiAgICAkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkuc2Nyb2xsTGVmdCgkKGV2ZW50LnRhcmdldCkuc2Nyb2xsTGVmdCgpKVxuICAgIGlmIChvZmZzZXQgPj0gdGhpcy5maXhUYWJsZUNvbmZpZy5oZWFkZXJIZWlnaHQpIHtcbiAgICAgICQoXCIjaGVhZGVyLWZpeGVkXCIgKyB0aGlzLmlkKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9mZnNldCA8IHRoaXMuZml4VGFibGVDb25maWcuaGVhZGVySGVpZ2h0KSB7XG4gICAgICAkKFwiI2hlYWRlci1maXhlZFwiICsgdGhpcy5pZCkuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRhYmxlVG9FeGNlbChpZCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRhYmxlKTtcbiAgICBsZXQgaXRlbXNQZXJQYWdlID0gdGhpcy5pdGVtc1BlclBhZ2U7XG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSB0aGlzLnJvd0RhdGEubGVuZ3RoO1xuICAgIC8vIHNldFRpbWVvdXQoKCk9PntcbiAgICAvLyAgIGxldCB1cmkgPSAnZGF0YTphcHBsaWNhdGlvbi92bmQubXMtZXhjZWw7YmFzZTY0LCdcbiAgICAvLyAgICAgLCB0ZW1wbGF0ZSA9ICc8aHRtbCB4bWxuczpvPVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6b2ZmaWNlXCIgeG1sbnM6eD1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206b2ZmaWNlOmV4Y2VsXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMtaHRtbDQwXCI+PGhlYWQ+PCEtLVtpZiBndGUgbXNvIDldPjx4bWw+PHg6RXhjZWxXb3JrYm9vaz48eDpFeGNlbFdvcmtzaGVldHM+PHg6RXhjZWxXb3Jrc2hlZXQ+PHg6TmFtZT57d29ya3NoZWV0fTwveDpOYW1lPjx4OldvcmtzaGVldE9wdGlvbnM+PHg6RGlzcGxheUdyaWRsaW5lcy8+PC94OldvcmtzaGVldE9wdGlvbnM+PC94OkV4Y2VsV29ya3NoZWV0PjwveDpFeGNlbFdvcmtzaGVldHM+PC94OkV4Y2VsV29ya2Jvb2s+PC94bWw+PCFbZW5kaWZdLS0+PG1ldGEgaHR0cC1lcXVpdj1cImNvbnRlbnQtdHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L3BsYWluOyBjaGFyc2V0PVVURi04XCIvPjwvaGVhZD48Ym9keT48dGFibGU+e3RhYmxlfTwvdGFibGU+PC9ib2R5PjwvaHRtbD4nXG4gICAgLy8gICAgICwgYmFzZTY0ID0gZnVuY3Rpb24ocykgeyByZXR1cm4gd2luZG93LmJ0b2EoZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZVVSSUNvbXBvbmVudChzKSkpIH1cbiAgICAvLyAgICAgLCBmb3JtYXQgPSBmdW5jdGlvbihzLGMpIHsgcmV0dXJuIHMucmVwbGFjZSgveyhcXHcrKX0vZywgZnVuY3Rpb24obSwgcCkgeyByZXR1cm4gY1twXTsgfSkgfVxuICAgIC8vICAgaWYgKCF0YWJsZS5ub2RlVHlwZSkgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJsZSlcbiAgICAvLyAgICB2YXIgY3R4ID0ge3dvcmtzaGVldDogbmFtZSB8fCAnV29ya3NoZWV0JywgdGFibGU6IHRhYmxlLmlubmVySFRNTH1cbiAgICAvLyAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVyaSArIGJhc2U2NChmb3JtYXQodGVtcGxhdGUsIGN0eCkpXG4gICAgLy8gICAgc2V0VGltZW91dCgoKT0+e1xuICAgIC8vICAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IGl0ZW1zUGVyUGFnZTtcbiAgICAvLyAgICB9LDEwMDApXG4gICAgLy8gfSwgMjAwKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdmFyIGh0bWxzID0gXCJcIjtcbiAgICAgIHZhciB1cmkgPSAnZGF0YTphcHBsaWNhdGlvbi92bmQubXMtZXhjZWw7YmFzZTY0LCc7XG4gICAgICB2YXIgdGVtcGxhdGUgPSAnPGh0bWwgeG1sbnM6bz1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206b2ZmaWNlOm9mZmljZVwiIHhtbG5zOng9XCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOm9mZmljZTpleGNlbFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLWh0bWw0MFwiPjxoZWFkPjwhLS1baWYgZ3RlIG1zbyA5XT48eG1sPjx4OkV4Y2VsV29ya2Jvb2s+PHg6RXhjZWxXb3Jrc2hlZXRzPjx4OkV4Y2VsV29ya3NoZWV0Pjx4Ok5hbWU+e3dvcmtzaGVldH08L3g6TmFtZT48eDpXb3Jrc2hlZXRPcHRpb25zPjx4OkRpc3BsYXlHcmlkbGluZXMvPjwveDpXb3Jrc2hlZXRPcHRpb25zPjwveDpFeGNlbFdvcmtzaGVldD48L3g6RXhjZWxXb3Jrc2hlZXRzPjwveDpFeGNlbFdvcmtib29rPjwveG1sPjwhW2VuZGlmXS0tPjwvaGVhZD48Ym9keT48dGFibGU+e3RhYmxlfTwvdGFibGU+PC9ib2R5PjwvaHRtbD4nO1xuICAgICAgdmFyIGJhc2U2NCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQocykpKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBmb3JtYXQgPSBmdW5jdGlvbiAocywgYykge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC97KFxcdyspfS9nLCBmdW5jdGlvbiAobSwgcCkge1xuICAgICAgICAgIHJldHVybiBjW3BdO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciB0YWJfdGV4dCA9IFwiPHRhYmxlIGJvcmRlcj0nMnB4Jz5cIjtcbiAgICAgIHZhciB0ZXh0UmFuZ2U7IHZhciBqID0gMDtcbiAgICAgIGxldCB0YWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7IC8vIGlkIG9mIHRhYmxlXG5cbiAgICAgIGZvciAoaiA9IDA7IGogPCB0YWJbJ3Jvd3MnXS5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoaiA9PSAwKVxuICAgICAgICAgIHRhYl90ZXh0ID0gdGFiX3RleHQgKyBcIjx0ciBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjogIzAwODM3RjsgY29sb3I6ICNGRkY7IGZvbnQtd2VpZ2h0OiBib2xkJyB2YWxpZ249J3RvcCc+XCIgKyB0YWJbJ3Jvd3MnXVtqXS5pbm5lckhUTUwgKyBcIjwvdHI+XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0YWJfdGV4dCA9IHRhYl90ZXh0ICsgXCI8dHIgdmFsaWduPSd0b3AnPlwiICsgdGFiWydyb3dzJ11bal0uaW5uZXJIVE1MICsgXCI8L3RyPlwiO1xuICAgICAgICAvL3RhYl90ZXh0PXRhYl90ZXh0K1wiPC90cj5cIjtcbiAgICAgIH1cblxuICAgICAgdGFiX3RleHQgPSB0YWJfdGV4dCArIFwiPC90YWJsZT5cIjtcbiAgICAgIHRhYl90ZXh0ID0gdGFiX3RleHQucmVwbGFjZSgvPEFbXj5dKj58PFxcL0E+L2csIFwiXCIpOy8vcmVtb3ZlIGlmIHUgd2FudCBsaW5rcyBpbiB5b3VyIHRhYmxlXG4gICAgICB0YWJfdGV4dCA9IHRhYl90ZXh0LnJlcGxhY2UoLzxpbWdbXj5dKj4vZ2ksIFwiXCIpOyAvLyByZW1vdmUgaWYgdSB3YW50IGltYWdlcyBpbiB5b3VyIHRhYmxlXG4gICAgICB0YWJfdGV4dCA9IHRhYl90ZXh0LnJlcGxhY2UoLzxpbnB1dFtePl0qPnw8XFwvaW5wdXQ+L2dpLCBcIlwiKTsgLy8gcmVvbXZlcyBpbnB1dCBwYXJhbXNcblxuXG4gICAgICB2YXIgY3R4ID0ge1xuICAgICAgICB3b3Jrc2hlZXQ6ICdXb3Jrc2hlZXQnLFxuICAgICAgICB0YWJsZTogdGFiX3RleHRcbiAgICAgIH07XG4gICAgICBzYXZlKG5ldyBCbG9iKFt0YWJfdGV4dF0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi92bmQubXMtZXhjZWxcIiB9KSwgdGhpcy5leGNlbE5hbWUgKyBcIi54bHNcIik7XG4gICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IGl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgfSw1MDApXG4gICAgfSwgMjAwKVxuXG5cbiAgfVxuICBcbiAgZ2V0VHlwZSh4KXtcbiAgICByZXR1cm4gdHlwZW9mIHg7XG4gIH1cblxuICBjcmVhdGVQZGYodGFyZ2V0LCBjb250YWluZXJJZCkge1xuICAgIGxldCB0ZW1wSGVpZ2h0ID0gJChcImtlbmRvLXBkZi1leHBvcnRcIikuZmluZChcIiNcIiArIGNvbnRhaW5lcklkKS5jc3MoXCJtYXgtaGVpZ2h0XCIpO1xuICAgIGxldCBpdGVtc1BlclBhZ2UgPSB0aGlzLml0ZW1zUGVyUGFnZTtcbiAgICBsZXQgc29ydGluZyA9IHRoaXMuc29ydGluZztcbiAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IHRoaXMucm93RGF0YS5sZW5ndGg7XG4gICAgdGhpcy5zb3J0aW5nID0gZmFsc2U7XG4gICAgJChcImtlbmRvLXBkZi1leHBvcnRcIikuZmluZChcIiNcIiArIGNvbnRhaW5lcklkKS5zY3JvbGxUb3AoMClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICQoXCJrZW5kby1wZGYtZXhwb3J0XCIpLmZpbmQoXCIjXCIgKyBjb250YWluZXJJZCkuY3NzKFwibWF4LWhlaWdodFwiLCBcIm5vbmVcIilcbiAgICAgIHRhcmdldC5zYXZlQXModGhpcy5wZGZOYW1lICsgXCIucGRmXCIpXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgICAgIHRoaXMuc29ydGluZyA9IHNvcnRpbmc7XG4gICAgICAgICQoXCJrZW5kby1wZGYtZXhwb3J0XCIpLmZpbmQoXCIjXCIgKyBjb250YWluZXJJZCkuY3NzKFwibWF4LWhlaWdodFwiLCB0ZW1wSGVpZ2h0KVxuICAgICAgfSwgMTAwMCk7XG4gICAgfSwgMjAwKVxuICB9XG5cbiAgcHVibGljIGFjdGlvbkNsaWNrZWQoYnRuQ2xhc3MsIHJvd09iaik6IHZvaWQge1xuICAgIGxldCBlbWl0dGVkRGF0YTogYW55ID0ge3RhcmdldDogYnRuQ2xhc3MsIHJvd09iajogcm93T2JqfTtcbiAgICB0aGlzLm9uQWN0aW9uQnV0dG9uQ2xpY2tlZC5lbWl0KGVtaXR0ZWREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBkb3dubG9hZFBkZkJ5U2VydmVyQ2xpY2tlZCh0YWJsZUlkLCB0YWJsZURhdGEpOiB2b2lkIHtcbiAgICBsZXQgZW1pdHRlZERhdGE6IGFueSA9IHt0YWJsZTogdGFibGVJZCwgdGFibGVEYXRhOiB0YWJsZURhdGF9O1xuICAgIHRoaXMub25Eb3dubG9hZFBkZkJ5U2VydmVyQ2xpY2tlZC5lbWl0KGVtaXR0ZWREYXRhKTtcbiAgfVxuICBwdWJsaWMgZG93bmxvYWRFeGNlbEJ5U2VydmVyQ2xpY2tlZCh0YWJsZUlkLCB0YWJsZURhdGEpOiB2b2lkIHtcbiAgICBsZXQgZW1pdHRlZERhdGE6IGFueSA9IHt0YWJsZTogdGFibGVJZCwgdGFibGVEYXRhOiB0YWJsZURhdGF9O1xuICAgIHRoaXMub25Eb3dubG9hZEV4Y2VsQnlTZXJ2ZXJDbGlja2VkLmVtaXQoZW1pdHRlZERhdGEpO1xuICB9XG59XG4iXX0=