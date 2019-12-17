import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ResourcesGuidelinesComponent } from './resources-guidelines/resources-guidelines.component';
import { ContentSectionComponent } from './content-section/content-section.component';


export const routes: Routes = [
    { path: 'guidelines', pathMatch: 'full', component: ResourcesGuidelinesComponent},
    { path: '', pathMatch: 'full', component: ContentSectionComponent},
  ];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
