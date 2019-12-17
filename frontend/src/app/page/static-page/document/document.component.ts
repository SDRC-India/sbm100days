import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants';
import { StaticPageService } from '../services/static-page.service';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
declare var $: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  documentData:any;
  documentDetails: any[] = [];
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
  previewFile: boolean = true;
  constructor(private documentService:StaticPageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.documentService.getData("Documents").subscribe(data=>{
      this.documentData =  data;
      this.documentDetails = this.documentData.viewContent.english;
      for(var i=0;i<this.documentDetails.length;i++)
			{
        this.SanctionSection.push(this.documentDetails[i].data);
      }
          this.selectedItem = this.documentDetails[0];     
      this.getDocData(0, event, this.selectedItem );
    })
    }
    downloadFiles(fileName){  
      window.location.href = Constants.HOME_URL + 'cms/downloadCmsDoc?fileName='+fileName;
    }
    openPDF(category){
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(Constants.HOME_URL + 'cms/downloadCmsDoc?fileName= '+category + '&inline='+ true);
      $("#myModal").modal("show");
    }
  
    getDocData(index: any, event, newValue){
      this.p = 0;
      this.searchTexts = "";
      this.selectedItem = newValue; 
      this.previewFile = true;
      this.SubSection = this.SanctionSection[index];
       if(this.selectedItem.section === "Presentations"){
         this.previewFile = false;
       }
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
