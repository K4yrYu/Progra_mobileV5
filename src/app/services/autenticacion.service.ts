import { Injectable } from '@angular/core';
import { ManejodbService } from './manejodb.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(
    private bd: ManejodbService,
    private router: Router
  ) {}

  async cerrarSesion() {
    try {
      await this.bd.actualizarEstadoUsuario2(); // Actualiza el estado del usuario en sesión
      await this.bd.cerrarSesion(); // Cambia el estado de userlogged a 0
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }

  /////////////////extras

  async obtenerUsuarioActual(): Promise<any> {
    try {
      const usuarioLogueado = await this.bd.obtenerUsuarioLogueado();
      if (usuarioLogueado) {
        return usuarioLogueado;
      } else {
        console.error('No hay ningún usuario logueado.');
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo el usuario actual:', error);
      return null;
    }
  }
  


  
}
