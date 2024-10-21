import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudjuguetesPage } from './crudjuguetes.page';

const routes: Routes = [
  {
    path: '',
    component: CrudjuguetesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudjuguetesPageRoutingModule {}
