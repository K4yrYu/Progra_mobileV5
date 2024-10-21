import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service'; // Asegúrate de que la ruta sea correcta
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-eliminarusuario',
  templateUrl: './eliminarusuario.page.html', // Asegúrate de que la ruta sea correcta
  styleUrls: ['./eliminarusuario.page.scss'],
})
export class EliminarusuarioPage implements OnInit {

  // Usuario que llega desde CRUD
  usuarioLlego: any;

  // Arreglo para el usuario conectado
  arregloUsuarioConectado: any = [];

  constructor(
    private bd: ManejodbService,
    private router: Router,
    private activedroute: ActivatedRoute,
    private alertacon: AlertasService
  ) {
    this.activedroute.queryParams.subscribe(res => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.usuarioLlego = navigation.extras.state['usuarioSelect'];
      }
    });
  }

  ngOnInit() {
    // Verificar si la BD está disponible
    this.bd.dbState().subscribe(data => {
      if (data) {
        // Obtener el usuario conectado
        this.bd.fetchUsuarioConectado().subscribe(resc => {
          this.arregloUsuarioConectado = resc;
        });
      }
    });
  }

  async eliminarUsuario() {
    // Comprobar si hay usuarios conectados
    if (this.arregloUsuarioConectado.length > 0) {
      const usuarioConectado = this.arregloUsuarioConectado[0]; // Asumiendo que solo hay un usuario conectado

      // Validar si el usuario en sesión es el mismo que el que se desea eliminar
      if (usuarioConectado.username === this.usuarioLlego.username) {
        return this.alertacon.presentAlert("ERROR", "No se puede borrar al usuario en sesión.");
      }

      // Validar si el usuario en sesión tiene el rol de cliente (id_rol = 2)
      if (usuarioConectado.id_rol === 2) {
        return this.alertacon.presentAlert("ERROR", "El cliente no tiene permisos de edición.");
      }
    }

    // Enviar id usuario a borrar / id_usuario en sesión 
    await this.bd.eliminarUsuarios(this.usuarioLlego.id_usuario);

    // Redirige después de que el usuario haya cerrado la alerta
    this.router.navigate(['/crudusuarios']);
  }
}