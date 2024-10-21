import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarjuegoPage } from './editarjuego.page';

const routes: Routes = [
  {
    path: '',
    component: EditarjuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarjuegoPageRoutingModule {}
