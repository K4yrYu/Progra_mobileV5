import { Component, OnInit } from '@angular/core';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-historialventas',
  templateUrl: './historialventas.page.html',
  styleUrls: ['./historialventas.page.scss'],
})
export class HistorialventasPage implements OnInit {

  idUserLoggeao!: any;

  arregloVentasTotales: any = [
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
    await this.cargarRetiros();
  }

  async cargarRetiros(){
    this.idUserLoggeao = '';
    this.idUserLoggeao = await this.bd.obtenerIdUsuarioLogueado();
    this.arregloVentasTotales = await this.bd.CosultarVentasTotales();
  }

}
