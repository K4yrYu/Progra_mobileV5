import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarperfilPage } from './modificarperfil.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarperfilPageRoutingModule {}
