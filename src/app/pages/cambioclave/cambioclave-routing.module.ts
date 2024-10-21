import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioclavePage } from './cambioclave.page';

const routes: Routes = [
  {
    path: '',
    component: CambioclavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioclavePageRoutingModule {}
