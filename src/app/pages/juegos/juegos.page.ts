import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {
  
  arregloJuegos: any[] = [
    {
      id_producto: '',
      nombre_prod: '',
      precio_prod: '',
      stock_prod: '', 
      descripcion_prod: '',
      foto_prod: '',
      estatus: '',
      id_categoria: '',
      nombre_categoria: ''
    },
  ];

  juegosFiltrados: any[] = []; // Para almacenar los juegos filtrados

  constructor(
    private alertasService: AlertasService,
    private bd: ManejodbService,
    private router: Router
  ) {}

  ngOnInit() {
    this.juegosFiltrados = this.arregloJuegos; // Mostrar todos los juegos inicialmente

    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchJuegos().subscribe(res => {
          this.arregloJuegos = res;
          this.juegosFiltrados = res; // Actualizar también los juegos filtrados
        });
      }
    });
  }

  irJuegoUnico(juego: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        juegoSelect: juego
      }
    };
    this.router.navigate(['/juegounico'], navigationExtras);
  }

  compra() {
    this.alertasService.presentAlert('Añadido al carro', '¡Gracias!');
  }

  buscarJuego(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();

    // Si el campo de búsqueda está vacío, mostramos todos los juegos
    if (textoBusqueda.trim() === '') {
      this.juegosFiltrados = this.arregloJuegos;
    } else {
      // Filtrar los juegos según el texto de búsqueda
      this.juegosFiltrados = this.arregloJuegos.filter(juego => 
        juego.nombre_prod.toLowerCase().includes(textoBusqueda)
      );
    }
  }

}
