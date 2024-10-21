import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugueteunicoPage } from './jugueteunico.page';

const routes: Routes = [
  {
    path: '',
    component: JugueteunicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugueteunicoPageRoutingModule {}
