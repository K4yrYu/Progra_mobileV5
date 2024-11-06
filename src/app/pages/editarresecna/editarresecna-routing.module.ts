import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarresecnaPage } from './editarresecna.page';

const routes: Routes = [
  {
    path: '',
    component: EditarresecnaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarresecnaPageRoutingModule {}
