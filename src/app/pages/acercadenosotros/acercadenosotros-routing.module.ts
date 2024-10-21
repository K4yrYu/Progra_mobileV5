import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcercadenosotrosPage } from './acercadenosotros.page';

const routes: Routes = [
  {
    path: '',
    component: AcercadenosotrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcercadenosotrosPageRoutingModule {}
