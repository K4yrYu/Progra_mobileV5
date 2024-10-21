import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { CamaraService } from 'src/app/services/camara.service'; // Importar el servicio de cámara
import { ManejodbService } from 'src/app/services/manejodb.service';

interface Usuario {
  nombres: string;
  apellidos: string;
  rut: string;
  correo: string;
  usuario: string;
  contrasena: string;
  confirmarContrasena: string;
  rol: string;
  estado: string;
  foto?: string; // Propiedad opcional para la foto
}

@Component({
  selector: 'app-agregarusuario',
  templateUrl: './agregarusuario.page.html',
  styleUrls: ['./agregarusuario.page.scss'],
})
export class AgregarusuarioPage {
  usuario: Usuario = {
    nombres: '',
    apellidos: '',
    rut: '',
    correo: '',
    usuario: '',
    contrasena: '',
    confirmarContrasena: '',
    rol: '',
    estado: '',
  };

  respuestaSeguridad: string = ''; // Nueva propiedad para la respuesta de seguridad

  // Opciones de roles y estados
  roles = [
    { value: '1', viewValue: 'Administrador' },
    { value: '2', viewValue: 'Cliente' },
  ];

  estados = [
    { value: '1', viewValue: 'Activo' },
    { value: '0', viewValue: 'Baneado' },
  ];

  // Variables de control para los mensajes de error
  errorCampos: boolean = false;
  errorCorreo: boolean = false;
  errorCorreoExistente: boolean = false;
  errorContrasena: boolean = false;
  errorFormatoContrasena: boolean = false;
  errorRut: boolean = false;
  errorUsuarioExistente: boolean = false; // Para manejar el error de usuario existente

  constructor(
    private router: Router,
    private bd: ManejodbService,
    private alertasService: AlertasService,
    private camaraService: CamaraService
  ) {}

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchUsuarios().subscribe(res => {
          // Opcional: Puedes llenar aquí el arreglo de usuarios si es necesario
        });
      }
    });
  }

  async agregarFoto() {
    try {
      const foto = await this.camaraService.takePicture();
      this.usuario.foto = foto; // Guardar la URL de la foto
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.alertasService.presentAlert('Error', 'No se pudo agregar la foto.');
    }
  }

  async validarCorreo() {
    this.errorCorreoExistente = false;
    // Verificar si el correo ya existe
    const correoExistente = await this.bd.verificarCorreoExistente(this.usuario.correo.toLowerCase());
    if (correoExistente) {
      this.errorCorreoExistente = true; // Marcar el error de correo existente
      return; // Salir si el correo ya existe
    }
  }

  async validarCampos() {
    // Reiniciar errores antes de la validación
    this.errorCampos = false;
    this.errorCorreo = false;
    this.errorContrasena = false;
    this.errorFormatoContrasena = false;
    this.errorRut = false;
    this.errorUsuarioExistente = false; // Reiniciar el error de usuario existente

    // Verifica si algún campo está vacío
    if (
      !this.usuario.nombres ||
      !this.usuario.apellidos ||
      !this.usuario.rut ||
      !this.usuario.correo ||
      !this.usuario.usuario ||
      !this.usuario.contrasena ||
      !this.usuario.confirmarContrasena ||
      !this.respuestaSeguridad // Verificar respuesta de seguridad
    ) {
      this.errorCampos = true;
      return; // Salir si hay errores
    }

    // Verifica si el correo es válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.usuario.correo)) {
      this.errorCorreo = true;
      return; // Salir si hay errores
    }

    // Verifica el formato del RUT
    const rutPattern = /^\d{1,8}-[0-9kK]{1}$/;
    if (!rutPattern.test(this.usuario.rut)) {
      this.errorRut = true;
      return; // Salir si hay errores
    }

    // Verifica si las contraseñas coinciden
    if (this.usuario.contrasena !== this.usuario.confirmarContrasena) {
      this.errorContrasena = true;
      return; // Salir si hay errores
    }

    // Verifica el formato de la contraseña
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|`"'=-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\|`"'=-]{6,}$/;
    if (!passwordPattern.test(this.usuario.contrasena)) {
      this.errorFormatoContrasena = true;
      return; // Salir si hay errores
    }

    // Verificar si el usuario ya existe en la base de datos
    if (await this.bd.verificarUsuarioExistente(this.usuario.usuario)) {
      this.errorUsuarioExistente = true; // Marcar el error de usuario existente
      return; // Salir si el usuario ya existe
    }

    // Agregar el usuario a la base de datos, incluyendo la respuesta de seguridad
    await this.bd.agregarUsuariosAdmin(
      this.usuario.rut.trim(),
      this.usuario.nombres.trim(),
      this.usuario.apellidos.trim(),
      this.usuario.usuario.trim(),
      this.usuario.contrasena.trim(),
      this.usuario.correo.trim(),
      this.usuario.foto,
      this.usuario.estado,
      this.usuario.rol,
      this.respuestaSeguridad // Pasar la respuesta de seguridad
    );

    // Si todos los campos son válidos, mostrar alerta de éxito
    this.router.navigate(['/crudusuarios']);
  }
}
