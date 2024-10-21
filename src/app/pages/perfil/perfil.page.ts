import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ManejodbService } from 'src/app/services/manejodb.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ViewWillEnter } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, ViewWillEnter {

  // Definir la variable que contendrá los datos del usuario conectado
  arregloUsuarioConectado: any = [
    {
      id_usuario: '',
      rut_usuario: '',
      nombres_usuario: '',
      apellidos_usuario: '',
      username: '',
      clave: '',
      correo: '',
      token_recup_clave: '',
      foto_usuario: '',
      estado_user: '',
      userlogged: '',
      mantener_sesion: 0, // Cambiado a un valor numérico
      id_rol: ''
    }
  ];

  // Variable para mantener la sesión activa
  mantenerSesionActivo: boolean = false;

  constructor(
    private bd: ManejodbService,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private cdr: ChangeDetectorRef
  ) {}

  async ionViewWillEnter() {
    await this.consultarUsuarios(); // Cargar usuarios cada vez que se entra a la vista
    this.cdr.detectChanges(); // Forzar la detección de cambios para reflejar la imagen actualizada
  }

  ngOnInit() {
    // Verificar si la base de datos está lista
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.consultarUsuarios(); // Cargar usuarios cuando la base de datos esté lista
      }
    });
  }

  // Función para consultar los usuarios conectados
  async consultarUsuarios() {
    try {
      this.arregloUsuarioConectado = await this.bd.consultarUsuariosPorEstadoConectado();
      if (this.arregloUsuarioConectado.length > 0) {
        // Cambia esta línea para que se verifique el valor de mantener_sesion
        this.mantenerSesionActivo = this.arregloUsuarioConectado[0].mantener_sesion === 1; // Usa el valor correcto aquí (1 para true)
      }
    } catch (error) {
      console.error('Error al consultar usuarios por estado:', error);
    }
  }

  getImagenUsuario(foto: string | null): string {
    return foto ? foto : 'assets/img/user_default_photo.jpg';
  }

  async cerrarSesion() {
    try {
      await this.autenticacionService.cerrarSesion();
      this.arregloUsuarioConectado = []; // Limpiar el arreglo después de cerrar sesión
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async MantenerSesion() {
    if (this.arregloUsuarioConectado.length > 0) {
      await this.bd.MantenerSesionIniciada(this.arregloUsuarioConectado[0].username);
      this.mantenerSesionActivo = true; // Actualiza la variable de estado
    }
  }

  async DesactivarMantenerSesion() {
    if (this.arregloUsuarioConectado.length > 0) {
      await this.bd.DesactivarMantenerSesionIniciada(this.arregloUsuarioConectado[0].username);
      this.mantenerSesionActivo = false; // Actualiza la variable de estado
    }
  }

  async IrModificarPerfil(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        usuarioModificarP: x
      }
    };
    this.router.navigate(['/modificarperfil'], navigationExtras);
  }
}
