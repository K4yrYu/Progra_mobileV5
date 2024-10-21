import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudusuariosPageRoutingModule } from './crudusuarios-routing.module';

import { CrudusuariosPage } from './crudusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudusuariosPageRoutingModule
  ],
  declarations: [CrudusuariosPage]
})
export class CrudusuariosPageModule {}
