import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../constants';
import { StaticPageService } from '../../services/static-page.service';
import { DomSanitizer } from '../../../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-navdishareport',
  templateUrl: './navdishareport.component.html',
  styleUrls: ['./navdishareport.component.scss']
})
export class NavdishareportComponent implements OnInit {
  navdishaData:any;
  navdishaDetails: any[] = [];
  navdishaSection: any[] = [];
  isDesc:any;
  column:any;
  direction:number;
  p: number = 1;
  url: any;
  searchTexts: any;
  staticService: StaticPageService;
  constructor(private staticServiceProvider: StaticPageService, private sanitizer: DomSanitizer) {
    this.staticService = staticServiceProvider;
   }

  ngOnInit() {
    this.staticService.getData("Reports").subscribe(data=>{
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
