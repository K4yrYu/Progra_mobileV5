import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialventasPage } from './historialventas.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialventasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialventasPageRoutingModule {}
