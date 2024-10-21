import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudjuegosPage } from './crudjuegos.page';

const routes: Routes = [
  {
    path: '',
    component: CrudjuegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudjuegosPageRoutingModule {}
