import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadeseosPageRoutingModule } from './listadeseos-routing.module';

import { ListadeseosPage } from './listadeseos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadeseosPageRoutingModule
  ],
  declarations: [ListadeseosPage]
})
export class ListadeseosPageModule {}
