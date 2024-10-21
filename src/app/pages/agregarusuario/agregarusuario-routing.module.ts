import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarusuarioPage } from './agregarusuario.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarusuarioPageRoutingModule {}
