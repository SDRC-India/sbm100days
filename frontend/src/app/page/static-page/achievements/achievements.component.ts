import { Component, OnInit } from '@angular/core';
import { StaticPageService } from '../services/static-page.service';
import { Constants } from '../../../constants';
import { Router } from '../../../../../node_modules/@angular/router';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {
  whatnewData:any;
  whatnewDetails: any[] = [];
  whatnewSection: any[] = [];
  isDesc:any;
  column :any;
  direction:number;
  searchTexts: any;
  url: any;
  staticService:StaticPageService;
  constructor(private staticServiceProvider: StaticPageService, private router: Router,
  private sanitizer: DomSanitizer) {
    this.staticService = staticServiceProvider;
   }

  ngOnInit() {
    this.staticService.getData("Achievements and Progress").subscribe(data=>{
      this.whatnewData =  data;
      this.staticService.reinitializeData(data);
      this.staticService.reinitializeData(data);
  })
  }
  redirectToWhatsNew() {
    this.router.navigate(['/']);
  }
  downloadFiles(fileName){  
    window.location.href = Constants.HOME_URL + 'cms/downloadCmsDoc?fileName='+fileName;
  }
  openPDF(category){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(Constants.HOME_URL + 'cms/downloadCmsDoc?fileName= '+category + '&inline='+ true);
    $("#myModal").modal("show");
  }
 
}
