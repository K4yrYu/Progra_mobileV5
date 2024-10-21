import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarconsolaPageRoutingModule } from './eliminarconsola-routing.module';

import { EliminarconsolaPage } from './eliminarconsola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarconsolaPageRoutingModule
  ],
  declarations: [EliminarconsolaPage]
})
export class EliminarconsolaPageModule {}
