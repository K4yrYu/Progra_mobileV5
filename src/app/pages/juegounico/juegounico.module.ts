import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegounicoPageRoutingModule } from './juegounico-routing.module';

import { JuegounicoPage } from './juegounico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegounicoPageRoutingModule
  ],
  declarations: [JuegounicoPage]
})
export class JuegounicoPageModule {}
