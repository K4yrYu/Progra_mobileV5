import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarusuarioPageRoutingModule } from './editarusuario-routing.module';

import { EditarusuarioPage } from './editarusuario.page';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarusuarioPageRoutingModule,
    MatInputModule,        // Importa MatInputModule aquí
    MatSelectModule,       // Importa MatSelectModule aquí
    MatFormFieldModule     // Importa MatFormFieldModule aquí
  ],
  declarations: [EditarusuarioPage]
})
export class EditarusuarioPageModule {}
