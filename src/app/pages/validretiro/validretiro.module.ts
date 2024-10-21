import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidretiroPageRoutingModule } from './validretiro-routing.module';

import { ValidretiroPage } from './validretiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidretiroPageRoutingModule
  ],
  declarations: [ValidretiroPage]
})
export class ValidretiroPageModule {}
