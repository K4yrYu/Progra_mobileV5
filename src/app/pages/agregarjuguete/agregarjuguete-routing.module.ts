import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarjuguetePage } from './agregarjuguete.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarjuguetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarjuguetePageRoutingModule {}
