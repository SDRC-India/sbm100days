import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OrganisationalStructureComponent } from './organisational-structure/organisational-structure.component';
import { SosoComponent } from './soso/soso.component';
import { SustainableComponent } from './sustainable/sustainable.component';
import { WaterSanitationComponent } from './water-sanitation/water-sanitation.component';
import { DocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  {
    path: 'about-us',
    component: AboutUsComponent,
    pathMatch: 'full'
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    pathMatch: 'full'
  },
  {
    path: 'organisational-structure',
    component: OrganisationalStructureComponent,
    pathMatch: 'full'
  },
  {
    path: 'soso',
    component: SosoComponent,
    pathMatch: 'full'
  },
  {
    path: 'sustainable',
    component: SustainableComponent,
    pathMatch: 'full'
  },
  {
    path: 'water-sanitation',
    component: WaterSanitationComponent,
    pathMatch: 'full'
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent,
    pathMatch: 'full'
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    pathMatch: 'full'
  },
  {
    path: 'disclaimer',
    component: DisclaimerComponent,
    pathMatch: 'full'
  },
  {
    path: 'sitemap',
    component: SitemapComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
