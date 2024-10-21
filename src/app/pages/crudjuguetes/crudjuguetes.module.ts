import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudjuguetesPageRoutingModule } from './crudjuguetes-routing.module';

import { CrudjuguetesPage } from './crudjuguetes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudjuguetesPageRoutingModule
  ],
  declarations: [CrudjuguetesPage]
})
export class CrudjuguetesPageModule {}
