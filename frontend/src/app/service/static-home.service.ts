import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import { Observable } from 'rxjs';

@Injectable()
export class StaticHomeService {
  selectedLang: string = 'english';
  viewName : String ;
  contentDetails: any[] = [];
  contentSection: any = {};
  contentData: any;
  contentList: any[] = [];
  imageCategory: any;
  whatsNewCategory:any;
  viewType: any;
  sectionName: any;
  whatnewdataSection : string;
  menus: any[];
  siteMenus: any[];
  countLoaded: boolean = false;
  quickStarts: any;
  quickVal:any={};
 

  constructor(private httpClient: HttpClient) { }
  getQuickStarts(){
    return this.httpClient.get(Constants.HOME_URL + "quickStartData?areaId="+'IND021');
  }
  getMenuList(menu){
    return this.httpClient.get("assets/menu.json");
  } 
  getData(viewName){
    return this.httpClient.get("assets/language.json");
  } 

  getPhotogalleryData(viewName){
    return this.httpClient.get(Constants.HOME_URL+Constants.CMS_URL + 'fetchPhotoGallery?viewName='+viewName);
  }

  getOrganisationalData() {
    return this.httpClient.get(Constants.HOME_URL + Constants.CONTACT_URL +'getOrganisationType');
  }
 
  // reinitializeData(data){
  //   this.contentData = data;
  //   this.contentDetails = this.contentData.viewContent[this.selectedLang];
  //   this.contentSection = {};
  //   // this.homeHindiDetails = this.homeData.viewContent.hindi;
  //   for(var i=0;i<this.contentDetails.length;i++){
  //     this.contentList = this.contentDetails[i].data;
  //   }
   
  //   if(this.contentData.viewName == 'Home'){
  //     for(var i=0;i<this.contentDetails.length;i++)
  //     {
  //       this.contentSection[this.contentDetails[i].key] = this.contentDetails[i];
  //     }
  //   }

  // }


}



