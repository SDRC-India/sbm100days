import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  thematicDropDownList: any;
  selectedIndicator:string;

  constructor(private httpClient: HttpClient) { }
  
  getThematicMapData(areaId,tabKey){
    return this.httpClient.get(Constants.HOME_URL +'dailyIndicatorList?parentIdCode='+areaId+'&iusid='+tabKey);
  }
  getThematicMapLegends(){
    return this.httpClient.get('assets/json/thematicMapData.json');
  }
  getTabList(areaId){
   return this.httpClient.get(Constants.HOME_URL +'quickStartData?areaId='+areaId);    
  }
  getChartDetails(areaId,tabKey){
    return this.httpClient.get(Constants.HOME_URL+'dailyTrendList?parentIdCode='+areaId+'&iusid='+tabKey);
    //return this.httpClient.get('assets/linechartData.json');
  }
}
