import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialventasPageRoutingModule } from './historialventas-routing.module';

import { HistorialventasPage } from './historialventas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialventasPageRoutingModule
  ],
  declarations: [HistorialventasPage]
})
export class HistorialventasPageModule {}
