import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialcomprasPageRoutingModule } from './historialcompras-routing.module';

import { HistorialcomprasPage } from './historialcompras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialcomprasPageRoutingModule
  ],
  declarations: [HistorialcomprasPage]
})
export class HistorialcomprasPageModule {}
