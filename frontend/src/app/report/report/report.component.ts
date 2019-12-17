import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../../app.service';
import { Cookie } from 'ng2-cookies';
import { RemoveArrayPipe } from '../filters/remove-array.pipe';
declare var $:any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  selectedReportTypeId: number;

  tableData: any[];
  tableColumns: string[];
  areaDetails:any;
  tableColumnIndex: any[];

  selectedStateId: number;
  selectedDistrictId: number;
  selectedBlockId: number;

  submittedDistrict: any;
  submittedBlock: any;
  submittedReportType: any;
  submittedSbmAreaId: number;
  selectedFrequencyTypeId: number;
  excelName: string;
  excelHeadings: any[];
  reportService: ReportService;
  designationIds:number;
  areaLevel: number;
  filterColumn: any;
  filteredTableData: boolean = false;

  constructor(private reportProvider: ReportService, private spinner: NgxSpinnerService, private app: AppService) { 
    this.reportService = reportProvider;
  }

  ngOnInit() {
    var token = JSON.parse(Cookie.get('user_details'));
    this.designationIds = token.designationIds[0];
    this.getReportTypes()
    this.getAllArea();
  }
  getReportTypes(){  
    if(!this.reportService.allTypes){
    this.reportService.getTypes().subscribe(data=>{
      this.reportService.allTypes = data; 
      if(!this.reportService.reportTypes){
        this.reportService.getTypeDetails().subscribe(data=>{
          this.reportService.reportTypes = data;           
        });            
      }
    });
   }
 }
 getAllArea(){
    this.spinner.show()
    this.reportService.getAreaDetails().subscribe(res => {
      this.spinner.hide();
      this.areaDetails = res;
      if(this.areaDetails['District'] && this.areaDetails['District'].length == 1){
        this.selectedDistrictId = this.areaDetails['District'][0].sbmAreaId;
      }
      if(this.areaDetails['Block'] && this.areaDetails['Block'].length == 1){
        this.selectedBlockId = this.areaDetails['Block'][0].sbmAreaId;
      }
    })
  }

  getElementBySbmId(areaDetails, sbmAreaId){
    let areaJson;
    for (let i = 0; i < Object.keys(areaDetails).length; i++) {
      const key = Object.keys(areaDetails)[i];
      areaDetails[key].forEach(element => {
        if(element.sbmAreaId == sbmAreaId){
          areaJson = element;
        }
      });
    }
    return areaJson;
  }

  getTable(reportTypeId){
    
    console.log(reportTypeId);
    let sbmAreaId;
    if(reportTypeId==4){
      this.filterColumn = "Coverage%";
    }
    if(reportTypeId==7){
      this.filterColumn = "Declaration%";
    }
    if(reportTypeId==8){
      this.filterColumn = "Verification%";
    }  
    if(reportTypeId==9){
      this.filterColumn = "Current Week Coverage Percent";
    }
    if(reportTypeId==14){
      
      if(this.selectedBlockId === undefined)
      {
        this.selectedBlockId = 0;
      }
      
      this.reportService.getExcelFile(this.selectedBlockId,this.selectedDistrictId);
    }
    if((this.selectedBlockId && this.selectedBlockId != -2)&& (this.selectedBlockId && this.selectedBlockId != -3)){
      sbmAreaId = this.selectedBlockId;
      this.submittedBlock = this.getElementBySbmId(this.areaDetails, this.selectedBlockId)
      this.submittedDistrict = this.getElementBySbmId(this.areaDetails, this.selectedDistrictId)
      this.submittedReportType = this.getReportTypeByTypeId(this.reportService.reportTypes,this.selectedReportTypeId)
      this.areaLevel = null;
    }
    else if(this.selectedBlockId == -2){
      sbmAreaId = this.selectedDistrictId;
      this.submittedBlock = undefined
      this.submittedDistrict = this.getElementBySbmId(this.areaDetails, this.selectedDistrictId)
      this.submittedReportType = this.getReportTypeByTypeId(this.reportService.reportTypes,this.selectedReportTypeId)
      this.areaLevel = null;
    }
    else if(this.selectedBlockId == -3){
      sbmAreaId = this.selectedDistrictId;
      this.submittedBlock = undefined
      this.submittedDistrict = this.getElementBySbmId(this.areaDetails, this.selectedDistrictId)
      this.submittedReportType = this.getReportTypeByTypeId(this.reportService.reportTypes,this.selectedReportTypeId)
      this.areaLevel = 5;
    }
    else if(this.selectedDistrictId == -2){
      this.submittedBlock = undefined;
      this.submittedDistrict = undefined;
      this.submittedReportType = this.getReportTypeByTypeId(this.reportService.reportTypes,this.selectedReportTypeId)
      sbmAreaId = 18;
      this.areaLevel = null;
    }
    else if(this.selectedDistrictId == -3){
      this.submittedBlock = undefined;
      this.submittedDistrict = undefined;
      this.submittedReportType =this.getReportTypeByTypeId(this.reportService.reportTypes,this.selectedReportTypeId)
      sbmAreaId = 4;
      this.areaLevel = null;
    }
    else if(this.selectedDistrictId == -4){
      this.submittedBlock = undefined;
      this.submittedDistrict = undefined;
      this.submittedReportType = this.getReportTypeByTypeId(this.reportService.reportTypes,this.selectedReportTypeId)
      sbmAreaId = 5;
      this.areaLevel = null;
    }
    else if(reportTypeId ==13){
      this.submittedBlock = undefined;
      this.submittedDistrict = undefined;
      this.submittedReportType = this.getReportTypeByTypeId(this.reportService.reportTypes,this.selectedReportTypeId)
      sbmAreaId = 18;
      this.areaLevel = null;
    }
    else{
      sbmAreaId = 2;
      this.areaLevel = null;
    }
    this.submittedSbmAreaId = parseInt(sbmAreaId);
    this.excelName = (this.submittedBlock?this.submittedBlock.areaName: this.submittedDistrict? this.submittedDistrict.areaName: "Odisha") + "_" +new Date().getDate()+''+ (new Date().getMonth()+1)+new Date().getFullYear()+new Date().getTime();
    this.excelHeadings = [{"Report Type" : this.submittedReportType.typeDetailName}];
    if(this.submittedDistrict){
      this.excelHeadings.push({District: this.submittedDistrict.areaName})
    }
    else{
      this.excelHeadings.push({State: "Odisha"})
    }
    if(this.submittedBlock){
      this.excelHeadings.push({Block: this.submittedBlock.areaName})
    }
    this.spinner.show();
    this.reportService.getTableData(reportTypeId, this.submittedSbmAreaId,this.areaLevel).subscribe(res => {
      this.spinner.hide();
      let tempTableData = <any[]> res; 
      if(tempTableData == null)   
      this.filteredTableData = true;
      if(tempTableData && tempTableData.length){     
      this.tableData = tempTableData;
      //this.tableColumns = Object.keys(this.tableData[0]);
      this.tableColumns = new RemoveArrayPipe().transform(Object.keys(this.tableData[0]),'CssClass');
      let tempColumnIndex = [];
      for (let index = 1; index <= this.tableColumns.length; index++) {
        if(this.tableColumns[index]!='CssClass'){
          tempColumnIndex.push({'value':index+''})   
        }          
      }
      this.tableColumnIndex =tempColumnIndex;
      this.reportService.firstFilterRange= null;
      this.reportService.secondFilterRange= null;    
      this.filteredTableData = false;
    }   
    })      
  }

  getReportTypeByTypeId(allReportTypes,typeId){
    for (let i = 0; i < allReportTypes.length; i++) {
      const el = allReportTypes[i];
      if (el.typeDetailId==typeId) {
        return el;
      }
    }
  }
  downloadDailyTracker(){
    
    this.reportService.getDailyTracker();
  }
  downloadTableAsPdf(data){  
    this.reportService.downloadPdf(this.submittedReportType.typeDetailId, this.submittedSbmAreaId, this.areaLevel, this.reportService.firstFilterRange, this.reportService.secondFilterRange)
  }  
  downloadConsolidatedAsPdf(data){  
    this.reportService.downloadConsolidatedPdf(this.selectedFrequencyTypeId, this.submittedSbmAreaId, this.areaLevel)
  }     
}
