import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguridadusuarioPageRoutingModule } from './seguridadusuario-routing.module';

import { SeguridadusuarioPage } from './seguridadusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguridadusuarioPageRoutingModule
  ],
  declarations: [SeguridadusuarioPage]
})
export class SeguridadusuarioPageModule {}
