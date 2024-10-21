import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsolasPage } from './consolas.page';

const routes: Routes = [
  {
    path: '',
    component: ConsolasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsolasPageRoutingModule {}
