import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarjuguetePageRoutingModule } from './agregarjuguete-routing.module';

import { AgregarjuguetePage } from './agregarjuguete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarjuguetePageRoutingModule
  ],
  declarations: [AgregarjuguetePage]
})
export class AgregarjuguetePageModule {}
