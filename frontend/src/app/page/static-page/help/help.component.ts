import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants';
import { StaticPageService } from '../services/static-page.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  helpData:any[] = [];
  helpDetails: any[] = [];
  helpSection: any; 
  staticService: StaticPageService;
  constructor(private staticServiceProvider: StaticPageService) {
    this.staticService = staticServiceProvider;
   }

  ngOnInit() {
      this.staticService.getData("User Guide").subscribe(data=>{
      this.helpSection =  data;
      this.helpDetails = this.helpSection.viewContent.english;
      // this.staticService.reinitializeData(data);
      for(var i = 0; i < this.helpDetails.length; i++ ){
        this.helpData = this.helpDetails[i].data;
      }
  })
  }

  downloadFiles(fileName){  
    window.location.href = Constants.HOME_URL + 'cms/downloadCmsDoc?fileName='+fileName;
  }

}
