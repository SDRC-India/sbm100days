import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../constants';
import { StaticPageService } from '../../services/static-page.service';
import { DomSanitizer } from '../../../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-revalidationletter',
  templateUrl: './revalidationletter.component.html',
  styleUrls: ['./revalidationletter.component.scss']
})
export class RevalidationletterComponent implements OnInit {

  SanctionData:any;
  SanctionDetails: any[] = [];
  SanctionSection: any[] = [];
  Sanction: any[] = [];
  SubSection: any[] = [];
  selectedItem: any;
  isDesc:any;
  column :any;
  direction:number;
  p: number = 1;
  url: any;
  searchTexts: any;
  constructor(private Sanctionrderservice:StaticPageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.Sanctionrderservice.getData("Letters").subscribe(data=>{
      this.SanctionData =  data;
      this.SanctionDetails = this.SanctionData.viewContent.english;
      for(var i=0;i<this.SanctionDetails.length;i++)
			{
        this.SanctionSection.push(this.SanctionDetails[i].data);
      }
      this.SubSection = this.SanctionSection[0]
          this.selectedItem = this.SanctionDetails[0];
      this.getYearData(0, event, this.selectedItem);
          })
  }
  downloadFiles(fileName){  
    window.location.href = Constants.HOME_URL + 'cms/downloadCmsDoc?fileName='+fileName;
  }

  openPDF(category){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(Constants.HOME_URL + 'cms/downloadCmsDoc?fileName= '+category + '&inline='+ true);
    $("#myModal").modal("show");
  }

  getYearData(index: any, event, newValue){
    this.p = 0;
    this.searchTexts = "";
    this.selectedItem = newValue; 
    this.SubSection = this.SanctionSection[index]
  }

  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
  
    this.SubSection .sort(function(a, b){
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
