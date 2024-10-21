import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarayudaclientePageRoutingModule } from './administrarayudacliente-routing.module';

import { AdministrarayudaclientePage } from './administrarayudacliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarayudaclientePageRoutingModule
  ],
  declarations: [AdministrarayudaclientePage]
})
export class AdministrarayudaclientePageModule {}
