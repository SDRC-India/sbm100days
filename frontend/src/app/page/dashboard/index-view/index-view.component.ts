import { Component, OnInit, ViewChildren } from '@angular/core';
import { ThematicModel } from '../../../interface/thematic.model';
import { DashboardService } from '../services/dashboard.service';
import * as d3 from 'd3v4';
import * as topojson from 'topojson';
import { ThematicTimeperiodModel } from '../models/thematic-timeperiod-model';
import { ThematicSectorModel } from '../models/thematic-sector-model';
import { ThematicSubSectorModel } from '../models/thematic-sub-sector-model';
import { ThematicIndicatorModel } from '../models/thematic-indicator-model';
import { TooltipDirective } from 'ng2-tooltip-directive';
declare var $:any;

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: ['./index-view.component.scss']
})
export class IndexViewComponent implements OnInit {

  thematicData: any;
  legends: ThematicModel;
  mapData:any
  thematicDropdownDataFetched:boolean = false;
  @ViewChildren(TooltipDirective) tooltipDirective;
  someTooltip:any;
  
  dashboardService:DashboardService;
  constructor(private dashboardServiceProvider: DashboardService) {
    this.dashboardService = dashboardServiceProvider;
    
   }
   

  ngOnInit() {
    this.getThematicDropdowns();
    this.dashboardService.getAllStates().subscribe(res => {
      this.dashboardService.allStates = res;
    })
  }
  ngAfterViewChecked(){
    $('[data-toggle="tooltip"]').tooltip({'title': this.dashboardService.selectedSector.sectorName}); 
  }
  ngAfterViewInit() {
    this.someTooltip = this.tooltipDirective.find(elem => elem.id === "someTooltip");
  }
  selectDropdown(selectedOption, service, model){
    service[model] = selectedOption;
  }
  selectSector(selectedSector){
    if(this.dashboardService.selectedSector != selectedSector){
      this.dashboardService.selectedSector = selectedSector;
      this.dashboardService.selectedSubSector = new ThematicSubSectorModel();
      this.dashboardService.selectedIndicator = new ThematicIndicatorModel();
      this.dashboardService.selectedTimeperiod = new ThematicTimeperiodModel();
      if(this.dashboardService.selectedSector.sectorId == null){
        this.getcsrData();
      }
      // this.dashboardService.thematicData = null;
    }
  }
  selectSubSector(selectedSubSector){
    if(this.dashboardService.selectedSubSector != selectedSubSector){
      this.dashboardService.selectedSubSector = selectedSubSector;
      this.dashboardService.selectedIndicator = new ThematicIndicatorModel();
      this.dashboardService.selectedTimeperiod = new ThematicTimeperiodModel();
    }  
  }
  selectIndicator(selectedIndicator){
    if(this.dashboardService.selectedIndicator != selectedIndicator){
      this.dashboardService.selectedIndicator = selectedIndicator;
      this.dashboardService.selectedTimeperiod = new ThematicTimeperiodModel();
      this.getThematicData(this.dashboardService.selectedIndicator.indicatorId);
      this.dashboardService.trendChartData = []
    }
    
  }
  selectTimeperiod(selectedTimeperiod){
    if(this.dashboardService.selectedTimeperiod != selectedTimeperiod){
      this.dashboardService.submittedTimeperiod = selectedTimeperiod;
      this.dashboardService.selectedTimeperiod = selectedTimeperiod;
      this.dashboardService.trendChartData = []
    }

  }
  getcsrData(){
    this.dashboardService.getcsrData().subscribe( data =>{
      this.dashboardService.submittedSector = this.dashboardService.selectedSector;
      this.dashboardService.submittedSubSector = new ThematicSubSectorModel();
      this.dashboardService.submittedIndicator = new ThematicIndicatorModel();
      this.dashboardService.thematicData = data;
      this.dashboardService.trendChartData = []
      this.dashboardService.selectedTimeperiod =  this.dashboardService.thematicData[0];
      this.dashboardService.submittedTimeperiod = this.dashboardService.thematicData[0];
      this.setMapData(this.dashboardService.selectedTimeperiod)
    })
  }
  getThematicData(indicatorId)
  {
    this.dashboardService.getThematicData(indicatorId).subscribe(data =>{
      this.dashboardService.submittedSector = this.dashboardService.selectedSector;
      this.dashboardService.submittedSubSector = this.dashboardService.selectedSubSector;
      this.dashboardService.submittedIndicator = this.dashboardService.selectedIndicator;
      this.dashboardService.trendChartData = []

      this.dashboardService.thematicData = data;   
      this.dashboardService.selectedTimeperiod =  this.dashboardService.thematicData[0];
      this.dashboardService.submittedTimeperiod = this.dashboardService.thematicData[0];
      this.setMapData(this.dashboardService.selectedTimeperiod)  
    })
  }

  getThematicDropdowns(){
    this.dashboardService.getThematicDropDownList().subscribe(res => {
      this.dashboardService.thematicDropDownList = res;
      /**hard coded for default csr testing */
      // this.dashboardService.selectedSector = this.dashboardService.thematicDropDownList[0];
      // this.dashboardService.selectedSubSector = this.dashboardService.selectedSector.subSectors[0];
      // this.dashboardService.selectedIndicator = this.dashboardService.selectedSubSector.indicators[0]
      // this.dashboardService.selectedTimeperiod = this.dashboardService.thematicDropDownList['timeperiods'][0]
      this.selectSector(this.dashboardService.thematicDropDownList[0])
      this.thematicDropdownDataFetched = true;
    })
  }

  setMapData(model){
    this.dashboardService.mapData = model.stateData;
    this.dashboardService.selectedMapDataPeriod = model;
  }

  clearTrendChartData(){
    this.dashboardService.trendChartData = [];
  }

  getTrendChart(areaId){
    this.dashboardService.getTrendChartData(areaId).subscribe(res => {
      this.dashboardService.trendChartData = res;
      setTimeout(()=>{
        this.dashboardService.dragElement(document.getElementById("trend-chart-container"))
      }, 1000)
    })
  }

//   createFile(){
//     var uri = 'data:application/html;base64,'
//     let table = document.getElementById('map').outerHTML
//     var template = '<html xmlns="http://www.w3.org/TR/REC-html40"><head></head><body>'+table +'</body></html>', base64 = function(
//       s) {
//     return window.btoa(decodeURIComponent(encodeURIComponent(s)));
//   }
//   // , 
//   // format = function(s, c) {
//   //   return s.replace(/{(\w+)}/g, function(m, p) {
//   //     return c[p];
//   //   });
//   // };
//     // if (!table.nodeType)
//     //   table = document.getElementById(table);
//     var ctx = {
//       worksheet : name || 'Worksheet',
//       table : ''
//     };
//     var filename = 'download.html'
//     document.getElementById("dlink").setAttribute("href", uri
//     + base64(template))
//     document.getElementById("dlink").setAttribute('download', filename);
//     document.getElementById("dlink").click();

//     // const downloadLink = document.getElementById("downloadLink")
//     // downloadLink.setAttribute("href", this.htmlToUrl())
//     // downloadLink.click();
    
//   }
// //   htmlToUrl(): string {
// //     let html = '<h3>hi</h3>';
// //     return `data:text/html;base64,${window.btoa(decodeURI(encodeURIComponent(html)))}`;
// //     // return "data:text/html;base64,PCFET0NUWVBFIEhUTUwgUFVCTElDICItLy9JRVRGLy9EVEQgSFRNTCAyLjAvL0VOIj4KPGh0bWw+PGhlYWQ+Cjx0aXRsZT41MDAgSW50ZXJuYWwgU2VydmVyIEVycm9yPC90aXRsZT4KPC9oZWFkPjxib2R5Pgo8aDE+SW50ZXJuYWwgU2VydmVyIEVycm9yPC9oMT4KPHA+VGhlIHNlcnZlciBlbmNvdW50ZXJlZCBhbiBpbnRlcm5hbCBlcnJvciBvcgptaXNjb25maWd1cmF0aW9uIGFuZCB3YXMgdW5hYmxlIHRvIGNvbXBsZXRlCnlvdXIgcmVxdWVzdC48L3A+CjxwPlBsZWFzZSBjb250YWN0IHRoZSBzZXJ2ZXIgYWRtaW5pc3RyYXRvciwKIHdlYm1hc3RlckB0aGVtZW1hc2NvdC5rb2Rlc29sdXRpb24ubmV0IGFuZCBpbmZvcm0gdGhlbSBvZiB0aGUgdGltZSB0aGUgZXJyb3Igb2NjdXJyZWQsCmFuZCBhbnl0aGluZyB5b3UgbWlnaHQgaGF2ZSBkb25lIHRoYXQgbWF5IGhhdmUKY2F1c2VkIHRoZSBlcnJvci48L3A+CjxwPk1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBlcnJvciBtYXkgYmUgYXZhaWxhYmxlCmluIHRoZSBzZXJ2ZXIgZXJyb3IgbG9nLjwvcD4KPHA+QWRkaXRpb25hbGx5LCBhIDUwMCBJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IKZXJyb3Igd2FzIGVuY291bnRlcmVkIHdoaWxlIHRyeWluZyB0byB1c2UgYW4gRXJyb3JEb2N1bWVudCB0byBoYW5kbGUgdGhlIHJlcXVlc3QuPC9wPgo8aHI+CjxhZGRyZXNzPkFwYWNoZSBTZXJ2ZXIgYXQgdGhlbWVtYXNjb3QubmV0IFBvcnQgODA8L2FkZHJlc3M+CjwvYm9keT48L2h0bWw+Cg=="

// //     // const chartElement = document.getElementById("chart")
// // // const html = `<html><body>${chart.outerHtml}</body></html>`

// //   }
 


}
