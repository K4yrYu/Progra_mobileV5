import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarayudaclientePage } from './administrarayudacliente.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarayudaclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarayudaclientePageRoutingModule {}
