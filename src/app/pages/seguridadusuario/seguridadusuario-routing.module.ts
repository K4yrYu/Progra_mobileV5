import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguridadusuarioPage } from './seguridadusuario.page';

const routes: Routes = [
  {
    path: '',
    component: SeguridadusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadusuarioPageRoutingModule {}
