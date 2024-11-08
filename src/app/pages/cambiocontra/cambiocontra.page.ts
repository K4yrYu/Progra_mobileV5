import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiocontra',
  templateUrl: './cambiocontra.page.html',
  styleUrls: ['./cambiocontra.page.scss'],
})
export class CambiocontraPage {
  claveActual: string = '';
  claveNueva: string = '';
  confirmPassword: string = '';
  claveCorrecta: boolean = false;
  errorMessage: string = '';

  // Patrón de validación para la nueva contraseña
  passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|`"'=-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\|`"'=-]{6,}$/;

  constructor(private router: Router) {}

  verificarContrasenaActual() {
    // Verificar si la contraseña actual es correcta
    if (this.claveActual === 'Admin123') {
      this.claveCorrecta = true;
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } else {
      this.errorMessage = 'La contraseña actual es incorrecta';
    }
  }

  cambiarContrasena() {
    // Validar que la nueva contraseña no sea igual a la actual
    if (this.claveNueva === this.claveActual) {
      this.errorMessage = 'La nueva contraseña no puede ser igual a la contraseña actual';
      return;
    }

    // Validar la nueva contraseña con el patrón de seguridad
    if (!this.passwordPattern.test(this.claveNueva)) {
      this.errorMessage = 'La nueva contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial';
      return;
    }

    // Verificar que la nueva contraseña coincida con la confirmación
    if (this.claveNueva !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Si todas las validaciones son exitosas, redirigir al perfil
    this.errorMessage = '';
    console.log('Contraseña cambiada con éxito');
    this.router.navigate(['/perfil']);
  }

  cancelar() {
    this.router.navigate(['/perfil']);
  }
}
