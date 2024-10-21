import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugueteunicoPageRoutingModule } from './jugueteunico-routing.module';

import { JugueteunicoPage } from './jugueteunico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugueteunicoPageRoutingModule
  ],
  declarations: [JugueteunicoPage]
})
export class JugueteunicoPageModule {}
