import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuguetesPage } from './juguetes.page';

const routes: Routes = [
  {
    path: '',
    component: JuguetesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuguetesPageRoutingModule {}
