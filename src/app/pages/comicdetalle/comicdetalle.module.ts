import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicdetallePageRoutingModule } from './comicdetalle-routing.module';

import { ComicdetallePage } from './comicdetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicdetallePageRoutingModule
  ],
  declarations: [ComicdetallePage]
})
export class ComicdetallePageModule {}
