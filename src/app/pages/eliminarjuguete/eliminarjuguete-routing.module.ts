import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarjuguetePage } from './eliminarjuguete.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarjuguetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarjuguetePageRoutingModule {}
