import { Component, OnInit,Input,HostListener } from '@angular/core';
import { Constants } from '../../../../constants';
import { StaticPageService } from '../../services/static-page.service';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { DomSanitizer } from '../../../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})

export class GuidelinesComponent implements OnInit {
  
  guidelinesData:any;
  guidelineDetails: any[] = [];
  guidelineSection: any[] = [];
  isDesc : any;
  column : any;
  direction: number;
  p: number = 1;
  searchTexts: any;
  url: any;
  pdfTitle: any;
  staticService: StaticPageService;
  constructor(private staticServiceProvider: StaticPageService,private sanitizer: DomSanitizer) {
    this.staticService = staticServiceProvider;
   }

  ngOnInit() {
    this.staticService.getData("Guidelines").subscribe(data=>{
      this.staticService.reinitializeData(data);
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
    this.direction = this.isDesc ? 1 : -1;
}
  
  }
  





