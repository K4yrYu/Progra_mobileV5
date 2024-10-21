import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioclavePageRoutingModule } from './cambioclave-routing.module';

import { CambioclavePage } from './cambioclave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioclavePageRoutingModule
  ],
  declarations: [CambioclavePage]
})
export class CambioclavePageModule {}
