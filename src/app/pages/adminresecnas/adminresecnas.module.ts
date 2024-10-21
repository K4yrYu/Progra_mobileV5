import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminresecnasPageRoutingModule } from './adminresecnas-routing.module';

import { AdminresecnasPage } from './adminresecnas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminresecnasPageRoutingModule
  ],
  declarations: [AdminresecnasPage]
})
export class AdminresecnasPageModule {}
