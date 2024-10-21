import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarconsolaPage } from './agregarconsola.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarconsolaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarconsolaPageRoutingModule {}
