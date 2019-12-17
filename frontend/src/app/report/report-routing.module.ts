import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { RoleGuardGuard } from '../guard/role-guard.guard';

const routes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    pathMatch: 'full',
    canActivate: [RoleGuardGuard],
    data: { 
      expectedRoles: ["report_HAVING_read"]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
