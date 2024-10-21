import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudjuegosPageRoutingModule } from './crudjuegos-routing.module';

import { CrudjuegosPage } from './crudjuegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudjuegosPageRoutingModule
  ],
  declarations: [CrudjuegosPage]
})
export class CrudjuegosPageModule {}
