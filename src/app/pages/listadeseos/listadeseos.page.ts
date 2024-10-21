import { Component, OnInit } from '@angular/core';
import { ManejodbService } from 'src/app/services/manejodb.service';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-listadeseos',
  templateUrl: './listadeseos.page.html',
  styleUrls: ['./listadeseos.page.scss'],
})
export class ListadeseosPage implements OnInit {
  favoritos: any[] = [];
  idUserLogged!: number;

  constructor(
    private alertasService: AlertasService,
    private bd: ManejodbService
  ) {}

  async ngOnInit() {
    try {
      this.idUserLogged = await this.bd.obtenerIdUsuarioLogueado();
      if (this.idUserLogged) {
        await this.cargarFavoritos();
      }
    } catch (error) {
      this.alertasService.presentAlert('Error', 'Error al cargar la lista: ' + JSON.stringify(error));
    }
  }

  async cargarFavoritos() {
    try {
      this.favoritos = await this.bd.consultarFavs(this.idUserLogged);
    } catch (error) {
      this.alertasService.presentAlert('Error', 'No se pudo cargar la lista de deseos: ' + JSON.stringify(error));
    }
  }

  async quitarDeListaDeseos(id_producto: number) {
    try {
      await this.bd.quitarFav(id_producto, this.idUserLogged);
      this.favoritos = this.favoritos.filter(fav => fav.id_producto !== id_producto);
    } catch (error) {
      this.alertasService.presentAlert('Error', 'No se pudo eliminar: ' + JSON.stringify(error));
    }
  }

  
}
