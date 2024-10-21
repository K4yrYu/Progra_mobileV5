import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service'; // Ruta correcta al servicio
import { ManejodbService } from 'src/app/services/manejodb.service'; // Ruta correcta al servicio

@Component({
  selector: 'app-consolas',
  templateUrl: './consolas.page.html',
  styleUrls: ['./consolas.page.scss'],
})
export class ConsolasPage implements OnInit {

  consolaSelect: any; // Para almacenar la consola seleccionada

  arregloConsolas: any[] = []; // Consolas originales
  ConsolasFiltradas: any[] = []; // Consolas filtradas

  constructor(
    private alertasService: AlertasService,
    private bd: ManejodbService,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar todas las consolas al iniciar
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchConsolas().subscribe(res => {
          this.arregloConsolas = res;
          this.ConsolasFiltradas = res; // Mostrar todas las consolas al inicio
        });
      }
    });
  }

  irConsolaUnico(consola: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        consolaSelect: consola
      }
    };
    this.router.navigate(['/consolaunica'], navigationExtras);
  }

  compra() {
    this.alertasService.presentAlert('Añadido al carro', '¡Gracias por tu compra!');
  }

  buscarConsola(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();

    if (textoBusqueda.trim() === '') {
      this.ConsolasFiltradas = this.arregloConsolas; // Mostrar todas si no hay búsqueda
    } else {
      this.ConsolasFiltradas = this.arregloConsolas.filter(consola =>
        consola.nombre_prod.toLowerCase().includes(textoBusqueda)
      );
    }
  }
}
