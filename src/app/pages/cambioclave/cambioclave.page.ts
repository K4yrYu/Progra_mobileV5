import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-cambioclave',
  templateUrl: './cambioclave.page.html',
  styleUrls: ['./cambioclave.page.scss'],
})
export class CambioclavePage implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  usuarioFue!: any; // Almacena el usuario pasado desde la página anterior

  // Patrón de contraseña
  passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|`"'=-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\|`"'=-]{6,}$/;

  constructor(
    private bd: ManejodbService,
    private router: Router,
    private activedroute: ActivatedRoute,
    private alertasService: AlertasService
  ) {
    this.activedroute.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuarioFue = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      }
    });
  }

  ngOnInit() {}

  async validarContrasenas() {
    if (!this.password || !this.confirmPassword) {
      this.errorMessage = 'Los campos no pueden estar vacíos.';
      return; // Salir si hay campos vacíos
    } else if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return; // Salir si las contraseñas no coinciden
    } else if (!this.passwordPattern.test(this.password)) {
      this.errorMessage = 'La contraseña no cumple con los requisitos.';
      return; // Salir si la contraseña no cumple con el patrón
    } else {
      this.errorMessage = ''; // Limpiar el mensaje de error

      // Llamar a la función para cambiar la contraseña en la base de datos
      try {
        await this.bd.cambiarContrasena(this.usuarioFue.id_usuario, this.password);
        await this.alertasService.presentAlert("Éxito", "Contraseña cambiada con éxito."); // Mostrar alerta de éxito
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      } catch (error) {
        this.errorMessage = 'Error al cambiar la contraseña. Inténtelo de nuevo.';
        console.error(error);
      }
    }
  }

  cancelar() {
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
