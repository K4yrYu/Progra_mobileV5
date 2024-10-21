import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarusuarioPageRoutingModule } from './agregarusuario-routing.module';

import { AgregarusuarioPage } from './agregarusuario.page';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarusuarioPageRoutingModule,
    MatInputModule,        // Importa MatInputModule aquí
    MatSelectModule,       // Importa MatSelectModule aquí
    MatFormFieldModule     // Importa MatFormFieldModule aquí
  ],
  declarations: [AgregarusuarioPage]
})
export class AgregarusuarioPageModule {}
