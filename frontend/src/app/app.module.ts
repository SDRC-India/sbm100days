import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { XhrInterceptorService } from './service/xhr-interceptor.service';
import { AppService } from './app.service';
import { UserService } from './service/user/user.service';
import { AuthGuard } from './guard/auth.guard';
import { SessionCheckService } from './service/session-check.service';
import { HomeComponent } from './home/home.component';
import { Exception404Component } from './exception404/exception404.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material'
import { StaticHomeService } from './service/static-home.service';
import { UserManagementModule } from './user-management/user-management.module';
import { ReportModule } from './report/report.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StaticModule } from './static/static.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RoleGuardGuard } from './guard/role-guard.guard';
import { LoggedinGuard } from './guard/loggedin.guard';
import { RegistrationComponent } from './data-entry/registration/registration.component';
import { FormModule } from 'lib/public_api';
import { MatCardModule,MatButtonModule } from '@angular/material';
import { SubmissionHomeComponent } from './data-entry/submission-home/submission-home.component';
import { TableModule } from 'lib-table/public_api';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    Exception404Component,
    LoginComponent,
    RegistrationComponent,
    
    SubmissionHomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    UserManagementModule,
    ReportModule,
    MatFormFieldModule,
    MatInputModule,
    ReportModule,
    StaticModule,
    DashboardModule,
    FormModule,
    TableModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptorService, multi: true }, AppService, UserService, AuthGuard, RoleGuardGuard, LoggedinGuard, SessionCheckService, XhrInterceptorService, StaticHomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
