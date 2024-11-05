import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { CamaraService } from 'src/app/services/camara.service';
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
  foto?: string;
  preguntaSeguridad?: string;
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

  respuestaSeguridad: string = '';

  // Opciones de roles, estados y preguntas de seguridad
  roles = [
    { value: '1', viewValue: 'Administrador' },
    { value: '2', viewValue: 'Cliente' },
  ];

  estados = [
    { value: '1', viewValue: 'Activo' },
    { value: '0', viewValue: 'Baneado' },
  ];

  preguntasSeguridad = [
    { value: '1', viewValue: '¿Cuál es tu color favorito?' },
    { value: '2', viewValue: '¿Cuál es tu comida favorita?' },
    { value: '3', viewValue: '¿ Nombre de tu mascota?' },
    { value: '4', viewValue: '¿Tu comuna actual?' },
  ];

  errorCampos: boolean = false;
  errorCorreo: boolean = false;
  errorCorreoExistente: boolean = false;
  errorContrasena: boolean = false;
  errorFormatoContrasena: boolean = false;
  errorRut: boolean = false;
  errorUsuarioExistente: boolean = false;

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
      this.usuario.foto = foto;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.alertasService.presentAlert('Error', 'No se pudo agregar la foto.');
    }
  }

  async validarCorreo() {
    this.errorCorreoExistente = false;
    const correoExistente = await this.bd.verificarCorreoExistente(this.usuario.correo.toLowerCase());
    if (correoExistente) {
      this.errorCorreoExistente = true;
      return;
    }
  }

  async validarCampos() {
    this.errorCampos = false;
    this.errorCorreo = false;
    this.errorContrasena = false;
    this.errorFormatoContrasena = false;
    this.errorRut = false;
    this.errorUsuarioExistente = false;

    if (
      !this.usuario.nombres ||
      !this.usuario.apellidos ||
      !this.usuario.rut ||
      !this.usuario.correo ||
      !this.usuario.usuario ||
      !this.usuario.contrasena ||
      !this.usuario.confirmarContrasena ||
      !this.usuario.preguntaSeguridad ||
      !this.respuestaSeguridad
    ) {
      this.errorCampos = true;
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.usuario.correo)) {
      this.errorCorreo = true;
      return;
    }

    const rutPattern = /^\d{1,8}-[0-9kK]{1}$/;
    if (!rutPattern.test(this.usuario.rut)) {
      this.errorRut = true;
      return;
    }

    if (this.usuario.contrasena !== this.usuario.confirmarContrasena) {
      this.errorContrasena = true;
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|`"'=-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\|`"'=-]{6,}$/;
    if (!passwordPattern.test(this.usuario.contrasena)) {
      this.errorFormatoContrasena = true;
      return;
    }

    if (await this.bd.verificarUsuarioExistente(this.usuario.usuario)) {
      this.errorUsuarioExistente = true;
      return;
    }

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
      this.usuario.preguntaSeguridad,
    );

    this.router.navigate(['/crudusuarios']);
  }
}
