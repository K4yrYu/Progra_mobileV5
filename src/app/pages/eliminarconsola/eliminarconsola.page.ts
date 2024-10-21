import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-eliminarconsola',
  templateUrl: './eliminarconsola.page.html',
  styleUrls: ['./eliminarconsola.page.scss'],
})
export class EliminarconsolaPage implements OnInit {

  consolaLlego: any;

  constructor(private bd: ManejodbService, private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.consolaLlego = this.router.getCurrentNavigation()?.extras?.state?.['consolaSelect'];
      }
    });
  }

  ngOnInit() {
    // Aquí no necesitas hacer otra consulta si ya tienes la consola
  }

  async eliminarConsola() {
    if (this.consolaLlego?.id_producto) {
      await this.bd.eliminarConsola(this.consolaLlego.id_producto);
      await this.router.navigate(['/crudconsolas']);
    }
  }
}
