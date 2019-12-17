import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OrganisationalStructureComponent } from './organisational-structure/organisational-structure.component';
import { SosoComponent } from './soso/soso.component';
import { AboutSideMenuComponent } from './about-side-menu/about-side-menu.component';
import { SustainableComponent } from './sustainable/sustainable.component';
import { WaterSanitationComponent } from './water-sanitation/water-sanitation.component';
import { DocumentsComponent } from './documents/documents.component';

@NgModule({
  declarations: [TermsOfUseComponent, PrivacyPolicyComponent, DisclaimerComponent, SitemapComponent, AboutUsComponent, OrganisationalStructureComponent, SosoComponent, AboutSideMenuComponent, SustainableComponent, WaterSanitationComponent, DocumentsComponent],
  imports: [
    CommonModule,
    StaticRoutingModule
  ]
})
export class StaticModule { }
