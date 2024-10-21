import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidretiroPage } from './validretiro.page';

const routes: Routes = [
  {
    path: '',
    component: ValidretiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidretiroPageRoutingModule {}
