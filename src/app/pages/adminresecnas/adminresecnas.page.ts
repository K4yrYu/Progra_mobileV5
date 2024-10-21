import { Component, OnInit } from '@angular/core';
import { ManejodbService } from 'src/app/services/manejodb.service';
import { Resecnascrud } from 'src/app/services/resecnascrud';

@Component({
  selector: 'app-adminresecnas',
  templateUrl: './adminresecnas.page.html',
  styleUrls: ['./adminresecnas.page.scss'],
})
export class AdminresecnasPage implements OnInit {

  arregloResecnasPalCrud: Resecnascrud[] = []; // Inicia como un arreglo vacío

  constructor(private bd: ManejodbService) { }

  async ngOnInit() {
    // Verificar si la BD está disponible
    this.bd.dbState().subscribe(data => {
      if (data) {
        // Llama a obtenerResecnas desde el servicio
        this.traeLaWa2(); // Cargar las reseñas al iniciar
      }
    });
  }

  async traeLaWa2() {
    this.arregloResecnasPalCrud = await this.bd.obtenerResecnas();
  }

  // Método para eliminar reseña
  async eliminarResecna(rsc: Resecnascrud) {
    await this.bd.eliminarResecnas(rsc.id_resecna).then(() => {
      // Actualizar la lista de reseñas después de eliminar
      this.traeLaWa2(); // Refrescar la lista de reseñas
    });
  }
}
