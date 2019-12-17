import { Component, OnInit } from '@angular/core';
import { StaticPageService } from '../services/static-page.service';
import { Constants } from '../../../constants';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit {

  BrochurelinesData:any;
  BrochurelineDetails: any[] = [];
  BrochureSection: any[] = [];
  isDesc : any;
  column : any;
  direction: number;
  p: number = 1;
  url: any;
  searchTexts: any;

  constructor(private Brochureservice:StaticPageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.Brochureservice.getData("Brochures").subscribe(data=>{
      this.BrochurelinesData =  data;
      this.BrochurelineDetails = this.  BrochurelinesData.viewContent.english;
      for(var i=0;i<this.BrochurelineDetails.length;i++)
			{
        this.BrochureSection = this.BrochurelineDetails[i].data;
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
  
    this.BrochureSection.sort(function(a, b){
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
