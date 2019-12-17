import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3v4';
import * as topojson from 'topojson';
import { DashboardService } from '../services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-thematic-dashboard',
  templateUrl: './thematic-dashboard.component.html',
  styleUrls: ['./thematic-dashboard.component.scss'],
})
export class ThematicDashboardComponent implements OnInit {
  @Input()
  width;
  height;
  projection;
  path;
  svg;
  g: any;
  thematicData: any;
  thematicDropDownList: any;
  legendData: any;
  ngContentId:any;

  mapData:any
  mapNameData: any;
  thematicKeys: any;
  clicks: number = 0;
  myDate = new Date();

  dashboardServices: DashboardService;
  lineChartData: any;
  lineChartVisible:boolean=false;
  tabKeys: any;
  areaId: string;
  indicatorName:string;
  indicatorValue:string;
  sideAreaName: string ='Odisha';
  areaName:string;
  primary_url:any;
  isBackBtnClicked:boolean=false;
  areaLevelId:number;

  constructor(private hostRef: ElementRef, private dashboardService: DashboardService, private spinner: NgxSpinnerService) {
    this.dashboardServices = dashboardService;
   }

  ngOnInit() {
    this.areaId = 'IND021';
    this.dashboardService.getThematicMapLegends().subscribe(legendData =>{
      this.legendData = legendData;
    })   
      this.tabListData(this.areaId,''); 
  }
  setIndicatorName(tabKey:string){
    if(tabKey == "coverage"){
      this.indicatorName="Coverage";
    }else if(tabKey == "geoTagging"){
      this.indicatorName="Geo Tagging";
    }else if(tabKey == "odfDeclaredVillage"){
      this.indicatorName="ODF Declared Village";
    }
  }
  tabListData(areaId,tabKey){
    this.spinner.show();
    this.dashboardService.getTabList(areaId).subscribe(lists =>{
      let tabData = lists;
      this.thematicDropDownList = tabData['QuickStart'];
      this.tabKeys = Object.keys(this.thematicDropDownList);
      for (let i = 0; i < this.tabKeys.length; i++) {
        if((areaId=='IND021' && this.tabKeys[i] == "coverage") && tabKey==""){
          this.mapNameData = 1;    
          //this.indicatorName = this.tabKeys[i];
          this.setIndicatorName(this.tabKeys[i]);
          this.indicatorValue = this.thematicDropDownList[this.tabKeys[i]];
          break;     
        }else{
          this.mapNameData = tabKey;
          //this.indicatorName = this.tabKeys[tabKey-1];
          this.setIndicatorName(this.tabKeys[tabKey-1]);
          this.indicatorValue = this.thematicDropDownList[this.tabKeys[tabKey-1]];
        }        
      }
      if(areaId=='IND021')
      this.mapLoad(areaId,this.mapNameData,'odisha_map.json'); 
      else
      this.mapLoad(this.areaId,this.mapNameData,this.primary_url); 
    })
  }
  mapLoad(areaId,mapValue,primary_url){
    if(mapValue){
    this.dashboardService.getThematicMapData(areaId,mapValue).subscribe(data =>{   
      this.spinner.hide(); 
      this.thematicData = data;       
      this.thematicKeys = Object.keys(this.thematicData);      
      this.mapData = this.thematicData.dataCollection;
      this.lineChartVisible=false;
      this.areaLevelId = this.mapData[Object.keys(this.mapData)[0]].areaLevelId;
      setTimeout(()=>{    
        this.drawMap(primary_url);   
      }, 200);    
      })   
    }
  }

  selectTabs(selectedOption){
    this.isBackBtnClicked=false;
    this.indicatorValue = this.thematicDropDownList[selectedOption];
    if(selectedOption == "coverage"){
      this.mapNameData = 1;
      this.indicatorName="Coverage";
    }else if(selectedOption == "geoTagging"){
      this.mapNameData = 2;
      this.indicatorName="Geo Tagging";
    }else if(selectedOption == "odfDeclaredVillage"){
      this.mapNameData = 3;
      this.indicatorName="ODF Declared Village";
    }
		    
    if(this.areaId!=='IND021' && this.isBackBtnClicked==false){
      this.spinner.show();
      this.mapLoad(this.areaId,this.mapNameData,this.primary_url);
    }else{
      this.spinner.show();
      this.mapLoad(this.areaId,this.mapNameData,'odisha_map.json');
    }
  }

  drawMap(url){
    d3.select('#map svg').remove();
    this.ngContentId = '_ngcontent-' + this.hostRef.nativeElement.attributes[0].name.substr(8);     
    // this.width = 800;
    this.width = $("#map-view").width();
    this.height = 400;
    this.projection = d3.geoMercator();
    this.path = d3.geoPath()
      .projection(this.projection)
      .pointRadius(2);
    this.svg = d3.select("#map").append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
    this.g = this.svg.append("g");
        
    d3.json("assets/geomaps/"+url, (error, data) => {
      let boundary = this.centerZoom(data);
      let subunits = this.drawSubUnits(data);
      this.colorSubunits(subunits);     
    });
  }

  centerZoom(data) {
    let o = topojson.mesh(data, data.objects.layer1, (a, b) => {
      return a === b;
    });

    this.projection
      .scale(1)
      .translate([0, 0]);

    let b = this.path.bounds(o),
      s = 1 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height),
      t = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];

    let p = this.projection
      .scale(s)
      .translate(t);
    return o;
  }

  drawSubUnits(data) {
    let subunits = this.g.selectAll(".subunit")
      .data(topojson.feature(data, data.objects.layer1).features)
      .enter().append("path")
      .attr("class", "subunit")
      .attr("d", this.path)
      .style("stroke", "#fff")
      .style("stroke-width", "1px").attr(this.ngContentId, "");
    return subunits;
  }

  colorSubunits(subunits) {
    subunits
      .attr("class",  (d, i) =>{
        let selectedArea = this.mapData[d.properties.ID_];
         if(selectedArea)
         return selectedArea.cssClass;
         else
         return "fifthslices";
      })
      .style("opacity", ".7")
      .style('cursor',"pointer")
      .on("mouseout",(d)=>this.onmouseout())
      .on("mousemove",(d)=>this.onmousemove(d))
      .on("mousedown",(d)=>this.clickHandler(d))
      .on("mouseover", (d) =>this.onover(d));
  }

  onover(d){    
      var areaName,datavalue,areaLevel;
      let selectedArea = this.mapData[d.properties.ID_];
     
       if (selectedArea) {
              datavalue=selectedArea.value;
              areaName=selectedArea.areaName;
        }else{
              datavalue = "Not Available";
        }
        if(d.properties.AreaLevel == 4) {
          areaLevel = 'Block' 
        }else{
          areaLevel = 'District' 
        } 
        d3.select(".map_popover_content").html(
                "<strong>"+ areaLevel+":</strong> <span>"+ areaName+ "</span>" 
                + "<br><strong>"+ this.indicatorName+ ":</strong> <span>"+ datavalue + "%"+"</span>");
        d3.select(".map_popover").style("display","block");       
  }

  onmousemove(d) {
      d3.select(".map_popover")
        .style("display", "block")
        .style("left", (d3.event.pageX) - 300 + "px")     
        .style("top", (d3.event.pageY - 280) + "px")
        .style("opacity", "1");        
  }

  onmouseout() {
    d3.select(".map_popover").style("display", "none");
  }

  clickHandler(d){
    this.clicks++;
    setTimeout(()=>{
    if (this.clicks === 1) {
        this.clicked(d);          // perform single-click action
        this.clicks = 0;          // after action performed, reset counter
    } else {
      this.drilldown(d);         // perform double-click action
      this.clicks = 0;          // after action performed, reset counter
    }
  },1000)
  } 

  clicked(d){
    let selectedArea = this.mapData[d.properties.ID_];
    this.areaName=selectedArea.areaName;   
    var areaClickId = d.properties.ID_;
    this.dashboardService.selectedIndicator = this.indicatorName;
    this.spinner.show();
    this.dashboardService.getChartDetails(areaClickId, this.mapNameData).subscribe(data=>{
      this.spinner.hide();
      this.lineChartData = data; 
      if(data!=null || data!=undefined){
        this.lineChartVisible=true;
      }
    })      
  }

  drilldown(d){   
    if (d.properties.NAME1_ && (this.areaLevelId==2 || this.areaLevelId==3)) {      
      d3.select(".map_popover").style("display", "none");         
      this.areaId = d.properties.ID_;
      this.areaName = d.properties.NAME1_;
      this.sideAreaName=d.properties.NAME1_;
      this.primary_url = this.areaName+".json";
      this.lineChartVisible=false;            
      this.tabListData(this.areaId,this.mapNameData);
    }
  }
  closeViz(){
    this.lineChartVisible=false;
  }
  backToMap(){
    this.isBackBtnClicked=true;
    this.areaId = 'IND021';
   // this.mapLoad(this.areaId,this.mapNameData,'odisha_map.json');
    this.tabListData(this.areaId,this.mapNameData);
    this.sideAreaName='Odisha';
  }
}
