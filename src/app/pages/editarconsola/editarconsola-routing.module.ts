import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarconsolaPage } from './editarconsola.page';

const routes: Routes = [
  {
    path: '',
    component: EditarconsolaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarconsolaPageRoutingModule {}
