import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsolaunicaPageRoutingModule } from './consolaunica-routing.module';

import { ConsolaunicaPage } from './consolaunica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsolaunicaPageRoutingModule
  ],
  declarations: [ConsolaunicaPage]
})
export class ConsolaunicaPageModule {}
