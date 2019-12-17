import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Exception404Component } from './exception404/exception404.component';
import { LoginComponent } from './login/login.component';
import { LoggedinGuard } from './guard/loggedin.guard';
import { RegistrationComponent } from './data-entry/registration/registration.component';
import { SubmissionHomeComponent } from './data-entry/submission-home/submission-home.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },{ 
    path: 'login', 
    pathMatch: 'full', 
    component: LoginComponent,
    canActivate: [LoggedinGuard]
  },
  {
    path: 'error',
    component: Exception404Component,
    pathMatch: 'full'
  },
  {
    path: 'exception',
    component: Exception404Component,
    pathMatch: 'full'
  },
  {
    path: 'swachhagrahi',
    component: SubmissionHomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'add-swachhagrahi',
    component: RegistrationComponent,
    pathMatch: 'full'
  },

  {
    path: 'user',
    loadChildren: './user-management/user-management.module#UserManagementModule',
  },
  {
    path: 'reportModule',
    loadChildren: './report/report.module#ReportModule',
  },
  {
    path: 'DashboardModule',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  
  {
    path: 'static',
    loadChildren: './static/static.module#StaticModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
