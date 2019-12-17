import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants';
import { StaticPageService } from '../services/static-page.service';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-handout',
  templateUrl: './handout.component.html',
  styleUrls: ['./handout.component.scss']
})
export class HandoutComponent implements OnInit {

  handoutData:any;
  handoutDetails: any[] = [];
  handoutSection: any[] = [];
  isDesc:any;
  column :any;
  direction:number;
  p: number = 1;
  url: any;
  searchTexts: any;
  constructor(private contributelineservice:StaticPageService, private sanitizer: DomSanitizer) { }
 
 
   ngOnInit() {
     this.contributelineservice.getData("Handouts").subscribe(data=>{
       this.  handoutData =  data;
       this.handoutDetails = this. handoutData.viewContent.english;
       for(var i=0;i<this.handoutDetails.length;i++)
       {
         this.handoutSection= this.handoutDetails[i].data;
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
   
     this.handoutSection.sort(function(a, b){
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
