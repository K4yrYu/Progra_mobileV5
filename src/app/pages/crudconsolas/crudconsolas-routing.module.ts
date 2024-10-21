import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudconsolasPage } from './crudconsolas.page';

const routes: Routes = [
  {
    path: '',
    component: CrudconsolasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudconsolasPageRoutingModule {}
