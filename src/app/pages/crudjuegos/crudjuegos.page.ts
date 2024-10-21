import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-crudjuegos',
  templateUrl: './crudjuegos.page.html',
  styleUrls: ['./crudjuegos.page.scss'],
})
export class CrudjuegosPage implements OnInit {
  
  juegoSelect: any;

  //repetir pero cambiar a juguetes y consolas
  arregloJuegos: any = [
    {
      id_producto: '',
      nombre_prod: '',
      precio_prod: '',
      stock_prod:  '',
      descripcion_prod: '',  
      foto_prod: '',
      estatus: '',
      id_categoria: ''
    }
  ]

  


  constructor(private alertasService: AlertasService, private bd: ManejodbService, private router: Router) { } // Inyección del servicio de alertas

  ngOnInit() {
    // verificar si la BD está disponible
    this.bd.dbState().subscribe(data => {
      if (data) {
        // subscribir al observable de la consulta
        this.bd.fetchJuegos().subscribe(res => {
          this.arregloJuegos = res;
        });
      }
    });
  }


  agregarJuego(){
    this.router.navigate(['/agregarjuego'])
  }

  eliminarJuego(x: any){
    let navigationExtras: NavigationExtras = {
      state: {
        juegoSelect: x
      }
    }
    this.router.navigate(['/eliminarjuego'], navigationExtras);
  }

  editarJuego(x: any){
    let navigationExtras: NavigationExtras = {
      state: {
        juegoSelect: x
      }
    }
    this.router.navigate(['/editarjuego'], navigationExtras);
  }

}
