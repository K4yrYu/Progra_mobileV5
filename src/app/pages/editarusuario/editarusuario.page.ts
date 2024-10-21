import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { CamaraService } from 'src/app/services/camara.service'; // Importar el servicio de cámara
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.page.html',
  styleUrls: ['./editarusuario.page.scss'],
})
export class EditarusuarioPage implements OnInit {

  usuarioLlego: any;
  confirmarContrasena!: string;
  estadoUserLlego: any; // estado ban / activo
  rolUserLlego: any; // rol 1 admin / 2 cliente
  preguntaSeguridad: string = ''; // Almacena la pregunta de seguridad
  respuestaSeguridad: string = ''; // Almacena la respuesta a la pregunta de seguridad

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

  constructor(
    private router: Router,
    private alertasService: AlertasService,
    private camaraService: CamaraService,
    private activedroute: ActivatedRoute,
    private bd: ManejodbService 
  ) {
    this.activedroute.queryParams.subscribe(async res => { // Cambiar a async
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuarioLlego = { ...this.router.getCurrentNavigation()?.extras?.state?.['usuarioSelect'] };
        this.confirmarContrasena = this.usuarioLlego.clave;

        // Asignar el estado y rol al llegar
        this.estadoUserLlego = this.usuarioLlego.estado_user?.toString(); // Convertir a string
        this.rolUserLlego = this.usuarioLlego.id_rol?.toString(); // Convertir a string

        // Consultar la pregunta de seguridad
        const preguntaSeguridad = await this.bd.consultarPreguntasSeguridad(this.usuarioLlego.id_usuario); // Cambiar la llamada a la función
        if (preguntaSeguridad) {
          this.preguntaSeguridad = '¿Cual es su color favorito?';
          this.respuestaSeguridad = preguntaSeguridad.respuesta_seguridad; // Cargar respuesta existente
        }
      }
    });
  }
  

  ngOnInit() {
    if (this.usuarioLlego.id_rol != null) {
      this.usuarioLlego.id_rol = this.usuarioLlego.id_rol.toString(); // Convertir a string
    }
    if (this.usuarioLlego.estado_user != null) {
      this.usuarioLlego.estado_user = this.usuarioLlego.estado_user.toString(); // Convertir a string
    }
  }

  async agregarFoto() {
    try {
      const foto = await this.camaraService.takePicture();
      this.usuarioLlego.foto_usuario = foto; // Guardar la URL de la foto
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      await this.alertasService.presentAlert('Error', 'No se pudo agregar la foto.');
    }
  }

  async validarCorreo() {
    this.errorCorreoExistente = false;
    // Verificar si el correo ya existe
    const correoExistente = await this.bd.verificarCorreoExistente(this.usuarioLlego.correo.toLowerCase());
    if (correoExistente) {
      this.errorCorreoExistente = true; // Marcar el error de correo existente
      return; // Salir si el correo ya existe
    }
  }

  async guardarCambios() {
    // Reiniciar errores antes de la validación
    this.errorCampos = false;
    this.errorCorreo = false;
    this.errorContrasena = false;
    this.errorRut = false;
    this.errorUsuarioExistente = false;
    this.errorCorreoExistente = false;

    // Verifica si algún campo está vacío
    if (!this.usuarioLlego.nombres_usuario || !this.usuarioLlego.apellidos_usuario || 
        !this.usuarioLlego.correo || !this.usuarioLlego.username || 
        !this.usuarioLlego.clave || !this.confirmarContrasena || 
        !this.usuarioLlego.id_rol || this.usuarioLlego.estado_user === undefined || 
        !this.usuarioLlego.rut_usuario || !this.respuestaSeguridad) {
      this.errorCampos = true;
      return; // Salir si hay errores
    }

    // Verifica si el correo es válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.usuarioLlego.correo)) {
      this.errorCorreo = true;
      return; // Salir si hay errores
    }

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await this.bd.verificarUsuarioExistente2(this.usuarioLlego.username);
    if (usuarioExistente) {
      // Compara el ID del usuario existente con el ID del usuario en edición
      if (usuarioExistente.id_usuario !== this.usuarioLlego.id_usuario) {
        this.errorUsuarioExistente = true; // Marcar el error de usuario existente
        return; // Salir si el usuario ya existe y su ID es diferente
      }
    }

    // Verifica el formato del RUT
    const rutPattern = /^\d{1,8}-[0-9kK]{1}$/;
    if (!rutPattern.test(this.usuarioLlego.rut_usuario)) {
      this.errorRut = true;
      return; // Salir si hay errores
    }

    // Verifica si las contraseñas coinciden
    if (this.usuarioLlego.clave !== this.confirmarContrasena) {
      this.errorContrasena = true;
      return; // Salir si hay errores
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
        this.respuestaSeguridad // Pasar la respuesta de seguridad al modificar
      );
      this.router.navigate(['/crudusuarios']);
    } catch (error) {
      await this.alertasService.presentAlert("Error", "Error al modificar el usuario: " + JSON.stringify(error));
    }
  }
}
