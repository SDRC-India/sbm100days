import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaticPageService } from '../services/static-page.service';
import { Constants } from '../../../constants';
declare var $:any;

@Component({
  selector: 'app-key-contacts',
  templateUrl: './key-contacts.component.html',
  styleUrls: ['./key-contacts.component.scss']
})
export class KeyContactsComponent implements OnInit {
  router: Router;
    
  keycontactDistrictData: any;
  keycontactDistrictSection:  any = {};
  keycontactDistrictDetails: any[] = [];
  keycontactDistrictDetail: any[] = [];
  districtType: any;
  districtroleType: any;
  districtTableData: any;
  districtSections: any = {};
  showDistrictTableData: Boolean = false;

  keycontactNationalData:any;
  keycontactNationalSection: any[] = [];
  keycontactNationalDetails: any[] = [];
  
  keycontacts: any;
  tableSections: any = {};

  keycontactStateData:any;
  keycontactStateSection:  any = {};
  keycontactStateDetails: any[] = [];
  stateTableData: any;
  stateSections: any = {};
  showStateTableData: boolean = false;
  stateType:any;

  isDesc:any;
  column :any;
  direction:number;
  p: number = 1;
  showNational: Boolean = true;
  showState: Boolean = false;
  showDistrict: Boolean = false;
  searchTexts: any;
  constructor(router:Router,private keycontactservice:StaticPageService) { 
    this.router = router;
  }

  ngOnInit() {
    // show national level key contacts
    this.keycontactservice.getData("Key Contacts National Level").subscribe(data=>{
      this.keycontactNationalData=data;
      this.keycontactNationalDetails = this.keycontactNationalData.viewContent.english;
      for(var i=0;i<this.keycontactNationalDetails.length;i++)
      {
        this.keycontactNationalSection= this.keycontactNationalDetails[i].keyContacts;
      }
  })
// show state level key contacts
  this.keycontactservice.getData("Key Contacts State Level").subscribe(data=>{
    this.keycontactStateData=data;
    this.keycontactStateDetails = this.keycontactStateData.viewContent.english;
    for(var i=0;i<this.keycontactStateDetails.length;i++)
    {
      this.stateSections[this.keycontactStateDetails[i].section] = this.keycontactStateDetails[i];
    }
})
// show district level key contacts
    this.keycontactservice.getData("Key Contacts District Level").subscribe(data=>{
      this.keycontactDistrictData = data;
      this.keycontactDistrictDetails = this.keycontactDistrictData.viewContent.english;
      for(var i=0;i<this.keycontactDistrictDetails.length;i++)
      {
        this.districtSections[this.keycontactDistrictDetails[i].section] = this.keycontactDistrictDetails[i];
      }
  })
  }

// show state level key contacts
  selectType(type){
    this.stateType = type.section;
    this.showStateTableData = false;
    let sectionStateKeys = Object.keys(this.stateSections);
    for(let i=0; i<= sectionStateKeys.length;i++){
      if(sectionStateKeys[i] == this.stateType){
        this.stateTableData = this.stateSections[sectionStateKeys[i]].keyContacts;
      }
    }
    this.showStateTableData = true;
  }

// show district level key contacts
  selectDistrictType(type){
    this.districtType = type.section;
    this.districtroleType = "";
    this.districtroleType = undefined;
    this.showDistrictTableData = false;
    let sectionKeys = Object.keys(this.districtSections);
    for(let i=0; i<= sectionKeys.length;i++){
      if(sectionKeys[i] == this.districtType){
        for(var j=0; j<this.keycontactDistrictDetails.length;j++)
        {
          this.keycontactDistrictSection= this.keycontactDistrictDetails[j].keyContactRoles;
          this.tableSections[this.keycontactDistrictSection[j].section] = this.keycontactDistrictSection[j];
        }
      }
    }
  }

  selectroleType(type){
    this.districtroleType = type;
    this.showDistrictTableData = false;
    let tempTableData = this.keycontactDistrictDetails.filter(d=>d.section == this.districtType)[0].keyContactRoles;
    this.districtTableData = tempTableData.filter(d=>d.section == this.districtroleType)[0].keyContacts;
    this.showDistrictTableData = true;
  }


// show national level key contacts
  showNationalKeyContacts() {
    this.searchTexts = "";
    this.showNational = true;
    this.showState = false;
    this.showDistrict = false;
  }
  // show state level key contacts
  showStateKeyContacts(){
    this.searchTexts = "";
    this.showNational = false;
    this.showState = true;
    this.showDistrict = false;
    this.showDistrictTableData = false;
    this.districtType = "";
    this.districtType = undefined;
    this.districtroleType = "";
    this.districtroleType = undefined;
  }
// show district level key contacts
  showDistrictKeyContacts() {
    this.searchTexts = "";
    this.showNational = false;
    this.showState = false;
    this.showDistrict = true;
    this.showStateTableData = false;
    this.stateType = "";
    this.stateType = undefined;
  }

  ngAfterViewInit(){
    $("input, textarea, .select-dropdown").focus(function() {
      $(this).closest(".input-holder").parent().find("> label").css({"color": "#4285F4"})
      
    })
    $("input, textarea, .select-dropdown").blur(function(){
      $(this).closest(".input-holder").parent().find("> label").css({"color": "#333"})
    })
  }

}
