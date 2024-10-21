import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarconsolaPageRoutingModule } from './agregarconsola-routing.module';

import { AgregarconsolaPage } from './agregarconsola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarconsolaPageRoutingModule
  ],
  declarations: [AgregarconsolaPage]
})
export class AgregarconsolaPageModule {}
