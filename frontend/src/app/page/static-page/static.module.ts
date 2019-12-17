import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { routing } from './static.routing';
import { TermsofuseComponent } from './termsofuse/termsofuse.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PhotoGalleryComponent } from './gallery/photo-gallery/photo-gallery.component';
import { SubPhotoGalleryComponent } from './gallery/sub-photo-gallery/sub-photo-gallery.component';
import { VideoGalleryComponent } from './gallery/video-gallery/video-gallery.component';
import { AudioGalleryComponent } from './gallery/audio-gallery/audio-gallery.component';
import { OrderByPipe } from '../../filters/order-by.pipe';
import { SanctionorderPipe } from '../../filters/sanctionorder.pipe';
import { BestpraticePipe } from '../../filters/bestpratice.pipe';
import { GuidelinesComponent } from './resources/guidelines/guidelines.component';
import { BestpraticesComponent } from './resources/bestpratices/bestpratices.component';
import { SanctionorderComponent } from './resources/sanctionorder/sanctionorder.component';
import { NavdishareportComponent } from './resources/navdishareport/navdishareport.component';
import { ConsultationsComponent } from './resources/consultations/consultations.component';
import { ContributionPipe } from '../../filters/contribution.pipe';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqComponent } from './faq/faq.component';
import { PanelComponent } from './panel/panel.component';
import { HandoutComponent } from './handout/handout.component';
import { BrochureComponent } from './brochure/brochure.component';
import { PostersComponent } from './posters/posters.component';
import { KeyContactsComponent } from './key-contacts/key-contacts.component';
import { MyDatePickerModule } from 'mydatepicker';
import { HelpComponent } from './help/help.component';
import { OrganizationstructureComponent } from './organizationstructure/organizationstructure.component';
import { WhatsnewComponent } from './whatsnew/whatsnew.component';
import { RevalidationletterComponent } from './resources/revalidationletter/revalidationletter.component';
import { UnderconstructionComponent } from './underconstruction/underconstruction.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ActivitiesComponent } from './events-activities/activities/activities.component';
import { WhatsnewcontentComponent } from './whatsnewcontent/whatsnewcontent.component';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { StaticPageService } from './services/static-page.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from 'ng-recaptcha';
import { MeetingsComponent } from './meetings/meetings.component';
import { DocumentComponent } from './document/document.component';
import { SearchTextPipe } from './search-text.pipe';
import { BreadcrumbPaginationComponent } from './breadcrumb-pagination/breadcrumb-pagination.component';
import { ReportComponent } from './report/report.component';
import { MisComponent } from './mis/mis.component';
import { RtiComponent } from './rti/rti.component';
import { OthersComponent } from './others/others.component';
import { TrainingmoduleComponent } from './resources/trainingmodule/trainingmodule.component';




@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    NgxImageGalleryModule,
    NgxPaginationModule,
    MyDatePickerModule,
    RecaptchaModule.forRoot()
  ],
  declarations: [
    TermsofuseComponent,
    DisclaimerComponent,
    PrivacyComponent,
    AboutusComponent,
    PhotoGalleryComponent,
    SubPhotoGalleryComponent,
    VideoGalleryComponent,
    AudioGalleryComponent,
    OrderByPipe,
    SanctionorderPipe,
    BestpraticePipe,
    GuidelinesComponent,
    BestpraticesComponent,
    SanctionorderComponent,
    ConsultationsComponent,
    NavdishareportComponent,
    SanctionorderPipe,
    ContributionPipe,
    ContactusComponent,
    FaqComponent,
    BrochureComponent,
    HandoutComponent,
    PanelComponent,
    PostersComponent,
    KeyContactsComponent,
    HelpComponent,
    OrganizationstructureComponent,
    WhatsnewComponent,
    RevalidationletterComponent,
    UnderconstructionComponent,
    AchievementsComponent,
    ActivitiesComponent,
    WhatsnewcontentComponent,
    MeetingsComponent,
    DocumentComponent,
    SearchTextPipe,
    BreadcrumbPaginationComponent,
    ReportComponent,
    MisComponent,
    RtiComponent,
    OthersComponent,
    TrainingmoduleComponent,
 
],
  providers: [StaticPageService],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class StaticModule { }
