import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants';
import { UserManagementService } from '../services/user-management.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.scss']
})

export class EditUserDetailsComponent implements OnInit {  
  form: FormGroup;
  formFields: any;
  sdrcForm: FormGroup;
  
  payLoad = '';
  
  validationMsg: any;
  UserForm:FormGroup;
  selectedDistrictId:number;
  selectedBlockId: number;
  selectedGramPanchayatId: number;
  selectedtypeDetailsId: number;


  userManagementService: UserManagementService;

  constructor(private http: HttpClient, private userManagementProvider: UserManagementService, private spinner: NgxSpinnerService, private router: Router) {
    this.userManagementService = userManagementProvider;
   }

  ngOnInit() {   
    this.spinner.show(); 
    this.router.events
    .pipe(filter((e: any) => e instanceof RoutesRecognized)
    ).subscribe((e: any) => {
        if(this.router.url =="/edit-user" && e.url != '/reset-password'){
          this.userManagementService.resetPasswordDetails ={};
        }
    }); 
    if(!this.userManagementService.editUserDetails){
      this.router.navigateByUrl("reset-password");
    }
    if(this.userManagementService.editUserDetails && this.userManagementService.editUserDetails.roleId==2){
      this.selectedDistrictId = this.userManagementService.editUserDetails.sbmAreaId;
      this.selectedtypeDetailsId = this.userManagementService.editUserDetails.typeDetailsId;
    }
    if(this.userManagementService.editUserDetails && this.userManagementService.editUserDetails.roleId==3){
      this.selectedDistrictId = (this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, this.userManagementService.editUserDetails.sbmAreaId)).parentAreaId;      
      this.selectedBlockId = this.userManagementService.editUserDetails.sbmAreaId;
      this.selectedtypeDetailsId = this.userManagementService.editUserDetails.typeDetailsId;
    }
    if(this.userManagementService.editUserDetails&&this.userManagementService.editUserDetails.roleId==5){     
      this.selectedBlockId = (this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, this.userManagementService.editUserDetails.sbmAreaId)).parentAreaId;      
      this.selectedDistrictId = (this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails,this.selectedBlockId)).parentAreaId;      
      this.selectedGramPanchayatId = this.userManagementService.editUserDetails.sbmAreaId;
      this.selectedtypeDetailsId = this.userManagementService.editUserDetails.typeDetailsId;
    }
    if(this.userManagementService.editUserDetails)
    this.selectedtypeDetailsId = this.userManagementService.editUserDetails.typeDetailsId;
    this.spinner.hide();
    if((window.innerWidth)<= 767){
      $(".left-list").attr("style", "display: none !important"); 
      $('.mob-left-list').attr("style", "display: block !important");
    }
  }

 
  updateUserDetails(roleId:any){ 

    let areaId;
    if(roleId == 5){
      areaId = (this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, this.selectedGramPanchayatId)).areaId;      
    }
    if(roleId == 3){
      areaId = (this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, this.selectedBlockId)).areaId;      
    }
    if(roleId == 2){
      areaId = (this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, this.selectedDistrictId)).areaId;      
    }
    if(roleId == 1){
      areaId = 2;
    }
    
     let userDetails = {  
      "id": this.userManagementService.editUserDetails.userId,
      "name":this.userManagementService.editUserDetails.name,
      "mblNo":this.userManagementService.editUserDetails.mobileNumber,
      "areaId":areaId,
      "role":this.userManagementService.editUserDetails.roleId,
      "typeDetailsId":this.selectedtypeDetailsId
     }
     this.spinner.show();
     this.http.post(Constants.HOME_URL+'updateUser', userDetails).subscribe((data) => {
       this.spinner.hide();    
       this.validationMsg = data;    
        $("#successMatch").modal('show');     
     }, err=>{
      this.spinner.hide(); 
      $("#oldPassNotMatch").modal('show');
      this.validationMsg = err.error;     
    });
  }
  successModal(){
    $("#successMatch").modal('hide');
    this.router.navigateByUrl("reset-password");
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

