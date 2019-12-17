import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../constants';
import { StaticPageService } from '../../services/static-page.service';
import { DomSanitizer } from '../../../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-bestpratices',
  templateUrl: './bestpratices.component.html',
  styleUrls: ['./bestpratices.component.scss']
})
export class BestpraticesComponent implements OnInit {
  bestpraticesData:any;
  bestpraticeDetails: any[] = [];
  bestpraticeSection: any[] = [];
  isDesc:any;
  column :any;
  direction:number;
  p: number = 1;
  pdfTitle: any;
  url: any;
  searchTexts: any;
  staticService: StaticPageService;
  constructor(private staticServiceProvider: StaticPageService,private sanitizer: DomSanitizer) {
    this.staticService = staticServiceProvider;
   }

  ngOnInit() {
    this.staticService.getData("Best Practices").subscribe(data=>{
      this. bestpraticesData =  data;
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
    let direction = this.isDesc ? 1 : -1;
  
    this.bestpraticeSection .sort(function(a, b){
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
