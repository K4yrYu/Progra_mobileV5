import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importaciones necesarias para Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

// Importaciones necesarias para SQLite
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,  // Requerido para Angular Material
    MatInputModule,           // Módulo para usar <mat-input>
    MatSelectModule,          // Módulo para usar <mat-select>
    MatFormFieldModule,       // Módulo para usar <mat-form-field>
    FormsModule,
    HttpClientModule               // Requerido para trabajar con formularios               // Requerido para trabajar con formularios
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite                    // Asegúrate de incluir SQLite
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
