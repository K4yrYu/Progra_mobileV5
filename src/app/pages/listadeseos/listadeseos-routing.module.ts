import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadeseosPage } from './listadeseos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadeseosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadeseosPageRoutingModule {}
