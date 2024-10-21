import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarusuarioPage } from './eliminarusuario.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarusuarioPageRoutingModule {}
