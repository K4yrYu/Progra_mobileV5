import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarperfilPageRoutingModule } from './modificarperfil-routing.module';

import { ModificarperfilPage } from './modificarperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarperfilPageRoutingModule
  ],
  declarations: [ModificarperfilPage]
})
export class ModificarperfilPageModule {}
