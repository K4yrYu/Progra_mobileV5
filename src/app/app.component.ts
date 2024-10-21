import { Component, OnInit } from '@angular/core';
import { ManejodbService } from './services/manejodb.service'; // Ajusta la ruta según sea necesario
import { Router } from '@angular/router';
import { Usuarios } from './services/usuarios';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  idRolUsuarioLogueado: number | null = null; // Almacena el rol del usuario logueado
  isLoginPage: boolean = false; // Variable para controlar si estamos en la página de login
  isRegistro: boolean = false; // Variable para controlar si estamos en la página de registro
  isCorreoRecupClave: boolean = false; // Variable para controlar si estamos en la página de recuperación de contraseña
  isCambioClave: boolean = false; // Variable para controlar si estamos en la página de cambio de contraseña

  arregloUserConected: Usuarios[] = []; // Arreglo para almacenar el usuario conectado

  constructor(private bd: ManejodbService, private router: Router) {}

  async ngOnInit() {
    // Verificar si la base de datos está lista
    this.bd.dbState().subscribe(async (data) => {
      if (data) {
        await this.cargarUsuarioConectado();
      }
    });

    // Observa los cambios de la ruta para verificar si estamos en las páginas relevantes
    this.router.events.subscribe((event) => {
      const currentUrl = this.router.url;

      // Actualiza las variables según la ruta actual
      this.isLoginPage = currentUrl === '/login';
      this.isRegistro = currentUrl === '/registro';
      this.isCorreoRecupClave = currentUrl === '/recuperar'; // Ajusta según la ruta real
      this.isCambioClave = currentUrl === '/cambioclave'; // Ajusta según la ruta real

      // Si estamos volviendo a la página de inicio de sesión, limpiar el arreglo
      if (this.isLoginPage) {
        this.limpiarArregloUsuario();
      } else if (!this.isRegistro && !this.isCorreoRecupClave && !this.isCambioClave) {
        this.verificarRolUsuario();
      }
    });
  }

  // Método para cargar el usuario conectado
  async cargarUsuarioConectado() {
    this.arregloUserConected = await this.bd.consultarUsuariosPorEstadoConectado();
    if (this.arregloUserConected.length > 0) {
      const usuarioLogueado = this.arregloUserConected[0]; // Solo habrá un usuario conectado
      this.idRolUsuarioLogueado = usuarioLogueado.id_rol; // Almacena el id_rol
    }
  }

  // Método para limpiar el arreglo de usuario conectado
  limpiarArregloUsuario() {
    this.arregloUserConected = [];
    this.idRolUsuarioLogueado = null; // Restablecer el rol al limpiar
  }

  // Método para verificar si el usuario es cliente
  esCliente(): boolean {
    return this.idRolUsuarioLogueado === 2; // 2 es el rol de cliente
  }

  async verificarRolUsuario() {
    if (this.arregloUserConected.length === 0) {
      await this.cargarUsuarioConectado(); // Cargar solo si el arreglo está vacío
    }
  }
}
