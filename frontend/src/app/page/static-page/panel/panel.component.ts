import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants';
import { StaticPageService } from '../services/static-page.service';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  panelData:any;
  panelDetails: any[] = [];
  panelSection: any[] = [];
  isDesc:any;
  column :any;
  direction:number;
  p: number = 1;
  url: any;
  searchTexts: any;
 constructor(private panelservice:StaticPageService, private sanitizer: DomSanitizer) { }

 ngOnInit() {
  this.panelservice.getData("Panels").subscribe(data=>{
    this.panelData=  data;
    this.panelDetails = this.panelData.viewContent.english;
    for(var i=0;i<this.panelDetails.length;i++)
    {
      this.panelSection = this.panelDetails[i].data;
    }
})
}

downloadFiles(fileName){  
    window.location.href = Constants.HOME_URL + 'cms/downloadCmsDoc?fileName='+fileName;
  }

  openPDF(category){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(Constants.HOME_URL + 'cms/downloadCmsDoc?fileName= '+category + '&inline='+ true);
    $("#myModal").modal("show");
  }
sort(property){
  this.isDesc = !this.isDesc; //change the direction    
  this.column = property;
  let direction = this.isDesc ? 1 : -1;

  this.panelSection.sort(function(a, b){
      if(a[property] < b[property]){
          return -1 * direction;
      }
      else if( a[property] > b[property]){
          return 1 * direction;
      }
      else{
          return 0;
      }
  });
};

}
