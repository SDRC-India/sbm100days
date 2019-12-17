import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants';
import { UserManagementService } from '../services/user-management.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {  
  form: FormGroup;
  formFields: any;
  sdrcForm: FormGroup;
  
  payLoad = '';
  
  natAreaDetails: any;
  stateList: any;
  parentAreaId: number;
  paramModal: any;
  validationMsg: any;
  btnDisable: boolean = false;
  UserForm:FormGroup;
  firstFieldVariable:any;
  selectedRoleId: number;
  selectedStateId: number;
  selectedDistrictId:number;
  selectedBlockId: number;
  selectedUserTypeId: number;
  selectedGramPanchayatId: number;

  fullName: string;
  userName: string;
  password: string;
  mobile: number;

  userManagementService: UserManagementService;
  
  constructor(private http: HttpClient, private userManagementProvider: UserManagementService, private spinner: NgxSpinnerService) {
    this.userManagementService = userManagementProvider;
   }

  ngOnInit() {    
    if(!this.userManagementService.formFieldsAll)
      this.userManagementService.getUserRoles().subscribe(data=>{
        this.userManagementService.formFieldsAll = data;      
      }) 
    if(!this.userManagementService.areaDetails)   
      this.userManagementService.getAreaDetails().subscribe(data=>{
        this.userManagementService.areaDetails = data;      
      })         
    if(!this.userManagementService.typeDetails) 
      this.userManagementService.getTypeDetails().subscribe(data=>{
        this.userManagementService.typeDetails = data;      
      }) 
      
    if((window.innerWidth)<= 767){
      $(".left-list").attr("style", "display: none !important"); 
      $('.mob-left-list').attr("style", "display: block !important");
    }
  }
 
  submitForm(roleId:any, form: NgForm){ 
    let area;
    if(roleId == 5 ){
      area = this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, this.selectedGramPanchayatId);
    }
    if(roleId == 3 ){
      area = this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, this.selectedBlockId);
    }
    if(roleId == 2){
      area = this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, this.selectedDistrictId);
    }
    if(roleId == 1){
      area = {areaId: 2};
    }
    
     let userDetails = {
      "userName":this.userName,
      "password":this.password,
      "designationIds":[roleId],
      "mblNo":this.mobile,
      "areaId":area.areaId,
      "name":this.fullName,
      "typeDetailsId":this.selectedUserTypeId
     }
     this.spinner.show();
     this.http.post(Constants.HOME_URL+'createUser', userDetails).subscribe((data) => {
       this.spinner.hide();    
       this.validationMsg = data;    
        $("#successMatch").modal('show');       
        form.resetForm();
     }, err=>{
      this.spinner.hide(); 
      $("#oldPassNotMatch").modal('show');
      if(err.status == 409){
        this.validationMsg = "Username already taken, try another"
      }
      else
        this.validationMsg = "Some server error occured"

    });
  }
  successModal(){
    $("#successMatch").modal('hide');
  }

  showLists(){    
    $(".left-list").attr("style", "display: block !important"); 
    $('.mob-left-list').attr("style", "display: none !important");
  }
  ngAfterViewInit(){
    $("input, textarea, .select-dropdown").focus(function() {
      $(this).closest(".input-holder").parent().find("> label").css({"color": "#4285F4"})
      
    })
    $("input, textarea, .select-dropdown").blur(function(){
      $(this).closest(".input-holder").parent().find("> label").css({"color": "#333"})
    })
    $('body,html').click(function(e){   
      if((window.innerWidth)<= 767){
      if(e.target.className == "mob-left-list"){
        return;
      } else{ 
          $(".left-list").attr("style", "display: none !important"); 
          $('.mob-left-list').attr("style", "display: block !important");  
      }
     }
    });   
  }

}
