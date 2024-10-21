import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-eliminarjuego',
  templateUrl: './eliminarjuego.page.html',
  styleUrls: ['./eliminarjuego.page.scss'],
})
export class EliminarjuegoPage implements OnInit {
  
  juegoLlego: any;

  constructor(private bd: ManejodbService, private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.juegoLlego = this.router.getCurrentNavigation()?.extras?.state?.['juegoSelect'];
      }
    });
  }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data && this.juegoLlego) {
        // Si ya tienes el juego, no necesitas hacer otra consulta
        // Puedes asignar los datos del juego directamente si están disponibles
      }
    });
  }

  async eliminarJuego() {
    if (this.juegoLlego?.id_producto) {
      await this.bd.eliminarJuegos(this.juegoLlego.id_producto);
      await this.router.navigate(['/crudjuegos']);
    }
  }
}
