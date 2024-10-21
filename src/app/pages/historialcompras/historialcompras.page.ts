import { Component, OnInit } from '@angular/core';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-historialcompras',
  templateUrl: './historialcompras.page.html',
  styleUrls: ['./historialcompras.page.scss'],
})
export class HistorialcomprasPage implements OnInit {

  idUserLoggeao!: any;

  arregloVenta: any = [
    {
      id_venta: '',
      fecha_venta: '',
      total: '',
      estado_retiro: '',
      username: '',
      id_usuario: '',
      id_estado: '',
    }
  ]

  constructor(private bd: ManejodbService) { } // Inyección del servicio de alertas

  async ionViewWillEnter() {
    await this.cargarRetiros();
  }

  async ngOnInit() {
    
  }

  /*
  async ionViewWillEnter() {
    this.cargarRetiros
  } */

  async cargarRetiros(){
    this.idUserLoggeao = '';
    this.idUserLoggeao = await this.bd.obtenerIdUsuarioLogueado();
    this.arregloVenta = await this.bd.consultarRetiros(this.idUserLoggeao);
  }


}
