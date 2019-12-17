import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StaticPageService {
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
  shortDescription: string;
 

  constructor(private httpClient: HttpClient) { }

  getMenuList(menu){
    return this.httpClient.get(Constants.HOME_URL+Constants.CMS_URL + 'getPageContent?viewName=Menu&viewType='+menu);
  } 
  getData(viewName){
    return this.httpClient.get(Constants.HOME_URL+Constants.CMS_URL + 'getPageContent?viewName='+viewName + '&viewType=');
  } 

  getPhotogalleryData(viewName){
    return this.httpClient.get(Constants.HOME_URL+Constants.CMS_URL + 'fetchPhotoGallery?viewName='+viewName);
  }

  getOrganisationalData() {
    return this.httpClient.get(Constants.HOME_URL + Constants.CONTACT_URL +'getOrganisationType');
  }
 

  reinitializeData(data){
    this.contentData = data;
    this.contentDetails = this.contentData.viewContent[this.selectedLang];
    this.shortDescription = this.contentData.viewType;

    this.contentSection = {};
    // this.homeHindiDetails = this.homeData.viewContent.hindi;
    for(var i=0;i<this.contentDetails.length;i++){
      this.contentList = this.contentDetails[i].data;
    }
   
    if(this.contentData.viewName == 'Home'){
      for(var i=0;i<this.contentDetails.length;i++)
      {
        this.contentSection[this.contentDetails[i].key] = this.contentDetails[i];
      }
    }
    // if(this.contentData.viewName == 'Photo Gallery'){
    //   for(var i=0;i<this.contentDetails.length;i++)
    //   {
    //     this.contentSection[this.contentDetails[i].section] = this.contentDetails[i];
    //   }
    // }
   
    // for(var i=0;i<this.contentDetails.length;i++){
    //   this.contentGallery = this.contentDetails[i].data;
    // }
  }

}
