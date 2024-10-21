import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarjuegoPageRoutingModule } from './editarjuego-routing.module';

import { EditarjuegoPage } from './editarjuego.page';

// Importaciones necesarias para Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarjuegoPageRoutingModule,
    MatInputModule,        // Importa MatInputModule aquí
    MatSelectModule,       // Importa MatSelectModule aquí
    MatFormFieldModule     // Importa MatFormFieldModule aquí
  ],
  declarations: [EditarjuegoPage]
})
export class EditarjuegoPageModule {}
