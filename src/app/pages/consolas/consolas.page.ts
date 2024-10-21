import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service'; // Asegúrate de que la ruta sea correcta
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-consolas',
  templateUrl: './consolas.page.html',
  styleUrls: ['./consolas.page.scss'],
})
export class ConsolasPage implements OnInit {

  consolaSelect: any;

  arregloConsolas: any[] = [
    {
      id_producto: '',
      nombre_prod: '',
      precio_prod: '',
      stock_prod:  '',
      descripcion_prod: '',
      foto_prod: '',
      estatus: '',
      id_categoria: '',
    },
  ];

  ConsolasFiltradas: any[] = []; // Para almacenar las consolas filtradas

  constructor(private alertasService: AlertasService, private bd: ManejodbService, private router: Router) {}

  ngOnInit() {
    this.ConsolasFiltradas = this.arregloConsolas; // Mostrar todos los juegos inicialmente

    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchConsolas().subscribe(res => {
          this.arregloConsolas = res;
          this.ConsolasFiltradas = res; // Actualizar también los juegos filtrados
        });
      }
    });
  }

  irConsolaUnico(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        consolaSelect: x
      }
    };
    this.router.navigate(['/consolaunica'], navigationExtras);
  }

  compra() {
    this.alertasService.presentAlert('Añadido al carro', '¡Gracias!');
  }

  buscarConsola(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();

    // Si el campo de búsqueda está vacío, mostramos todos los juegos
    if (textoBusqueda.trim() === '') {
      this.ConsolasFiltradas = this.arregloConsolas;
    } else {
      // Filtrar los juegos según el texto de búsqueda
      this.ConsolasFiltradas = this.arregloConsolas.filter(consola => 
        consola.nombre_prod.toLowerCase().includes(textoBusqueda)
      );
    }
  }
}
