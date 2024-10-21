import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarconsolaPage } from './eliminarconsola.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarconsolaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarconsolaPageRoutingModule {}
