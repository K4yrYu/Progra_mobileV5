import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-crudconsolas',
  templateUrl: './crudconsolas.page.html',
  styleUrls: ['./crudconsolas.page.scss'],
})
export class CrudconsolasPage implements OnInit {

  consolaSelect: any;

  //repetir pero cambiar a juguetes y consolas
  arregloConsolas: any = [
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

  


  constructor(private bd: ManejodbService, private router: Router) { } // Inyección del servicio de alertas

  ngOnInit() {
    // verificar si la BD está disponible
    this.bd.dbState().subscribe(data => {
      if (data) {
        // subscribir al observable de la consulta
        this.bd.fetchConsolas().subscribe(res => {
          this.arregloConsolas = res;
        });
      }
    });
  }

  agregarConsola(){
    this.router.navigate(['/agregarconsola'])
  }

  eliminarConsola(x: any){
    let navigationExtras: NavigationExtras = {
      state: {
        consolaSelect: x
      }
    }
    this.router.navigate(['/eliminarconsola'], navigationExtras);
  }

  editarConsola(x: any){
    let navigationExtras: NavigationExtras = {
      state: {
        consolaSelect: x
      }
    }
    this.router.navigate(['/editarconsola'], navigationExtras);
  }

}
