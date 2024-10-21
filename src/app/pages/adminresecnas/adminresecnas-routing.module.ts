import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminresecnasPage } from './adminresecnas.page';

const routes: Routes = [
  {
    path: '',
    component: AdminresecnasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminresecnasPageRoutingModule {}
