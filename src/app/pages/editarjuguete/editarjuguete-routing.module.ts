import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarjuguetePage } from './editarjuguete.page';

const routes: Routes = [
  {
    path: '',
    component: EditarjuguetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarjuguetePageRoutingModule {}
