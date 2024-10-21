import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudconsolasPageRoutingModule } from './crudconsolas-routing.module';

import { CrudconsolasPage } from './crudconsolas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudconsolasPageRoutingModule
  ],
  declarations: [CrudconsolasPage]
})
export class CrudconsolasPageModule {}
