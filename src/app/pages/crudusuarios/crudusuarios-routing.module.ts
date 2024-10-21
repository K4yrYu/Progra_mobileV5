import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudusuariosPage } from './crudusuarios.page';

const routes: Routes = [
  {
    path: '',
    component: CrudusuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudusuariosPageRoutingModule {}
