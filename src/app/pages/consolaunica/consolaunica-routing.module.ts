import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsolaunicaPage } from './consolaunica.page';

const routes: Routes = [
  {
    path: '',
    component: ConsolaunicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsolaunicaPageRoutingModule {}
