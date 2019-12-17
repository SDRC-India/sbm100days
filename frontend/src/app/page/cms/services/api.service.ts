import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../constants';

@Injectable()
export class ApiService {

  cmsData: any;
  constructor(private http: HttpClient) { }

  getResourceQuestionList(){
    return this.http.get(Constants.HOME_URL + Constants.CMS_URL+'fetchFeatureDetails')
    // return this.http.get('assets/getQuestions.json')
  }

  // cmsPageDescriptionEditing(){
  //   return this.http.get(Constants.HOME_URL + Constants.CMS_URL+'editCmsDescription')
  // }
  getMenuList(){
    return this.http.get(Constants.HOME_URL + Constants.CMS_URL +'getPageContent?viewName=Menu&viewType=cmsMenu')
  }

  getDataOfCms(){
    
  }
  
}
