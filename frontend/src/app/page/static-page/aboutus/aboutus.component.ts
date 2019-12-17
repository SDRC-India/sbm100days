import { Component, OnInit } from '@angular/core';
import { StaticPageService } from '../services/static-page.service';
import { Constants } from '../../../constants';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
import { StaticHomeService } from '../../../service/static-home.service';
declare var $: any;

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})

export class AboutusComponent implements OnInit {

 staticService: StaticHomeService;
 url: any;
  constructor(private staticServiceProvider: StaticHomeService,private sanitizer: DomSanitizer) {
    this.staticService = staticServiceProvider;
   }

  ngOnInit() {
    this.staticService.getData("About Us").subscribe(data=>{
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
}
 