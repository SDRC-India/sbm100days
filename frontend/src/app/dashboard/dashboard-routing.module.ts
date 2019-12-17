import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThematicDashboardComponent } from './thematic-dashboard/thematic-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard/index-view',
    component: ThematicDashboardComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
