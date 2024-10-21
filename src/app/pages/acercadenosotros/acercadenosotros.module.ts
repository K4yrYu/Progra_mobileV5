import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcercadenosotrosPageRoutingModule } from './acercadenosotros-routing.module';

import { AcercadenosotrosPage } from './acercadenosotros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcercadenosotrosPageRoutingModule
  ],
  declarations: [AcercadenosotrosPage]
})
export class AcercadenosotrosPageModule {}
