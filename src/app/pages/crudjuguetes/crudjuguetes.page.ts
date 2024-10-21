import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-crudjuguetes',
  templateUrl: './crudjuguetes.page.html',
  styleUrls: ['./crudjuguetes.page.scss'],
})
export class CrudjuguetesPage implements OnInit {

  jugueteSelect: any;

  //repetir pero cambiar a juguetes y consolas
  arregloJuguetes: any = [
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
        this.bd.fetchJuguetes().subscribe(res => {
          this.arregloJuguetes = res;
        });
      }
    });
  }

  agregarJuguete(){
    this.router.navigate(['/agregarjuguete'])
  }

  eliminarJuguete(x: any){
    let navigationExtras: NavigationExtras = {
      state: {
        jugueteSelect: x
      }
    }
    this.router.navigate(['/eliminarjuguete'], navigationExtras);
  }

  editarJuguete(x: any){
    let navigationExtras: NavigationExtras = {
      state: {
        jugueteSelect: x
      }
    }
    this.router.navigate(['/editarjuguete'], navigationExtras);
  }

}
