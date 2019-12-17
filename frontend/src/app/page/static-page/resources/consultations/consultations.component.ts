import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Constants } from '../../../../constants';
import { StaticPageService } from '../../services/static-page.service';
import { DomSanitizer } from '../../../../../../node_modules/@angular/platform-browser';
declare var $: any;


@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit {
  consultaioneData:any;
  consultaioneDetails: any[] = [];
  tableData: any[] = [];
  isDesc:any;
  column :any;
  direction:number;
  p: number = 1;
  url: any;
  searchTexts: any;
 constructor(private consultaionsservice:StaticPageService, private http: HttpClient,
private sanitizer: DomSanitizer) { }

 ngOnInit() {

  this.consultaionsservice.getData("Consultations").subscribe(data=>{
    this.consultaioneData=  data;
    this. consultaioneDetails = this.consultaioneData.viewContent.english;
    for(var i=0;i<this.consultaioneDetails.length;i++)
    {
      this.tableData = this.consultaioneDetails[i].data;
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

  this.tableData.sort(function(a, b){
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
