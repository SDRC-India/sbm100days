import { Component, OnInit } from '@angular/core';
import { StaticPageService } from '../../services/static-page.service';
import { DomSanitizer } from '../../../../../../node_modules/@angular/platform-browser';
import { Constants } from '../../../../constants';
declare var $: any;

@Component({
  selector: 'app-trainingmodule',
  templateUrl: './trainingmodule.component.html',
  styleUrls: ['./trainingmodule.component.scss']
})
export class TrainingmoduleComponent implements OnInit {

  trainData:any[] = [];
  trainDetails: any[] = [];
  trainSection: any; 
  isDesc:any;
  column:any;
  direction:number;
  searchTexts: any;
  url: any;
  staticService: StaticPageService;
  constructor(private staticServiceProvider: StaticPageService, private sanitizer: DomSanitizer ) {
    this.staticService = staticServiceProvider;
   }

  ngOnInit() {
      this.staticService.getData("Training module").subscribe(data=>{
      this.trainSection =  data;
      this.trainDetails = this.trainSection.viewContent.english;
      this.staticService.reinitializeData(data);
      for(var i = 0; i < this.trainDetails.length; i++ ){
        this.trainData = this.trainDetails[i].data;
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
    this.direction = this.isDesc ? 1 : -1;
}

}
