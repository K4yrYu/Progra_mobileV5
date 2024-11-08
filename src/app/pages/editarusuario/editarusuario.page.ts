import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { CamaraService } from 'src/app/services/camara.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.page.html',
  styleUrls: ['./editarusuario.page.scss'],
})
export class EditarusuarioPage implements OnInit {

  usuarioLlego: any;
  estadoUserLlego: any;
  rolUserLlego: any;
  preguntaSeguridad: string = '';
  respuestaSeguridad: string = '';

  motivoBan: string = ''; // Variable para el motivo del ban
  mostrarMotivoBan: boolean = false; // Controla la visibilidad de la caja de motivo

  // Variables de control para los mensajes de error
  errorCampos: boolean = false;
  errorCorreo: boolean = false;
  errorContrasena: boolean = false;
  errorRut: boolean = false;
  errorUsuarioExistente: boolean = false;
  errorCorreoExistente: boolean = false;

  roles = [
    { value: '1', viewValue: 'Administrador' },
    { value: '2', viewValue: 'Cliente' },
  ];

  estados = [
    { value: '1', viewValue: 'Activo' },
    { value: '0', viewValue: 'Baneado' },
  ];

  preguntasSeguridad = [
    { value: 'colorFavorito', viewValue: '¿Cuál es su color favorito?' },
    { value: 'mascotaInfancia', viewValue: '¿Cómo se llamaba su mascota de la infancia?' },
    { value: 'ciudadNacimiento', viewValue: '¿En qué ciudad nació?' },
    { value: 'nombreEscuelaPrimaria', viewValue: '¿Cuál fue el nombre de su escuela primaria?' },
  ];

  constructor(
    private router: Router,
    private alertasService: AlertasService,
    private camaraService: CamaraService,
    private activedroute: ActivatedRoute,
    private bd: ManejodbService 
  ) {
    this.activedroute.queryParams.subscribe(async res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuarioLlego = { ...this.router.getCurrentNavigation()?.extras?.state?.['usuarioSelect'] };
        this.usuarioLlego.clave;

        // Asignar estado y rol al usuario cargado
        this.estadoUserLlego = this.usuarioLlego.estado_user?.toString();
        this.rolUserLlego = this.usuarioLlego.id_rol?.toString();

        const preguntaSeguridad = await this.bd.consultarPreguntasSeguridad(this.usuarioLlego.id_usuario);
        if (preguntaSeguridad) {
          this.preguntaSeguridad = 'colorFavorito';
          this.respuestaSeguridad = preguntaSeguridad.respuesta_seguridad;
        }
      }
    });
  }

  ngOnInit() {
    if (this.usuarioLlego.id_rol != null) {
      this.usuarioLlego.id_rol = this.usuarioLlego.id_rol.toString();
    }
    if (this.usuarioLlego.estado_user != null) {
      this.usuarioLlego.estado_user = this.usuarioLlego.estado_user.toString();
    }
  }

  async agregarFoto() {
    try {
      const foto = await this.camaraService.takePicture();
      this.usuarioLlego.foto_usuario = foto;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      await this.alertasService.presentAlert('Error', 'No se pudo agregar la foto.');
    }
  }

  async validarCorreo() {
    this.errorCorreoExistente = false;
    const correoExistente = await this.bd.verificarCorreoExistente(this.usuarioLlego.correo.toLowerCase());
    if (correoExistente) {
      this.errorCorreoExistente = true;
    }
  }

  onEstadoChange() {
    this.mostrarMotivoBan = this.usuarioLlego.estado_user === '0';
  }

  cancelarBan() {
    this.motivoBan = '';
    this.mostrarMotivoBan = false;
  }

  confirmarBan() {
    if (this.motivoBan.trim()) {
      console.log('Motivo del ban confirmado:', this.motivoBan);
      this.mostrarMotivoBan = false;
    } else {
      console.log('Debe ingresar un motivo para confirmar el ban.');
    }
  }

  async guardarCambios() {
    this.errorCampos = false;
    this.errorCorreo = false;
    this.errorContrasena = false;
    this.errorRut = false;
    this.errorUsuarioExistente = false;
    this.errorCorreoExistente = false;

    if (!this.usuarioLlego.nombres_usuario || !this.usuarioLlego.apellidos_usuario || 
        !this.usuarioLlego.correo || !this.usuarioLlego.username || 
        !this.usuarioLlego.clave || 
        !this.usuarioLlego.id_rol || this.usuarioLlego.estado_user === undefined || 
        !this.usuarioLlego.rut_usuario || !this.respuestaSeguridad) {
      this.errorCampos = true;
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.usuarioLlego.correo)) {
      this.errorCorreo = true;
      return;
    }

    const usuarioExistente = await this.bd.verificarUsuarioExistente2(this.usuarioLlego.username);
    if (usuarioExistente && usuarioExistente.id_usuario !== this.usuarioLlego.id_usuario) {
      this.errorUsuarioExistente = true;
      return;
    }

    const rutPattern = /^\d{1,8}-[0-9kK]{1}$/;
    if (!rutPattern.test(this.usuarioLlego.rut_usuario)) {
      this.errorRut = true;
      return;
    }

    try {
      await this.bd.modificarUsuarioConSeguridadAdmin(
        this.usuarioLlego.id_usuario,
        this.usuarioLlego.rut_usuario,
        this.usuarioLlego.nombres_usuario,
        this.usuarioLlego.apellidos_usuario,
        this.usuarioLlego.username,
        this.usuarioLlego.clave,
        this.usuarioLlego.correo,
        this.usuarioLlego.foto_usuario,
        this.usuarioLlego.estado_user,
        this.usuarioLlego.id_rol,
        this.respuestaSeguridad,
      );
      this.alertasService.presentAlert("Éxito", "Usuario modificado correctamente.");
      this.router.navigate(['/crudusuarios']);
    } catch (error) {
      await this.alertasService.presentAlert("Error", "Error al modificar el usuario: " + JSON.stringify(error));
    }
  }
}
