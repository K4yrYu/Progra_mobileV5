import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarjuegoPage } from './agregarjuego.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarjuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarjuegoPageRoutingModule {}
