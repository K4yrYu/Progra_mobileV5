import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsolasPageRoutingModule } from './consolas-routing.module';

import { ConsolasPage } from './consolas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsolasPageRoutingModule
  ],
  declarations: [ConsolasPage]
})
export class ConsolasPageModule {}
