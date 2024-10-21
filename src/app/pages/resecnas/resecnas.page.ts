import { Component, OnInit } from '@angular/core';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-resecnas',
  templateUrl: './resecnas.page.html',
  styleUrls: ['./resecnas.page.scss'],
})
export class ResecnasPage implements OnInit {
  resecnas: any[] = [];

  constructor(private manejodbService: ManejodbService) {}

  async ngOnInit() {
    await this.cargarResecnas();
  }

  async cargarResecnas() {
    try {
      const idUsuario = await this.manejodbService.obtenerIdUsuarioLogueado();
      if (idUsuario) {
        this.resecnas = await this.manejodbService.obtenerResecnasUsuario(idUsuario);
      } else {
        console.warn('No hay usuario logueado.');
      }
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  }

  async actualizarResecnas(event: any) {
    await this.cargarResecnas();
    event.target.complete(); // Finaliza la animación del refresher.
  }

  async eliminarResena(idR: any) {
    await this.manejodbService.eliminarResecnasUsuario(idR);
    await this.cargarResecnas(); // Actualiza la lista después de eliminar
  }
}
