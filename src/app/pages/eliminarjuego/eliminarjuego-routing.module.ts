import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarjuegoPage } from './eliminarjuego.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarjuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarjuegoPageRoutingModule {}
