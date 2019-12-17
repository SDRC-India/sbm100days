import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  formFieldsAll: any;
  typeDetails: any;
  areaDetails: any;  
  allTypes: any;
  editUserDetails: any;
  resetPasswordDetails: any={};
  constructor(private httpClient: HttpClient) { }

  getUserRoles(){
    return this.httpClient.get(Constants.HOME_URL + 'getAllDesignations');   
  }
  getAreaDetails(){
    return this.httpClient.get(Constants.HOME_URL + 'getAllArea');   
  }
  // getTypes(){
  //   return this.httpClient.get(Constants.HOME_URL + 'getTypes');   
  // }
  getTypeDetails(){
    return this.httpClient.get(Constants.HOME_URL + 'getTypeDetails');   
  }
  getUsersByRoleIdAreaId(roleId, areaId){
    return this.httpClient.get(Constants.HOME_URL + 'getUsers?roleId='+roleId+'&areaId='+areaId)
  }
  getElementBySbmId(areaDetails, sbmAreaId){
    let areaJson;
    for (let i = 0; i < Object.keys(areaDetails).length; i++) {
      const key = Object.keys(areaDetails)[i];;
      areaDetails[key].forEach(element => {
        if(element.sbmAreaId == sbmAreaId){
          areaJson = element;
        }
      });
    }
    return areaJson;
  }
}
