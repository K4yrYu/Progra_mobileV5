import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CamaraService } from 'src/app/services/camara.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.page.html',
  styleUrls: ['./modificarperfil.page.scss'],
})
export class ModificarperfilPage implements OnInit {

  usuarioModificarLlego: any = {
    id_usuario: '',
    nombres_usuario: '',
    apellidos_usuario: '',
    correo: '',
    foto_usuario: ''
  };

  errorMessage: string = '';

  constructor(
    private alertasService: AlertasService,
    private bd: ManejodbService,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private camaraService: CamaraService,
    private cdr: ChangeDetectorRef,
    private activedroute: ActivatedRoute
  ) {
    this.activedroute.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuarioModificarLlego = this.router.getCurrentNavigation()?.extras?.state?.['usuarioModificarP'];
        this.cdr.detectChanges(); // Forzar la detección de cambios si es necesario
      }
    });
  }

  ngOnInit() {
    // Cargar los datos del usuario logueado (si no se pasan con el state)
    this.cargarUsuarioLogueado();
  }

  async cargarUsuarioLogueado() {
    try {
      const usuario = await this.autenticacionService.obtenerUsuarioActual();
      if (usuario) {
        this.usuarioModificarLlego = usuario;
      } else {
        this.errorMessage = 'No se encontró el usuario logueado';
      }
    } catch (error) {
      this.errorMessage = 'Error al cargar el usuario logueado';
    }
  }

  getImagenUsuario(foto: string | null): string {
    return foto ? foto : 'assets/img/user_default_photo.jpg';
  }

  async cambiarImagenPerfil() {
    try {
      const imageUrl = await this.camaraService.takePicture();
      this.usuarioModificarLlego.foto_usuario = imageUrl || 'assets/img/user_default_photo.jpg'; // Asignar la imagen capturada
    } catch (error) {
      this.errorMessage = 'Error al cambiar la imagen de perfil';
    }
  }

  async onSubmit() {
    // Verificar que los campos de nombres y apellidos no estén vacíos
    if (!this.usuarioModificarLlego.nombres_usuario.trim()) {
      this.errorMessage = 'El campo de nombres no puede estar vacío.';
      return;
    }

    if (!this.usuarioModificarLlego.apellidos_usuario.trim()) {
      this.errorMessage = 'El campo de apellidos no puede estar vacío.';
      return;
    }

    try {
      await this.bd.modificarUsuariosCliente(
        this.usuarioModificarLlego.id_usuario,
        this.usuarioModificarLlego.nombres_usuario,
        this.usuarioModificarLlego.apellidos_usuario,
        this.usuarioModificarLlego.foto_usuario // Guardar la nueva imagen
      );
      this.router.navigate(['/perfil']);
    } catch (error) {
      this.errorMessage = 'Error al modificar el usuario';
    }
  }
}