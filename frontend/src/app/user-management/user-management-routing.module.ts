import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RoleGuardGuard } from '../guard/role-guard.guard';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';

const routes: Routes = [

      
      { 
        path: 'user-management', 
        pathMatch: 'full', 
        component: UserManagementComponent,
        canActivate: [RoleGuardGuard],
        data: { 
          expectedRoles: ["usermgmt_HAVING_write"]
        }
      },
      { 
        path: 'reset-password', 
        pathMatch: 'full', 
        component: ResetPasswordComponent,
        canActivate: [RoleGuardGuard],
        data: { 
          expectedRoles: ["usermgmt_HAVING_write"]
        }
      },
      { 
        path: 'edit-user', 
        pathMatch: 'full', 
        component: EditUserDetailsComponent,
        canActivate: [RoleGuardGuard],
        data: { 
          expectedRoles: ["usermgmt_HAVING_write"]
        }
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
