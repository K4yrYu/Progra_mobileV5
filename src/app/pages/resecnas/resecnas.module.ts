import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResecnasPageRoutingModule } from './resecnas-routing.module';

import { ResecnasPage } from './resecnas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResecnasPageRoutingModule
  ],
  declarations: [ResecnasPage]
})
export class ResecnasPageModule {}
