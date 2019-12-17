import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants';
import { Cookie } from 'ng2-cookies';
import { saveAs } from '@progress/kendo-file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import savesAs from "save-as";
import { throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  allTypes: any;
  reportTypes: any;
  firstFilterRange: any;
  secondFilterRange: any;
  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) {
  }

  getTypes(){
    return this.httpClient.get(Constants.HOME_URL + 'getTypes');   
  }
  getTypeDetails(){
    return this.httpClient.get(Constants.HOME_URL + 'getTypeDetails');   
  }
  getAreaDetails() {
     return this.httpClient.get(Constants.HOME_URL + 'getAreaForReports');    
  }

  getTableData(reportTypeId, areaId, areaLevel) {
    switch (reportTypeId) {
      case 4:
      if(areaLevel)
      return this.httpClient.get(Constants.HOME_URL + "getDailyA03?forAreaId=" + areaId +"&areaLevel="+ areaLevel)
      else
      return this.httpClient.get(Constants.HOME_URL + "getDailyA03?forAreaId=" + areaId)
      break;
      case 5:
      if(areaLevel)
      return this.httpClient.get(Constants.HOME_URL + "weeklyExcel?parentAreaId=" + areaId +"&areaLevel="+ areaLevel)
      else
      return this.httpClient.get(Constants.HOME_URL + "weeklyExcel?parentAreaId=" + areaId)
      break;
      case 7: 
      return this.httpClient.get(Constants.HOME_URL + "weeklyOdfDeclaredExcel?parentAreaId=" + areaId)
      break;
      case 8: 
      return this.httpClient.get(Constants.HOME_URL + "weeklyOdfVerifiedExcel?parentAreaId=" + areaId)
      break;
      case 9: 
      if(areaLevel)
      return this.httpClient.get(Constants.HOME_URL + "weeklyGeoTagStatusExcel?parentAreaId=" + areaId +"&areaLevel="+ areaLevel)
      else
      return this.httpClient.get(Constants.HOME_URL + "weeklyGeoTagStatusExcel?parentAreaId=" + areaId)
      break;     
      case 10: 
      if(areaLevel)
      return this.httpClient.get(Constants.HOME_URL + "getDailyA03Tb2?forAreaId=" + areaId +"&areaLevel="+ areaLevel)
      else
      return this.httpClient.get(Constants.HOME_URL + "getDailyA03Tb2?forAreaId=" + areaId)
      break;   
      case 11: 
      if(areaLevel)
      return this.httpClient.get(Constants.HOME_URL + "dailySupplyChainExcelData?parentAreaId=" + areaId +"&areaLevel="+ areaLevel)
      else
      return this.httpClient.get(Constants.HOME_URL + "dailySupplyChainExcelData?parentAreaId=" + areaId)
      break;     
      case 12:
      if(areaLevel)
      return this.httpClient.get(Constants.HOME_URL + "weeklyExcel?parentAreaId=" + areaId +"&areaLevel="+ areaLevel+"&showNonPerformingGp="+ true)
      else
      return this.httpClient.get(Constants.HOME_URL + "weeklyExcel?parentAreaId=" + areaId+"&showNonPerformingGp="+ true)
      break;
      case 13:
      return this.httpClient.get(Constants.HOME_URL + "weeklyDistrictRankingExcelData?parentAreaId=" + areaId)
      break;
    }
  }

  downloadPdf(reportTypeId, areaId, areaLevel, firstFilterRange, secondFilterRange) {
    if (reportTypeId == 4) {
      let url, filterRange;
      if(firstFilterRange && secondFilterRange)
      filterRange = firstFilterRange + '-' + secondFilterRange;
      this.spinner.show()
      if(areaLevel){
        if(filterRange)
        url = "getDailyPhyProgressRprt?forAreaId=" + areaId + "&areaLevel="+ areaLevel + "&range="+ filterRange;
        else
        url = "getDailyPhyProgressRprt?forAreaId=" + areaId + "&areaLevel="+ areaLevel;
      }     
      else{
        if(filterRange)
        url = "getDailyPhyProgressRprt?forAreaId=" + areaId + "&range="+ filterRange;
        else
        url = "getDailyPhyProgressRprt?forAreaId=" + areaId;
      }
      
      this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
        this.spinner.hide();
        this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));   
      }, error => {
        console.log(error);
      });    
    }
    if (reportTypeId == 5) {
      let url;
      this.spinner.show();
      if(areaLevel)
      url = "weeklyPdf?parentAreaId=" + areaId + "&areaLevel="+ areaLevel;
      else
      url = "weeklyPdf?parentAreaId=" + areaId;
      
      this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
        this.spinner.hide();
        this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));  
      });    
    }
    if (reportTypeId == 7) {
      let url, filterRange;
      if(firstFilterRange && secondFilterRange)
      filterRange = firstFilterRange + '-' + secondFilterRange;
      if(filterRange)
        url = "weeklyOdfDeclaredPdf?parentAreaId=" + areaId + "&range="+ filterRange;
      else
      url = "weeklyOdfDeclaredPdf?parentAreaId=" + areaId

      this.spinner.show();
      this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
        this.spinner.hide();
        this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));  
      });
    }
    if (reportTypeId == 8) {
      this.spinner.show();
      let url, filterRange;
      if(firstFilterRange && secondFilterRange)
      filterRange = firstFilterRange + '-' + secondFilterRange;
      if(filterRange)
        url = "weeklyOdfVerifiedPdf?parentAreaId=" + areaId + "&range="+ filterRange;
      else
      url = "weeklyOdfVerifiedPdf?parentAreaId=" + areaId

      this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
        this.spinner.hide();
        this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));  
      });
    }
    if (reportTypeId == 9) {
      let url, filterRange;
      this.spinner.show();
      if(firstFilterRange && secondFilterRange)
      filterRange = firstFilterRange + '-' + secondFilterRange;

      if(areaLevel){
        if(filterRange)
        url = "weeklyGeoTagPdf?parentAreaId=" + areaId + "&areaLevel="+ areaLevel + "&range="+ filterRange;
        else
        url = "weeklyGeoTagPdf?parentAreaId=" + areaId + "&areaLevel="+ areaLevel;
      }     
      else{
        if(filterRange)
        url = "weeklyGeoTagPdf?parentAreaId=" + areaId + "&range="+ filterRange;
        else
        url = "weeklyGeoTagPdf?parentAreaId=" + areaId;
      }
      this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
        this.spinner.hide();
        this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));  
      });
   }
   if (reportTypeId == 10) {
    let url;
    this.spinner.show();
    if(areaLevel)
    url = "getDailyIhhlCompRprt?forAreaId=" + areaId + "&areaLevel="+ areaLevel;
    else
    url = "getDailyIhhlCompRprt?forAreaId=" + areaId;

    this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
      this.spinner.hide();
      this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));   
    }, error => {
      console.log(error);
    });
   }
   if (reportTypeId == 11) {
    let url;
    this.spinner.show();
    if(areaLevel)
    url = "dailySupplyChainPdf?parentAreaId=" + areaId + "&areaLevel="+ areaLevel;
    else
    url = "dailySupplyChainPdf?parentAreaId=" + areaId;

    this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
      this.spinner.hide();
      this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));   
    }, error => {
      console.log(error);
    });
   }
   if (reportTypeId == 12) {
    let url;
    this.spinner.show();
    if(areaLevel)
    url = "weeklyPdf?parentAreaId=" + areaId + "&areaLevel="+ areaLevel + "&showNonPerformingGp="+ true;
    else
    url = "weeklyPdf?parentAreaId=" + areaId + "&showNonPerformingGp="+ true;

    this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
      this.spinner.hide();
      this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));   
    }, error => {
      console.log(error);
    });
   }
   if (reportTypeId == 13) {
    let url;
    this.spinner.show();
    url = "weeklyDistrictRankingPdf?parentAreaId=" + areaId;

    this.httpClient.get(Constants.HOME_URL + url).subscribe(res => {
      this.spinner.hide();
      this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));   
    }, error => {
      console.log(error);
    });
   }
  }
  downloadConsolidatedPdf(reportTypeId, areaId, areaLevel){
    if (reportTypeId == 2) {
      let consolidatedUrl;
      this.spinner.show()
      if(areaLevel)
      consolidatedUrl = "downloadDailyA03PdfReport?forAreaId=" + areaId + "&areaLevel="+ areaLevel;
      else
      consolidatedUrl = "downloadDailyA03PdfReport?forAreaId=" + areaId;

      this.httpClient.get(Constants.HOME_URL + consolidatedUrl).subscribe(res => {
        this.spinner.hide();
        this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));   
      }, error => {
        console.log(error);
      });
   
    } else if (reportTypeId == 3) {
      let consolidatedUrl;
      this.spinner.show()
      if(areaLevel)
      consolidatedUrl = "weeklyConsolidatedPdf?parentAreaId=" + areaId + "&areaLevel="+ areaLevel;
      else
      consolidatedUrl = "weeklyConsolidatedPdf?parentAreaId=" + areaId;

      this.httpClient.get(Constants.HOME_URL + consolidatedUrl).subscribe(res => {
        this.spinner.hide();
        this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"));   
      }, error => {
        console.log(error);
      });
    }
  }
  download(data) {
    if (data) {
      //data can be string of parameters or array/object
      data = typeof data == 'string' ? data : $.param(data);
      //split params into form inputs
      var inputs = '';
      let url = Constants.HOME_URL + 'downloadReport';
      $.each(data.split('&'), function () {
        var pair = this.split('=');
        inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
      });
      //send request
      $('<form action="' + url + '" method="post">' + inputs + '</form>')
        .appendTo('body').submit().remove();
    };
  }

  getDailyTracker(){
    this.spinner.show();
    this.httpClient.get(Constants.HOME_URL + "getDailyTracker").subscribe(res => {
      this.spinner.hide()
      this.download('fileName='+res+'&access_token=' +Cookie.get("access_token"))
    })
  }

  getExcelFile(blockId,districtId) {
    let fileName = '';

      fileName = "swachhagrahilist";
      let args = [];
      args.push(blockId);
      args.push(districtId);
    
    this.httpClient.post(Constants.HOME_URL + 'getSwachhagrahi', args, {
      
      responseType: "blob"
      
    }).pipe(
      map((res: Blob) => res),
      catchError((res: Blob) => throwError(res))
    ).subscribe(data => {
      this.spinner.hide();
      savesAs(data, fileName + "_" + new Date().getTime().toString() + ".xlsx");
    },
      error => {
        
      });
  }

}
