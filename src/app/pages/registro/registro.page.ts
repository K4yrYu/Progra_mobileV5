import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombres: string = '';
  apellidos: string = '';
  rut: string = '';
  usuario: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  respuesta: string = ''; // Nuevo campo para la respuesta de seguridad
  mensajesValidacion: string = '';

  arregloUsuarios: any[] = [];

  constructor(private router: Router, private bd: ManejodbService, private alerta: AlertasService) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchUsuarios().subscribe(res => {
          this.arregloUsuarios = res;
        });
      }
    });
  }

  registrar() {
    // Eliminar espacios en blanco antes de validar
    this.nombres = this.limpiarEspacios(this.nombres);
    this.apellidos = this.limpiarEspacios(this.apellidos);
    this.rut = this.limpiarRut(this.rut);
    this.usuario = this.limpiarEspacios(this.usuario);
    this.correo = this.limpiarEspacios(this.correo);
    this.contrasena = this.contrasena.trim();
    this.confirmarContrasena = this.confirmarContrasena.trim();
    this.respuesta = this.limpiarEspacios(this.respuesta); // Limpiar respuesta de seguridad

    let errores = this.validarFormulario();

    if (errores.length === 0) {
      // Si no hay errores, proceder con el registro
      this.bd.agregarUsuariosCliente(this.rut, this.nombres, this.apellidos, this.usuario, this.contrasena, this.correo, this.respuesta); // Pasar respuesta de seguridad
      this.router.navigate(['/login']);
      this.reiniciarCampos(); // Reiniciar campos después del registro
    }
  }

  validarFormulario(): string[] {
    let errores: string[] = [];

    // Verificar si falta algún campo
    const camposVacios = !this.nombres || !this.apellidos || !this.rut || !this.usuario || !this.correo || !this.contrasena || !this.confirmarContrasena || !this.respuesta;

    if (camposVacios) {
      errores.push('Todos los campos son obligatorios.');
    }

    // Validar formato del RUT (solo si se llenó)
    if (this.rut && !/^[0-9]+[-][0-9kK]{1}$/.test(this.rut)) {
      errores.push('El formato del RUT es inválido. Debe ser en el formato: 12345678-k.');
    }

    // Validar formato del correo (solo si se llenó)
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo) && this.correo.split('@').length === 2;
    if (this.correo && !correoValido) {
      errores.push('El formato del correo electrónico es inválido o contiene más de un símbolo "@".');
    }

    // Validar que las contraseñas coincidan (solo si ambas están llenas)
    if (this.contrasena && this.confirmarContrasena && this.contrasena !== this.confirmarContrasena) {
      errores.push('Las contraseñas no coinciden.');
    }

    // Validar longitud y formato de la contraseña (solo si se llenó)
    const contraseñaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(this.contrasena);
    if (this.contrasena && !contraseñaValida) {
      errores.push('La contraseña debe tener al menos 6 caracteres, incluyendo mayúsculas, minúsculas y caracteres especiales.');
    }

    // Verificar si el usuario ya existe (solo si se llenó el campo usuario)
    const usuarioExistente = this.arregloUsuarios.find(usuario => usuario.username === this.usuario);
    if (usuarioExistente) {
      errores.push('El usuario ya existe.');
    }

    // Verificar si el correo ya existe (solo si se llenó el campo correo)
    const correoExistente = this.arregloUsuarios.find(usuario => usuario.correo === this.correo);
    if (correoExistente) {
      errores.push('El correo ya está registrado.');
    }

    this.mensajesValidacion = errores.join('\n'); // Convierte el arreglo de errores a una cadena de texto separada por saltos de línea.
    
    return errores;
  }

  reiniciarCampos() {
    this.nombres = '';
    this.apellidos = '';
    this.rut = '';
    this.usuario = '';
    this.correo = '';
    this.contrasena = '';
    this.confirmarContrasena = '';
    this.respuesta = ''; // Reiniciar respuesta de seguridad
    this.mensajesValidacion = '';
  }

  // Método para limpiar los espacios en blanco dentro de un string
  limpiarEspacios(texto: string): string {
    return texto.replace(/\s+/g, ' ').trim(); // Reemplaza múltiples espacios por uno solo y elimina espacios en los extremos
  }

  // Método para limpiar el RUT (eliminar espacios en blanco completamente)
  limpiarRut(rut: string): string {
    return rut.replace(/\s+/g, ''); // Elimina todos los espacios del RUT
  }
}
