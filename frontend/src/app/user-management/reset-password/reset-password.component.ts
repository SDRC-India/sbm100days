import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http/';
import { UserManagementService } from '../services/user-management.service';
import { Constants } from '../../constants';
import { Router, RoutesRecognized } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, pairwise } from 'rxjs/operators';

declare var $: any;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  formFields: any;
  formFieldsAll: any;
  payLoad = '';
  areaDetails: any;  

  newPassword: string;
  confirmPassword: string;
  userId: any;
  validationMsg: any;
  user: any;
  disableUserId: number;
 
  userManagementService: UserManagementService;

  constructor(private http: HttpClient, private userManagementProvider: UserManagementService, private router: Router, private spinner: NgxSpinnerService,) {
    this.userManagementService = userManagementProvider;
   }

  ngOnInit() {
    this.router.events
    .pipe(filter((e: any) => e instanceof RoutesRecognized))
    .subscribe((e: any) => {
        console.log(e); // previous url
        if(this.router.url =="/reset-password" &&e.url != '/edit-user' ){
          this.userManagementService.resetPasswordDetails ={};
        }
    });
    
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
    if(this.userManagementService.resetPasswordDetails.selectedRoleId)
    this.getUsers();   
  }

 getUsers(){
    let sbmAreaId =  this.userManagementService.resetPasswordDetails.selectedGramPanchayatId ? this.userManagementService.resetPasswordDetails.selectedGramPanchayatId: this.userManagementService.resetPasswordDetails.selectedBlockId ? this.userManagementService.resetPasswordDetails.selectedBlockId: this.userManagementService.resetPasswordDetails.selectedDistrictId ? this.userManagementService.resetPasswordDetails.selectedDistrictId: 18;
    let area = this.userManagementService.getElementBySbmId(this.userManagementService.areaDetails, sbmAreaId)
    this.spinner.show();
    this.userManagementService.getUsersByRoleIdAreaId(this.userManagementService.resetPasswordDetails.selectedRoleId, area.areaId).subscribe(res => {
      this.userManagementService.resetPasswordDetails.allUser  = res;
      this.spinner.hide();
      console.log(this.userManagementService.resetPasswordDetails.allUser);
    })
 }
 resetModal(user){
   $("#resetPassModal").modal('show');
  this.user = user;
 }
 resetBox(user){
  this.newPassword = "";
  this.confirmPassword = "";
 }
 submitModal(form:NgForm){   

  let passDetails = {
    'userId' : this.user.userId,
    'newPassword': this.newPassword
  };

 if(this.newPassword === this.confirmPassword) {
  this.spinner.show();
    this.http.post(Constants.HOME_URL + 'resetPassword', passDetails).subscribe((data)=>{  
        $("#resetPassModal").modal('hide');
        $("#successMatch").modal('show');
        this.newPassword = "";
        this.confirmPassword = "";
        this.userManagementService.resetPasswordDetails.allUser = undefined;      
        this.spinner.hide();
    }, err=>{
      $("#oldPassNotMatch").modal('show');
      this.validationMsg ="Error occurred";
      this.spinner.hide();
    });
  }
}
editUserDetails(data){
  this.userManagementService.editUserDetails = data;  
  this.router.navigateByUrl("edit-user");
}
enableUser(id){
  this.spinner.show();
  this.http.get(Constants.HOME_URL + 'enableUser?userId='+id).subscribe((data)=>{
    $("#enableUser").modal('show'); 
    this.validationMsg = data;
    this.spinner.hide();     
  }, err=>{      
    this.spinner.hide();     
  }); 
}
disableUser(id){
  this.disableUserId = id;
  $("#disableUserModal").modal('show');
}
disableUserDetails(id){
  this.spinner.show();   
  this.http.get(Constants.HOME_URL +'disableUser?userId='+id).subscribe((data)=>{   
   $("#disableUserModal").modal('hide');
   $("#enableUser").modal('show'); 
     this.validationMsg = data;        
     this.spinner.hide();       
   }, err=>{      
     console.log(err);       
     $("#disableUserModal").modal('hide');     
     this.spinner.hide();    
   }); 
}
userStatus(){
  $("#enableUser").modal('hide'); 
  this.getUsers();
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
