import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarusuarioPageRoutingModule } from './eliminarusuario-routing.module';

import { EliminarusuarioPage } from './eliminarusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarusuarioPageRoutingModule
  ],
  declarations: [EliminarusuarioPage]
})
export class EliminarusuarioPageModule {}
