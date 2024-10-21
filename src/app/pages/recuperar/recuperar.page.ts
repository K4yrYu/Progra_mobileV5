import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ManejodbService } from 'src/app/services/manejodb.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  nombreUsuario: string = ''; // Almacena el nombre de usuario
  respuestaSeguridad: string = ''; // Almacena la respuesta de seguridad
  errorMessage: string = ''; // Mensaje de error
  usuarioValidado: boolean = false; // Controla si el usuario ha sido validado
  usuarioVA: any; // Variable para almacenar el usuario validado

  constructor(private router: Router, private dbService: ManejodbService) { }

  ngOnInit() {}

  // Método para validar el nombre de usuario
  async validarUsuario() {
    try {
      const usuario = await this.dbService.consultarUsuarioPorNombre(this.nombreUsuario);
      
      if (usuario) {
        this.usuarioValidado = true; // Usuario validado
        this.usuarioVA = usuario; // Almacena el usuario validado
        this.errorMessage = ''; // Limpiar mensaje de error
      } else {
        this.errorMessage = 'Nombre de usuario no válido.';
        this.usuarioValidado = false; // Usuario no validado
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Error al validar el usuario.';
    }
  }

  // Método para validar la respuesta de seguridad
  async validarRespuesta() {
    // Validar que el campo no esté vacío
    if (this.respuestaSeguridad.trim() === '') {
      this.errorMessage = 'La respuesta no puede quedar vacía.';
      return; // Salir si la respuesta está vacía
    }
    
    // Validar la respuesta de seguridad en la base de datos
    const isValid = await this.dbService.validarRespuestaSeguridad(this.nombreUsuario, this.respuestaSeguridad.trim());
    
    if (!isValid) {
      this.errorMessage = 'Respuesta incorrecta.'; // Mensaje de error si la respuesta es incorrecta
    } else {
      this.errorMessage = ''; // Limpiar el mensaje de error si es válido
      this.mandarUser(this.usuarioVA); // Enviar el usuario completo a la siguiente página
    }
  }

  // Método para enviar el usuario a la página de cambio de clave
  mandarUser(usuario: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        usuario: usuario // Enviar el usuario completo
      }
    };
    this.router.navigate(['/cambioclave'], navigationExtras); // Redirigir a la página de cambio de clave
  }

  // Método para cancelar y volver a la página de inicio de sesión
  cancelar() {
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
