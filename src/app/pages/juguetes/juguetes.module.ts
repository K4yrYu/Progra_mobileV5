import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuguetesPageRoutingModule } from './juguetes-routing.module';

import { JuguetesPage } from './juguetes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuguetesPageRoutingModule
  ],
  declarations: [JuguetesPage]
})
export class JuguetesPageModule {}
