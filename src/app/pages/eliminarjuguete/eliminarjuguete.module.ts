import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarjuguetePageRoutingModule } from './eliminarjuguete-routing.module';

import { EliminarjuguetePage } from './eliminarjuguete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarjuguetePageRoutingModule
  ],
  declarations: [EliminarjuguetePage]
})
export class EliminarjuguetePageModule {}
