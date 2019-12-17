import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import {  MatInputModule, MatIconModule, MatFormFieldModule, MatSelectModule } from '@angular/material';

import { ReactiveFormsModule,FormsModule } from '@angular/forms'; 
import { UserManagementComponent } from './user-management/user-management.component';
import { UserSideMenuComponent } from './user-side-menu/user-side-menu.component';
import { AreaFilterPipe } from './filters/area-filter.pipe';
import { UserManagementService } from './services/user-management.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormModule } from 'sdrc-form';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { FrequencyFilterPipe } from './filters/frequency-filter.pipe';

@NgModule({
  imports: [
    CommonModule
    //,HttpModule
    //,HttpClientModule
    ,FormsModule
    ,UserManagementRoutingModule
    ,ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormModule
    
  ],
  declarations: [
    UserManagementComponent,
    ResetPasswordComponent,
    UserSideMenuComponent,
    AreaFilterPipe,
    EditUserDetailsComponent,
    FrequencyFilterPipe
  ],
  providers:[UserManagementService]
})
export class UserManagementModule { }
