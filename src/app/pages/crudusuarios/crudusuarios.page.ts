import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-crudusuarios',
  templateUrl: './crudusuarios.page.html',
  styleUrls: ['./crudusuarios.page.scss'],
})
export class CrudusuariosPage implements OnInit {

  usuarioSelect: any;


  arregloUsuarios: any = [
    {
      id_usuario: '',
      rut_usuario: '',
      nombres_usuario: '',
      apellidos_usuario: '',
      username: '',
      clave: '',
      correo: '',
      token_recup_clave: '',
      foto_usuario: '',
      estado_user: '',
      userlogged: '',
      id_rol: ''
    }
  ]

  


  constructor(private alertasService: AlertasService, private bd: ManejodbService, private router: Router) { } // Inyección del servicio de alertas

  ngOnInit() {
    // verificar si la BD está disponible
    this.bd.dbState().subscribe(data => {
      if (data) {
        // subscribir al observable de la consulta
        this.bd.fetchUsuarios().subscribe(res => {
          this.arregloUsuarios = res;
        });
      }
    });
  }

  agregarUsuario(){
    this.router.navigate(['/agregarusuario'])
  }

  eliminarUsuario(x: any){
    let navigationExtras: NavigationExtras = {
      state: {
        usuarioSelect: x
      }
    }
    this.router.navigate(['/eliminarusuario'], navigationExtras);
  }

  editarUsuario(x: any){
    let navigationExtras: NavigationExtras = {
      state: {
        usuarioSelect: x
      }
    }
    this.router.navigate(['/editarusuario'], navigationExtras);
  }


}
