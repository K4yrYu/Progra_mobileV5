import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResecnasPage } from './resecnas.page';

const routes: Routes = [
  {
    path: '',
    component: ResecnasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResecnasPageRoutingModule {}
